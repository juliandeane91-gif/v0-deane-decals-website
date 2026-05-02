"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CustomDesign() {
  const [type, setType] = useState("sticker-sheets")
  const [quantity, setQuantity] = useState(1)
  const [shipping, setShipping] = useState("standard")
  const [rush, setRush] = useState(false)

  function calculateAmount() {
    let subtotal = 0

    // STICKER SHEETS
    if (type === "sticker-sheets") {
      if (quantity === 1) subtotal = 800
      else if (quantity === 2) subtotal = 1500
      else if (quantity === 3) subtotal = 2000
      else if (quantity >= 20) subtotal = quantity * 600
      else if (quantity >= 10) subtotal = quantity * 700
      else subtotal = quantity * 800
    }

    // CLEAR STICKERS
    if (type === "clear-stickers") {
      if (quantity >= 50) subtotal = quantity * 300
      else if (quantity >= 20) subtotal = quantity * 325
      else subtotal = quantity * 350
    }

    // SHIPPING
    let shippingCost = 0
    if (shipping === "standard") shippingCost = 150
    if (shipping === "tracked") shippingCost = 499
    if (shipping === "bulk") shippingCost = 799

    // RUSH
    if (rush) {
      shippingCost += quantity >= 10 ? 2500 : 1000
    }

    return subtotal + shippingCost
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
        total,
      }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <section className="bg-[#05070b] px-6 py-16 text-white" id="custom">
      <div className="mx-auto max-w-xl space-y-6">

        <h2 className="text-3xl font-black">Build Your Order</h2>

        {/* PRODUCT TYPE */}
        <select
          className="w-full rounded-lg bg-black p-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="sticker-sheets">Sticker Sheets</option>
          <option value="clear-stickers">Clear Stickers</option>
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded-lg bg-black p-3"
        />

        {/* SHIPPING */}
        <select
          className="w-full rounded-lg bg-black p-3"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        >
          <option value="pickup">Local Pickup (Warner Robins) - Free</option>
          <option value="standard">Standard - $1.50</option>
          <option value="tracked">Tracked - $4.99</option>
          <option value="bulk">Bulk - $7.99</option>
        </select>

        {/* RUSH */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rush}
            onChange={() => setRush(!rush)}
          />
          Rush Order (+$10–$25)
        </label>

        {/* TOTAL */}
        <div className="text-xl font-bold text-red-500">
          Total: ${(calculateAmount() / 100).toFixed(2)}
        </div>

        {/* CHECKOUT */}
        <Button
          onClick={startCheckout}
          className="w-full bg-red-600 text-white font-bold"
        >
          Checkout
        </Button>

      </div>
    </section>
  )
}