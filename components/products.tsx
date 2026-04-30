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
    color: "bg-primary/10 border-primary/30",
    iconColor: "text-primary",
  },
  {
    name: "Laptop Decals",
    description: "Make your laptop awesome",
    count: "25+ Designs",
    icon: Laptop,
    color: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
  },
  {
    name: "Tumbler Stickers",
    description: "Waterproof & super cool",
    count: "20+ Designs",
    icon: Coffee,
    color: "bg-destructive/10 border-destructive/30",
    iconColor: "text-destructive",
  },
]

const products = [
  {
    id: 1,
    name: "Football Helmet Pack",
    category: "Sports",
    price: "$8.99",
    color: "bg-primary/10",
    badge: "Best Seller",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    name: "Basketball Stars Set",
    category: "Sports",
    price: "$7.99",
    color: "bg-chart-4/10",
    badge: null,
    badgeColor: "",
  },
  {
    id: 3,
    name: "Cool Gaming Pack",
    category: "Laptop",
    price: "$9.99",
    color: "bg-accent/10",
    badge: "New!",
    badgeColor: "bg-accent text-accent-foreground",
  },
  {
    id: 4,
    name: "Soccer Champions",
    category: "Sports",
    price: "$6.99",
    color: "bg-destructive/10",
    badge: null,
    badgeColor: "",
  },
  {
    id: 5,
    name: "Baseball All-Stars",
    category: "Sports",
    price: "$7.99",
    color: "bg-chart-5/10",
    badge: null,
    badgeColor: "",
  },
  {
    id: 6,
    name: "Tumbler Party Pack",
    category: "Tumbler",
    price: "$12.99",
    color: "bg-primary/10",
    badge: "Popular",
    badgeColor: "bg-chart-4 text-foreground",
  },
]

export function Products() {
  return (
    <section id="shop" className="py-24 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border-2 border-accent/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Awesome Collection</span>
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
              className={`${category.color} border-2 cursor-pointer group overflow-hidden hover:scale-105 transition-transform duration-300`}
            >
              <CardContent className="p-8 flex flex-col items-center text-center h-56">
                <div className={`w-16 h-16 rounded-2xl bg-card shadow-lg flex items-center justify-center mb-4`}>
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
              <div className={`aspect-square ${product.color} rounded-2xl mb-4 overflow-hidden flex items-center justify-center relative border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:shadow-lg`}>
                {product.badge && (
                  <span className={`absolute top-2 right-2 ${product.badgeColor} text-xs font-bold px-2 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}
                <div className="w-3/4 h-3/4 bg-card rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="font-[family-name:var(--font-display)] text-4xl text-primary/30 font-bold">D</span>
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
