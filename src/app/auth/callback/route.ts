import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the redirect from Supabase auth emails (password reset, magic link, etc.)
// Exchanges the one-time `code` for a session, then forwards to `next`.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/app/events";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const fallback = new URL("/login", url.origin);
      fallback.searchParams.set("error", "reset_link_invalid");
      return NextResponse.redirect(fallback);
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
