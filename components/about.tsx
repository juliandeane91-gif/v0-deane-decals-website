import { Heart, Star, Users, Palette } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-destructive/15 to-accent/15 border-2 border-destructive/25 rounded-full px-5 py-2 mb-6">
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              <span className="text-sm font-bold text-destructive">Our Story</span>
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
              <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-primary">7 & 9</p>
                <p className="text-sm text-muted-foreground font-medium">Years Old</p>
              </div>
              <div className="bg-gradient-to-br from-accent/15 to-accent/5 rounded-2xl p-4 border-2 border-accent/20 hover:border-accent/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground font-medium">Kid-Powered</p>
              </div>
            </div>
          </div>

          {/* Features Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-6 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                <Star className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Super Quality</h3>
              <p className="text-sm text-muted-foreground">
                Our stickers are waterproof and won&apos;t fade or peel!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-accent/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-accent/25">
                <Palette className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Cool Designs</h3>
              <p className="text-sm text-muted-foreground">
                We make designs that kids actually want!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-destructive/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-destructive to-destructive/80 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-destructive/25">
                <Heart className="w-6 h-6 text-destructive-foreground fill-destructive-foreground" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Every order is packed with care by our family!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border-2 border-chart-4/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-chart-4 to-chart-4/80 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-chart-4/25">
                <Users className="w-6 h-6 text-foreground" />
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
