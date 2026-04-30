import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Zap, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Fun background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-accent/20 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-destructive/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-chart-4/20 rounded-full blur-2xl animate-pulse delay-700" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Fun badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 rounded-full px-4 py-2 mb-8">
          <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
          <span className="text-sm font-semibold text-primary">Made by Kids, Loved by Everyone!</span>
          <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-tight">
          <span className="text-primary">Super Cool</span>
          <br />
          <span className="text-accent">Stickers</span>
          <span className="text-foreground"> & </span>
          <span className="text-destructive">Decals!</span>
        </h1>
        
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty font-medium">
          Awesome sports team stickers, laptop decals, and tumbler stickers! 
          Created by two brothers (ages 7 & 9) who love sports and making cool stuff.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#shop">
            <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/30">
              Shop Stickers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#custom">
            <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg font-bold">
              Custom Orders
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg">
            <div className="w-12 h-12 mx-auto bg-chart-4/20 rounded-full flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 text-chart-4" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-primary">500+</p>
            <p className="mt-1 text-sm text-muted-foreground font-medium">Happy Customers</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg">
            <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-accent">5 Star</p>
            <p className="mt-1 text-sm text-muted-foreground font-medium">Reviews</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg">
            <div className="w-12 h-12 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-destructive" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-destructive">Fast</p>
            <p className="mt-1 text-sm text-muted-foreground font-medium">Shipping</p>
          </div>
        </div>
      </div>
    </section>
  )
}
