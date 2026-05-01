import { ArrowRight, CheckCircle, Palette, Truck, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  { icon: Upload, number: "1", title: "Send the idea", description: "Upload a logo, send inspiration, or describe what you need." },
  { icon: Palette, number: "2", title: "Get a proof", description: "We prepare a clean design proof before anything is printed." },
  { icon: CheckCircle, number: "3", title: "Approve it", description: "Review the design, request changes, and approve the final version." },
  { icon: Truck, number: "4", title: "Print & ship", description: "Your order gets packed cleanly and shipped when ready." },
]

export function CustomDesign() {
  return (
    <section id="custom" className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10"><div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-red-800/20 blur-3xl" /><div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" /></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center"><p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Custom Orders</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Custom orders made simple.</h2><p className="mt-6 text-lg leading-8 text-zinc-300">Whether you need team decals, business stickers, names, numbers, or a full custom pack, we keep the process clear from design to delivery.</p></div>
        <div id="process" className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step) => <div key={step.number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-red-700/60 hover:bg-white/[0.07]"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 shadow-lg shadow-red-950/30"><step.icon className="h-7 w-7 text-white" /></div><p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">Step {step.number}</p><h3 className="mt-2 text-xl font-black">{step.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p></div>)}</div>
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-red-900/40 via-zinc-950 to-black p-8 text-center shadow-2xl md:p-12"><div className="mx-auto max-w-2xl"><p className="text-2xl font-black md:text-3xl">Need a quote for a team or business order?</p><p className="mt-4 text-zinc-300">Send the logo, quantity, size, and deadline. We’ll help build the right order.</p><Button size="lg" className="mt-8 rounded-full bg-red-700 px-10 py-6 text-base font-bold text-white shadow-xl shadow-red-950/40 hover:bg-red-600">Start Your Custom Order<ArrowRight className="ml-2 h-5 w-5" /></Button></div></div>
      </div>
    </section>
  )
}
