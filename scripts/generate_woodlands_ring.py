#!/usr/bin/env python3
"""Generate Woodlands Champions 2025 championship ring STL (US size 8)."""

from __future__ import annotations

import math
import struct
from pathlib import Path

import numpy as np
import trimesh
from trimesh import transformations as tf

FONT = r"C:\Windows\Fonts\arialbd.ttf"
OUTPUT = Path(r"C:\Users\julian.deane.adm\Downloads\woodlands_championship_ring_size8.stl")

# US ring size 8 inner diameter ~18.14 mm
INNER_DIA = 18.14
INNER_R = INNER_DIA / 2
BAND_HEIGHT = 5.5
BAND_THICKNESS = 3.5
OUTER_R = INNER_R + BAND_THICKNESS

# Crown dimensions (target overall bbox ~38 x 32 x 16 mm)
CROWN_W = 30.0
CROWN_D = 24.0
CROWN_H = 6.0
CROWN_CORNER = 3.5


def write_stl(path: Path, mesh: trimesh.Trimesh) -> None:
    mesh.export(str(path))


def rounded_rect_prism(
    width: float, depth: float, height: float, corner_r: float, sections: int = 12
) -> trimesh.Trimesh:
    """Extrude a rounded rectangle along Z."""
    from shapely.geometry import Polygon

    hw, hd = width / 2, depth / 2
    r = min(corner_r, hw, hd)
    pts: list[tuple[float, float]] = []

    for cx, cy, a0, a1 in [
        (-hw + r, -hd + r, math.pi, 1.5 * math.pi),
        (hw - r, -hd + r, 1.5 * math.pi, 2 * math.pi),
        (hw - r, hd - r, 0, 0.5 * math.pi),
        (-hw + r, hd - r, 0.5 * math.pi, math.pi),
    ]:
        for t in np.linspace(a0, a1, sections, endpoint=False):
            pts.append((cx + r * math.cos(t), cy + r * math.sin(t)))

    polygon = Polygon(pts)
    return trimesh.creation.extrude_polygon(polygon, height=height)


def make_text_mesh(
    text: str,
    font_size: float,
    extrude: float,
    *,
    spacing: float = 1.0,
) -> trimesh.Trimesh | None:
    try:
        mesh = trimesh.creation.text(
            text,
            height=extrude,
            font=FONT,
            font_size=font_size,
            spacing=spacing,
        )
        if mesh is None or len(mesh.vertices) == 0:
            return None
        return mesh
    except Exception:
        return None


def place_text(
    text: str,
    font_size: float,
    extrude: float,
    position: tuple[float, float, float],
    rotation: tuple[float, float, float] = (0, 0, 0),
    spacing: float = 1.0,
) -> trimesh.Trimesh | None:
    mesh = make_text_mesh(text, font_size, extrude, spacing=spacing)
    if mesh is None:
        return None
    mesh.apply_translation(-mesh.centroid)
    rx, ry, rz = rotation
    if rx:
        mesh.apply_transform(tf.rotation_matrix(rx, [1, 0, 0]))
    if ry:
        mesh.apply_transform(tf.rotation_matrix(ry, [0, 1, 0]))
    if rz:
        mesh.apply_transform(tf.rotation_matrix(rz, [0, 0, 1]))
    mesh.apply_translation(position)
    return mesh


def arched_text(
    text: str,
    font_size: float,
    extrude: float,
    radius: float,
    arc_center: tuple[float, float, float],
    arc_span: float = math.radians(55),
    z: float = 0,
) -> list[trimesh.Trimesh]:
    """Place individual letters along an arc."""
    meshes: list[trimesh.Trimesh] = []
    n = len(text.replace(" ", ""))
    if n == 0:
        return meshes

    chars = list(text)
    cx, cy, _ = arc_center
    start = math.pi / 2 + arc_span / 2
    step = arc_span / max(n - 1, 1)

    idx = 0
    for ch in chars:
        if ch == " ":
            continue
        angle = start - idx * step
        letter = make_text_mesh(ch, font_size, extrude)
        if letter is None:
            idx += 1
            continue
        letter.apply_translation(-letter.centroid)
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        rot = tf.rotation_matrix(angle - math.pi / 2, [0, 0, 1])
        letter.apply_transform(rot)
        letter.apply_translation((x, y, z))
        meshes.append(letter)
        idx += 1
    return meshes


def make_ring_band() -> trimesh.Trimesh:
    outer = trimesh.creation.cylinder(radius=OUTER_R, height=BAND_HEIGHT, sections=96)
    inner = trimesh.creation.cylinder(radius=INNER_R - 0.05, height=BAND_HEIGHT + 2, sections=96)
    inner.apply_translation((0, 0, -1))
    try:
        band = trimesh.boolean.difference([outer, inner], engine="manifold")
        if band is None or len(band.vertices) == 0:
            raise ValueError("boolean failed")
        return band
    except Exception:
        # Fallback: return outer shell only (hollow simulated by skipping inner)
        return outer


def make_crown() -> trimesh.Trimesh:
    crown = rounded_rect_prism(CROWN_W, CROWN_D, CROWN_H, CROWN_CORNER)
    crown.apply_translation((0, 0, BAND_HEIGHT))
    return crown


def merge_crown_to_band(band: trimesh.Trimesh, crown: trimesh.Trimesh) -> trimesh.Trimesh:
    """Union band and crown, widening top of band to meet crown."""
    bridge = rounded_rect_prism(CROWN_W - 2, CROWN_D - 2, 2.0, CROWN_CORNER - 0.5)
    bridge.apply_translation((0, 0, BAND_HEIGHT - 1.5))
    try:
        result = trimesh.boolean.union([band, bridge, crown], engine="manifold")
        if result is not None and len(result.vertices) > 0:
            return result
    except Exception:
        pass
    return trimesh.util.concatenate([band, bridge, crown])


def make_football(center: tuple[float, float, float], scale: float = 1.0) -> trimesh.Trimesh:
    ball = trimesh.creation.icosphere(subdivisions=3, radius=1.0)
    ball.apply_scale([1.6 * scale, 1.0 * scale, 1.0 * scale])
    # Laces - small raised strips
    laces = []
    for i in range(-2, 3):
        lace = trimesh.creation.box(extents=[0.15, 1.4 * scale, 0.12])
        lace.apply_translation((0, i * 0.22 * scale, 0.85 * scale))
        laces.append(lace)
    cross = trimesh.creation.box(extents=[0.12, 0.12, 1.2 * scale])
    cross.apply_translation((0, 0, 0.85 * scale))
    laces.append(cross)
    group = trimesh.util.concatenate([ball] + laces)
    group.apply_translation(center)
    return group


def make_helmet(center: tuple[float, float, float]) -> trimesh.Trimesh:
    shell = trimesh.creation.icosphere(subdivisions=3, radius=1.0)
    shell.apply_scale([1.1, 1.3, 1.0])
    visor = trimesh.creation.box(extents=[0.15, 1.6, 0.5])
    visor.apply_translation((0.85, 0, -0.15))
    w = make_text_mesh("W", 1.2, 0.25)
    if w is not None:
        w.apply_translation(-w.centroid)
        w.apply_translation((-0.3, 0, 0.2))
    parts = [shell, visor] + ([w] if w is not None else [])
    group = trimesh.util.concatenate(parts)
    group.apply_transform(tf.rotation_matrix(math.pi / 2, [0, 1, 0]))
    group.apply_scale(1.8)
    group.apply_translation(center)
    return group


def make_trophy(center: tuple[float, float, float]) -> trimesh.Trimesh:
    base = trimesh.creation.cylinder(radius=0.55, height=0.35, sections=24)
    stem = trimesh.creation.cylinder(radius=0.22, height=1.1, sections=16)
    stem.apply_translation((0, 0, 0.35))
    cup = trimesh.creation.icosphere(subdivisions=2, radius=0.55)
    cup.apply_scale([1.0, 1.0, 0.7])
    cup.apply_translation((0, 0, 1.55))
    ball = trimesh.creation.icosphere(subdivisions=2, radius=0.35)
    ball.apply_scale([1.3, 0.85, 0.85])
    ball.apply_translation((0, 0, 2.15))
    group = trimesh.util.concatenate([base, stem, cup, ball])
    group.apply_scale(1.5)
    group.apply_translation(center)
    return group


def make_star(center: tuple[float, float, float], size: float = 0.55) -> trimesh.Trimesh:
    """Simple 5-point star extrusion."""
    from shapely.geometry import Polygon

    pts = []
    for i in range(10):
        angle = math.pi / 2 + i * math.pi / 5
        r = size if i % 2 == 0 else size * 0.45
        pts.append((r * math.cos(angle), r * math.sin(angle)))
    try:
        star = trimesh.creation.extrude_polygon(Polygon(pts), height=0.35)
    except Exception:
        star = trimesh.creation.cylinder(radius=size * 0.4, height=0.35, sections=5)
    star.apply_translation(center)
    return star


def make_pave_border(z_base: float) -> trimesh.Trimesh:
    gems = []
    hw, hd = CROWN_W / 2 - 1.2, CROWN_D / 2 - 1.2
    for x in np.linspace(-hw + 1, hw - 1, 11):
        for y in (-hd, hd):
            gem = trimesh.creation.icosphere(subdivisions=1, radius=0.55)
            gem.apply_translation((x, y, z_base + CROWN_H - 0.2))
            gems.append(gem)
    for y in np.linspace(-hd + 1.5, hd - 1.5, 7):
        for x in (-hw, hw):
            gem = trimesh.creation.icosphere(subdivisions=1, radius=0.55)
            gem.apply_translation((x, y, z_base + CROWN_H - 0.2))
            gems.append(gem)
    return trimesh.util.concatenate(gems)


def make_inner_engraving() -> list[trimesh.Trimesh]:
    """Deboss-style text on inner band (raised outward for printability without booleans)."""
    lines = ["TEAM", "TOGETHER", "FAMILY", "FOREVER"]
    meshes = []
    z = BAND_HEIGHT / 2
    for i, line in enumerate(lines):
        t = make_text_mesh(line, 1.4, 0.3, spacing=0.95)
        if t is None:
            continue
        t.apply_translation(-t.centroid)
        angle = math.pi / 2 + (i - 1.5) * 0.22
        x = (INNER_R + 0.05) * math.cos(angle)
        y = (INNER_R + 0.05) * math.sin(angle)
        rot = tf.rotation_matrix(angle + math.pi / 2, [0, 0, 1])
        t.apply_transform(rot)
        t.apply_transform(tf.rotation_matrix(math.pi / 2, [1, 0, 0]))
        t.apply_translation((x, y, z))
        meshes.append(t)
    return meshes


def build_ring() -> trimesh.Trimesh:
    band = make_ring_band()
    crown = make_crown()
    body = merge_crown_to_band(band, crown)

    face_z = BAND_HEIGHT + CROWN_H - 0.05
    parts: list[trimesh.Trimesh] = [body]

    # Pave border gems
    parts.append(make_pave_border(BAND_HEIGHT))

    # Front face text and football
    parts.extend(
        arched_text(
            "WOODLANDS",
            font_size=2.0,
            extrude=0.55,
            radius=9.5,
            arc_center=(0, -1.5, face_z),
            arc_span=math.radians(62),
            z=face_z,
        )
    )
    champ = place_text("CHAMPIONS", 1.55, 0.5, (0, -7.5, face_z))
    if champ:
        parts.append(champ)

    football = make_football((0, 1.5, face_z + 0.8), scale=2.2)
    parts.append(football)
    w_front = place_text("W", 3.5, 0.6, (0, 1.5, face_z + 1.8))
    if w_front:
        parts.append(w_front)

    # Left shank (negative X side)
    left_angle = -math.pi / 2
    lx = OUTER_R * math.cos(left_angle)
    ly = OUTER_R * math.sin(left_angle)
    for text, zoff, size in [("WOODLANDS", 2.5, 1.1), ("2025", -2.0, 1.3)]:
        t = place_text(text, size, 0.4, (lx, ly, BAND_HEIGHT / 2 + zoff), (0, left_angle + math.pi / 2, 0))
        if t:
            parts.append(t)
    helmet = make_helmet((lx * 1.08, ly * 1.08, BAND_HEIGHT / 2))
    parts.append(helmet)

    # Right shank (positive X side)
    right_angle = math.pi / 2
    rx = OUTER_R * math.cos(right_angle)
    ry = OUTER_R * math.sin(right_angle)
    t = place_text("CHAMPIONS", 0.95, 0.4, (rx, ry, BAND_HEIGHT / 2 + 2.5), (0, right_angle + math.pi / 2, 0))
    if t:
        parts.append(t)
    trophy = make_trophy((rx * 1.1, ry * 1.1, BAND_HEIGHT / 2 - 0.3))
    parts.append(trophy)
    for dz in (-1.2, 0, 1.2):
        for side in (-0.55, 0.55):
            star = make_star((rx * 1.12 + side * 0.6, ry * 1.12, BAND_HEIGHT / 2 + dz))
            parts.append(star)

    # Inner band engraving
    parts.extend(make_inner_engraving())

    combined = trimesh.util.concatenate(parts)
    combined.merge_vertices()
    combined.remove_unreferenced_vertices()

    # Center on build plate (z=0 bottom)
    combined.apply_translation((0, 0, -combined.bounds[0][2]))
    return combined


def main() -> None:
    print("Generating Woodlands Champions ring (size 8)...")
    mesh = build_ring()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    write_stl(OUTPUT, mesh)
    size = mesh.bounds[1] - mesh.bounds[0]
    print(f"Saved: {OUTPUT}")
    print(f"Triangles: {len(mesh.faces):,}")
    print(f"Dimensions (mm): {size[0]:.1f} x {size[1]:.1f} x {size[2]:.1f}")
    print(f"Watertight: {mesh.is_watertight}")


if __name__ == "__main__":
    main()
