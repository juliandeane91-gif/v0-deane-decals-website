import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustItems = [
  { icon: ShieldCheck, label: "Waterproof vinyl options" },
  { icon: CheckCircle2, label: "Proof before print" },
  { icon: Trophy, label: "Built for teams" },
  { icon: Truck, label: "Shipping available" },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#05070b] px-6 pt-24 text-white lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-red-800/25 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-zinc-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_35%,rgba(185,28,28,0.08))]" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-700/40 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-100"><Trophy className="h-4 w-4 text-red-500" />Custom decals for teams, brands, and everyday use</div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">Custom decals that look sharp and last.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">Deane Decals creates clean, durable stickers for sports teams, small businesses, helmets, tumblers, laptops, cars, and custom brand packs.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="#custom"><Button size="lg" className="rounded-full bg-red-700 px-8 py-6 text-base font-bold text-white shadow-xl shadow-red-950/40 hover:bg-red-600">Start Custom Order<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            <Link href="#shop"><Button variant="outline" size="lg" className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base font-bold text-white hover:bg-white/10 hover:text-white">View Products</Button></Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 text-sm text-zinc-300 md:grid-cols-4">
            {trustItems.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><item.icon className="mb-3 h-5 w-5 text-red-500" /><p className="font-semibold">{item.label}</p></div>)}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-red-800/35 to-white/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5"><img src="/logo.png" alt="Deane Decals logo sticker preview" className="mx-auto aspect-square w-full max-w-md object-contain" /></div>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs font-bold text-white"><span className="rounded-xl bg-black p-3 ring-1 ring-white/10">Black</span><span className="rounded-xl bg-white p-3 text-black">White</span><span className="rounded-xl bg-red-700 p-3">Red</span><span className="rounded-xl bg-zinc-700 p-3">Charcoal</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
