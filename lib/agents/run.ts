import OpenAI from "openai"
import { createDesignVisual, wantsImageGeneration } from "@/lib/agents/design-image"
import { getAgentSystemPrompt } from "@/lib/agents/prompts"
import { fetchRecentOrders, formatOrdersForPrompt } from "@/lib/agents/orders"
import { routeMessage } from "@/lib/agents/router"
import type { AgentId, AgentMode, AgentResponse, ChatMessage } from "@/lib/agents/types"
import type { MockupProduct } from "@/lib/agents/design-image"

type RunAgentOptions = {
  messages: ChatMessage[]
  mode: AgentMode
  agent?: AgentId
  apiKey: string
  logoBase64?: string
  productType?: MockupProduct
  generateImage?: boolean
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

  const shouldCreateImage =
    agent === "design" &&
    (options.generateImage || options.logoBase64 || wantsImageGeneration(lastUser.content))

  if (shouldCreateImage) {
    try {
      const visual = await createDesignVisual(openai, {
        userRequest: lastUser.content,
        productType: options.productType,
        logoBase64: options.logoBase64,
      })

      const imageNote =
        visual.mode === "mockup"
          ? "Here's a mockup with your uploaded logo on the selected product. This is a concept for approval — we'll refine colors, sizing, and cut lines in your official proof before print."
          : "Here's a concept mockup based on your description. This is for visualization only — we'll refine the final art in your proof before anything prints."

      return {
        agent,
        routedFrom: options.agent === "business-manager" ? "business-manager" : undefined,
        text: `${text}\n\n${imageNote}`,
        imageUrl: visual.imageUrl,
        imageMode: visual.mode,
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Image generation failed"
      console.error("DESIGN IMAGE ERROR:", message)
      return {
        agent,
        routedFrom: options.agent === "business-manager" ? "business-manager" : undefined,
        text: `${text}\n\n(I couldn't generate a mockup image right now: ${message}. I can still help with design notes and file requirements.)`,
      }
    }
  }

  return {
    agent,
    routedFrom: options.agent === "business-manager" ? "business-manager" : undefined,
    text,
  }
}
