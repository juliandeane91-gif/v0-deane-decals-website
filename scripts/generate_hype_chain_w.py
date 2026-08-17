#!/usr/bin/env python3
"""Commanders-style hype chain W — four trapezoids + left-pointing serifs + chain links."""

from __future__ import annotations

from pathlib import Path

import numpy as np
import trimesh
from shapely.geometry import Polygon
from shapely.ops import unary_union
from trimesh import transformations as tf

OUTPUT = Path(r"C:\Users\julian.deane.adm\Downloads\woodlands_hype_chain_W_commanders.stl")

SCALE = 1.05  # ~90 mm tall
EXTRUDE = 6.0
OUTLINE = 2.2  # gold stencil ring thickness (optional outer lip)

LINK_OUTER_R = 9.0
LINK_INNER_R = 5.5
LINK_THICKNESS = 5.0
LINK_SPREAD = 48.0


def extrude(poly: Polygon, height: float) -> trimesh.Trimesh:
    return trimesh.creation.extrude_polygon(poly, height=height)


def serif_top_left(x: float, y_top: float, size: float = 4.5) -> Polygon:
    """Triangular serif pointing left (Commanders signature detail)."""
    return Polygon([(x, y_top), (x - size, y_top - size * 0.55), (x, y_top - size * 0.95)])


def make_commanders_w_2d() -> Polygon:
    """
    Washington Commanders W — four trapezoidal strokes with left-pointing serifs.
    Coordinates: Y up, centered on origin. Height ~80 units before scale.
    """
    h = 40.0
    pieces = []

    # Piece 1 — left outer stroke
    pieces.append(
        Polygon([(-41, h), (-24, h), (-13, -h), (-41, -h)])
    )
    pieces.append(serif_top_left(-41, h, 5.0))

    # Piece 2 — left inner stroke
    pieces.append(
        Polygon([(-24, h), (-8, h), (0, -h), (-13, -h)])
    )
    pieces.append(serif_top_left(-24, h, 4.0))

    # Piece 3 — right inner stroke
    pieces.append(
        Polygon([(8, h), (24, h), (13, -h), (0, -h)])
    )
    pieces.append(serif_top_left(8, h, 4.0))

    # Piece 4 — right outer stroke
    pieces.append(
        Polygon([(24, h), (41, h), (41, -h), (13, -h)])
    )
    pieces.append(serif_top_left(24, h, 5.0))

    w = unary_union(pieces)
    w = w.buffer(0)  # heal intersections into one solid region
    if SCALE != 1.0:
        from shapely.affinity import scale as shapely_scale

        w = shapely_scale(w, xfact=SCALE, yfact=SCALE, origin=(0, 0))
    return w


def make_stencil_outline(w_poly: Polygon, gap: float) -> Polygon | None:
    """Outer gold-style ring: buffered outline minus inner W (for two-tone paint reference)."""
    try:
        outer = w_poly.buffer(gap, join_style=2)
        ring = outer.difference(w_poly.buffer(gap * 0.35))
        if ring.is_empty:
            return None
        return ring
    except Exception:
        return None


def make_chain_link(center: tuple[float, float, float]) -> trimesh.Trimesh:
    link = trimesh.creation.annulus(
        r_min=LINK_INNER_R, r_max=LINK_OUTER_R, height=LINK_THICKNESS, sections=48
    )
    link.apply_translation((0, 0, -LINK_THICKNESS / 2))
    link.apply_transform(tf.rotation_matrix(np.pi / 2, [1, 0, 0]))
    link.apply_translation(center)
    return link


def build_hype_chain(include_outline: bool = True) -> trimesh.Trimesh:
    w2d = make_commanders_w_2d()

    # Extrude each piece separately then merge meshes (handles MultiPolygon)
    w_parts = []
    if w2d.geom_type == "MultiPolygon":
        polys = list(w2d.geoms)
    elif w2d.geom_type == "Polygon":
        polys = [w2d]
    else:
        polys = [g for g in w2d.geoms if g.geom_type == "Polygon"]

    for poly in polys:
        m = extrude(poly, EXTRUDE)
        w_parts.append(m)
    w = trimesh.util.concatenate(w_parts)
    w.apply_translation((0, 0, -w.bounds[0][2]))

    parts: list[trimesh.Trimesh] = [w]

    if include_outline:
        ring2d = make_stencil_outline(w2d, OUTLINE)
        if ring2d is not None and not ring2d.is_empty:
            ring_polys = (
                list(ring2d.geoms)
                if ring2d.geom_type == "MultiPolygon"
                else [ring2d]
                if ring2d.geom_type == "Polygon"
                else [g for g in ring2d.geoms if g.geom_type == "Polygon"]
            )
            for poly in ring_polys:
                ring = extrude(poly, EXTRUDE)
                ring.apply_translation((0, 0, -ring.bounds[0][2]))
                parts.append(ring)

    y_top = max(p.bounds[1][1] for p in parts)
    z_mid = EXTRUDE / 2

    bar = trimesh.creation.box(extents=[LINK_SPREAD + 22, 9, EXTRUDE * 0.85])
    bar.apply_translation((0, y_top - 4.5, z_mid))
    parts.append(bar)

    for side_x in (-LINK_SPREAD / 2, LINK_SPREAD / 2):
        y = y_top + LINK_OUTER_R + 3
        for _ in range(3):
            parts.append(make_chain_link((side_x, y, z_mid)))
            y += LINK_OUTER_R * 2.15 + 3

    combined = trimesh.util.concatenate(parts)
    combined.merge_vertices()
    combined.remove_unreferenced_vertices()
    combined.apply_translation((0, 0, -combined.bounds[0][2]))
    return combined


def main() -> None:
    print("Generating Commanders-style hype chain W...")
    mesh = build_hype_chain(include_outline=True)
    mesh.export(str(OUTPUT))
    size = mesh.bounds[1] - mesh.bounds[0]
    print(f"Saved: {OUTPUT}")
    print(f"Triangles: {len(mesh.faces):,}")
    print(f"Dimensions (mm): {size[0]:.1f} x {size[1]:.1f} x {size[2]:.1f}")
    print(f"Watertight: {mesh.is_watertight}")


if __name__ == "__main__":
    main()
