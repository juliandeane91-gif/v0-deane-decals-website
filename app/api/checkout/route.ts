import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

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
        customerName: body.customerName || "",
        customerEmail: body.customerEmail || "",
        product: body.product || "",
        quantity: String(body.quantity || ""),
        shipping: body.shipping || "",
        rush: String(body.rush || false),
        logoReady: body.logoReady || "",
        notes: body.notes || "",
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
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