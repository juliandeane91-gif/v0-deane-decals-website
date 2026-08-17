import { NextResponse } from "next/server"
import OpenAI from "openai"
import {
  createDesignVisual,
  normalizeProductType,
  type MockupProduct,
} from "@/lib/agents/design-image"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const body = await req.json()
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : ""
    const logoBase64 = typeof body.logoBase64 === "string" ? body.logoBase64 : undefined
    const productType = normalizeProductType(body.productType as MockupProduct | undefined)

    if (!prompt && !logoBase64) {
      return NextResponse.json(
        { error: "Provide a prompt and/or upload a logo image." },
        { status: 400 }
      )
    }

    const openai = new OpenAI({ apiKey })
    const visual = await createDesignVisual(openai, {
      userRequest: prompt || "Place my logo on the selected product mockup",
      productType,
      logoBase64,
    })

    return NextResponse.json({
      imageUrl: visual.imageUrl,
      mode: visual.mode,
      text:
        visual.mode === "mockup"
          ? "Mockup generated with your logo. We'll refine sizing and colors in your official proof before print."
          : "Concept mockup generated. We'll refine the final art in your proof before print.",
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Image generation failed"
    console.error("DESIGN IMAGE API ERROR:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
