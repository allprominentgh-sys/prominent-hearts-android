
import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");

  // Only allow safe internal destinations.
  const destination =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", url.origin)
    );
  }

  try {
    const supabase = await createClient();

    const { error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL("/login?error=google_auth_failed", url.origin)
      );
    }

    const { data, error: userError } =
      await supabase.auth.getUser();

    if (userError || !data.user) {
      return NextResponse.redirect(
        new URL("/login?error=session_not_created", url.origin)
      );
    }

    return NextResponse.redirect(
      new URL(destination, url.origin)
    );
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", url.origin)
    );
  }
}
