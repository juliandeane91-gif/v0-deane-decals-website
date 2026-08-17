import { getStripe } from "@/lib/stripe"

export type OrderSummary = {
  id: string
  created: string
  total: string
  customerName: string
  customerEmail: string
  product: string
  quantity: string
  shipping: string
  rush: string
  logoReady: string
  notes: string
}

export async function fetchRecentOrders(limit = 8): Promise<OrderSummary[]> {
  try {
    const stripe = getStripe()
    const sessions = await stripe.checkout.sessions.list({
      limit,
      status: "complete",
      expand: ["data.line_items"],
    })

    return sessions.data.map((session) => {
      const meta = session.metadata ?? {}
      const total = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : "Unknown"

      return {
        id: session.id,
        created: session.created
          ? new Date(session.created * 1000).toLocaleString("en-US", {
              timeZone: "America/New_York",
            })
          : "Unknown",
        total,
        customerName: meta.customerName || session.customer_details?.name || "Not provided",
        customerEmail:
          meta.customerEmail ||
          session.customer_details?.email ||
          session.customer_email ||
          "Not provided",
        product: meta.productName || meta.product || "Not provided",
        quantity: meta.quantity || "1",
        shipping: meta.shipping || "Not provided",
        rush: meta.rush === "true" ? "Yes" : "No",
        logoReady: meta.logoReady || "Not provided",
        notes: meta.notes || "None",
      }
    })
  } catch (err) {
    console.error("ORDER FETCH ERROR:", err)
    return []
  }
}

export function formatOrdersForPrompt(orders: OrderSummary[]): string {
  if (orders.length === 0) {
    return "No completed checkout sessions found in Stripe."
  }

  return orders
    .map(
      (order, index) =>
        `${index + 1}. ${order.created} — ${order.total}
   Customer: ${order.customerName} <${order.customerEmail}>
   Product: ${order.product} × ${order.quantity}
   Shipping: ${order.shipping} | Rush: ${order.rush} | Artwork ready: ${order.logoReady}
   Notes: ${order.notes}
   Session: ${order.id}`
    )
    .join("\n\n")
}
