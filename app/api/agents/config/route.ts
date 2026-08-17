import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    authRequired: Boolean(process.env.AGENTS_ACCESS_TOKEN),
  })
}
