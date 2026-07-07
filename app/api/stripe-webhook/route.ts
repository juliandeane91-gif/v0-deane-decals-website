import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getOrderFromAddress, getOrderNotificationEmail } from "@/lib/email"
import { getResend } from "@/lib/resend"
import { getStripe } from "@/lib/stripe"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook verification failed"
    console.error("STRIPE WEBHOOK ERROR:", message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}

    const orderTotal = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : "Unknown"

    const customerName = meta.customerName || "Not provided"
    const customerEmail =
      meta.customerEmail || session.customer_details?.email || session.customer_email || "Not provided"

    try {
      const resend = getResend()
      await resend.emails.send({
        from: getOrderFromAddress(),
        to: getOrderNotificationEmail(),
        replyTo: customerEmail.includes("@") ? customerEmail : undefined,
        subject: `New Deane Decals Order - ${orderTotal}`,
        html: `
          <h2>New Deane Decals Order</h2>
          <p><strong>Total:</strong> ${escapeHtml(orderTotal)}</p>
          <p><strong>Customer Name:</strong> ${escapeHtml(customerName)}</p>
          <p><strong>Customer Email:</strong> ${escapeHtml(customerEmail)}</p>
          <p><strong>Product:</strong> ${escapeHtml(meta.product || "Not provided")}</p>
          <p><strong>Quantity:</strong> ${escapeHtml(meta.quantity || "Not provided")}</p>
          <p><strong>Shipping:</strong> ${escapeHtml(meta.shipping || "Not provided")}</p>
          <p><strong>Rush:</strong> ${escapeHtml(meta.rush || "false")}</p>
          <p><strong>Logo Ready:</strong> ${escapeHtml(meta.logoReady || "Not provided")}</p>
          <p><strong>Notes:</strong></p>
          <p>${escapeHtml(meta.notes || "None")}</p>
          <hr />
          <p>Check Stripe for payment details.</p>
        `,
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send order email"
      console.error("ORDER EMAIL ERROR:", message)
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
