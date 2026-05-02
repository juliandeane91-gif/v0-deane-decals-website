import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const total = Number(body.total)

    if (!total || total < 50) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 })
    }

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
              name: body.product || "Custom Deane Decals Order",
              description: body.description || "Custom sticker/decal order",
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    })

    return NextResponse.json({ url: session.url ?? "" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}