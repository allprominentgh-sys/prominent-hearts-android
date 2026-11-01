
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  X,
  ShieldCheck,
  MessageCircle,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  UserRound,
} from "lucide-react";

const intentions = [
  {
    title: "Marriage",
    description: "Find someone ready for a committed marriage.",
    href: "/login",
    number: "01",
  },
  {
    title: "Contextual Marriage",
    description: "Explore marriage with clear, mutually agreed terms.",
    href: "/marriage-agreement",
    number: "02",
  },
  {
    title: "Long-term Relationship",
    description: "Build a meaningful long-term connection.",
    href: "/login",
    number: "03",
  },
  {
    title: "Get to Know Someone Intentionally",
    description: "Start with friendship and grow with purpose.",
    href: "/login",
    number: "04",
  },
];

const profiles = [
  {
    name: "Ama",
    age: 26,
    location: "Accra, Ghana",
    intention: "Marriage",
    initials: "A",
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Daniel",
    age: 29,
    location: "Kumasi, Ghana",
    intention: "Long-term relationship",
    initials: "D",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Akosua",
    age: 24,
    location: "Tema, Ghana",
    intention: "Get to know someone",
    initials: "A",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

  function toggleLike(name: string) {
    setLikedProfiles((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8fa] text-[#34232b]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
              <Heart
                size={22}
                fill="currentColor"
                className="text-rose-500"
              />
            </div>

            <span className="text-xl font-black tracking-tight">
              Prominent <span className="text-rose-500">Hearts</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex">
            <a href="#about" className="hover:text-rose-500">
              About
            </a>
            <a href="#intentions" className="hover:text-rose-500">
              Relationship intentions
            </a>
            <a href="#discover" className="hover:text-rose-500">
              Discover
            </a>
            <Link href="/terms" className="hover:text-rose-500">
              Terms
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm font-bold text-rose-600"
            >
              Log in
            </Link>

            <Link href="/login" className="primary-button">
              Join Prominent Hearts
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-gray-700 md:hidden"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-rose-100 bg-white p-5 md:hidden">
            <div className="flex flex-col gap-5 font-semibold">
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a href="#intentions" onClick={() => setMenuOpen(false)}>
                Relationship intentions
              </a>

              <a href="#discover" onClick={() => setMenuOpen(false)}>
                Discover
              </a>

              <Link href="/terms" onClick={() => setMenuOpen(false)}>
                Terms of Use
              </Link>

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="primary-button"
              >
                Join Prominent Hearts
              </Link>

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-rose-600"
              >
                Log in
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="container grid min-h-[620px] items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-600">
              <Sparkles size={16} />
              Meaningful connections begin here
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Your heart deserves
              <span className="block text-rose-500">
                something real.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              Meet people with genuine intentions. Whether you are looking
              for marriage, a lasting relationship or someone to know
              intentionally, start your journey with Prominent Hearts.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="primary-button gap-2">
                Find your connection
                <ArrowRight size={18} />
              </Link>

              <a
                href="#intentions"
                className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-7 py-3 font-bold text-rose-600 transition hover:bg-rose-50"
              >
                Explore intentions
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-gray-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-rose-500" />
                Adults 18+
              </span>

              <span className="flex items-center gap-2">
                <Heart size={18} className="text-rose-500" />
                Purposeful connections
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-rose-200/60 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-pink-200/70 blur-3xl" />

            <div className="relative rounded-[2rem] border border-rose-100 bg-white p-5 shadow-xl shadow-rose-100/60 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-rose-500">
                    Your journey
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    Starts with intention
                  </h2>
                </div>

                <div className="rounded-2xl bg-rose-100 p-3 text-rose-500">
                  <Heart size={27} fill="currentColor" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {intentions.map((item) => (
                  <Link
                    key={item.number}
                    href={item.href}
                    className="flex items-center gap-4 rounded-2xl border border-rose-100 p-4 transition hover:border-rose-300 hover:bg-rose-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-sm font-black text-rose-600">
                      {item.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">
                        {item.title}
                      </span>

                      <span className="mt-1 block text-sm leading-5 text-gray-500">
                        {item.description}
                      </span>
                    </span>

                    <ArrowRight
                      size={18}
                      className="shrink-0 text-rose-400"
                    />
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                Choose what you are genuinely looking for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-rose-100 bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-rose-500">
              About Prominent Hearts
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Beyond ordinary dating
            </h2>

            <p className="mt-5 leading-8 text-gray-500">
              We believe relationships should begin with honesty, respect
              and a clear understanding of what both people want.
              Prominent Hearts gives adults a place to explore meaningful
              connections with purpose.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-[#fff8fa] p-7">
              <Heart size={30} className="text-rose-500" />
              <h3 className="mt-5 text-xl font-black">
                Genuine intentions
              </h3>
              <p className="mt-3 leading-7 text-gray-500">
                Be clear about the kind of relationship you want to build.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fff8fa] p-7">
              <ShieldCheck size={30} className="text-rose-500" />
              <h3 className="mt-5 text-xl font-black">
                Respect and safety
              </h3>
              <p className="mt-3 leading-7 text-gray-500">
                A community built around adult participation and respectful conduct.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fff8fa] p-7">
              <MessageCircle size={30} className="text-rose-500" />
              <h3 className="mt-5 text-xl font-black">
                Meaningful conversations
              </h3>
              <p className="mt-3 leading-7 text-gray-500">
                Get to know people through honest communication and shared goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATIONSHIP INTENTIONS */}
      <section id="intentions" className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-rose-500">
              Your relationship journey
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              What are you looking for?
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              There is no need to follow someone else&apos;s path.
              Choose the intention that reflects yours.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {intentions.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group rounded-3xl border border-rose-100 bg-white p-7 transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-rose-400">
                    {item.number}
                  </span>

                  <ArrowRight className="text-rose-400 transition group-hover:translate-x-1" />
                </div>

                <h3 className="mt-7 text-xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {item.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rose-600">
                  Explore this intention
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="bg-white py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[3px] text-rose-500">
                Discover
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Meet our community
              </h2>

              <p className="mt-3 text-gray-500">
                Sample profiles showing how member discovery can look.
              </p>
            </div>

            <span className="text-xs font-semibold text-gray-400">
              Demonstration profiles only
            </span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => {
              const liked = likedProfiles.includes(profile.name);

              return (
                <article
                  key={profile.name}
                  className="overflow-hidden rounded-3xl border border-rose-100 bg-[#fff8fa]"
                >
                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-rose-100 to-pink-50">
                    <div
                      className={`flex h-28 w-28 items-center justify-center rounded-full text-5xl font-black shadow-sm ${profile.color}`}
                    >
                      {profile.initials}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-black">
                        {profile.name}, {profile.age}
                      </h3>

                      <UserRound className="text-rose-400" />
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {profile.location}
                    </p>

                    <p className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-rose-600">
                      {profile.intention}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleLike(profile.name)}
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition ${
                        liked
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                      }`}
                    >
                      <Heart
                        size={17}
                        fill={liked ? "currentColor" : "none"}
                      />

                      {liked ? "Liked" : "Like profile"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-gray-400">
            These are demonstration profiles, not registered or verified members.
            Profile likes are temporary and stored only in this browser session.
          </p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-[2rem] bg-rose-500 px-7 py-14 text-center text-white sm:px-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <CheckCircle2 size={30} />
            </div>

            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              Your next chapter starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-rose-50">
              Take the first step towards a connection built on honesty,
              understanding and shared intentions.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-black text-rose-600 transition hover:bg-rose-50"
            >
              Get started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="bg-white py-16">
        <div className="container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Users size={28} />
          </div>

          <h2 className="mt-5 text-3xl font-black">
            Join Prominent Hearts
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500">
            Sign in or create your account to begin your journey.
            Prominent Hearts is exclusively for adults aged 18 and above.
          </p>

          <Link
            href="/login"
            className="primary-button mt-7 inline-flex"
          >
            Continue with Google
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rose-100 bg-[#fff8fa] py-10">
        <div className="container flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <Link href="/" className="flex items-center gap-2 font-black">
            <Heart
              size={20}
              fill="currentColor"
              className="text-rose-500"
            />
            Prominent Hearts
          </Link>

          <div className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-gray-500">
            <Link href="/terms" className="hover:text-rose-500">
              Terms of Use
            </Link>

            <Link
              href="/marriage-agreement"
              className="hover:text-rose-500"
            >
              Marriage Agreement
            </Link>

            <Link href="/login" className="hover:text-rose-500">
              Log in
            </Link>
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} All Prominent Ghana Limited.
          </p>
        </div>
      </footer>
    </main>
  );
}
