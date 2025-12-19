import { NextRequest, NextResponse } from "next/server";

type Ctx = { params: Promise<{ dest: string }> };

/**
 * Simple outbound router.
 * - /go/fapello?path=/creator/xyz  -> https://fapello.com/creator/xyz
 * - /go/fapello                   -> https://fapello.com/
 * - /go/official                  -> replace with your affiliate/official hub
 */
export async function GET(req: NextRequest, ctx: Ctx) {
  const { dest } = await ctx.params;
  const url = new URL(req.url);

  if (dest === "fapello") {
    const path = url.searchParams.get("path") || "/";
    const target = new URL("https://fapello.com");
    target.pathname = path.startsWith("/") ? path : `/${path}`;
    return NextResponse.redirect(target.toString(), 302);
  }

  if (dest === "official") {
    // TODO: replace with your affiliate / official hub
    return NextResponse.redirect("https://example.com", 302);
  }

  return NextResponse.redirect("https://fapello.com/", 302);
}
