import { Sparkles, Shield, Truck, Leaf } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "We use only the highest grade vinyl materials for exceptional durability and vibrant colors.",
  },
  {
    icon: Shield,
    title: "5-Year Guarantee",
    description: "Our decals are weather-resistant and come with a 5-year fade and peel guarantee.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Orders ship within 24-48 hours with tracking included on all domestic orders.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Our materials are PVC-free and produced using sustainable manufacturing practices.",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Why Choose Us
          </p>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-medium tracking-tight">
            Crafted with care
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
            Every decal is precision-cut and quality-checked to ensure you receive 
            nothing but the best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto w-14 h-14 bg-card rounded-full flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
