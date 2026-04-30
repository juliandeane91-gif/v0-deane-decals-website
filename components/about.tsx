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
              Meet <span className="text-primary">Kai</span> & <span className="text-accent">Jaylen</span>!
            </h2>
            <div className="mt-8 space-y-4 text-lg text-muted-foreground">
              <p>
                Hey there! We&apos;re <strong className="text-foreground">Kai (9)</strong> and <strong className="text-foreground">Jaylen (7)</strong>, and we LOVE making stickers!
              </p>
              <p>
                It all started when we wanted cool decals for our football helmets and baseball gear. 
                We couldn&apos;t find exactly what we were looking for, so we decided to design our own!
              </p>
              <p>
                Our friends saw our awesome stickers and wanted some too. Then their teams wanted custom designs. 
                Before we knew it, we were making stickers for sports teams all over town and even local businesses!
              </p>
              <p>
                Now Deane Decals is our way of sharing our creativity with everyone who loves 
                sports, cool designs, and standing out from the crowd!
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary">Kai, 9</p>
                <p className="text-sm text-muted-foreground font-medium">Lead Designer</p>
              </div>
              <div className="bg-gradient-to-br from-accent/15 to-accent/5 rounded-2xl p-4 border-2 border-accent/20 hover:border-accent/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-accent">Jaylen, 7</p>
                <p className="text-sm text-muted-foreground font-medium">Creative Director</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-destructive/15 to-destructive/5 rounded-2xl p-4 border-2 border-destructive/20 hover:border-destructive/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-destructive">100%</p>
                <p className="text-sm text-muted-foreground font-medium">Kid-Powered</p>
              </div>
              <div className="bg-gradient-to-br from-chart-4/15 to-chart-4/5 rounded-2xl p-4 border-2 border-chart-4/20 hover:border-chart-4/40 transition-colors">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-chart-4">500+</p>
                <p className="text-sm text-muted-foreground font-medium">Happy Customers</p>
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
