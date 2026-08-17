import OpenAI from "openai"
import { getAgentSystemPrompt } from "@/lib/agents/prompts"
import { fetchRecentOrders, formatOrdersForPrompt } from "@/lib/agents/orders"
import { routeMessage } from "@/lib/agents/router"
import type { AgentId, AgentMode, AgentResponse, ChatMessage } from "@/lib/agents/types"

type RunAgentOptions = {
  messages: ChatMessage[]
  mode: AgentMode
  agent?: AgentId
  apiKey: string
}

export async function runAgentConversation(options: RunAgentOptions): Promise<AgentResponse> {
  const { messages, mode, apiKey } = options
  const lastUser = [...messages].reverse().find((m) => m.role === "user")

  if (!lastUser) {
    return {
      agent: "sales",
      text: "How can I help with your Deane Decals order today?",
    }
  }

  let agent: AgentId = options.agent ?? "sales"

  if (!options.agent || options.agent === "business-manager") {
    agent = await routeMessage(lastUser.content, mode, apiKey)
  }

  if (!agent || agent === "business-manager") {
    agent = mode === "customer" ? "sales" : "sales"
  }

  let orderContext: string | undefined
  if (agent === "order") {
    const orders = await fetchRecentOrders()
    orderContext = formatOrdersForPrompt(orders)
  }

  const openai = new OpenAI({ apiKey })
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: getAgentSystemPrompt(agent, orderContext) },
      ...messages.filter((m) => m.role === "user" || m.role === "assistant"),
    ],
  })

  const text =
    completion.choices[0]?.message?.content?.trim() ||
    "I can help with that — could you share a bit more detail?"

  return {
    agent,
    routedFrom: options.agent === "business-manager" ? "business-manager" : undefined,
    text,
  }
}
