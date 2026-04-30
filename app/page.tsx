import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { CustomDesign } from "@/components/custom-design"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <CustomDesign />
      <Testimonials />
      <About />
      <Footer />
    </main>
  )
}
