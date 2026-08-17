import {
  ArrowRight,
  Building2,
  Car,
  CupSoda,
  ShieldCheck,
  Tag,
  Trophy,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { featuredProducts, formatPriceLabel, getOrderLink } from "@/lib/products"

const categories = [
  {
    name: "Stickers & Decals",
    description: "Premium vinyl stickers, sticker sheets, and custom vinyl decals in multiple sizes.",
    icon: Tag,
  },
  {
    name: "Sports Products",
    description: "Helmet stickers, decal kits, and trading bundles for teams and athletes.",
    icon: Trophy,
  },
  {
    name: "Temporary Tattoos",
    description: "Standard and glow-in-the-dark tattoos with bulk pricing for events and teams.",
    icon: ShieldCheck,
  },
  {
    name: "Labels & Accessories",
    description: "Thermal labels, chapstick labels, acrylic pins, and custom buttons.",
    icon: Building2,
  },
]

const featuredIcons: Record<string, LucideIcon> = {
  "sticker-sheet": Tag,
  "sports-helmet-sticker": ShieldCheck,
  "vinyl-decal-medium": Car,
  "temp-tattoos-12": CupSoda,
  "bundle-medium": Trophy,
  "mahjong-complete": Tag,
}

const featuredAccents = [
  "from-red-800 via-red-950 to-black",
  "from-zinc-700 via-zinc-900 to-black",
  "from-white/20 via-zinc-800 to-black",
  "from-red-700/80 via-zinc-900 to-black",
  "from-zinc-600 via-zinc-900 to-black",
  "from-red-900/70 via-black to-zinc-950",
]

export function Products() {
  return (
    <section id="shop" className="bg-zinc-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Shop</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Decals built around your brand.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-zinc-300">
            Browse our full product catalog and pricing, then customize size, finish, quantity, and design.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group border-white/10 bg-white/[0.04] text-white transition hover:-translate-y-1 hover:border-red-700/60 hover:bg-white/[0.07]"
            >
              <CardContent className="p-6">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 shadow-lg shadow-red-950/30">
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h3 className="text-2xl font-black md:text-3xl">Popular order types</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#pricing" className="inline-flex h-auto items-center p-0 font-bold text-red-500 hover:text-red-400">
              View full pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="/custom-order" className="inline-flex h-auto items-center p-0 font-bold text-zinc-300 hover:text-red-400">
              Start a custom quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => {
            const Icon = featuredIcons[product.id] ?? Tag
            const accent = featuredAccents[index % featuredAccents.length]

            return (
              <Card
                key={product.id}
                className="border-white/10 bg-black text-white transition hover:-translate-y-1 hover:border-red-700/60"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-5 flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-5`}
                  >
                    <Icon className="mb-4 h-10 w-10 text-red-400" />
                    <span className="text-center text-xs font-black uppercase tracking-[0.2em] text-white/80">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    {product.category}
                  </p>
                  <h4 className="mt-2 text-xl font-black">{product.name}</h4>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">
                    {product.description ?? "Custom order with proof before print."}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-black text-white">{formatPriceLabel(product)}</p>
                    <a
                      href={getOrderLink(product.id)}
                      className="inline-flex items-center rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-600"
                    >
                      Order
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
