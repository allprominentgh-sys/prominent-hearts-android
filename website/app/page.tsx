
"use client";

import { useState } from "react";
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
} from "lucide-react";

const profiles = [
  {
    name: "Ama",
    age: 26,
    location: "Accra, Ghana",
    initials: "A",
    colour: "from-rose-300 to-pink-500",
    intention: "Marriage",
    about: "Family-oriented and looking for a meaningful connection.",
  },
  {
    name: "Daniel",
    age: 29,
    location: "Kumasi, Ghana",
    initials: "D",
    colour: "from-blue-300 to-indigo-500",
    intention: "Long-term relationship",
    about: "Ambitious, respectful and interested in building a future.",
  },
  {
    name: "Akosua",
    age: 24,
    location: "Tema, Ghana",
    initials: "A",
    colour: "from-orange-300 to-rose-500",
    intention: "Intentional connection",
    about: "Enjoys learning, travelling and meeting genuine people.",
  },
];

const intentions = [
  {
    title: "Marriage",
    description: "Meet adults who are ready to explore marriage.",
    icon: "💍",
  },
  {
    title: "Contextual Marriage",
    description: "Explore marriage with consideration for personal circumstances.",
    icon: "🤝",
  },
  {
    title: "Long-term Relationship",
    description: "Build a committed relationship with shared values.",
    icon: "❤️",
  },
  {
    title: "Get to Know Someone Intentionally",
    description: "Build a genuine connection without rushing the process. Particularly relevant to students aged 18–25.",
    icon: "🌱",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);

  function toggleLike(index: number) {
    setLiked((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8fa] text-[#30232a]">
      <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Heart fill="currentColor" size={21} />
            </span>
            <span>
              <span className="block text-xl font-extrabold tracking-tight">
                Prominent <span className="text-rose-500">Hearts</span>
              </span>
              <span className="block text-[10px] tracking-[3px] text-gray-500">
                MEANINGFUL CONNECTIONS
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#about" className="hover:text-rose-500">About</a>
            <a href="#intentions" className="hover:text-rose-500">Relationship goals</a>
            <a href="#members" className="hover:text-rose-500">Discover</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#join" className="px-4 py-3 text-sm font-bold hover:text-rose-500">
              Log in
            </a>
            <a href="#join" className="primary-button text-sm">
              Create account
            </a>
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-pink-100 bg-white px-6 py-5 md:hidden">
            <nav className="flex flex-col gap-5 font-semibold">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#intentions" onClick={() => setMenuOpen(false)}>Relationship goals</a>
              <a href="#members" onClick={() => setMenuOpen(false)}>Discover</a>
              <a href="#join" onClick={() => setMenuOpen(false)} className="primary-button">
                Create account
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="container relative grid min-h-[580px] items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm">
              <Sparkles size={16} />
              A new way to connect meaningfully
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.12] tracking-tight sm:text-6xl">
              Your heart deserves a{" "}
              <span className="text-rose-500">meaningful</span> connection.
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-[#887781]">
              Discover genuine people, share your relationship intentions and
              build connections that could become something beautiful.
            </p>

            <div id="join" className="mt-9 flex flex-wrap gap-4">
              <a href="#intentions" className="primary-button gap-2">
                Find your connection <ArrowRight size={18} />
              </a>
              <a
                href="#about"
                className="rounded-full border border-rose-200 bg-white px-7 py-3 font-bold text-rose-600 hover:bg-rose-50"
              >
                Learn more
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-rose-500" />
                Adults 18+ only
              </span>
              <span className="flex items-center gap-2">
                <Heart size={18} className="text-rose-500" />
                Genuine intentions
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -left-5 top-12 h-24 w-24 rounded-full bg-rose-200/70 blur-xl" />
            <div className="absolute -right-5 bottom-12 h-28 w-28 rounded-full bg-purple-200/70 blur-xl" />

            <div className="relative rounded-[35px] border border-white bg-white p-5 shadow-2xl shadow-rose-200/50">
              <div className="flex items-center justify-between px-2 pb-5">
                <div>
                  <p className="font-extrabold">Discover connections</p>
                  <p className="text-xs text-gray-400">People with meaningful intentions</p>
                </div>
                <Heart className="text-rose-500" fill="currentColor" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex h-52 items-end rounded-3xl bg-gradient-to-br from-rose-200 to-pink-500 p-4 text-white">
                  <div>
                    <p className="text-2xl font-black">Ama, 26</p>
                    <p className="text-sm">Accra, Ghana</p>
                  </div>
                </div>
                <div className="mt-7 flex h-52 items-end rounded-3xl bg-gradient-to-br from-blue-200 to-indigo-500 p-4 text-white">
                  <div>
                    <p className="text-2xl font-black">Daniel, 29</p>
                    <p className="text-sm">Kumasi, Ghana</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-rose-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-200 text-rose-700">
                    <Heart fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold">Meaning starts with intention.</p>
                    <p className="text-xs text-gray-500">Connect beyond the ordinary.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-pink-100 bg-white py-16">
        <div className="container grid gap-10 text-center sm:grid-cols-3">
          <div>
            <Users className="mx-auto mb-3 text-rose-500" size={30} />
            <h3 className="font-extrabold">Meet genuine people</h3>
            <p className="mt-2 text-sm text-gray-500">Discover adults seeking meaningful connections.</p>
          </div>
          <div>
            <Heart className="mx-auto mb-3 text-rose-500" size={30} />
            <h3 className="font-extrabold">Share your intentions</h3>
            <p className="mt-2 text-sm text-gray-500">Be clear about the kind of relationship you seek.</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto mb-3 text-rose-500" size={30} />
            <h3 className="font-extrabold">Connect responsibly</h3>
            <p className="mt-2 text-sm text-gray-500">Safety, respect and honest communication matter.</p>
          </div>
        </div>
      </section>

      <section id="intentions" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-bold uppercase tracking-[3px] text-rose-500">Your journey begins here</p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            What are you looking for?
          </h2>
          <p className="mt-4 leading-7 text-gray-500">
            Every connection begins with understanding what you want.
            Choose the intention that best describes your journey.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {intentions.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">{item.description}</p>
              <a href="#join" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rose-500">
                Explore <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="members" className="bg-[#fff0f5] py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-bold uppercase tracking-[3px] text-rose-500">Discover</p>
              <h2 className="mt-3 text-3xl font-black">Meet our featured profiles</h2>
              <p className="mt-3 text-gray-500">Sample profiles showing how member discovery will look.</p>
            </div>
            <a href="#join" className="font-bold text-rose-600">Join to discover more →</a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile, index) => (
              <article key={profile.name + index} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className={`flex h-56 items-center justify-center bg-gradient-to-br ${profile.colour}`}>
                  <span className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/70 bg-white/30 text-6xl font-black text-white">
                    {profile.initials}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black">{profile.name}, {profile.age}</h3>
                      <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
                    </div>
                    <button
                      onClick={() => toggleLike(index)}
                      aria-label={liked.includes(index) ? "Unlike profile" : "Like profile"}
                      className="rounded-full bg-rose-50 p-3 text-rose-500"
                    >
                      <Heart fill={liked.includes(index) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <span className="mt-4 inline-block rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">
                    {profile.intention}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-gray-500">{profile.about}</p>
                  <a href="#join" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-rose-500 py-3 font-bold text-white hover:bg-rose-600">
                    <MessageCircle size={17} /> Connect
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            These are illustrative demo profiles, not real registered members.
          </p>
        </div>
      </section>

      <section className="container py-20 text-center">
        <div className="mx-auto max-w-3xl rounded-[35px] bg-gradient-to-br from-rose-500 to-pink-600 px-7 py-14 text-white shadow-xl shadow-rose-200 sm:px-14">
          <CheckCircle2 className="mx-auto mb-5" size={40} />
          <h2 className="text-3xl font-black sm:text-4xl">A meaningful connection could start today.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-rose-50">
            Take the first step. Be intentional, be genuine and give meaningful connections a chance.
          </p>
          <a href="#join" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-extrabold text-rose-600 hover:bg-rose-50">
            Get started <ArrowRight className="ml-2" size={18} />
          </a>
        </div>
      </section>

      <footer className="border-t border-pink-100 bg-white py-10">
        <div className="container flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-black">Prominent <span className="text-rose-500">Hearts</span></p>
            <p className="mt-1 text-sm text-gray-500">Meaningful connections. Intentional relationships.</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Owned by All Prominent Ghana Limited</p>
            <p className="mt-2">© {new Date().getFullYear()} Prominent Hearts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
