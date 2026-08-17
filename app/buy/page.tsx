import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Products } from "@/components/products"
import { Pricing } from "@/components/pricing"

export const metadata: Metadata = {
  title: "Shop & Order | Deane Decals",
  description:
    "Browse stickers, sports decals, tattoos, labels, and custom products. Build your order with live pricing and checkout.",
  openGraph: {
    title: "Shop & Order | Deane Decals",
    description: "Browse the full Deane Decals catalog and build your custom order.",
    url: "https://www.deanedecals.com/buy",
    siteName: "Deane Decals",
    locale: "en_US",
    type: "website",
  },
}

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <SiteHeader />
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
      <section className="border-t border-white/10 bg-[#080b12] px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black">Ready to place your order?</h2>
          <p className="mt-4 text-zinc-300">
            Open the order form to choose your product, quantity, shipping, and checkout securely.
          </p>
          <a
            href="/custom-order"
            className="mt-8 inline-flex items-center rounded-full bg-red-700 px-8 py-4 text-base font-bold text-white hover:bg-red-600"
          >
            Build Your Order
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
