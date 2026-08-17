import { ArrowRight } from "lucide-react"
import {
  catalogProducts,
  formatPrice,
  formatPriceLabel,
  getOrderLink,
  getProductsByCategory,
  PRODUCT_CATEGORIES,
} from "@/lib/products"

function categoryAnchor(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#05070b] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Pricing</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Products &amp; services
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-300">
            Full pricing from our current catalog. Bulk and tiered items adjust automatically by quantity at checkout.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <a
              key={category}
              href={`#pricing-${categoryAnchor(category)}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-700/50 hover:text-white"
            >
              {category}
            </a>
          ))}
        </div>

        <div className="space-y-10">
          {PRODUCT_CATEGORIES.map((category) => {
            const products = getProductsByCategory(category)

            return (
              <div key={category} id={`pricing-${categoryAnchor(category)}`} className="scroll-mt-28">
                <h3 className="mb-4 text-2xl font-black text-red-400">{category}</h3>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="hidden grid-cols-[1.4fr_1fr_0.8fr] gap-4 border-b border-white/10 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 md:grid">
                    <span>Product / Service</span>
                    <span>Details</span>
                    <span className="text-right">Price</span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="grid gap-3 px-6 py-5 md:grid-cols-[1.4fr_1fr_0.8fr] md:items-start md:gap-4"
                      >
                        <div>
                          <h4 className="text-lg font-black">{product.name}</h4>
                          {product.description ? (
                            <p className="mt-2 text-sm leading-6 text-zinc-400">{product.description}</p>
                          ) : null}
                        </div>

                        <div className="text-sm text-zinc-400">
                          {product.tiers?.length ? (
                            <ul className="space-y-1">
                              {product.tiers.map((tier) => (
                                <li key={tier.label}>
                                  <span className="font-semibold text-zinc-200">{tier.label}:</span>{" "}
                                  {tier.price == null
                                    ? "Quote"
                                    : product.tierPricing === "package"
                                      ? formatPrice(tier.price)
                                      : product.unit
                                        ? `${formatPrice(tier.price)}/${product.unit}`
                                        : formatPrice(tier.price)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span>{product.unit ? `Per ${product.unit}` : "Fixed price"}</span>
                          )}
                        </div>

                        <div className="md:text-right">
                          <p className="text-xl font-black text-red-400">{formatPriceLabel(product)}</p>
                          <a
                            href={getOrderLink(product.id)}
                            className="mt-1 inline-block text-sm font-bold text-zinc-300 hover:text-red-400"
                          >
                            Order this
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-900/40 bg-red-950/20 p-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-black">Need something custom?</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Select a product below or describe your project — we&apos;ll send a proof before anything prints.
            </p>
          </div>
          <a
            href="/checkout"
            className="inline-flex items-center rounded-full bg-red-700 px-6 py-3 font-bold text-white hover:bg-red-600"
          >
            Start Custom Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {catalogProducts.length} items · Last updated from your QuickBooks catalog
        </p>
      </div>
    </section>
  )
}
