"use client"

import { useState } from "react"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Mahjong", href: "/mahjong" },
  { name: "Shop", href: "/buy" },
  { name: "Pricing", href: "/buy#pricing" },
  { name: "Custom Orders", href: "/buy#custom" },
  { name: "How It Works", href: "/#process" },
  { name: "FAQ", href: "/#faq" },
  { name: "About", href: "/#about" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
            <img src="/logo.png" alt="logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-xl font-black text-white">
            Deane <span className="text-red-600">Decals</span>
          </span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm text-zinc-300 hover:text-red-500">
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden rounded-full bg-red-700 px-5 font-bold text-white hover:bg-red-600 sm:flex">
            <a href="/buy#custom">Start Custom Order</a>
          </Button>

          <Button variant="ghost" size="icon" className="relative text-white">
            <ShoppingBag className="h-5 w-5" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-black text-white">
              <div className="flex flex-col gap-6 pt-8">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </a>
                ))}

                <Button asChild className="mt-4 w-full bg-red-700 font-bold">
                  <a href="/buy#custom" onClick={() => setIsOpen(false)}>
                    Start Custom Order
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
