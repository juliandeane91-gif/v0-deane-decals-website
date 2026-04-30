import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, CheckCircle, Truck, Palette } from "lucide-react"

const steps = [
  {
    icon: Upload,
    number: "1",
    title: "Send Us Your Idea",
    description: "Tell us what you want or send a picture!",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Palette,
    number: "2",
    title: "We Make It Awesome",
    description: "Our team creates your custom design",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: CheckCircle,
    number: "3",
    title: "You Approve It",
    description: "Check it out and say if you love it",
    color: "bg-chart-4 text-foreground",
  },
  {
    icon: Truck,
    number: "4",
    title: "Fast Delivery!",
    description: "We ship it right to your door",
    color: "bg-destructive text-destructive-foreground",
  },
]

export function CustomDesign() {
  return (
    <section id="custom" className="py-24 lg:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground text-balance">
            Want Something <span className="text-chart-4">Special?</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We can make custom stickers just for you! Your team logo, your name, 
            your favorite player - whatever you can dream up!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-primary-foreground/20 hover:border-primary-foreground/40 transition-colors"
            >
              <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <step.icon className="w-7 h-7" />
              </div>
              <div className="font-[family-name:var(--font-display)] text-sm font-bold text-chart-4 mb-2">
                Step {step.number}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-primary-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-primary-foreground/20 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Custom stickers starting at just <span className="text-chart-4">$4.99!</span>
            </p>
            <p className="text-primary-foreground/80 mb-8">
              Perfect for birthdays, sports teams, school projects, or just because you want something totally unique!
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg font-bold shadow-lg shadow-accent/30"
            >
              Start Your Custom Order
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
