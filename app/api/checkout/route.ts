import { NextResponse } from "next/server"
import type Stripe from "stripe"
import {
  calculateOrderBreakdown,
  getProductById,
} from "@/lib/products"
import { getStripe } from "@/lib/stripe"

const TAX_CODES = {
  tangibleGoods: "txcd_99999999",
  shipping: "txcd_92010001",
  service: "txcd_11000000",
} as const

function buildLineItems(
  productName: string,
  productDescription: string,
  breakdown: NonNullable<ReturnType<typeof calculateOrderBreakdown>>
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: breakdown.productSubtotal,
        tax_behavior: "exclusive",
        product_data: {
          name: productName,
          description: productDescription,
          tax_code: TAX_CODES.tangibleGoods,
        },
      },
    },
  ]

  if (breakdown.shippingCents > 0) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: breakdown.shippingCents,
        tax_behavior: "exclusive",
        product_data: {
          name: "Shipping",
          description: breakdown.shippingLabel,
          tax_code: TAX_CODES.shipping,
        },
      },
    })
  }

  if (breakdown.rushCents > 0) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: breakdown.rushCents,
        tax_behavior: "exclusive",
        product_data: {
          name: "Rush Order",
          description: "Expedited production",
          tax_code: TAX_CODES.service,
        },
      },
    })
  }

  return items
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe()
    const body = await req.json()

    const productId = String(body.product || "")
    const quantity = Math.max(1, Number(body.quantity) || 1)
    const shippingId = String(body.shipping || "pickup")
    const rush = Boolean(body.rush)
    const clientTotal = Number(body.total)

    const breakdown = calculateOrderBreakdown(productId, quantity, shippingId, rush)
    if (!breakdown || breakdown.total < 50) {
      return NextResponse.json({ error: "Invalid order amount" }, { status: 400 })
    }

    if (clientTotal !== breakdown.total) {
      return NextResponse.json({ error: "Order total mismatch — please refresh and try again" }, { status: 400 })
    }

    const catalogProduct = getProductById(productId)
    const productName = catalogProduct?.name || "Custom Order"
    const productDescription = body.rush ? "Rush custom sticker order" : "Custom sticker order"

    const customerEmail = String(body.customerEmail || "").trim()
    const customerName = String(body.customerName || "").trim()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
      ...(shippingId !== "pickup"
        ? {
            shipping_address_collection: {
              allowed_countries: ["US"],
            },
          }
        : {}),
      line_items: buildLineItems(productName, productDescription, breakdown),
      metadata: {
        customerName,
        customerEmail,
        product: productId,
        productName,
        quantity: String(quantity),
        shipping: shippingId,
        rush: String(rush),
        logoReady: body.logoReady || "",
        notes: body.notes || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin}/cancel`,
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed"
    console.error("CHECKOUT ERROR:", message)

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
