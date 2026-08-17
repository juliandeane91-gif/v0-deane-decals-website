import {
  catalogProducts,
  formatPriceLabel,
  PRODUCT_CATEGORIES,
  SHIPPING_OPTIONS,
} from "@/lib/products"
import Script from "next/script"

export function OrderFormStatic() {
  return (
    <section className="bg-[#05070b] px-6 py-16 text-white" id="custom">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-black">Build Your Order</h2>
          <p className="text-zinc-400">
            Choose from our full product catalog — stickers, sports decals, tattoos, labels, and more.
          </p>
        </div>

        <form id="deane-order-form" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="customerName"
              required
              placeholder="Your Name *"
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
            <input
              type="email"
              name="customerEmail"
              required
              placeholder="Email Address *"
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-semibold">
              Product / Service
            </label>
            <select
              id="product"
              name="product"
              defaultValue="sticker-sheet"
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <optgroup key={category} label={category}>
                  {catalogProducts
                    .filter((product) => product.category === category)
                    .map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} — {formatPriceLabel(product)}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-semibold">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              min={1}
              defaultValue={1}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="shipping" className="text-sm font-semibold">
              Shipping / Pickup
            </label>
            <select
              id="shipping"
              name="shipping"
              defaultValue="pickup"
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            >
              {SHIPPING_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="logoReady" className="text-sm font-semibold">
              Do you already have artwork/logo files?
            </label>
            <select
              id="logoReady"
              name="logoReady"
              defaultValue="yes"
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            >
              <option value="yes">Yes — ready to upload/send</option>
              <option value="no">No — need design help</option>
            </select>
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-white/10 p-4">
            <input type="checkbox" name="rush" value="yes" />
            <div>
              <div className="font-semibold">Rush Order</div>
              <div className="text-sm text-zinc-400">+$10 small orders / +$25 large orders</div>
            </div>
          </label>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-semibold">
              Order Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Tell us about your order — team name, colors, sizes, deadline, etc."
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          </div>

          <p id="order-form-error" className="hidden text-sm text-red-400" />

          <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
            <div className="text-sm uppercase tracking-wide text-zinc-400">Estimated Subtotal</div>
            <div className="mt-1 text-4xl font-black text-red-500">Calculated at checkout</div>
            <p className="mt-2 text-sm text-zinc-400">
              Sales tax is calculated automatically at checkout based on your billing address.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-6 text-lg font-black text-white hover:bg-red-500 disabled:opacity-60"
          >
            Continue to Checkout
          </button>
        </form>
      </div>
      <Script src="/order-form.js" strategy="afterInteractive" />
    </section>
  )
}
