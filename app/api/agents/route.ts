import { NextResponse } from "next/server"
import { isAgentAllowed } from "@/lib/agents/router"
import { runAgentConversation } from "@/lib/agents/run"
import type { AgentId, AgentMode, ChatMessage } from "@/lib/agents/types"

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

function checkInternalAccess(req: Request): boolean {
  const token = process.env.AGENTS_ACCESS_TOKEN
  if (!token) return true

  const header = req.headers.get("authorization")
  if (header === `Bearer ${token}`) return true

  return false
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const body = await req.json()
    const mode: AgentMode = body.mode === "internal" ? "internal" : "customer"
    const agent = body.agent as AgentId | undefined
    const messages = body.messages as ChatMessage[] | undefined

    if (mode === "internal" && !checkInternalAccess(req)) {
      return unauthorized()
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Expected a messages array." }, { status: 400 })
    }

    if (agent && !isAgentAllowed(agent, mode)) {
      return NextResponse.json({ error: "Agent not available in this mode." }, { status: 400 })
    }

    const result = await runAgentConversation({
      messages,
      mode,
      agent: agent ?? (mode === "internal" ? "business-manager" : undefined),
      apiKey,
    })

    return NextResponse.json(result)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Agent request failed"
    console.error("AGENTS API ERROR:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
