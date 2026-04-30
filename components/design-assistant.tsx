"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Sparkles, Send, X, MessageCircle, Loader2 } from "lucide-react"

export function DesignAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const suggestedPrompts = [
    "I need a sticker for my basketball team!",
    "Help me design a laptop decal",
    "What tumbler stickers do you have?",
  ]

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.6_0.22_250)] to-[oklch(0.5_0.22_280)] px-5 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl ${isOpen ? "hidden" : ""}`}
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-display font-semibold">Design Helper</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border-2 border-[oklch(0.6_0.22_250)]/20 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[oklch(0.6_0.22_250)] to-[oklch(0.5_0.22_280)] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold">Design Assistant</h3>
                <p className="text-xs text-white/80">Let&apos;s create something awesome!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.6_0.22_250)]/10 to-[oklch(0.7_0.2_40)]/10">
                  <MessageCircle className="h-8 w-8 text-[oklch(0.6_0.22_250)]" />
                </div>
                <h4 className="mb-2 font-display text-lg font-bold text-foreground">
                  Hey there!
                </h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  I&apos;m here to help you design the perfect sticker or decal. What are you looking for?
                </p>
                <div className="flex flex-col gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        sendMessage({ text: prompt })
                      }}
                      className="rounded-full border border-[oklch(0.6_0.22_250)]/30 bg-[oklch(0.6_0.22_250)]/5 px-4 py-2 text-sm text-foreground transition-all hover:border-[oklch(0.6_0.22_250)] hover:bg-[oklch(0.6_0.22_250)]/10"
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
                        message.role === "user"
                          ? "bg-gradient-to-r from-[oklch(0.6_0.22_250)] to-[oklch(0.5_0.22_280)] text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <p key={index} className="text-sm whitespace-pre-wrap">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-[oklch(0.6_0.22_250)]" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your dream sticker..."
                className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.6_0.22_250)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.6_0.22_250)]/20"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-[oklch(0.6_0.22_250)] to-[oklch(0.5_0.22_280)] hover:opacity-90"
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
