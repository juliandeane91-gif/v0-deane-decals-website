import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Products } from "@/components/products"
import { Pricing } from "@/components/pricing"
import { CustomDesign } from "@/components/custom-design"

export const metadata: Metadata = {
  title: "Shop & Order | Deane Decals",
  description:
    "Browse stickers, sports decals, tattoos, labels, and custom products. Build your order with live pricing and checkout.",
  openGraph: {
    title: "Shop & Order | Deane Decals",
    description: "Browse the full Deane Decals catalog and build your custom order.",
    url: "https://www.deanedecals.com/order",
    siteName: "Deane Decals",
    locale: "en_US",
    type: "website",
  },
}

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <Header />
      <section className="border-b border-white/10 bg-[#080b12] px-6 pb-10 pt-28 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Shop</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Browse products, pricing, and build your order.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Pick a product, choose quantity and shipping, then continue to secure checkout.
          </p>
        </div>
      </section>
      <Products />
      <Pricing />
      <CustomDesign />
      <Footer />
    </main>
  )
}
