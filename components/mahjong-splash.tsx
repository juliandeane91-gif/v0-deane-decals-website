import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPriceLabel, getOrderLink, mahjongProducts } from "@/lib/products"

const highlights = [
  {
    icon: ShieldCheck,
    title: "Waterproof & laminated",
    description: "Premium finish built to hold up through game nights and travel.",
  },
  {
    icon: Layers,
    title: "Made for standard cards",
    description: "Sized to cover the front of a standard mahjong playing card.",
  },
  {
    icon: Sparkles,
    title: "Proof before print",
    description: "We send a proof so you can approve your design before anything ships.",
  },
]

const productAccents = [
  "from-red-800 via-red-950 to-black",
  "from-zinc-700 via-zinc-900 to-black",
  "from-red-700/80 via-zinc-900 to-black",
]

const featuredProductId = "mahjong-complete"

export function MahjongSplash() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#05070b] px-6 pb-20 pt-32 text-white lg:px-8 lg:pb-28 lg:pt-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-red-800/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-950/40 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(185,28,28,0.12),transparent_45%,rgba(255,255,255,0.04))]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-500">
              Most popular at Deane Decals
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Custom Mahjong card covers &amp; sleeves
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Give your mahjong set a polished, personal look with waterproof laminated covers
              — our best-selling products, ready to order in minutes.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-red-700 px-8 py-6 font-bold hover:bg-red-600">
                <a href={getOrderLink("mahjong-complete")}>
                  Order Complete Set
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 bg-white/5 px-8 py-6 font-bold text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#mahjong-products">Compare options</a>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <item.icon className="mb-4 h-6 w-6 text-red-500" />
                <h2 className="text-lg font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mahjong-products" className="bg-zinc-950 px-6 py-24 text-white lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">Shop Mahjong</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Pick the option that fits your set
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              All three options use premium waterproof lamination. Choose the complete set for
              the cover plus sleeve, or order a cover card or sticker on its own.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {mahjongProducts.map((product, index) => {
              const isFeatured = product.id === featuredProductId
              const accent = productAccents[index % productAccents.length]

              return (
                <Card
                  key={product.id}
                  className={`relative border-white/10 bg-black text-white transition hover:-translate-y-1 ${
                    isFeatured ? "ring-2 ring-red-600/80" : "hover:border-red-700/60"
                  }`}
                >
                  {isFeatured ? (
                    <div className="absolute -top-3 left-6 rounded-full bg-red-700 px-3 py-1 text-xs font-black uppercase tracking-wider">
                      Best seller
                    </div>
                  ) : null}
                  <CardContent className="flex h-full flex-col p-6">
                    <div
                      className={`mb-5 flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-6`}
                    >
                      <Layers className="mb-4 h-12 w-12 text-red-400" />
                      <span className="text-center text-xs font-black uppercase tracking-[0.25em] text-white/80">
                        Mahjong
                      </span>
                    </div>

                    <h3 className="text-2xl font-black">{product.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">
                      {product.description}
                    </p>

                    <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        Waterproof laminated finish
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        Proof sent before printing
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        Pickup in Warner Robins or shipping
                      </li>
                    </ul>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <p className="text-2xl font-black text-red-400">{formatPriceLabel(product)}</p>
                      <Button asChild className="rounded-full bg-red-700 font-bold hover:bg-red-600">
                        <a href={getOrderLink(product.id)}>Order now</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080b12] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Ready to customize your mahjong set?
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Send your design notes at checkout. We&apos;ll follow up with a proof, then print
              and ship — or hold it for free local pickup in Warner Robins.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full bg-red-700 px-8 font-bold hover:bg-red-600">
            <a href={getOrderLink("mahjong-complete")}>
              Start your order
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
