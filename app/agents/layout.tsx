import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agent Hub | Deane Decals",
  robots: { index: false, follow: false },
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
