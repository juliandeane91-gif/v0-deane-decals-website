export function getOrderFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ||
    "Deane Decals <onboarding@resend.dev>"
  )
}

export function getOrderNotificationEmail() {
  const email = process.env.ORDER_NOTIFICATION_EMAIL
  if (!email) {
    throw new Error("Missing ORDER_NOTIFICATION_EMAIL")
  }
  return email
}
