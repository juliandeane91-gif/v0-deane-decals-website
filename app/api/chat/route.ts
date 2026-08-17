import { NextResponse } from "next/server"
import { runAgentConversation } from "@/lib/agents/run"
import type { ChatMessage } from "@/lib/agents/types"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const body = await req.json()

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request format. Expected messages array." },
        { status: 400 }
      )
    }

    const messages: ChatMessage[] = body.messages.map(
      (message: { role: string; content: string }) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.content,
      })
    )

    const result = await runAgentConversation({
      messages,
      mode: "customer",
      apiKey,
    })

    return NextResponse.json({
      text: result.text,
      agent: result.agent,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI assistant failed"
    console.error("AI ERROR:", message)

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
