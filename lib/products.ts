export type ProductTier = {
  label: string
  price: number | null
  minQty?: number
  maxQty?: number
  packageSize?: number
}

export type CatalogProduct = {
  id: string
  name: string
  category: string
  description?: string
  price?: number | null
  tiers?: ProductTier[]
  unit?: string
  tierPricing?: "unit" | "package"
}

export const PRODUCT_CATEGORIES = [
  "Stickers & Decals",
  "Sports Products",
  "Temporary Tattoos",
  "Labels",
  "Accessories",
  "Bundles",
  "Mahjong",
  "Custom Design Services",
  "Shipping & Fees",
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const catalogProducts: CatalogProduct[] = [
  {
    id: "sticker-sheet",
    name: "Sticker Sheet",
    category: "Stickers & Decals",
    price: 8,
  },
  {
    id: "premium-vinyl-small",
    name: "Premium Vinyl Stickers — Small (2 inch)",
    category: "Stickers & Decals",
    price: 3,
    unit: "each",
  },
  {
    id: "premium-vinyl-medium",
    name: "Premium Vinyl Stickers — Medium (3 inch)",
    category: "Stickers & Decals",
    price: 5,
    unit: "each",
  },
  {
    id: "premium-vinyl-large",
    name: "Premium Vinyl Stickers — Large (4 inch)",
    category: "Stickers & Decals",
    price: 7,
    unit: "each",
  },
  {
    id: "premium-vinyl-xlarge",
    name: "Premium Vinyl Stickers — X Large (5 inch +)",
    category: "Stickers & Decals",
    price: null,
  },
  {
    id: "premium-vinyl-bulk",
    name: "Premium Vinyl Stickers — Bulk (up to 4 inches)",
    category: "Stickers & Decals",
    tierPricing: "unit",
    tiers: [
      { label: "25–49", price: 2.75, minQty: 25, maxQty: 49 },
      { label: "50–99", price: 2.5, minQty: 50, maxQty: 99 },
      { label: "100–249", price: 2.25, minQty: 100, maxQty: 249 },
      { label: "250+", price: null, minQty: 250 },
    ],
    unit: "each",
  },
  {
    id: "vinyl-decal-small",
    name: "Vinyl Decals — Small (up to 3 inches)",
    category: "Stickers & Decals",
    price: 5,
    unit: "each",
  },
  {
    id: "vinyl-decal-medium",
    name: "Vinyl Decals — Medium (up to 6 inches)",
    category: "Stickers & Decals",
    price: 7,
    unit: "each",
  },
  {
    id: "vinyl-decal-large",
    name: "Vinyl Decals — Large (up to 9 inches)",
    category: "Stickers & Decals",
    price: 12,
    unit: "each",
  },
  {
    id: "vinyl-decal-xlarge",
    name: "Vinyl Decals — X Large (10 inch +)",
    category: "Stickers & Decals",
    price: null,
  },
  {
    id: "vinyl-decal-extra-color",
    name: "Vinyl Decals — Additional Color / Layer",
    category: "Stickers & Decals",
    price: 3,
    unit: "each",
  },
  {
    id: "sports-decal-kit",
    name: "Sports Decal Kits — Individual",
    category: "Sports Products",
    price: 15,
  },
  {
    id: "sports-helmet-sticker",
    name: "Sports — Custom Helmet Sticker",
    category: "Sports Products",
    price: 5,
    unit: "each",
  },
  {
    id: "sports-trading-pin",
    name: "Sports — Trading Bundle w/ Acrylic Pin",
    category: "Sports Products",
    price: 10,
  },
  {
    id: "sports-trading-button",
    name: "Sports — Trading Bundle w/ Button",
    category: "Sports Products",
    price: 10,
  },
  {
    id: "temp-tattoos-12",
    name: "Temporary Tattoos (12 count)",
    category: "Temporary Tattoos",
    price: 12,
  },
  {
    id: "temp-tattoos-glow",
    name: "Temporary Tattoos — Glow in the Dark (12 ct)",
    category: "Temporary Tattoos",
    price: 15,
  },
  {
    id: "temp-tattoos-bulk",
    name: "Temporary Tattoos — Bulk",
    category: "Temporary Tattoos",
    tierPricing: "unit",
    tiers: [
      { label: "25 count", price: 1.5, minQty: 25, maxQty: 49 },
      { label: "50 count", price: 1.25, minQty: 50, maxQty: 99 },
      { label: "100 count", price: 1, minQty: 100 },
    ],
    unit: "each",
  },
  {
    id: "chapstick-labels",
    name: "Chapstick Labels (100 count)",
    category: "Labels",
    price: 20,
  },
  {
    id: "thermal-labels-2in",
    name: "Thermal Labels — 2 inch",
    category: "Labels",
    tierPricing: "package",
    tiers: [
      { label: "100 count", price: 20, packageSize: 100, minQty: 100, maxQty: 100 },
      { label: "250 count", price: 40, packageSize: 250, minQty: 250, maxQty: 250 },
      { label: "500 count", price: 70, packageSize: 500, minQty: 500, maxQty: 500 },
      { label: "750 count", price: 100, packageSize: 750, minQty: 750, maxQty: 750 },
      { label: "1000 count", price: 130, packageSize: 1000, minQty: 1000, maxQty: 1000 },
    ],
  },
  {
    id: "thermal-labels-3in",
    name: "Thermal Labels — 3 inch",
    category: "Labels",
    tierPricing: "package",
    tiers: [
      { label: "100 count", price: 35, packageSize: 100, minQty: 100, maxQty: 100 },
      { label: "250 count", price: 75, packageSize: 250, minQty: 250, maxQty: 250 },
      { label: "500 count", price: 125, packageSize: 500, minQty: 500, maxQty: 500 },
    ],
  },
  {
    id: "acrylic-pins",
    name: "Custom Acrylic Pins",
    category: "Accessories",
    tierPricing: "unit",
    tiers: [
      { label: "1–9", price: 4, minQty: 1, maxQty: 9 },
      { label: "10–24", price: 3.5, minQty: 10, maxQty: 24 },
      { label: "25–49", price: 3, minQty: 25, maxQty: 49 },
      { label: "50+", price: 2.75, minQty: 50 },
    ],
    unit: "each",
  },
  {
    id: "custom-buttons",
    name: "Custom Buttons",
    category: "Accessories",
    tierPricing: "unit",
    tiers: [
      { label: "1–9", price: 4, minQty: 1, maxQty: 9 },
      { label: "10–24", price: 3.5, minQty: 10, maxQty: 24 },
      { label: "25–49", price: 3, minQty: 25, maxQty: 49 },
      { label: "50+", price: 2.75, minQty: 50 },
    ],
    unit: "each",
  },
  {
    id: "bundle-small",
    name: "Small Bundle — 50 Stickers & 50 Tattoos",
    category: "Bundles",
    price: 150,
  },
  {
    id: "bundle-medium",
    name: "Medium Bundle — 100 Stickers & 100 Tattoos",
    category: "Bundles",
    price: 250,
  },
  {
    id: "bundle-large",
    name: "Large Bundle — 200 Stickers & 200 Tattoos",
    category: "Bundles",
    price: 475,
  },
  {
    id: "mahjong-complete",
    name: "Mahjong Complete Set (Cover and Sleeve)",
    category: "Mahjong",
    price: 18,
    description:
      "Premium waterproof laminated card designed to cover the front of a standard mahjong playing card, plus sleeve.",
  },
  {
    id: "mahjong-cover-card",
    name: "Mahjong Cover Card",
    category: "Mahjong",
    price: 15,
    description:
      "Single, premium waterproof laminated card designed to cover the front of a standard mahjong playing card.",
  },
  {
    id: "mahjong-cover-sticker",
    name: "Mahjong Cover Sticker",
    category: "Mahjong",
    price: 15,
    description:
      "Single, premium waterproof laminated sticker card designed to cover the front of a standard mahjong playing card.",
  },
  {
    id: "custom-order",
    name: "Custom Order",
    category: "Custom Design Services",
    price: null,
    description: "Fully custom design work — pricing based on your project details.",
  },
  {
    id: "services",
    name: "Design Services",
    category: "Custom Design Services",
    price: null,
    description: "Logo cleanup, layout help, and design consultation.",
  },
  {
    id: "rush-fee",
    name: "Rush Fee",
    category: "Shipping & Fees",
    price: null,
    description: "+$10 small orders / +$25 large orders (10+ items).",
  },
  {
    id: "shipping",
    name: "Shipping",
    category: "Shipping & Fees",
    price: null,
    description: "Standard $1.50 · Tracked $4.99 · Bulk/Team $7.99 · Local pickup free.",
  },
]

export const featuredProducts = [
  catalogProducts.find((p) => p.id === "sticker-sheet")!,
  catalogProducts.find((p) => p.id === "sports-helmet-sticker")!,
  catalogProducts.find((p) => p.id === "vinyl-decal-medium")!,
  catalogProducts.find((p) => p.id === "temp-tattoos-12")!,
  catalogProducts.find((p) => p.id === "bundle-medium")!,
  catalogProducts.find((p) => p.id === "mahjong-complete")!,
]

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Quote"
  return `$${price.toFixed(price % 1 === 0 ? 0 : 2)}`
}

export function formatPriceLabel(product: CatalogProduct): string {
  if (product.tiers?.length) {
    const prices = product.tiers.map((t) => t.price).filter((p): p is number => p != null)
    if (prices.length === 0) return "Quote"
    const min = Math.min(...prices)
    return product.unit ? `From ${formatPrice(min)}/${product.unit}` : `From ${formatPrice(min)}`
  }

  if (product.price == null) return "Quote"
  return product.unit ? `${formatPrice(product.price)}/${product.unit}` : formatPrice(product.price)
}

export function getTierForQuantity(product: CatalogProduct, quantity: number): ProductTier | null {
  if (!product.tiers?.length) return null

  const match = product.tiers.find((tier) => {
    const aboveMin = tier.minQty == null || quantity >= tier.minQty
    const belowMax = tier.maxQty == null || quantity <= tier.maxQty
    return aboveMin && belowMax
  })

  return match ?? product.tiers[product.tiers.length - 1] ?? null
}

export function calculateProductSubtotal(product: CatalogProduct, quantity: number): number | null {
  if (product.tiers?.length) {
    const tier = getTierForQuantity(product, quantity)
    if (!tier || tier.price == null) return null

    if (product.tierPricing === "package") {
      const packages = tier.packageSize ? Math.max(1, Math.round(quantity / tier.packageSize)) : 1
      return Math.round(tier.price * packages * 100)
    }

    return Math.round(tier.price * quantity * 100)
  }

  if (product.price == null) return null
  return Math.round(product.price * quantity * 100)
}

export function getProductsByCategory(category: ProductCategory): CatalogProduct[] {
  return catalogProducts.filter((product) => product.category === category)
}

export const mahjongProducts = getProductsByCategory("Mahjong")

export function getProductById(id: string): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.id === id)
}

export function getOrderLink(productId: string): string {
  return `/checkout?product=${encodeURIComponent(productId)}`
}

export function getProductIdFromOrderUrl(
  url: Pick<URL, "searchParams" | "hash" | "search">
): string | null {
  const searchParams =
    url.search && url.search.length > 1
      ? new URLSearchParams(url.search)
      : url.searchParams

  const fromSearch = searchParams.get("product")
  if (fromSearch && getProductById(fromSearch)) {
    return fromSearch
  }

  const hash = url.hash
  const queryStart = hash.indexOf("?")
  if (queryStart === -1) return null

  const fromHash = new URLSearchParams(hash.slice(queryStart + 1)).get("product")
  if (fromHash && getProductById(fromHash)) {
    return fromHash
  }

  return null
}

export const SHIPPING_OPTIONS = [
  { id: "pickup", label: "Local Pickup (Warner Robins) — Free", cents: 0 },
  { id: "standard", label: "Standard Shipping — $1.50", cents: 150 },
  { id: "tracked", label: "Tracked Shipping — $4.99", cents: 499 },
  { id: "bulk", label: "Bulk / Team Shipping — $7.99", cents: 799 },
] as const

export function calculateOrderTotal(
  productId: string,
  quantity: number,
  shippingId: string,
  rush: boolean
): number | null {
  const breakdown = calculateOrderBreakdown(productId, quantity, shippingId, rush)
  return breakdown?.total ?? null
}

export type OrderBreakdown = {
  productSubtotal: number
  shippingCents: number
  rushCents: number
  total: number
  shippingId: string
  shippingLabel: string
}

export function calculateOrderBreakdown(
  productId: string,
  quantity: number,
  shippingId: string,
  rush: boolean
): OrderBreakdown | null {
  const product = getProductById(productId)
  if (!product) return null

  const productSubtotal = calculateProductSubtotal(product, quantity)
  if (productSubtotal == null) return null

  const shipping = SHIPPING_OPTIONS.find((option) => option.id === shippingId) ?? SHIPPING_OPTIONS[0]
  const shippingCents = shipping.cents
  const rushCents = rush ? (quantity >= 10 ? 2500 : 1000) : 0

  return {
    productSubtotal,
    shippingCents,
    rushCents,
    total: productSubtotal + shippingCents + rushCents,
    shippingId: shipping.id,
    shippingLabel: shipping.label,
  }
}
