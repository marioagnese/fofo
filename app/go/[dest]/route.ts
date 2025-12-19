import { NextRequest, NextResponse } from "next/server";

/**
 * Simple outbound router.
 * - /go/fapello?path=/creator/xyz  -> https://fapello.com/creator/xyz
 * - /go/fapello                   -> https://fapello.com/
 * - /go/official                  -> replace with your affiliate/official hub
 */
export function GET(req: NextRequest, ctx: { params: { dest: string } }) {
  const dest = ctx.params.dest;
  const url = new URL(req.url);

  if (dest === "fapello") {
    const path = url.searchParams.get("path") || "/";
    const target = new URL("https://fapello.com");
    target.pathname = path.startsWith("/") ? path : `/${path}`;
    return NextResponse.redirect(target.toString(), 302);
  }

  if (dest === "official") {
    return NextResponse.redirect("https://example.com", 302);
  }

  return NextResponse.redirect("https://fapello.com/", 302);
}
