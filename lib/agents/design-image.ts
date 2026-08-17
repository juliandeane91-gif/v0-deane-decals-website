import OpenAI from "openai"
import { toFile } from "openai/uploads"

export const MOCKUP_PRODUCTS = {
  mahjong: "standard mahjong playing card with waterproof laminated vinyl cover",
  tumbler: "30oz stainless steel tumbler with a curved vinyl sticker wrap",
  helmet: "youth sports helmet with a bold custom vinyl decal",
  sticker: "die-cut vinyl sticker with clean white border on neutral background",
  "sticker-sheet": "custom sticker sheet with multiple die-cut stickers arranged neatly",
  car: "car rear window with a medium vinyl decal",
  laptop: "laptop lid with a premium vinyl sticker",
} as const

export type MockupProduct = keyof typeof MOCKUP_PRODUCTS

const brandStyle =
  "Deane Decals brand style: bold black, white, red, and charcoal. Clean, sharp, professional print mockup. No watermarks, no text overlays unless part of the design."

export function wantsImageGeneration(text: string): boolean {
  return /mockup|mock up|mock-up|show me|visuali[sz]e|preview|generate.*(image|design|concept)|what would.*look like|create.*(concept|design|logo)|design.*(idea|concept)|make.*(logo|design)/i.test(
    text
  )
}

export function normalizeProductType(value?: string): MockupProduct {
  if (value && value in MOCKUP_PRODUCTS) {
    return value as MockupProduct
  }
  return "sticker"
}

export async function refineImagePrompt(
  openai: OpenAI,
  userRequest: string,
  productType: MockupProduct
): Promise<string> {
  const product = MOCKUP_PRODUCTS[productType]

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You write DALL-E image prompts for Deane Decals product mockups.
Output ONE paragraph prompt only — no quotes, no markdown.
Product context: ${product}.
${brandStyle}
Focus on realistic product photography style mockup suitable for customer approval before print.`,
      },
      {
        role: "user",
        content: userRequest,
      },
    ],
    max_tokens: 300,
  })

  return (
    completion.choices[0]?.message?.content?.trim() ||
    `Professional product mockup: ${product}. ${userRequest}. ${brandStyle}`
  )
}

export async function generateConceptImage(
  openai: OpenAI,
  prompt: string
): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  })

  const b64 = response.data[0]?.b64_json
  if (!b64) {
    throw new Error("Image generation returned no data")
  }

  return `data:image/png;base64,${b64}`
}

export async function generateLogoMockup(
  openai: OpenAI,
  options: {
    logoBase64: string
    productType: MockupProduct
    notes?: string
  }
): Promise<string> {
  const product = MOCKUP_PRODUCTS[options.productType]
  const logoBuffer = Buffer.from(
    options.logoBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  )

  const logoFile = await toFile(logoBuffer, "logo.png", { type: "image/png" })

  const prompt = `Create a realistic product mockup photo placing this logo/design on ${product}.
${options.notes ? `Customer notes: ${options.notes}` : ""}
${brandStyle}
Keep the uploaded logo recognizable. Show the product clearly for customer proof approval.`

  const response = await openai.images.edit({
    model: "dall-e-2",
    image: logoFile,
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  })

  const b64 = response.data[0]?.b64_json
  if (!b64) {
    throw new Error("Logo mockup returned no data")
  }

  return `data:image/png;base64,${b64}`
}

export async function createDesignVisual(
  openai: OpenAI,
  options: {
    userRequest: string
    productType?: MockupProduct
    logoBase64?: string
  }
): Promise<{ imageUrl: string; mode: "mockup" | "concept" }> {
  const productType = normalizeProductType(options.productType)

  if (options.logoBase64) {
    const imageUrl = await generateLogoMockup(openai, {
      logoBase64: options.logoBase64,
      productType,
      notes: options.userRequest,
    })
    return { imageUrl, mode: "mockup" }
  }

  const prompt = await refineImagePrompt(openai, options.userRequest, productType)
  const imageUrl = await generateConceptImage(openai, prompt)
  return { imageUrl, mode: "concept" }
}
