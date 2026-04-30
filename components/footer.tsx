import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Sparkles, Heart, Mail } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Sports Stickers", href: "#" },
    { name: "Laptop Decals", href: "#" },
    { name: "Tumbler Stickers", href: "#" },
    { name: "Custom Orders", href: "#custom" },
  ],
  help: [
    { name: "FAQ", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-16 border-b border-background/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Mail className="w-6 h-6 text-chart-4" />
                Join the Sticker Squad!
              </h3>
              <p className="mt-2 text-background/70">
                Get updates on new designs, special deals, and cool stuff!
              </p>
            </div>
            <div className="flex gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full px-6"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-bold">
                Deane Decals
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Awesome stickers made by two brothers who love sports and making cool stuff!
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="#" className="text-background/60 hover:text-chart-4 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-sm uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-sm uppercase tracking-wider mb-4">
              Fun Fact
            </h4>
            <p className="text-sm text-background/70 leading-relaxed">
              We&apos;ve shipped stickers to 47 states! Can you help us reach all 50?
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by the Deane Brothers
          </p>
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Deane Decals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
