
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Compass,
  Heart,
  MessageCircle,
  UserRound,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Discover",
    href: "/dashboard?tab=discover",
    icon: Compass,
  },
  {
    label: "Likes",
    href: "/dashboard?tab=likes",
    icon: Heart,
  },
  {
    label: "Messages",
    href: "/dashboard?tab=messages",
    icon: MessageCircle,
  },
  {
    label: "My Profile",
    href: "/dashboard?tab=profile",
    icon: UserRound,
  },
];

export default function FloatingMemberNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating bottom navigation */}
      <nav
        aria-label="Member navigation"
        className="fixed bottom-0 left-0 right-0 z-[100] border-t border-rose-100 bg-white/95 shadow-[0_-5px_25px_rgba(0,0,0,0.06)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-xl items-center justify-around px-2 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-2 text-rose-600 transition hover:bg-rose-50"
              >
                <Icon size={23} strokeWidth={2} />
                <span className="text-[11px] font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating menu button */}
      <button
        type="button"
        aria-label={menuOpen ? "Close member menu" : "Open member menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="fixed right-4 top-24 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-800 shadow-lg"
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <>
          <button
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[105] bg-black/20"
          />

          <div className="fixed right-4 top-40 z-[110] w-64 overflow-hidden rounded-2xl border border-rose-100 bg-white p-2 shadow-2xl">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-4 py-4 text-sm font-semibold text-slate-800 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Icon size={21} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
