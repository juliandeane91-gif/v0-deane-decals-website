"use client"

import dynamic from "next/dynamic"

const loading = (label: string) => (
  <section className="bg-[#05070b] py-20 text-center text-zinc-400">{label}</section>
)

const Products = dynamic(() => import("@/components/products").then((m) => m.Products), {
  ssr: false,
  loading: () => loading("Loading products…"),
})

const Pricing = dynamic(() => import("@/components/pricing").then((m) => m.Pricing), {
  ssr: false,
  loading: () => loading("Loading pricing…"),
})

const CustomDesign = dynamic(() => import("@/components/custom-design").then((m) => m.CustomDesign), {
  ssr: false,
  loading: () => loading("Loading order form…"),
})

export function OrderSections() {
  return (
    <>
      <Products />
      <Pricing />
      <CustomDesign />
    </>
  )
}
