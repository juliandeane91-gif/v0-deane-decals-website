import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomDesign } from "@/components/custom-design"

export const metadata: Metadata = {
  title: "Checkout | Deane Decals",
  description: "Build your custom decal order and continue to secure Stripe checkout.",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <Header />
      <section className="border-b border-white/10 bg-[#080b12] px-6 pb-8 pt-28 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Order</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Build your order</h1>
          <p className="mt-4 text-slate-300">
            <a href="/buy" className="font-semibold text-red-400 hover:text-red-300">
              Browse the full catalog
            </a>{" "}
            or complete the form below to checkout.
          </p>
        </div>
      </section>
      <CustomDesign />
      <Footer />
    </main>
  )
}
