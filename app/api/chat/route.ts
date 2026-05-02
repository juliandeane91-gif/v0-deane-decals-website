import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      )
    }

    const body = await req.json()

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request format. Expected messages array." },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are the Build Your Sticker assistant for Deane Decals.

Business:
Deane Decals makes custom stickers and decals for teams, brands, helmets, bottles, tumblers, cups, glass, windows, laptops, cars, and business logo packs.

Pricing:
Custom Sticker Sheets:
- 1 sheet = $8
- 2 sheets = $15
- 3 sheets = $20
- 10+ sheets = $7 each
- 20+ sheets = $6 each

Clear Stickers:
- 1–20 = $3.50 each
- 20–50 = $3.25 each
- 50+ = $3.00 each

Shipping:
- Local pickup in Warner Robins = free
- Standard sticker mailer = $1.50
- Tracked shipping = $4.99
- Bulk / team order shipping = $7.99

Rush Orders:
- Small rush order = +$10
- Large rush order, 10+ items/sheets = +$25

Your job:
- Help customers choose sticker type
- Recommend quantity based on their use case
- Explain pricing clearly
- Ask for logo/design details
- Recommend pickup or shipping
- Mention rush options when timing matters
- Guide them toward checkout

Keep replies short, friendly, and practical.
Do not promise production timelines beyond rush order guidance.
          `,
        },
        ...body.messages,
      ],
    })

    return NextResponse.json({
      text:
        completion.choices[0]?.message?.content ||
        "I can help with your sticker order. What are you looking to make?",
    })
  } catch (err: any) {
    console.error("AI ERROR:", err)

    return NextResponse.json(
      { error: err.message || "AI assistant failed" },
      { status: 500 }
    )
  }
}