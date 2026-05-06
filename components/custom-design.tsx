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

  function calculateAmount() {
    let subtotal = 0

    // Sticker Sheets
    if (type === "sticker-sheets") {
      if (quantity === 1) subtotal = 800
      else if (quantity === 2) subtotal = 1500
      else if (quantity === 3) subtotal = 2000
      else if (quantity >= 20) subtotal = quantity * 600
      else if (quantity >= 10) subtotal = quantity * 700
      else subtotal = quantity * 800
    }

    // Clear Stickers
    if (type === "clear-stickers") {
      if (quantity >= 50) subtotal = quantity * 300
      else if (quantity >= 20) subtotal = quantity * 325
      else subtotal = quantity * 350
    }

    // Shipping
    if (shipping === "standard") subtotal += 150
    if (shipping === "tracked") subtotal += 499
    if (shipping === "bulk") subtotal += 799

    // Rush
    if (rush) {
      subtotal += quantity >= 10 ? 2500 : 1000
    }

    return subtotal
  }

  async function startCheckout() {
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
        customerName: name,
        customerEmail: email,
        logoReady,
        notes,
      }),
    })

    const data = await res.json()

    if (!data.url) {
      alert("Checkout failed — no Stripe URL returned")
      return
    }

    window.location.href = data.url
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

        {/* Customer Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-black p-3"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-black p-3"
          />
        </div>

        {/* Product Type */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Sticker Type</label>

          <select
            className="w-full rounded-lg bg-black p-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sticker-sheets">Custom Sticker Sheets</option>
            <option value="clear-stickers">Clear Stickers</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg bg-black p-3"
          />
        </div>

        {/* Shipping */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Shipping / Pickup</label>

          <select
            className="w-full rounded-lg bg-black p-3"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value="pickup">Local Pickup (Warner Robins) — Free</option>
            <option value="standard">Standard Shipping — $1.50</option>
            <option value="tracked">Tracked Shipping — $4.99</option>
            <option value="bulk">Bulk / Team Shipping — $7.99</option>
          </select>
        </div>

        {/* Logo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Do you already have artwork/logo files?</label>

          <select
            className="w-full rounded-lg bg-black p-3"
            value={logoReady}
            onChange={(e) => setLogoReady(e.target.value)}
          >
            <option value="yes">Yes — ready to upload/send</option>
            <option value="no">No — need design help</option>
          </select>
        </div>

        {/* Rush */}
        <label className="flex items-center gap-2 rounded-lg border border-white/10 p-4">
          <input
            type="checkbox"
            checked={rush}
            onChange={() => setRush(!rush)}
          />

          <div>
            <div className="font-semibold">Rush Order</div>
            <div className="text-sm text-zinc-400">
              +$10 small orders / +$25 large orders
            </div>
          </div>
        </label>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Order Notes</label>

          <textarea
            rows={4}
            placeholder="Tell us about your order..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg bg-black p-3"
          />
        </div>

        {/* Total */}
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <div className="text-sm uppercase tracking-wide text-zinc-400">
            Estimated Total
          </div>

          <div className="mt-1 text-4xl font-black text-red-500">
            ${(calculateAmount() / 100).toFixed(2)}
          </div>
        </div>

        {/* Checkout */}
        <Button
          onClick={startCheckout}
          className="w-full bg-red-600 py-6 text-lg font-black text-white hover:bg-red-500"
        >
          Continue to Checkout
        </Button>

      </div>
    </section>
  )
}