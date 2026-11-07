
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import {
  Heart,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { auth, googleProvider } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function signInWithGoogle() {
    setLoading(true);
    setError("");

    try {
      await setPersistence(auth, browserLocalPersistence);

      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      if (result.user) {
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      const code =
        typeof err === "object" &&
        err !== null &&
        "code" in err
          ? String(err.code)
          : "";

      if (code === "auth/popup-closed-by-user") {
        setError("Google sign-in was closed. Please try again.");
      } else if (code === "auth/popup-blocked") {
        setError("Your browser blocked the Google sign-in window. Please allow pop-ups and try again.");
      } else if (code === "auth/unauthorized-domain") {
        setError("This website domain is not authorised in Firebase.");
      } else if (code === "auth/operation-not-allowed") {
        setError("Google sign-in is not enabled in Firebase Authentication.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to sign in. Please try again."
        );
      }

      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8fa]">
        <Loader2 className="animate-spin text-rose-600" size={38} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fa] px-5 py-12 text-[#34232b]">
      <div className="w-full max-w-xl rounded-[2rem] border border-rose-100 bg-white p-8 shadow-xl sm:p-12">

        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-3"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Heart size={30} fill="currentColor" />
          </span>

          <span className="text-2xl font-black">
            Prominent{" "}
            <span className="text-rose-500">Hearts</span>
          </span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black sm:text-4xl">
            Welcome to Prominent Hearts
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-500">
            Sign in or create your account to begin your
            journey towards meaningful connections.
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
            <span className="text-2xl font-bold text-blue-600">
              G
            </span>
          )}

          {loading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        <p className="mt-8 text-center text-sm leading-7 text-gray-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="font-bold text-rose-600">
            Terms of Use
          </Link>
          . Prominent Hearts is for adults aged 18 and above.
        </p>

        <div className="mt-8 border-t border-rose-100 pt-7 text-center">
          <Link
            href="/"
            className="font-bold text-rose-600 hover:underline"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
