export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#05070b] px-6 py-24 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-3xl">
          ✓
        </div>

        <h1 className="text-4xl font-black text-white">
          Order Received!
        </h1>

        <p className="mt-4 text-lg text-zinc-300">
          Thanks for starting your Deane Decals order. We’ll review your details and follow up with next steps.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="rounded-2xl border border-white/10 bg-black p-5">
            <h2 className="font-bold text-red-500">What happens next?</h2>
            <p className="mt-2 text-sm text-zinc-300">
              We’ll review your order details, confirm your design, and send a proof before anything is printed.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-5">
            <h2 className="font-bold text-red-500">Need to send a logo or artwork?</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Reply to your order confirmation or message us directly with your logo, team name, colors, and any design notes.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-5">
            <h2 className="font-bold text-red-500">Pickup or shipping</h2>
            <p className="mt-2 text-sm text-zinc-300">
              If you selected Warner Robins pickup, we’ll send pickup details. If you selected shipping, we’ll confirm once your order is ready.
            </p>
          </div>
        </div>

        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-red-700 px-8 py-3 font-bold text-white hover:bg-red-600"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}