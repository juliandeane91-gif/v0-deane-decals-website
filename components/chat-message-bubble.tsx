"use client"

import { AGENT_DIRECTORY, type AgentId } from "@/lib/agents/types"

type ChatMessageBubbleProps = {
  role: "user" | "assistant"
  text: string
  agent?: AgentId
  imageUrl?: string
}

export function ChatMessageBubble({ role, text, agent, imageUrl }: ChatMessageBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          role === "user" ? "bg-red-700 text-white" : "bg-zinc-900 text-zinc-100"
        }`}
      >
        {role === "assistant" && agent ? (
          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
            {AGENT_DIRECTORY[agent]?.name ?? agent}
          </p>
        ) : null}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Design mockup"
            className="mb-2 max-h-64 w-full rounded-lg border border-white/10 object-contain bg-black"
          />
        ) : null}
        <p className="whitespace-pre-wrap text-sm">{text}</p>
      </div>
    </div>
  )
}
