import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { CustomDesign } from "@/components/custom-design"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { DesignAssistant } from "@/components/design-assistant"
import { CheckCircle2, ShieldCheck, Truck, Trophy } from "lucide-react"

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "Waterproof vinyl options" },
    { icon: CheckCircle2, label: "Proof before print" },
    { icon: Trophy, label: "Team packs available" },
    { icon: Truck, label: "Clean packing & shipping" },
  ]
  return <section className="border-y border-white/10 bg-black py-6 text-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:px-8">{items.map((item) => <div key={item.label} className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-zinc-300"><item.icon className="h-4 w-4 shrink-0 text-red-500" />{item.label}</div>)}</div></section>
}

export default function Home() {
  return <main className="min-h-screen bg-black"><Header /><Hero /><TrustStrip /><Testimonials /><Products /><CustomDesign /><About /><Footer /><DesignAssistant /></main>
}
