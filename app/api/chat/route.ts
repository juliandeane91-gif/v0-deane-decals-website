import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      )
    }

    const openai = new OpenAI({ apiKey })
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
You are the AI sales assistant for Deane Decals.

Your goals:
- Help customers choose the correct sticker type.
- Recommend sizing.
- Recommend quantities.
- Calculate pricing.
- Recommend shipping or local pickup.
- Guide users toward checkout.
- Collect customer order details naturally.

Business info:

PRODUCTS:

1. Custom Sticker Sheets
- 1 sheet = $8
- 2 sheets = $15
- 3 sheets = $20
- 10+ sheets = $7 each
- 20+ sheets = $6 each
- Each sheet contains approximately 4–6 stickers depending on size.

2. Clear Stickers
- Premium look.
- Best for tumblers, glass, cups, windows, and branding.
- 1–20 = $3.50 each
- 20–50 = $3.25 each
- 50+ = $3 each

3. Rush Orders
- Small rush order = +$10
- Larger rush order = +$25

SHIPPING:
- Warner Robins pickup = free
- Standard mailer shipping = $1.50
- Tracked shipping = $4.99
- Bulk/team order shipping = $7.99

RECOMMENDATIONS:
- If the customer mentions baseball, softball, sports, teams, helmets, or team packs, recommend custom sticker sheets first.
- If the customer mentions tumblers, cups, glass, windows, or premium branding, recommend clear stickers first.
- If the customer gives a quantity, calculate the estimated total and mention any bulk savings.
- Ask for size, quantity, logo/artwork status, and pickup/shipping preference.
- If timing matters, mention rush order options.

STYLE:
- Keep replies short, friendly, and practical.
- Be sales-oriented but not pushy.
- Do not overwhelm users.
- Do not use markdown.
- Do not promise exact turnaround times beyond rush order guidance.
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