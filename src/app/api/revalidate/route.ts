import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// On-demand revalidation endpoint.
// Called by the invoice.bjalogistic.id CMS right after a setting is saved,
// so pages using the "cms-content" tag refresh immediately instead of
// waiting for the periodic (fallback) revalidate timer.
export async function POST(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get("secret") ||
    request.headers.get("x-revalidate-secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  revalidateTag("cms-content", "max");

  return NextResponse.json({
    ok: true,
    revalidated: "cms-content",
    now: Date.now(),
  });
}
