"use client"

import dynamic from "next/dynamic"

const DesignAssistant = dynamic(
  () => import("@/components/design-assistant").then((mod) => mod.DesignAssistant),
  { ssr: false }
)

const Products = dynamic(
  () => import("@/components/products").then((mod) => mod.Products),
  {
    ssr: false,
    loading: () => (
      <section className="bg-zinc-950 py-24 text-center text-zinc-400">Loading shop…</section>
    ),
  }
)

const Pricing = dynamic(
  () => import("@/components/pricing").then((mod) => mod.Pricing),
  {
    ssr: false,
    loading: () => (
      <section className="bg-[#05070b] py-24 text-center text-zinc-400">Loading pricing…</section>
    ),
  }
)

const CustomDesign = dynamic(
  () => import("@/components/custom-design").then((mod) => mod.CustomDesign),
  {
    ssr: false,
    loading: () => (
      <section className="bg-[#05070b] py-24 text-center text-zinc-400">Loading order form…</section>
    ),
  }
)

export function HomeDeferred() {
  return (
    <>
      <DesignAssistant />
      <Products />
      <Pricing />
      <CustomDesign />
    </>
  )
}
