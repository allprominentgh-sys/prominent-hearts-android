
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "../../lib/supabase/browser";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get("error");

    if (errorCode === "missing_code") {
      setError("Google did not return an authentication code. Please try again.");
    } else if (errorCode === "google_auth_failed") {
      setError("Google authentication failed. Please try again.");
    } else if (errorCode === "session_not_created") {
      setError("Your account was recognised, but a login session could not be created.");
    } else if (errorCode) {
      setError("We could not complete your sign-in. Please try again.");
    }
  }, []);

  async function signInWithGoogle() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const redirectTo = `${window.location.origin}/auth/callback?next=%2Fdashboard`;

      const { error: authError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
            queryParams: {
              prompt: "select_account",
            },
          },
        });

      if (authError) {
        throw authError;
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start Google sign-in."
      );
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fa] px-5 py-12 text-[#34232b]">
      <div className="w-full max-w-xl rounded-[2rem] border border-rose-100 bg-white p-8 shadow-xl sm:p-12">
        <Link href="/" className="mb-10 flex items-center justify-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Heart size={30} fill="currentColor" />
          </span>
          <span className="text-2xl font-black">
            Prominent <span className="text-rose-500">Hearts</span>
          </span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black sm:text-4xl">
            Welcome to Prominent Hearts
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-500">
            Sign in or create your account to begin your journey towards meaningful connections.
          </p>
        </div>

        {error && (
          <div className="mt-7 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="mt-10 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-5 text-lg font-bold shadow-sm transition hover:bg-rose-50 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={23} />
          ) : (
            <span className="text-2xl font-bold text-blue-600">G</span>
          )}
          {loading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-8 text-center text-sm leading-7 text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="font-bold text-rose-600">
            Terms of Use
          </Link>
          . Prominent Hearts is for adults aged 18 and above.
        </p>

        <div className="mt-8 border-t border-rose-100 pt-7 text-center">
          <Link href="/" className="font-bold text-rose-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
