import Link from "next/link"

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#05070b] px-6 py-24 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black text-3xl">
          ✕
        </div>

        <h1 className="text-4xl font-black text-white">Checkout Canceled</h1>

        <p className="mt-4 text-lg text-zinc-300">
          No worries — your order was not placed. You can adjust your options and try again whenever you are ready.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="rounded-2xl border border-white/10 bg-black p-5">
            <h2 className="font-bold text-red-500">Want to change something?</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Go back to the order form to update quantity, shipping, rush options, or your design notes before checkout.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-5">
            <h2 className="font-bold text-red-500">Have questions first?</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Call us at{" "}
              <a href="tel:+14789541888" className="font-semibold text-white hover:text-red-400">
                478-954-1888
              </a>{" "}
              or email{" "}
              <a href="mailto:hello@deanedecals.com" className="font-semibold text-white hover:text-red-400">
                hello@deanedecals.com
              </a>{" "}
              and we will help you get the order right.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#custom"
            className="inline-block rounded-full bg-red-700 px-8 py-3 font-bold text-white hover:bg-red-600"
          >
            Back to Order Form
          </Link>
          <Link
            href="/"
            className="inline-block rounded-full border border-white/20 px-8 py-3 font-bold text-white hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
