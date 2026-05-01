import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { CustomDesign } from "@/components/custom-design"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { DesignAssistant } from "@/components/design-assistant"

function TrustStrip() {
  const trustItems = [
    "Waterproof vinyl options",
    "Proof before print",
    "Team packs available",
    "Fast local-style service",
  ]

  return (
    <section className="border-y border-white/10 bg-[#080b12] px-6 py-5 text-white">
      <div className="mx-auto grid max-w-7xl gap-3 text-center text-sm font-semibold text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-sm"
          >
            <span className="mr-2 text-red-500">✓</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionIntro() {
  return (
    <section className="bg-[#05070b] px-6 py-10 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
          Deane Decals
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Custom stickers for teams, brands, bottles, helmets, windows, and more.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          Start with an idea, upload your logo, approve the proof, and get clean decals made with a bold black, white, red, and charcoal brand style.
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <Header />
      <Hero />
      <TrustStrip />
      <SectionIntro />
      <DesignAssistant />
      <Testimonials />
      <Products />
      <CustomDesign />
      <About />
      <Footer />
    </main>
  )
}
