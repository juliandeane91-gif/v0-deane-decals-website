import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getResend } from "@/lib/resend"
import { getStripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}

    const orderTotal = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : "Unknown"

    const resend = getResend()
    await resend.emails.send({
      from: "Deane Decals <onboarding@resend.dev>",
      to: process.env.ORDER_NOTIFICATION_EMAIL!,
      subject: `New Deane Decals Order - ${orderTotal}`,
      html: `
        <h2>New Deane Decals Order</h2>
        <p><strong>Total:</strong> ${orderTotal}</p>
        <p><strong>Customer Name:</strong> ${meta.customerName || "Not provided"}</p>
        <p><strong>Customer Email:</strong> ${meta.customerEmail || session.customer_email || "Not provided"}</p>
        <p><strong>Product:</strong> ${meta.product || "Not provided"}</p>
        <p><strong>Quantity:</strong> ${meta.quantity || "Not provided"}</p>
        <p><strong>Shipping:</strong> ${meta.shipping || "Not provided"}</p>
        <p><strong>Rush:</strong> ${meta.rush || "false"}</p>
        <p><strong>Logo Ready:</strong> ${meta.logoReady || "Not provided"}</p>
        <p><strong>Notes:</strong></p>
        <p>${meta.notes || "None"}</p>
        <hr />
        <p>Check Stripe for payment details.</p>
      `,
    })
  }

  return NextResponse.json({ received: true })
}