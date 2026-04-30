import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "My son LOVES his football stickers! They look so cool on his water bottle and haven&apos;t peeled off even after going through the dishwasher!",
    author: "Sarah M.",
    role: "Sports Mom",
    stars: 5,
    color: "border-primary/30 bg-primary/5",
  },
  {
    quote: "Best stickers ever! I put them on my laptop and all my friends want to know where I got them. So awesome that kids made these!",
    author: "Jake T.",
    role: "Age 10",
    stars: 5,
    color: "border-accent/30 bg-accent/5",
  },
  {
    quote: "We ordered custom stickers for our little league team and they turned out amazing! Great quality and fast shipping. Highly recommend!",
    author: "Coach Mike",
    role: "Baseball Coach",
    stars: 5,
    color: "border-destructive/30 bg-destructive/5",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight">
            What People Are <span className="text-primary">Saying!</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out what our awesome customers think!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`relative bg-card p-8 rounded-2xl border-2 ${testimonial.color} hover:shadow-lg transition-shadow`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-chart-4 fill-chart-4" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed font-medium">
                {testimonial.quote}
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-[family-name:var(--font-display)] font-bold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
