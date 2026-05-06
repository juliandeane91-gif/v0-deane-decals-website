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
          content:
            "You are the Build Your Sticker assistant for Deane Decals. Help customers choose sticker types, quantities, pricing, shipping, pickup in Warner Robins, and rush options. Keep replies short and practical.",
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