import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const stripe = getStripe()
    const body = await req.json()

    const total = Number(body.total)

    if (!total || total < 50) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      )
    }

    const productName =
      body.product === "clear-stickers"
        ? "Clear Stickers"
        : "Custom Sticker Sheets"

    const customerEmail = String(body.customerEmail || "").trim()
    const customerName = String(body.customerName || "").trim()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",

            unit_amount: total,

            product_data: {
              name: productName,
              description: body.rush
                ? "Rush custom sticker order"
                : "Custom sticker order",
            },
          },
        },
      ],

      metadata: {
        customerName,
        customerEmail,
        product: body.product || "",
        quantity: String(body.quantity || ""),
        shipping: body.shipping || "",
        rush: String(body.rush || false),
        logoReady: body.logoReady || "",
        notes: body.notes || "",
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin}/cancel`,
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err)

    return NextResponse.json(
      {
        error: err.message || "Checkout failed",
      },
      { status: 500 }
    )
  }
}