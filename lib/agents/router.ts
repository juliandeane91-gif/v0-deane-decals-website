import OpenAI from "openai"
import { getRouterSystemPrompt } from "@/lib/agents/prompts"
import type { AgentId, AgentMode } from "@/lib/agents/types"

const CUSTOMER_AGENTS: AgentId[] = ["sales", "design"]
const INTERNAL_AGENTS: AgentId[] = ["sales", "marketing", "order", "design"]

function normalizeAgent(value: string): AgentId | null {
  const cleaned = value.trim().toLowerCase()
  if (cleaned === "sales" || cleaned === "marketing" || cleaned === "order" || cleaned === "design") {
    return cleaned
  }
  return null
}

function keywordRoute(message: string, mode: AgentMode): AgentId {
  const text = message.toLowerCase()

  if (mode === "internal") {
    if (/instagram|facebook|post|caption|hashtag|promo|marketing|content idea/.test(text)) {
      return "marketing"
    }
    if (/order status|fulfillment|shipped|pickup ready|proof ready|recent order|stripe|customer update/.test(text)) {
      return "order"
    }
  }

  if (/logo|artwork|file|dpi|vector|design concept|production|proof|png|svg/.test(text)) {
    return "design"
  }

  return "sales"
}

export async function routeMessage(
  message: string,
  mode: AgentMode,
  apiKey: string
): Promise<AgentId> {
  const allowed = mode === "customer" ? CUSTOMER_AGENTS : INTERNAL_AGENTS
  const fallback = keywordRoute(message, mode)

  try {
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      max_tokens: 10,
      messages: [
        { role: "system", content: getRouterSystemPrompt(mode) },
        { role: "user", content: message },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ""
    const routed = normalizeAgent(raw)

    if (routed && allowed.includes(routed)) {
      return routed
    }
  } catch (err) {
    console.error("AGENT ROUTER ERROR:", err)
  }

  return allowed.includes(fallback) ? fallback : "sales"
}

export function isAgentAllowed(agent: AgentId, mode: AgentMode): boolean {
  if (agent === "business-manager") return mode === "internal"
  const allowed = mode === "customer" ? CUSTOMER_AGENTS : INTERNAL_AGENTS
  return allowed.includes(agent)
}
