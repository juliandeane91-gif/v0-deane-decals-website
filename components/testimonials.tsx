import { Star } from "lucide-react"

const testimonials = [
  { quote: "We ordered decals for our team and the quality was great. The proof process made it easy to get exactly what we wanted.", author: "Local Team Order", role: "Sports Decals" },
  { quote: "Clean design, quick communication, and the stickers looked sharp on bottles and gear.", author: "Custom Sticker Customer", role: "Waterproof Stickers" },
  { quote: "Great option for team packs and personalized decals. Everything looked professional when it arrived.", author: "Baseball Parent", role: "Team Pack" },
]

export function Testimonials() {
  return <section className="bg-black py-24 text-white lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-14 text-center"><p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Trust</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Built for clean orders and happy customers.</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">Simple communication, clean proofs, and decals that match the look you want.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{testimonials.map((testimonial) => <div key={testimonial.author} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-red-700/60 hover:bg-white/[0.07]"><div className="mb-5 flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-red-600 text-red-600" />)}</div><p className="leading-7 text-zinc-200">{testimonial.quote}</p><div className="mt-6 border-t border-white/10 pt-6"><p className="font-black text-white">{testimonial.author}</p><p className="text-sm text-zinc-400">{testimonial.role}</p></div></div>)}</div></div></section>
}
