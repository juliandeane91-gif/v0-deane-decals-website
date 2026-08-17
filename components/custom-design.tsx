"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  calculateOrderTotal,
  catalogProducts,
  formatPriceLabel,
  getProductById,
  getProductIdFromOrderUrl,
  PRODUCT_CATEGORIES,
  SHIPPING_OPTIONS,
} from "@/lib/products"

export function CustomDesign() {
  const [productId, setProductId] = useState("sticker-sheet")
  const [quantity, setQuantity] = useState(1)
  const [shipping, setShipping] = useState("pickup")
  const [rush, setRush] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [logoReady, setLogoReady] = useState("yes")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProduct = getProductById(productId)
  const total = calculateOrderTotal(productId, quantity, shipping, rush)
  const requiresQuote = total == null

  useEffect(() => {
    function applyProductFromUrl() {
      const requestedProduct = getProductIdFromOrderUrl(window.location)
      if (requestedProduct) {
        setProductId(requestedProduct)
        window.requestAnimationFrame(() => {
          document.getElementById("custom")?.scrollIntoView({ behavior: "smooth" })
        })
      }
    }

    applyProductFromUrl()
    window.addEventListener("hashchange", applyProductFromUrl)
    return () => window.removeEventListener("hashchange", applyProductFromUrl)
  }, [])

  useEffect(() => {
    const product = getProductById(productId)
    if (product?.tierPricing === "package" && product.tiers?.[0]?.minQty) {
      setQuantity(product.tiers[0].minQty)
    } else {
      setQuantity(1)
    }
  }, [productId])

  function validateForm() {
    const nextErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      nextErrors.name = "Please enter your name."
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function startCheckout() {
    if (!validateForm()) {
      return
    }

    if (requiresQuote) {
      window.location.href = `mailto:hello@deanedecals.com?subject=${encodeURIComponent(
        `Quote request: ${selectedProduct?.name ?? "Custom order"}`
      )}&body=${encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\nProduct: ${selectedProduct?.name ?? productId}\nQuantity: ${quantity}\nShipping: ${shipping}\nRush: ${rush ? "Yes" : "No"}\nArtwork ready: ${logoReady}\n\nNotes:\n${notes.trim()}`
      )}`
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productId,
          quantity,
          shipping,
          rush,
          total,
          customerName: name.trim(),
          customerEmail: email.trim(),
          logoReady,
          notes,
        }),
      })

      const data = await res.json()

      if (!data.url) {
        alert(data.error || "Checkout failed — no Stripe URL returned")
        return
      }

      window.location.href = data.url
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#05070b] px-6 py-16 text-white" id="custom">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-black">Build Your Order</h2>
          <p className="text-zinc-400">
            Choose from our full product catalog — stickers, sports decals, tattoos, labels, and more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <p className="mt-2 text-sm text-red-400">{errors.name}</p> : null}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="mt-2 text-sm text-red-400">{errors.email}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Product / Service</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-black p-3"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
          {selectedProduct?.description ? (
            <p className="text-sm leading-6 text-zinc-400">{selectedProduct.description}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">
            {selectedProduct?.tierPricing === "package" ? "Package Size" : "Quantity"}
          </label>
          {selectedProduct?.tierPricing === "package" && selectedProduct.tiers?.length ? (
            <select
              className="w-full rounded-lg border border-white/10 bg-black p-3"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {selectedProduct.tiers.map((tier) => (
                <option key={tier.label} value={tier.minQty ?? 1}>
                  {tier.label} — {tier.price == null ? "Quote" : formatPriceLabel({ ...selectedProduct, price: tier.price, tiers: undefined })}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-lg border border-white/10 bg-black p-3"
            />
          )}
          {selectedProduct?.tiers?.length && selectedProduct.tierPricing !== "package" ? (
            <p className="text-sm text-zinc-400">
              Tier pricing applies automatically based on quantity.
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Shipping / Pickup</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-black p-3"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            {SHIPPING_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Do you already have artwork/logo files?</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-black p-3"
            value={logoReady}
            onChange={(e) => setLogoReady(e.target.value)}
          >
            <option value="yes">Yes — ready to upload/send</option>
            <option value="no">No — need design help</option>
          </select>
        </div>

        <label className="flex items-center gap-2 rounded-lg border border-white/10 p-4">
          <input type="checkbox" checked={rush} onChange={() => setRush(!rush)} />
          <div>
            <div className="font-semibold">Rush Order</div>
            <div className="text-sm text-zinc-400">+$10 small orders / +$25 large orders</div>
          </div>
        </label>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Order Notes</label>
          <textarea
            rows={4}
            placeholder="Tell us about your order — team name, colors, sizes, deadline, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black p-3"
          />
        </div>

        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <div className="text-sm uppercase tracking-wide text-zinc-400">Estimated Subtotal</div>
          <div className="mt-1 text-4xl font-black text-red-500">
            {requiresQuote ? "Quote required" : `$${(total / 100).toFixed(2)}`}
          </div>
          {requiresQuote ? (
            <p className="mt-2 text-sm text-zinc-400">
              This item needs a custom quote. Submitting will open an email to hello@deanedecals.com with your order details.
            </p>
          ) : (
            <p className="mt-2 text-sm text-zinc-400">
              Sales tax is calculated automatically at checkout based on your billing address
              {shipping !== "pickup" ? " and shipping address" : ""}.
            </p>
          )}
        </div>

        <Button
          onClick={startCheckout}
          disabled={isSubmitting}
          className="w-full bg-red-600 py-6 text-lg font-black text-white hover:bg-red-500 disabled:opacity-60"
        >
          {isSubmitting
            ? "Redirecting to Checkout..."
            : requiresQuote
              ? "Request Quote by Email"
              : "Continue to Checkout"}
        </Button>
      </div>
    </section>
  )
}
