"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Shop", href: "#shop" },
  { name: "Custom Orders", href: "#custom" },
  { name: "How It Works", href: "#process" },
  { name: "About", href: "#about" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-red-950/30">
            <img src="/logo.png" alt="Deane Decals logo" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <span className="block text-xl font-black tracking-tight text-white">Deane <span className="text-red-600">Decals</span></span>
            <span className="hidden text-xs font-medium text-zinc-400 sm:block">Custom stickers for teams & brands</span>
          </div>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => <Link key={item.name} href={item.href} className="text-sm font-semibold text-zinc-300 transition-colors hover:text-red-500">{item.name}</Link>)}
        </div>
        <div className="flex items-center gap-3">
          <Link href="#custom"><Button className="hidden rounded-full bg-red-700 px-5 font-bold text-white hover:bg-red-600 sm:flex">Start Order</Button></Link>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-white">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-[10px] font-bold text-white">0</span>
            <span className="sr-only">Shopping cart</span>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden"><Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white"><Menu className="h-5 w-5" /><span className="sr-only">Open menu</span></Button></SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-zinc-800 bg-black text-white">
              <div className="flex flex-col gap-6 pt-8">
                {navigation.map((item) => <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-zinc-200 transition-colors hover:text-red-500">{item.name}</Link>)}
                <Link href="#custom" onClick={() => setIsOpen(false)}><Button className="mt-4 w-full rounded-full bg-red-700 font-bold text-white hover:bg-red-600">Start Order</Button></Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
