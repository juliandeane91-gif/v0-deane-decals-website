import { Heart, Star, Users, Palette } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-destructive/10 border-2 border-destructive/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              <span className="text-sm font-semibold text-destructive">Our Story</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Meet the <span className="text-primary">Brothers</span> Behind the Stickers!
            </h2>
            <div className="mt-8 space-y-4 text-lg text-muted-foreground">
              <p>
                Hey there! We&apos;re two brothers, ages 7 and 9, and we LOVE making stickers!
              </p>
              <p>
                It all started when we wanted cool stickers for our water bottles and laptops 
                but couldn&apos;t find exactly what we wanted. So we decided to make our own!
              </p>
              <p>
                Now we&apos;re making stickers for other kids (and adults!) who love sports, 
                gaming, and awesome designs just like we do!
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-4 border-2 border-primary/20">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-primary">7 & 9</p>
                <p className="text-sm text-muted-foreground font-medium">Years Old</p>
              </div>
              <div className="bg-accent/10 rounded-2xl p-4 border-2 border-accent/20">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground font-medium">Kid-Powered</p>
              </div>
            </div>
          </div>

          {/* Features Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Super Quality</h3>
              <p className="text-sm text-muted-foreground">
                Our stickers are waterproof and won&apos;t fade or peel!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Cool Designs</h3>
              <p className="text-sm text-muted-foreground">
                We make designs that kids actually want!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-destructive fill-destructive" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Every order is packed with care by our family!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Happy Fans</h3>
              <p className="text-sm text-muted-foreground">
                500+ customers love their stickers!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
