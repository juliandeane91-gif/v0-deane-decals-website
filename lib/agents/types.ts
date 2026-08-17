export const AGENT_IDS = [
  "business-manager",
  "sales",
  "marketing",
  "order",
  "design",
] as const

export type AgentId = (typeof AGENT_IDS)[number]

export type AgentMode = "customer" | "internal"

export type ChatRole = "user" | "assistant" | "system"

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type AgentMeta = {
  id: AgentId
  name: string
  description: string
  audience: "customer" | "internal" | "both"
}

export const AGENT_DIRECTORY: Record<AgentId, AgentMeta> = {
  "business-manager": {
    id: "business-manager",
    name: "Business Manager",
    description: "Routes requests to the right specialist agent.",
    audience: "internal",
  },
  sales: {
    id: "sales",
    name: "Sales Agent",
    description: "Quotes customers, recommends sizes, upsells bundles.",
    audience: "both",
  },
  marketing: {
    id: "marketing",
    name: "Marketing Agent",
    description: "Creates posts, content ideas, and promotions.",
    audience: "internal",
  },
  order: {
    id: "order",
    name: "Order Agent",
    description: "Watches orders, tracks status, drafts customer updates.",
    audience: "internal",
  },
  design: {
    id: "design",
    name: "Design Agent",
    description: "Creates concepts, checks artwork, prepares production info.",
    audience: "both",
  },
}

export type AgentResponse = {
  text: string
  agent: AgentId
  routedFrom?: AgentId
}
