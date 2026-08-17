"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Send } from "lucide-react"
import { ChatMessageBubble } from "@/components/chat-message-bubble"
import { DesignChatTools, readLogoAsBase64 } from "@/components/design-chat-tools"
import { Button } from "@/components/ui/button"
import type { MockupProduct } from "@/lib/agents/design-image"
import type { AgentId, AgentMode } from "@/lib/agents/types"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  agent?: AgentId
  imageUrl?: string
}

type AgentChatProps = {
  mode: AgentMode
  selectedAgent?: AgentId
  accessToken?: string
  emptyTitle: string
  emptyDescription: string
  suggestedPrompts: string[]
  placeholder: string
  apiPath?: string
  enableDesignTools?: boolean
}

export function AgentChat({
  mode,
  selectedAgent,
  accessToken,
  emptyTitle,
  emptyDescription,
  suggestedPrompts,
  placeholder,
  apiPath = "/api/agents",
  enableDesignTools = false,
}: AgentChatProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<"idle" | "loading">("idle")
  const [productType, setProductType] = useState<MockupProduct>("sticker")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoBase64, setLogoBase64] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === "loading"
  const showDesignTools = enableDesignTools || selectedAgent === "design"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleLogoSelect(file: File | null) {
    if (!file) {
      setLogoPreview(null)
      setLogoBase64(null)
      return
    }

    const dataUrl = await readLogoAsBase64(file)
    setLogoPreview(dataUrl)
    setLogoBase64(dataUrl)
  }

  async function sendMessage(text: string, options?: { generateImage?: boolean }) {
    if (isLoading || !text.trim()) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: text.trim(),
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setStatus("loading")

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }

      const res = await fetch(apiPath, {
        method: "POST",
        headers,
        body: JSON.stringify({
          mode,
          agent: selectedAgent,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
          logoBase64: logoBase64 ?? undefined,
          productType,
          generateImage: options?.generateImage ?? false,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Request failed")
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.text || "No response.",
          agent: data.agent,
          imageUrl: data.imageUrl,
        },
      ])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: message,
        },
      ])
    } finally {
      setStatus("idle")
    }
  }

  async function generateMockup() {
    if (isLoading) return

    const prompt =
      input.trim() ||
      (logoBase64
        ? "Create a product mockup with my uploaded logo"
        : "Create a bold Deane Decals sticker concept mockup")

    setStatus("loading")

    try {
      const res = await fetch("/api/design-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          logoBase64: logoBase64 ?? undefined,
          productType,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Mockup generation failed")
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "user",
          text: prompt,
        },
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.text,
          agent: "design",
          imageUrl: data.imageUrl,
        },
      ])
      setInput("")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Mockup generation failed"
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: message,
          agent: "design",
        },
      ])
    } finally {
      setStatus("idle")
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!input.trim() || isLoading) return
    void sendMessage(input, { generateImage: showDesignTools && wantsMockupLanguage(input) })
    setInput("")
  }

  function wantsMockupLanguage(text: string) {
    return /mockup|show me|visuali[sz]e|preview|what would.*look/i.test(text)
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h4 className="mb-2 text-lg font-black text-white">{emptyTitle}</h4>
            <p className="mb-4 max-w-md text-sm leading-6 text-zinc-400">{emptyDescription}</p>
            <div className="flex max-w-lg flex-col gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt, { generateImage: wantsMockupLanguage(prompt) })}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 transition-all hover:border-red-700/60 hover:bg-red-700/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessageBubble
                key={message.id}
                role={message.role}
                text={message.text}
                agent={message.agent}
                imageUrl={message.imageUrl}
              />
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                  <span className="text-sm text-zinc-400">
                    {showDesignTools ? "Designing..." : "Thinking..."}
                  </span>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {showDesignTools ? (
        <DesignChatTools
          productType={productType}
          onProductTypeChange={setProductType}
          logoPreview={logoPreview}
          onLogoSelect={(file) => void handleLogoSelect(file)}
          onGenerateMockup={() => void generateMockup()}
          isLoading={isLoading}
        />
      ) : null}

      <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 rounded-full bg-red-700 text-white hover:bg-red-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
