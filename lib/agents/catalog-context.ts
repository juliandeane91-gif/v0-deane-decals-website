import {
  catalogProducts,
  formatPriceLabel,
  getOrderLink,
  mahjongProducts,
  SHIPPING_OPTIONS,
} from "@/lib/products"

export function getBusinessContext(): string {
  const productLines = catalogProducts
    .filter((p) => p.category !== "Shipping & Fees")
    .map((product) => {
      const price = formatPriceLabel(product)
      const tiers = product.tiers?.length
        ? ` Tiers: ${product.tiers.map((t) => `${t.label}=${t.price == null ? "Quote" : `$${t.price}`}`).join(", ")}.`
        : ""
      const orderLink = getOrderLink(product.id)
      return `- ${product.name} (${product.id}) — ${price}${product.unit ? ` per ${product.unit}` : ""}.${tiers} Order: ${orderLink}${product.description ? ` ${product.description}` : ""}`
    })

  const mahjongLines = mahjongProducts.map(
    (p) => `- ${p.name} (${p.id}) — ${formatPriceLabel(p)}. ${getOrderLink(p.id)}`
  )

  const shippingLines = SHIPPING_OPTIONS.map((o) => `- ${o.label}`)

  return `
BUSINESS: Deane Decals — custom stickers, decals, team packs, and Mahjong card covers in Warner Robins, GA.
CONTACT: hello@deanedecals.com · 478-954-1888 · deanedecals.com
MAHJONG (best sellers):
${mahjongLines.join("\n")}
MAHJONG splash page: https://deanedecals.com/mahjong

SHIPPING / PICKUP:
${shippingLines.join("\n")}

RUSH: +$10 small orders, +$25 for 10+ items.

FULL CATALOG:
${productLines.join("\n")}
`.trim()
}
