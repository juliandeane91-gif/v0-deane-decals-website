import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What file types do you accept for logos and artwork?",
    answer:
      "PNG, JPG, PDF, SVG, and AI files all work. Vector files (SVG, AI, PDF) give the sharpest results. If you only have a photo or screenshot, send the best version you have and we will let you know if we need something cleaner.",
  },
  {
    question: "Do I get to approve a proof before printing?",
    answer:
      "Yes. Every custom order includes a proof for your approval before anything is printed. We want you to feel confident about colors, sizing, and layout before production starts.",
  },
  {
    question: "How long does a typical order take?",
    answer:
      "Most standard orders are ready within 5–7 business days after proof approval. Rush options are available at checkout if you need your decals sooner for a game, event, or deadline.",
  },
  {
    question: "Are your stickers waterproof?",
    answer:
      "Yes. We offer durable vinyl-style options that hold up on water bottles, tumblers, coolers, helmets, and outdoor gear. Tell us where you plan to use them and we will recommend the right finish.",
  },
  {
    question: "Do you offer local pickup?",
    answer:
      "Yes. Free local pickup is available in the Warner Robins area. Shipping options include standard, tracked, and bulk/team shipping at checkout.",
  },
  {
    question: "Can I order for a whole team or bulk quantity?",
    answer:
      "Absolutely. Team packs, helmet sets, and bulk sticker orders are one of our most popular order types. Quantity pricing adjusts automatically in the custom order form.",
  },
  {
    question: "What if I do not have a logo yet?",
    answer:
      "No problem. Select \"need design help\" in the order form and describe your idea — team name, colors, mascot, or text. You can also use the AI design assistant on the site to brainstorm before you order.",
  },
  {
    question: "How do I send my artwork after checkout?",
    answer:
      "Reply to your order confirmation email or message us at hello@deanedecals.com with your logo and any notes. Include your name and what you ordered so we can match everything quickly.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-[#080b12] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">FAQ</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Common questions before you order.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            File formats, turnaround, waterproof options, pickup, and how proofs work — answered here.
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl border border-white/10 bg-white/[0.03] px-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-white/10">
              <AccordionTrigger className="text-left text-base font-bold text-white hover:text-red-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-zinc-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
