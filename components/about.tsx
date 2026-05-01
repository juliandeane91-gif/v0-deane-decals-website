import { Heart, ShieldCheck, Star, Trophy } from "lucide-react"

const highlights = [
  { icon: ShieldCheck, title: "Durable Options", description: "Waterproof and vinyl-style options for everyday use." },
  { icon: Trophy, title: "Team Focused", description: "Great for helmets, gear, water bottles, bags, and team packs." },
  { icon: Star, title: "Clean Designs", description: "Simple, sharp designs that match your logo and colors." },
  { icon: Heart, title: "Family Run", description: "Every order is handled with care and attention to detail." },
]

export function About() {
  return (
    <section id="about" className="bg-zinc-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-700/40 bg-red-950/30 px-5 py-2"><Heart className="h-4 w-4 fill-red-500 text-red-500" /><span className="text-sm font-black text-red-200">Our Story</span></div><h2 className="text-4xl font-black tracking-tight md:text-6xl">A family sticker business with a sports-first edge.</h2><div className="mt-8 space-y-5 text-lg leading-8 text-zinc-300"><p>Deane Decals started with a simple idea: create high-quality decals for teams that actually look good and last.</p><p>What began with custom gear for local sports quickly turned into a way to help teams, small businesses, and families bring their ideas to life.</p><p>The brand is built around bold designs, clean proofs, and custom orders that feel personal from start to finish.</p></div><div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded-2xl border border-white/10 bg-black p-5"><p className="text-2xl font-black text-red-500">Sports</p><p className="mt-1 text-sm text-zinc-400">Teams, helmets, bags, and gear</p></div><div className="rounded-2xl border border-white/10 bg-black p-5"><p className="text-2xl font-black text-red-500">Brands</p><p className="mt-1 text-sm text-zinc-400">Business logos, promos, and packaging</p></div></div></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{highlights.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-black p-6 transition hover:-translate-y-1 hover:border-red-700/60"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-700"><item.icon className="h-6 w-6 text-white" /></div><h3 className="text-lg font-black">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p></div>)}</div></div></div>
    </section>
  )
}
