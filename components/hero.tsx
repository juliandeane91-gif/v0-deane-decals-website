import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-balance leading-tight">
          Premium custom
          <br />
          <span className="italic">decals & stickers</span>
        </h1>
        
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty">
          Transform any surface with our high-quality vinyl decals. 
          Weather-resistant, precision-cut, and designed to last.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#shop">
            <Button size="lg" className="text-base px-8 py-6 rounded-full">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#custom">
            <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full border-foreground/20">
              Custom Design
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-medium">5K+</p>
            <p className="mt-1 text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-medium">100%</p>
            <p className="mt-1 text-sm text-muted-foreground">Satisfaction</p>
          </div>
          <div>
            <p className="font-serif text-3xl md:text-4xl font-medium">5yr</p>
            <p className="mt-1 text-sm text-muted-foreground">Durability</p>
          </div>
        </div>
      </div>
    </section>
  )
}
