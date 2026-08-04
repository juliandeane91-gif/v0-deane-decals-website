import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MahjongSplash } from "@/components/mahjong-splash"

export const metadata: Metadata = {
  title: "Mahjong Card Covers & Sleeves | Deane Decals",
  description:
    "Shop custom mahjong card covers, stickers, and complete cover-and-sleeve sets. Waterproof laminated, proof before print, pickup in Warner Robins or shipping.",
  openGraph: {
    title: "Mahjong Card Covers & Sleeves | Deane Decals",
    description:
      "Our most popular products — custom mahjong covers and sleeves with waterproof lamination and proof before print.",
    url: "https://deanedecals.com/mahjong",
    siteName: "Deane Decals",
    locale: "en_US",
    type: "website",
  },
}

export default function MahjongPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <Header />
      <MahjongSplash />
      <Footer />
    </main>
  )
}
