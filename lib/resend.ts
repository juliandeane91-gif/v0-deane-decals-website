import { Resend } from "resend"

let resendClient: Resend | null = null

export function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error("Missing RESEND_API_KEY")
  }

  if (!resendClient) {
    resendClient = new Resend(key)
  }

  return resendClient
}
