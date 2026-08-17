"use client"

import dynamic from "next/dynamic"

const Products = dynamic(() => import("@/components/products").then((m) => m.Products), {
  loading: () => <section className="bg-zinc-950 py-20 text-center text-zinc-400">Loading products…</section>,
})

const Pricing = dynamic(() => import("@/components/pricing").then((m) => m.Pricing), {
  loading: () => <section className="bg-[#05070b] py-20 text-center text-zinc-400">Loading pricing…</section>,
})

const CustomDesign = dynamic(() => import("@/components/custom-design").then((m) => m.CustomDesign), {
  loading: () => <section className="bg-[#05070b] py-20 text-center text-zinc-400">Loading order form…</section>,
})

const DesignAssistant = dynamic(
  () => import("@/components/design-assistant").then((m) => m.DesignAssistant),
  { ssr: false }
)

export function OrderSections() {
  return (
    <>
      <Products />
      <Pricing />
      <CustomDesign />
      <DesignAssistant />
    </>
  )
}
