
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "../../lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { error: authError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              access_type: "offline",
              prompt: "select_account",
            },
          },
        });

      if (authError) {
        throw authError;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in could not start. Please try again."
      );
      setLoading(false);
    }
  }

  const callbackFailed =
    searchParams.get("error") === "google_auth_failed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fa] px-5 py-12 text-[#34232b]">
      <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/50 sm:p-10">
        <Link href="/" className="mb-9 flex items-center justify-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Heart size={26} fill="currentColor" />
          </span>
          <span className="text-2xl font-black">
            Prominent <span className="text-rose-500">Hearts</span>
          </span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black">Welcome to Prominent Hearts</h1>
          <p className="mt-3 leading-7 text-gray-500">
            Sign in or create your account to begin your journey towards
            meaningful connections.
          </p>
        </div>

        {(error || callbackFailed) && (
          <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={20} className="shrink-0" />
            <p>
              {error ||
                "Google sign-in was not completed. Please try again."}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-4 font-bold shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={21} className="animate-spin" />
          ) : (
            <svg width="21" height="21" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.27 5.64c4.24-3.91 6.68-9.68 6.68-17.29Z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.27-5.64c-2.02 1.35-4.6 2.14-8.63 2.14-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z" />
            </svg>
          )}
          {loading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-7 text-center text-xs leading-6 text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="font-bold text-rose-600">
            Terms of Use
          </Link>
          . Prominent Hearts is for adults aged 18 and above.
        </p>

        <div className="mt-8 border-t border-rose-100 pt-6 text-center">
          <Link href="/" className="text-sm font-bold text-rose-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
