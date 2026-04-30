"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Laptop, Coffee, Sparkles } from "lucide-react"

const categories = [
  {
    name: "Sports Team Stickers",
    description: "Rep your favorite teams!",
    count: "30+ Designs",
    icon: Trophy,
    gradient: "from-primary/20 to-primary/5",
    border: "border-primary/30 hover:border-primary/60",
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  {
    name: "Laptop Decals",
    description: "Make your laptop awesome",
    count: "25+ Designs",
    icon: Laptop,
    gradient: "from-accent/20 to-accent/5",
    border: "border-accent/30 hover:border-accent/60",
    iconBg: "bg-accent",
    iconColor: "text-accent-foreground",
  },
  {
    name: "Tumbler Stickers",
    description: "Waterproof & super cool",
    count: "20+ Designs",
    icon: Coffee,
    gradient: "from-destructive/20 to-destructive/5",
    border: "border-destructive/30 hover:border-destructive/60",
    iconBg: "bg-destructive",
    iconColor: "text-destructive-foreground",
  },
]

const products = [
  {
    id: 1,
    name: "Football Helmet Pack",
    category: "Sports",
    price: "$8.99",
    gradient: "from-primary/15 to-primary/5",
    badge: "Best Seller",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    name: "Basketball Stars Set",
    category: "Sports",
    price: "$7.99",
    gradient: "from-accent/15 to-accent/5",
    badge: null,
    badgeColor: "",
  },
  {
    id: 3,
    name: "Cool Gaming Pack",
    category: "Laptop",
    price: "$9.99",
    gradient: "from-destructive/15 to-destructive/5",
    badge: "New!",
    badgeColor: "bg-destructive text-destructive-foreground",
  },
  {
    id: 4,
    name: "Soccer Champions",
    category: "Sports",
    price: "$6.99",
    gradient: "from-chart-4/15 to-chart-4/5",
    badge: null,
    badgeColor: "",
  },
  {
    id: 5,
    name: "Baseball All-Stars",
    category: "Sports",
    price: "$7.99",
    gradient: "from-chart-5/15 to-chart-5/5",
    badge: null,
    badgeColor: "",
  },
  {
    id: 6,
    name: "Tumbler Party Pack",
    category: "Tumbler",
    price: "$12.99",
    gradient: "from-primary/15 to-accent/5",
    badge: "Popular",
    badgeColor: "bg-accent text-accent-foreground",
  },
]

export function Products() {
  return (
    <section id="shop" className="py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/15 to-primary/15 border-2 border-accent/25 rounded-full px-5 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-accent">Awesome Collection</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Shop Our <span className="text-primary">Stickers!</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out all our awesome designs - perfect for your stuff!
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className={`bg-gradient-to-br ${category.gradient} ${category.border} border-2 cursor-pointer group overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-8 flex flex-col items-center text-center h-56">
                <div className={`w-16 h-16 rounded-2xl ${category.iconBg} shadow-lg flex items-center justify-center mb-4`}>
                  <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  {category.description}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Products */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold">
            Featured Designs
          </h3>
          <Button variant="link" className="text-primary p-0 h-auto font-bold">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className={`aspect-square bg-gradient-to-br ${product.gradient} rounded-2xl mb-4 overflow-hidden flex items-center justify-center relative border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}>
                {product.badge && (
                  <span className={`absolute top-2 right-2 ${product.badgeColor} text-xs font-bold px-2 py-1 rounded-full shadow-md`}>
                    {product.badge}
                  </span>
                )}
                <div className="w-3/4 h-3/4 bg-card rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="font-[family-name:var(--font-display)] text-4xl text-primary/40 font-bold">D</span>
                </div>
              </div>
              <p className="text-xs text-primary font-bold uppercase tracking-wide">
                {product.category}
              </p>
              <h4 className="mt-1 font-semibold group-hover:text-primary transition-colors text-sm">
                {product.name}
              </h4>
              <p className="mt-1 font-[family-name:var(--font-display)] font-bold text-accent">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
