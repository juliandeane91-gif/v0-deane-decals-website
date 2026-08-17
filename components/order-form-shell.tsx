"use client"

import dynamic from "next/dynamic"

const CustomDesign = dynamic(() => import("@/components/custom-design").then((m) => m.CustomDesign), {
  ssr: false,
  loading: () => (
    <section className="bg-[#05070b] px-6 py-16 text-center text-zinc-400">Loading order form…</section>
  ),
})

export function OrderFormShell() {
  return <CustomDesign />
}
