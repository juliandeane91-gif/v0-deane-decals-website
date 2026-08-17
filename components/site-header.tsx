const navigation = [
  { name: "Mahjong", href: "/mahjong" },
  { name: "Shop", href: "/buy" },
  { name: "Pricing", href: "/buy#pricing" },
  { name: "Custom Orders", href: "/custom-order" },
  { name: "How It Works", href: "/#process" },
  { name: "FAQ", href: "/#faq" },
  { name: "About", href: "/#about" },
]

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
            <img src="/icon.svg" alt="Deane Decals logo" className="h-full w-full object-contain" />
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
          <a
            href="/custom-order"
            className="hidden rounded-full bg-red-700 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 sm:inline-flex"
          >
            Start Custom Order
          </a>

          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-lg p-2 text-white [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black p-4 shadow-xl">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm text-zinc-200 hover:text-red-400">
                    {item.name}
                  </a>
                ))}
                <a href="/custom-order" className="rounded-full bg-red-700 px-4 py-2 text-center text-sm font-bold text-white">
                  Start Custom Order
                </a>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}
