"use client"

import { useEffect, useState } from "react"
import {
  Bot,
  Megaphone,
  Package,
  Palette,
  Sparkles,
  Workflow,
} from "lucide-react"
import { AgentChat } from "@/components/agent-chat"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { AGENT_DIRECTORY, type AgentId } from "@/lib/agents/types"

const internalAgents: { id: AgentId; icon: typeof Bot }[] = [
  { id: "business-manager", icon: Workflow },
  { id: "sales", icon: Bot },
  { id: "marketing", icon: Megaphone },
  { id: "order", icon: Package },
  { id: "design", icon: Palette },
]

const promptsByAgent: Record<AgentId, string[]> = {
  "business-manager": [
    "We need a Mahjong promo and want to check recent orders.",
    "Help me plan this week's social content and any open orders.",
  ],
  sales: [
    "Quote 3 Mahjong complete sets with local pickup.",
    "A baseball team needs 24 helmet stickers — what do you recommend?",
  ],
  marketing: [
    "Write an Instagram post for our Mahjong splash page.",
    "Suggest 5 promo ideas for back-to-school sports decals.",
  ],
  order: [
    "Summarize recent orders and flag anything missing artwork.",
    "Draft a pickup-ready email for a customer in Warner Robins.",
  ],
  design: [
    "What file types do we need for a team logo sticker?",
    "Review production notes for a 3-inch vinyl helmet decal.",
  ],
}

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentId>("business-manager")
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    fetch("/api/agents/config")
      .then((res) => res.json())
      .then((data: { authRequired?: boolean }) => {
        if (!data.authRequired) {
          setAccessToken("")
        }
      })
      .finally(() => setCheckingAuth(false))
  }, [])

  async function unlock(event: React.FormEvent) {
    event.preventDefault()
    setAuthError("")

    const res = await fetch("/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({
        mode: "internal",
        agent: "sales",
        messages: [{ role: "user", content: "ping" }],
      }),
    })

    if (res.status === 401) {
      setAuthError("Incorrect access token.")
      return
    }

    if (!res.ok) {
      setAuthError("Could not verify access. Check your token and OpenAI key.")
      return
    }

    setAccessToken(password)
  }

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#05070b] text-white">
        <Header />
        <section className="flex min-h-[70vh] items-center justify-center px-6 py-24 text-zinc-400">
          Loading agent hub...
        </section>
        <Footer />
      </main>
    )
  }

  if (accessToken === null) {
    return (
      <main className="min-h-screen bg-[#05070b] text-white">
        <Header />
        <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700">
              <Sparkles className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-black">Deane Decals Agents</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Internal hub for Sales, Marketing, Order, Design, and Business Manager agents.
            </p>
            <form onSubmit={unlock} className="mt-8 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Access token (if required)"
                className="w-full rounded-lg border border-white/10 bg-black p-3 text-sm"
              />
              {authError ? <p className="text-sm text-red-400">{authError}</p> : null}
              <Button type="submit" className="w-full rounded-full bg-red-700 font-bold hover:bg-red-600">
                Enter Agent Hub
              </Button>
            </form>
            <p className="mt-4 text-xs text-zinc-500">
              Leave blank and enter if no token is configured. Set AGENTS_ACCESS_TOKEN in Vercel to lock this page.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const active = AGENT_DIRECTORY[selectedAgent]

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <Header />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Internal</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Business Agent Hub</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Your team of AI agents — route automatically with Business Manager or talk to each specialist directly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-3">
            {internalAgents.map(({ id, icon: Icon }) => {
              const agent = AGENT_DIRECTORY[id]
              const isActive = selectedAgent === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedAgent(id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-red-600 bg-red-950/30"
                      : "border-white/10 bg-white/[0.03] hover:border-red-700/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-700/20">
                      <Icon className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-black">{agent.name}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">{agent.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </aside>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Active agent</p>
              <h2 className="mt-2 text-2xl font-black">{active.name}</h2>
              <p className="mt-2 text-sm text-zinc-400">{active.description}</p>
            </div>

            <AgentChat
              key={selectedAgent}
              mode="internal"
              selectedAgent={selectedAgent}
              accessToken={accessToken || undefined}
              emptyTitle={`Talk to ${active.name}`}
              emptyDescription={
                selectedAgent === "business-manager"
                  ? "Describe what you need — the Business Manager will route to Sales, Marketing, Order, or Design."
                  : active.description
              }
              suggestedPrompts={promptsByAgent[selectedAgent]}
              placeholder={`Message ${active.name}...`}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
