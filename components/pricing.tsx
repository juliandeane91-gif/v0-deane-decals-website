"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  catalogProducts,
  formatPrice,
  formatPriceLabel,
  getOrderLink,
  getProductsByCategory,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/products"

export function Pricing() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("Stickers & Decals")
  const products = getProductsByCategory(activeCategory)

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
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeCategory === category
                  ? "border-red-600 bg-red-700 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-red-700/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

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
                  <h3 className="text-lg font-black">{product.name}</h3>
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
                  <Button
                    size="sm"
                    asChild
                    variant="link"
                    className="mt-1 h-auto p-0 font-bold text-zinc-300 hover:text-red-400"
                  >
                    <a href={getOrderLink(product.id)}>Order this</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-900/40 bg-red-950/20 p-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-black">Need something custom?</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Select a product below or describe your project — we&apos;ll send a proof before anything prints.
            </p>
          </div>
          <Button asChild className="rounded-full bg-red-700 font-bold hover:bg-red-600">
            <a href="#custom">
              Start Custom Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Showing {products.length} of {catalogProducts.length} items · Last updated from your QuickBooks catalog
        </p>
      </div>
    </section>
  )
}
