import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

const WEBHOOK_URL = "https://deanedecals.com/api/stripe-webhook"

export async function POST(req: Request) {
  const setupSecret = process.env.SETUP_SECRET
  const authHeader = req.headers.get("authorization")

  if (!setupSecret || authHeader !== `Bearer ${setupSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const stripe = getStripe()
    const existing = await stripe.webhookEndpoints.list({ limit: 100 })
    let endpoint = existing.data.find((item) => item.url === WEBHOOK_URL)

    if (!endpoint) {
      endpoint = await stripe.webhookEndpoints.create({
        url: WEBHOOK_URL,
        enabled_events: ["checkout.session.completed"],
        description: "Deane Decals order notifications",
      })
    } else if (
      !endpoint.enabled_events.includes("checkout.session.completed") ||
      endpoint.status !== "enabled"
    ) {
      endpoint = await stripe.webhookEndpoints.update(endpoint.id, {
        enabled_events: ["checkout.session.completed"],
        disabled: false,
      })
    }

    let resendDomainStatus = "not_requested"
    let resendRecords: unknown[] = []

    if (process.env.RESEND_API_KEY) {
      const listResponse = await fetch("https://api.resend.com/domains", {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
      })

      if (listResponse.ok) {
        const payload = await listResponse.json()
        let domain = payload.data?.find((item: { name: string }) => item.name === "deanedecals.com")

        if (!domain) {
          const createResponse = await fetch("https://api.resend.com/domains", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "deanedecals.com" }),
          })

          if (createResponse.ok) {
            domain = await createResponse.json()
          }
        }

        if (domain?.id) {
          const detailResponse = await fetch(`https://api.resend.com/domains/${domain.id}`, {
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
          })

          if (detailResponse.ok) {
            const detail = await detailResponse.json()
            resendDomainStatus = detail.status
            resendRecords = detail.records ?? []
          }
        }
      }
    }

    return NextResponse.json({
      webhook: {
        id: endpoint.id,
        url: endpoint.url,
        status: endpoint.status,
        signingSecret: endpoint.secret,
        envSecretMatches: process.env.STRIPE_WEBHOOK_SECRET === endpoint.secret,
      },
      resend: {
        domain: "deanedecals.com",
        status: resendDomainStatus,
        records: resendRecords,
      },
      nextSteps: [
        "Update STRIPE_WEBHOOK_SECRET in Vercel if envSecretMatches is false.",
        "Add the Resend DNS records in Squarespace if Resend status is not verified.",
        "Add RESEND_FROM_EMAIL=Deane Decals <hello@deanedecals.com> in Vercel after Resend verifies the domain.",
        "Remove SETUP_SECRET and delete this setup route after setup is complete.",
      ],
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Setup failed"
    console.error("SETUP ORDERS ERROR:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
