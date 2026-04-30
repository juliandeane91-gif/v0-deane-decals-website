import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Zap, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Fun background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-60 right-20 w-52 h-52 bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-destructive/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-44 h-44 bg-chart-4/25 rounded-full blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Fun badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-accent/15 border-2 border-primary/25 rounded-full px-5 py-2 mb-8">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="text-sm font-bold text-primary">Made by Kids, Loved by Everyone!</span>
          <Star className="w-4 h-4 text-accent fill-accent" />
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-tight">
          <span className="text-primary">Super Cool</span>
          <br />
          <span className="text-accent">Stickers</span>
          <span className="text-foreground"> & </span>
          <span className="text-destructive">Decals!</span>
        </h1>
        
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty font-medium">
          Unique designs for helmet stickers, laptop decals, tumbler decals and so much more! 
          Created by 2 brothers who love sports and have an eye for creativity. Let us help bring your sticker vision to life!
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#shop">
            <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
              Shop Stickers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#custom">
            <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg font-bold hover:scale-105 transition-all">
              Custom Orders
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-4 md:gap-6 max-w-lg mx-auto">
          <div className="bg-card rounded-2xl p-4 md:p-6 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-2 md:mb-3">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold text-primary">500+</p>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground font-medium">Happy Customers</p>
          </div>
          <div className="bg-card rounded-2xl p-4 md:p-6 border-2 border-accent/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-2 md:mb-3">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-accent fill-accent" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold text-accent">5 Star</p>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground font-medium">Reviews</p>
          </div>
          <div className="bg-card rounded-2xl p-4 md:p-6 border-2 border-destructive/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl flex items-center justify-center mb-2 md:mb-3">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold text-destructive">Fast</p>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground font-medium">Shipping</p>
          </div>
        </div>
      </div>
    </section>
  )
}
