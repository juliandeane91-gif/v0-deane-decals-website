"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react"
import { AGENT_DIRECTORY, type AgentId } from "@/lib/agents/types"
import { Button } from "@/components/ui/button"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  agent?: AgentId
}

export function DesignAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<"idle" | "loading">("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === "loading"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function sendMessage(text: string) {
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      })

      const data = await res.json()

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.text || data.error || "Sorry, I had trouble responding.",
          agent: data.agent,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Sorry, the assistant is having trouble right now.",
        },
      ])
    } finally {
      setStatus("idle")
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!input.trim() || isLoading) return
    void sendMessage(input)
    setInput("")
  }

  const suggestedPrompts = [
    "I want to order Mahjong card covers.",
    "Help me size a tumbler sticker.",
    "What file do I need for my logo?",
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-red-700 px-5 py-3 text-white shadow-lg shadow-red-950/40 transition-all hover:scale-105 hover:bg-red-600 hover:shadow-xl ${isOpen ? "hidden" : ""}`}
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">Ask Deane Decals</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-700">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Ask Deane Decals</h3>
                <p className="text-xs text-zinc-400">Sales & design help, powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-700/15">
                  <MessageCircle className="h-8 w-8 text-red-500" />
                </div>
                <h4 className="mb-2 text-lg font-black text-white">What are we making?</h4>
                <p className="mb-4 text-sm leading-6 text-zinc-400">
                  Get product recommendations, pricing help, or design guidance — routed to the right specialist automatically.
                </p>
                <div className="flex flex-col gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
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
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        message.role === "user" ? "bg-red-700 text-white" : "bg-zinc-900 text-zinc-100"
                      }`}
                    >
                      {message.role === "assistant" && message.agent ? (
                        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                          {AGENT_DIRECTORY[message.agent]?.name ?? message.agent}
                        </p>
                      ) : null}
                      <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                      <span className="text-sm text-zinc-400">Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about products, pricing, or design..."
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
      )}
    </>
  )
}
