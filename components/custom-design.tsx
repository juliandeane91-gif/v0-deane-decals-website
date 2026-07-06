"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CustomDesign() {
  const [type, setType] = useState("sticker-sheets")
  const [quantity, setQuantity] = useState(1)
  const [shipping, setShipping] = useState("standard")
  const [rush, setRush] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [logoReady, setLogoReady] = useState("yes")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function calculateAmount() {
    let subtotal = 0

    if (type === "sticker-sheets") {
      if (quantity === 1) subtotal = 800
      else if (quantity === 2) subtotal = 1500
      else if (quantity === 3) subtotal = 2000
      else if (quantity >= 20) subtotal = quantity * 600
      else if (quantity >= 10) subtotal = quantity * 700
      else subtotal = quantity * 800
    }

    if (type === "clear-stickers") {
      if (quantity >= 50) subtotal = quantity * 300
      else if (quantity >= 20) subtotal = quantity * 325
      else subtotal = quantity * 350
    }

    if (shipping === "standard") subtotal += 150
    if (shipping === "tracked") subtotal += 499
    if (shipping === "bulk") subtotal += 799

    if (rush) {
      subtotal += quantity >= 10 ? 2500 : 1000
    }

    return subtotal
  }

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

    setIsSubmitting(true)

    try {
      const total = calculateAmount()

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: type,
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
            Custom stickers, team decals, tumblers, branding, and more.
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
          <label className="text-sm font-semibold">Sticker Type</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-black p-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sticker-sheets">Custom Sticker Sheets</option>
            <option value="clear-stickers">Clear Stickers</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg border border-white/10 bg-black p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Shipping / Pickup</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-black p-3"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value="pickup">Local Pickup (Warner Robins) — Free</option>
            <option value="standard">Standard Shipping — $1.50</option>
            <option value="tracked">Tracked Shipping — $4.99</option>
            <option value="bulk">Bulk / Team Shipping — $7.99</option>
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
          <div className="text-sm uppercase tracking-wide text-zinc-400">Estimated Total</div>
          <div className="mt-1 text-4xl font-black text-red-500">
            ${(calculateAmount() / 100).toFixed(2)}
          </div>
        </div>

        <Button
          onClick={startCheckout}
          disabled={isSubmitting}
          className="w-full bg-red-600 py-6 text-lg font-black text-white hover:bg-red-500 disabled:opacity-60"
        >
          {isSubmitting ? "Redirecting to Checkout..." : "Continue to Checkout"}
        </Button>
      </div>
    </section>
  )
}
