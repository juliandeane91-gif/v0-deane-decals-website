"use client"

import { ArrowRight, Building2, CupSoda, ShieldCheck, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Team Decals", description: "Custom packs for baseball, football, cheer, school teams, and clubs.", icon: Trophy },
  { name: "Helmet Stickers", description: "Bold decals for helmets, gear, bags, and sports equipment.", icon: ShieldCheck },
  { name: "Tumbler Stickers", description: "Waterproof options for cups, bottles, coolers, and drinkware.", icon: CupSoda },
  { name: "Business Logos", description: "Clean brand stickers for packaging, laptops, windows, and events.", icon: Building2 },
]
const products = [
  { name: "Custom Team Pack", category: "Teams", price: "Quote Based", description: "Bulk sticker packs for players, parents, and coaches." },
  { name: "Helmet Decal Set", category: "Sports", price: "From $8.99", description: "Small decals sized for helmets, bats, bags, and gear." },
  { name: "Business Logo Stickers", category: "Branding", price: "From $24.99", description: "Logo stickers for boxes, bags, laptops, and promos." },
  { name: "Tumbler Decal Bundle", category: "Drinkware", price: "From $12.99", description: "Waterproof decals for cups, bottles, and coolers." },
  { name: "Car / Window Decal", category: "Vinyl", price: "From $9.99", description: "Durable vinyl-style decals for glass and vehicles." },
  { name: "Custom Name Decals", category: "Personalized", price: "From $6.99", description: "Names, numbers, initials, and custom lettering." },
]
export function Products() {
  return <section id="shop" className="bg-zinc-950 py-24 text-white lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Shop</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Decals built around your brand.</h2></div><p className="max-w-xl text-lg leading-8 text-zinc-300">Start with one of our common order types, then customize size, finish, quantity, and design.</p></div><div className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Card key={category.name} className="group border-white/10 bg-white/[0.04] text-white transition hover:-translate-y-1 hover:border-red-700/60 hover:bg-white/[0.07]"><CardContent className="p-6"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 shadow-lg shadow-red-950/30"><category.icon className="h-7 w-7 text-white" /></div><h3 className="text-xl font-black">{category.name}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{category.description}</p></CardContent></Card>)}</div><div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center"><h3 className="text-2xl font-black md:text-3xl">Popular order types</h3><Button variant="link" className="h-auto p-0 font-bold text-red-500 hover:text-red-400">Start a custom quote<ArrowRight className="ml-2 h-4 w-4" /></Button></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <Card key={product.name} className="border-white/10 bg-black text-white transition hover:-translate-y-1 hover:border-red-700/60"><CardContent className="p-6"><div className="mb-5 flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white to-zinc-300 p-5"><div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-black text-5xl font-black text-red-600 shadow-xl">D</div></div><p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">{product.category}</p><h4 className="mt-2 text-xl font-black">{product.name}</h4><p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">{product.description}</p><div className="mt-5 flex items-center justify-between"><p className="font-black text-white">{product.price}</p><Button size="sm" className="rounded-full bg-red-700 text-white hover:bg-red-600">Customize</Button></div></CardContent></Card>)}</div></div></section>
}
