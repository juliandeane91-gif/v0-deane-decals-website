import Link from "next/link"
import { Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  shop: [{ name: "Team Decals", href: "#shop" }, { name: "Helmet Stickers", href: "#shop" }, { name: "Tumbler Stickers", href: "#shop" }, { name: "Custom Orders", href: "#custom" }],
  help: [{ name: "Shipping Info", href: "#custom" }, { name: "Start an Order", href: "#custom" }, { name: "Contact", href: "#contact" }],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-b border-white/10 py-14"><div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"><div><h3 className="flex items-center gap-3 text-2xl font-black md:text-3xl"><Mail className="h-6 w-6 text-red-500" />Stay Updated</h3><p className="mt-2 text-zinc-400">Get updates on new designs, order openings, and special offers.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Input type="email" placeholder="Your email address" className="rounded-full border-white/10 bg-white/10 px-6 text-white placeholder:text-zinc-500" /><Button className="rounded-full bg-red-700 px-6 font-bold text-white hover:bg-red-600">Subscribe</Button></div></div></div>
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4"><div className="col-span-2 md:col-span-1"><Link href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5"><img src="/logo.png" alt="Deane Decals logo" className="h-full w-full object-contain" /></div><span className="text-xl font-black">Deane <span className="text-red-600">Decals</span></span></Link><p className="mt-4 text-sm leading-6 text-zinc-400">Custom stickers and decals for teams, small businesses, and everyday use.</p><div className="mt-6 flex gap-4"><Link href="#" className="text-zinc-500 transition-colors hover:text-red-500"><Instagram className="h-5 w-5" /><span className="sr-only">Instagram</span></Link></div></div><div><h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Shop</h4><ul className="space-y-3">{footerLinks.shop.map((link) => <li key={link.name}><Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">{link.name}</Link></li>)}</ul></div><div><h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Help</h4><ul className="space-y-3">{footerLinks.help.map((link) => <li key={link.name}><Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">{link.name}</Link></li>)}</ul></div><div><h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Contact</h4><p className="text-sm leading-6 text-zinc-400">Ready to start an order? Send your logo, quantity, size, and deadline.</p></div></div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 md:flex-row"><p className="text-sm text-zinc-500">Made by the Deane family.</p><p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} Deane Decals. All rights reserved.</p></div>
      </div>
    </footer>
  )
}
