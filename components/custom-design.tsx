import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CustomDesign() {
  return (
    <section id="custom" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/60">
              Custom Design
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance">
              Your vision,
              <br />
              <span className="italic">our craft</span>
            </h2>
            <p className="mt-8 text-lg text-primary-foreground/80 max-w-lg text-pretty">
              Have a unique idea? We bring your custom designs to life with 
              premium materials and precision cutting. Perfect for businesses, 
              events, or personal projects.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-foreground text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium">Upload Your Design</p>
                  <p className="text-primary-foreground/70 text-sm">Send us your artwork or ideas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-foreground text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium">Review & Approve</p>
                  <p className="text-primary-foreground/70 text-sm">We create a digital proof for your approval</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-foreground text-sm font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium">Receive Your Decals</p>
                  <p className="text-primary-foreground/70 text-sm">Fast shipping with tracking included</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6"
            >
              Start Your Custom Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <div className="w-2/3 h-2/3 bg-primary-foreground/5 rounded-xl border border-primary-foreground/20 flex items-center justify-center">
                <span className="font-serif text-8xl text-primary-foreground/20">D</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl">
              <p className="text-sm font-medium">Starting at</p>
              <p className="font-serif text-2xl font-medium">$9.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
