
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
  Sparkles,
  Compass,
  UserRound,
  Bookmark,
  MapPin,
  Gift,
} from "lucide-react";

const navigation = [
  { label: "Discover", href: "/dashboard?tab=discover", icon: Compass },
  { label: "Likes", href: "/dashboard?tab=likes", icon: Heart },
  { label: "Messages", href: "/dashboard?tab=messages", icon: MessageCircle },
  { label: "My Profile", href: "/dashboard?tab=profile", icon: UserRound },
];

const intentions = [
  {
    title: "Marriage",
    description: "Find someone ready for a committed marriage.",
    number: "01",
  },
  {
    title: "Contextual Marriage",
    description: "Explore marriage with clear, mutually agreed terms.",
    number: "02",
  },
  {
    title: "Long-term Relationship",
    description: "Build a meaningful long-term connection.",
    number: "03",
  },
  {
    title: "Get to Know Someone Intentionally",
    description: "Start with friendship and grow with purpose.",
    number: "04",
  },
];

const profiles = [
  {
    name: "Abena",
    age: 28,
    occupation: "Entrepreneur",
    gender: "Woman",
    location: "Accra",
    intention: "Marriage-minded",
    bio: "Kindness, honesty, family and growing together matter to me. I hope to meet a thoughtful partner ready to build a lasting home.",
    interests: ["Family", "Faith", "Travel"],
    initials: "A",
    match: "96%",
    color: "from-rose-200 to-orange-100",
  },
  {
    name: "Daniel",
    age: 30,
    occupation: "Business Owner",
    gender: "Man",
    location: "Kumasi",
    intention: "Long-term relationship",
    bio: "I value honesty, laughter and meaningful conversations. Looking for someone with shared values and a positive outlook.",
    interests: ["Business", "Travel", "Family"],
    initials: "D",
    match: "92%",
    color: "from-sky-100 to-indigo-100",
  },
  {
    name: "Akosua",
    age: 26,
    occupation: "Teacher",
    gender: "Woman",
    location: "Tema",
    intention: "Marriage-minded",
    bio: "I appreciate kindness, mutual respect and a peaceful home. Hoping to meet someone intentional about the future.",
    interests: ["Reading", "Faith", "Music"],
    initials: "A",
    match: "94%",
    color: "from-purple-100 to-pink-100",
  },
  {
    name: "Michael",
    age: 32,
    occupation: "Engineer",
    gender: "Man",
    location: "Accra",
    intention: "Marriage-minded",
    bio: "Family-oriented, thoughtful and ambitious. I believe strong relationships grow through friendship and understanding.",
    interests: ["Technology", "Fitness", "Travel"],
    initials: "M",
    match: "90%",
    color: "from-amber-100 to-rose-100",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);

  function toggleLike(name: string) {
    setLikedProfiles((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  function toggleSave(name: string) {
    setSavedProfiles((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff8fa] pb-24 text-[#30202a]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-rose-100 bg-white">
        <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-4 sm:px-6">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-pink-500 text-white">
              <Heart size={28} fill="currentColor" />
            </div>

            <div>
              <div className="font-serif text-xl font-bold tracking-tight sm:text-2xl">
                Prominent Hearts
              </div>
              <div className="mt-1 text-[10px] font-bold tracking-[3px] text-rose-500 sm:text-xs">
                MEET WITH PURPOSE
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 sm:px-7"
            >
              Join free
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl p-2 text-slate-800 hover:bg-rose-50"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* HAMBURGER DROPDOWN */}
        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />

            <div className="absolute right-4 top-[78px] z-50 w-72 overflow-hidden rounded-2xl border border-rose-100 bg-white p-3 shadow-2xl">
              <div className="border-b border-rose-100 px-4 py-3">
                <p className="font-bold">Prominent Hearts</p>
                <p className="text-xs text-gray-500">
                  Meaningful connections begin here
                </p>
              </div>

              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 font-semibold text-slate-800 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Icon size={21} />
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 border-t border-rose-100 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 font-bold text-rose-600 hover:bg-rose-50"
                >
                  Sign in / Join free
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#651c3c] via-[#923456] to-[#c65377] px-6 py-10 text-white shadow-xl shadow-rose-200/50 sm:px-12 sm:py-14 lg:px-16 lg:py-16">

          <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full border-[70px] border-white/5" />
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur">
              <Sparkles size={19} />
              A better way to find your person
            </div>

            <h1 className="mt-10 font-serif text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Love with intention.
              <span className="mt-2 block text-rose-200">
                Build a lifetime.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-rose-50 sm:text-xl">
              A community for adults who value meaningful connection,
              shared values and the possibility of marriage. Less noise.
              More purpose.
            </p>

            <Link
              href="/login"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-bold text-rose-700 transition hover:bg-rose-50"
            >
              Create your profile
              <ArrowRight size={21} />
            </Link>
          </div>

          <div className="relative mt-14 grid grid-cols-3 gap-3 border-t border-white/20 pt-10 sm:gap-5">
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur sm:p-6">
              <p className="text-sm text-rose-100 sm:text-base">Purpose</p>
              <p className="mt-2 text-base font-bold sm:text-xl">
                Marriage first
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur sm:p-6">
              <p className="text-sm text-rose-100 sm:text-base">People</p>
              <p className="mt-2 text-base font-bold sm:text-xl">
                Values-led
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur sm:p-6">
              <p className="text-sm text-rose-100 sm:text-base">Safety</p>
              <p className="mt-2 text-base font-bold sm:text-xl">
                Respect always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THOUGHTFUL CONNECTIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6">
        <p className="text-sm font-bold tracking-[4px] text-rose-500">
          THOUGHTFUL CONNECTIONS
        </p>

        <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
          Meet people with purpose
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-gray-500">
          Discover people who share your relationship intentions,
          values and hopes for the future.
        </p>
      </section>

      {/* RELATIONSHIP INTENTIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intentions.map((item) => (
            <Link
              key={item.number}
              href="/login"
              className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-bold text-rose-400">
                {item.number}
              </span>

              <h3 className="mt-4 font-serif text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rose-600">
                Explore
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* DISCOVER PROFILES */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-[3px] text-rose-500">
                DISCOVER
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                Suggested profiles
              </h2>
            </div>

            <span className="text-xs text-gray-400">
              Sample profiles
            </span>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => {
              const liked = likedProfiles.includes(profile.name);
              const saved = savedProfiles.includes(profile.name);

              return (
                <article
                  key={profile.name}
                  className="overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-sm"
                >
                  {/* PROFILE IMAGE PLACEHOLDER */}
                  <div className={`relative flex h-64 items-center justify-center bg-gradient-to-br ${profile.color}`}>
                    <div className="flex h-36 w-36 items-center justify-center rounded-full border-[7px] border-white/80 bg-white/70 font-serif text-6xl text-slate-700">
                      {profile.initials}
                    </div>

                    <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-600 shadow-sm">
                      <Sparkles size={14} className="mr-1 inline" />
                      {profile.match} match
                    </div>

                    <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                      ● Online
                    </div>

                    <button
                      type="button"
                      aria-label={saved ? "Remove saved profile" : "Save profile"}
                      onClick={() => toggleSave(profile.name)}
                      className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md"
                    >
                      <Bookmark
                        size={21}
                        fill={saved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-serif text-3xl font-bold">
                        {profile.name}, {profile.age}
                      </h3>

                      <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">
                        {profile.intention}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {profile.occupation} · {profile.gender}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={17} />
                      {profile.location}
                    </p>

                    <p className="mt-5 leading-7 text-slate-600">
                      {profile.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 grid grid-cols-3 gap-2 border-t border-gray-100 pt-5">
                      <button
                        type="button"
                        onClick={() => toggleLike(profile.name)}
                        className={`flex flex-col items-center gap-2 rounded-xl py-3 text-sm font-semibold ${
                          liked
                            ? "bg-rose-50 text-rose-600"
                            : "text-slate-500 hover:bg-rose-50"
                        }`}
                      >
                        <Heart
                          size={22}
                          fill={liked ? "currentColor" : "none"}
                        />
                        {liked ? "Liked" : "Like"}
                      </button>

                      <Link
                        href="/login"
                        className="flex flex-col items-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-500 hover:bg-rose-50"
                      >
                        <Gift size={22} />
                        Gift
                      </Link>

                      <Link
                        href="/login"
                        className="flex flex-col items-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-500 hover:bg-rose-50"
                      >
                        <MessageCircle size={22} />
                        Chat
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-gray-400">
            These are demonstration profiles, not registered members.
            Likes and saved profiles are temporary browser interactions.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-rose-100 bg-[#fff0f4] px-7 py-12 text-center sm:px-14">
          <ShieldCheck className="mx-auto text-rose-500" size={38} />

          <h2 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">
            Meaningful connections begin with respect.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
            Prominent Hearts is a community for adults aged 18 and above
            who want honest conversations, shared values and purposeful
            relationships.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-rose-600 px-8 py-4 font-bold text-white hover:bg-rose-700"
          >
            Create your profile
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rose-100 bg-white px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
            <Heart size={22} fill="currentColor" className="text-rose-500" />
            Prominent Hearts
          </Link>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
            <Link href="/terms">Terms of Use</Link>
            <Link href="/marriage-agreement">Marriage Agreement</Link>
            <Link href="/login">Login</Link>
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} All Prominent Ghana Limited.
          </p>
        </div>
      </footer>

      {/* FIXED FLOATING BOTTOM NAVIGATION */}
      <nav
        aria-label="Main member navigation"
        className="fixed bottom-0 left-0 right-0 z-[100] border-t border-rose-100 bg-white/95 shadow-[0_-5px_25px_rgba(80,20,40,0.08)] backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-xl grid-cols-4 px-2 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Icon size={24} strokeWidth={2} />

                <span className="text-xs font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
