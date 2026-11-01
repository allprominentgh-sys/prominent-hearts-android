
import Link from "next/link";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fa] px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          <Heart size={38} fill="currentColor" />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[4px] text-rose-500">
          Prominent Hearts
        </p>

        <h1 className="mt-4 text-7xl font-black text-[#30232a]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-extrabold">
          This page couldn't be found.
        </h2>

        <p className="mt-4 leading-7 text-gray-500">
          It looks like this page has moved or doesn't exist.
          Let's get you back to meaningful connections.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-rose-500 px-8 py-4 font-bold text-white transition hover:bg-rose-600"
        >
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
