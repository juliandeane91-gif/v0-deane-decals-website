"use client"

import { ImageIcon, Loader2, Paperclip, Sparkles, X } from "lucide-react"
import { MOCKUP_PRODUCTS, type MockupProduct } from "@/lib/agents/design-image"
import { Button } from "@/components/ui/button"

type DesignChatToolsProps = {
  productType: MockupProduct
  onProductTypeChange: (value: MockupProduct) => void
  logoPreview: string | null
  onLogoSelect: (file: File | null) => void
  onGenerateMockup: () => void
  isLoading: boolean
  compact?: boolean
}

export function DesignChatTools({
  productType,
  onProductTypeChange,
  logoPreview,
  onLogoSelect,
  onGenerateMockup,
  isLoading,
  compact = false,
}: DesignChatToolsProps) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    onLogoSelect(file)
    event.target.value = ""
  }

  return (
    <div className={`border-t border-white/10 bg-zinc-950/80 ${compact ? "p-2" : "p-3"}`}>
      <div className={`flex flex-col gap-2 ${compact ? "" : "sm:flex-row sm:items-end"}`}>
        <div className="flex-1">
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Mockup product
          </label>
          <select
            value={productType}
            onChange={(event) => onProductTypeChange(event.target.value as MockupProduct)}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            disabled={isLoading}
          >
            {Object.entries(MOCKUP_PRODUCTS).map(([key, label]) => (
              <option key={key} value={key}>
                {key.replace("-", " ")} — {label.split(" with ")[0]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 hover:border-red-700/50">
              <Paperclip className="h-3.5 w-3.5" />
              {logoPreview ? "Change logo" : "Upload logo"}
            </span>
          </label>

          {logoPreview ? (
            <button
              type="button"
              onClick={() => onLogoSelect(null)}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-white"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          ) : null}

          <Button
            type="button"
            size="sm"
            onClick={onGenerateMockup}
            disabled={isLoading}
            className="rounded-full bg-red-800 px-3 text-xs font-bold hover:bg-red-700"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Generate mockup
              </>
            )}
          </Button>
        </div>
      </div>

      {logoPreview ? (
        <div className="mt-2 flex items-center gap-2">
          <img
            src={logoPreview}
            alt="Uploaded logo preview"
            className="h-10 w-10 rounded border border-white/10 object-contain bg-white"
          />
          <p className="text-xs text-zinc-400">Logo attached — mockups will use your upload</p>
        </div>
      ) : (
        <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
          <ImageIcon className="h-3 w-3" />
          Upload a logo for product mockups, or ask &quot;show me a mockup&quot; for a concept image
        </p>
      )}
    </div>
  )
}

export async function readLogoAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("Could not read image file"))
    reader.readAsDataURL(file)
  })
}
