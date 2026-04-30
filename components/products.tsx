"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Car Decals",
    description: "Premium vinyl for vehicles",
    count: "24 Products",
    color: "bg-secondary",
  },
  {
    name: "Laptop Stickers",
    description: "Express your style",
    count: "36 Products",
    color: "bg-card",
  },
  {
    name: "Wall Decals",
    description: "Transform your space",
    count: "18 Products",
    color: "bg-secondary",
  },
]

const products = [
  {
    id: 1,
    name: "Mountain Adventure",
    category: "Car Decal",
    price: "$12.99",
  },
  {
    id: 2,
    name: "Retro Wave",
    category: "Laptop Sticker",
    price: "$6.99",
  },
  {
    id: 3,
    name: "Botanical Set",
    category: "Wall Decal",
    price: "$24.99",
  },
  {
    id: 4,
    name: "Geometric Pattern",
    category: "Multi-Purpose",
    price: "$8.99",
  },
]

export function Products() {
  return (
    <section id="shop" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Collection
            </p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl font-medium tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Button variant="link" className="text-foreground p-0 h-auto">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className={`${category.color} border-0 cursor-pointer group overflow-hidden`}
            >
              <CardContent className="p-8 flex flex-col h-64">
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {category.count}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-medium group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium group-hover:text-accent transition-colors">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl font-medium mb-8">
            Featured Designs
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-secondary rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-card rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="font-serif text-4xl text-muted-foreground/30">D</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </p>
              <h4 className="mt-1 font-medium group-hover:text-accent transition-colors">
                {product.name}
              </h4>
              <p className="mt-1 text-muted-foreground">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
