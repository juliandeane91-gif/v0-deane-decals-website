import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const PHONE_DISPLAY = "478-954-1888"
const PHONE_HREF = "tel:+14789541888"
const EMAIL = "hello@deanedecals.com"
const EMAIL_HREF = "mailto:hello@deanedecals.com"
const INSTAGRAM_HANDLE = "deanedecals"
const INSTAGRAM_HREF = "https://www.instagram.com/deanedecals/"
const FACEBOOK_HREF = "https://www.facebook.com/DeaneDecals"

const footerLinks = {
  shop: [
    { name: "Team Decals", href: "#shop" },
    { name: "Helmet Stickers", href: "#shop" },
    { name: "Tumbler Stickers", href: "#shop" },
    { name: "Custom Orders", href: "#custom" },
  ],
  help: [
    { name: "FAQ", href: "#faq" },
    { name: "Shipping Info", href: "#faq" },
    { name: "Start an Order", href: "#custom" },
    { name: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-b border-white/10 py-14">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-black md:text-3xl">
                <Mail className="h-6 w-6 text-red-500" />
                Stay Updated
              </h3>
              <p className="mt-2 text-zinc-400">
                Get updates on new designs, order openings, and special offers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-red-700 px-6 font-bold text-white hover:bg-red-600">
                <a href="mailto:hello@deanedecals.com?subject=Deane%20Decals%20Updates">
                  Email Us for Updates
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent px-6 font-bold text-white hover:bg-white/10">
                <a
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5">
                <img src="/logo.png" alt="Deane Decals logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-black">
                Deane <span className="text-red-600">Decals</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Custom stickers and decals for teams, small businesses, and everyday use.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={FACEBOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-red-500"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-red-500"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-red-500">Contact</h4>
            <p className="text-sm leading-6 text-zinc-400">
              Ready to start an order? Send your logo, quantity, size, and deadline.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-red-500"
            >
              <Phone className="h-4 w-4 text-red-500" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-red-500"
            >
              <Mail className="h-4 w-4 text-red-500" />
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-red-500"
            >
              <Instagram className="h-4 w-4 text-red-500" />
              @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={FACEBOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-red-500"
            >
              <Facebook className="h-4 w-4 text-red-500" />
              Deane Decals on Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 md:flex-row">
          <p className="text-sm text-zinc-500">Made by the Deane family.</p>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Deane Decals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
