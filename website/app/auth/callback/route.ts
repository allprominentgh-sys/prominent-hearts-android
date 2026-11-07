
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // This old Supabase callback is no longer used.
  // Firebase handles Google authentication directly.
  return NextResponse.redirect(
    new URL("/login", url.origin)
  );
}
