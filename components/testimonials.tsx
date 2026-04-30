import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "The quality exceeded my expectations. My car decal has been through rain, snow, and sun - still looks perfect after 2 years!",
    author: "Sarah M.",
    location: "Colorado",
  },
  {
    quote: "Ordered custom decals for my small business. The process was seamless and the final product was exactly what I envisioned.",
    author: "James K.",
    location: "Texas",
  },
  {
    quote: "Best decals I&apos;ve ever purchased. The colors are vibrant and the application was surprisingly easy.",
    author: "Emily R.",
    location: "California",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-medium tracking-tight">
            What our customers say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative bg-card p-8 rounded-2xl border border-border"
            >
              <Quote className="h-8 w-8 text-accent/30 mb-6" />
              <p className="text-foreground leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
