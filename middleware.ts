import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]
  const pathname = request.nextUrl.pathname

  if (host === "deanedecals.com" && !pathname.startsWith("/api/")) {
    const url = request.nextUrl.clone()
    url.protocol = "https:"
    url.host = "www.deanedecals.com"
    return NextResponse.redirect(url, 308)
  }

  if (pathname === "/shop" || pathname === "/shop/") {
    const url = request.nextUrl.clone()
    url.pathname = "/order"
    return NextResponse.redirect(url, 308)
  }

  if (pathname === "/" && request.nextUrl.searchParams.has("product")) {
    const url = request.nextUrl.clone()
    url.pathname = "/order"
    return NextResponse.redirect(url, 308)
  }

  if (pathname === "/" || pathname === "/order" || pathname === "/agents") {
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-store, must-revalidate")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"],
}
