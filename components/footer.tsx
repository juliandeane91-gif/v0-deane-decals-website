import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Products", href: "#" },
    { name: "Car Decals", href: "#" },
    { name: "Laptop Stickers", href: "#" },
    { name: "Wall Decals", href: "#" },
    { name: "Custom Orders", href: "#custom" },
  ],
  support: [
    { name: "FAQ", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-16 border-b border-primary-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium">
                Stay in the loop
              </h3>
              <p className="mt-2 text-primary-foreground/70">
                Subscribe for exclusive designs, promotions, and inspiration.
              </p>
            </div>
            <div className="flex gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-full px-6"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-serif text-xl font-semibold">
              Deane Decals
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              Premium custom decals and stickers, crafted with care since 2020.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Deane Decals. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
