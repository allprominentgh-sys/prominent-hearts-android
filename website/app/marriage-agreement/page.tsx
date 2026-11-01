
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  FileText,
  Users,
  CalendarDays,
  Baby,
  Wallet,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function MarriageAgreementPage() {
  const [form, setForm] = useState({
    partyA: "",
    partyB: "",
    emailA: "",
    emailB: "",
    duration: "3 years",
    children: "To be mutually decided",
    numberOfChildren: "To be decided",
    household: "Separate accounts and joint household account",
    contributionA: "50",
    contributionB: "50",
    reviewPeriod: "Annually",
    separationNotice: "30 days",
    separationConditions: "",
    additionalTerms: "",
  });

  const [consentA, setConsentA] = useState(false);
  const [consentB, setConsentB] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consentA || !consentB) {
      alert("Both parties must confirm their understanding before proceeding.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#30232a]">
      <header className="border-b border-pink-100 bg-white">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="text-rose-500" fill="currentColor" />
            <span className="text-xl font-black">
              Prominent <span className="text-rose-500">Hearts</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>
        </div>
      </header>

      <div className="container max-w-4xl py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FileText size={30} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[3px] text-rose-500">
            Contextual Marriage
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Marriage Terms & Agreement
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Create a transparent agreement covering marriage intentions,
            duration, children, finances, property and possible separation.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "Two-party agreement" },
            { icon: ShieldCheck, label: "Voluntary consent" },
            { icon: CalendarDays, label: "Defined review period" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white p-4"
            >
              <item.icon className="text-rose-500" />
              <span className="text-sm font-bold">{item.label}</span>
            </div>
          ))}
        </div>

        {submitted ? (
          <section className="mt-10 rounded-3xl border border-green-100 bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto text-green-600" size={48} />

            <h2 className="mt-5 text-2xl font-black">
              Agreement proposal completed
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Your information has been prepared in this page session.
              The agreement is not yet signed, legally reviewed or saved
              to a permanent account.
            </p>

            <div className="mt-7 rounded-2xl bg-rose-50 p-5 text-left">
              <p><strong>Party A:</strong> {form.partyA}</p>
              <p className="mt-2"><strong>Party B:</strong> {form.partyB}</p>
              <p className="mt-2"><strong>Intended duration:</strong> {form.duration}</p>
              <p className="mt-2"><strong>Children:</strong> {form.children}</p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="primary-button mt-7"
            >
              Review proposal
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black">
                <Users className="text-rose-500" />
                1. Parties to the agreement
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter the legal names of both participating adults.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">Party A full legal name</label>
                  <input
                    required
                    value={form.partyA}
                    onChange={(e) => update("partyA", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
                    placeholder="Full legal name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">Party B full legal name</label>
                  <input
                    required
                    value={form.partyB}
                    onChange={(e) => update("partyB", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
                    placeholder="Full legal name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">Party A email</label>
                  <input
                    required
                    type="email"
                    value={form.emailA}
                    onChange={(e) => update("emailA", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">Party B email</label>
                  <input
                    required
                    type="email"
                    value={form.emailB}
                    onChange={(e) => update("emailB", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-400"
                    placeholder="Email address"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black">
                <CalendarDays className="text-rose-500" />
                2. Intended marriage duration
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Select the initial period the parties intend to commit to
                before conducting a formal relationship review.
              </p>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Proposed initial duration
              </label>

              <select
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>1 year</option>
                <option>2 years</option>
                <option>3 years</option>
                <option>5 years</option>
                <option>10 years</option>
                <option>Indefinite / lifelong intention</option>
              </select>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Relationship review frequency
              </label>

              <select
                value={form.reviewPeriod}
                onChange={(e) => update("reviewPeriod", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>Every 6 months</option>
                <option>Annually</option>
                <option>Every 2 years</option>
                <option>At the end of the agreed period</option>
              </select>

              <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                The selected duration is an intended commitment and review
                period. It does not automatically terminate a legally
                recognised marriage.
              </div>
            </section>

            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black">
                <Baby className="text-rose-500" />
                3. Children and family planning
              </h2>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Do the parties intend to have children?
              </label>

              <select
                value={form.children}
                onChange={(e) => update("children", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>To be mutually decided</option>
                <option>Yes, we intend to have children</option>
                <option>No children currently planned</option>
                <option>We may consider children in the future</option>
              </select>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Preferred number of children
              </label>

              <select
                value={form.numberOfChildren}
                onChange={(e) => update("numberOfChildren", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>To be decided</option>
                <option>One child</option>
                <option>Two children</option>
                <option>Three children</option>
                <option>Four or more children</option>
                <option>No children planned</option>
              </select>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                These are shared intentions only. Reproductive decisions
                require individual consent, and children&apos;s rights and welfare
                cannot be waived by this agreement.
              </p>
            </section>

            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-black">
                <Wallet className="text-rose-500" />
                4. Financial arrangements
              </h2>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Preferred banking arrangement
              </label>

              <select
                value={form.household}
                onChange={(e) => update("household", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>Separate accounts and joint household account</option>
                <option>Separate accounts only</option>
                <option>Joint account for household expenses</option>
                <option>Other mutually agreed arrangement</option>
              </select>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">Party A household contribution (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={form.contributionA}
                    onChange={(e) => update("contributionA", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">Party B household contribution (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={form.contributionB}
                    onChange={(e) => update("contributionB", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Proposed contributions should total 100%. The parties can
                negotiate a different arrangement before signing.
              </p>
            </section>

            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-black">
                5. Separation and dissolution intentions
              </h2>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Preferred communication notice period
              </label>

              <select
                value={form.separationNotice}
                onChange={(e) => update("separationNotice", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3"
              >
                <option>Immediate, where necessary</option>
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
                <option>60 days</option>
              </select>

              <label className="mb-2 mt-6 block text-sm font-bold">
                Proposed separation arrangements
              </label>

              <textarea
                rows={4}
                value={form.separationConditions}
                onChange={(e) => update("separationConditions", e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3"
                placeholder="Describe intended arrangements for property, accommodation, debts, finances and family responsibilities..."
              />

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Either party may seek legal assistance or protection at any
                time. The legal process for ending a marriage must be followed.
              </p>
            </section>

            <section className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-black">
                6. Additional mutually agreed terms
              </h2>

              <textarea
                rows={5}
                value={form.additionalTerms}
                onChange={(e) => update("additionalTerms", e.target.value)}
                className="mt-5 w-full rounded-xl border border-gray-200 p-3"
                placeholder="Add property protection, business ownership, household duties, living arrangements and any other terms..."
              />
            </section>

            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
              <h2 className="text-xl font-black">
                7. Mutual acknowledgement
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Both parties must independently review the proposal.
                This acknowledgement does not replace independent legal
                advice or a formal signing process.
              </p>

              <label className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentA}
                  onChange={(e) => setConsentA(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-rose-500"
                />
                <span className="text-sm leading-6">
                  Party A confirms that they have reviewed the proposal
                  and understand that participation and agreement must
                  be voluntary.
                </span>
              </label>

              <label className="mt-5 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentB}
                  onChange={(e) => setConsentB(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-rose-500"
                />
                <span className="text-sm leading-6">
                  Party B confirms that they have reviewed the proposal
                  and understand that participation and agreement must
                  be voluntary.
                </span>
              </label>

              <button
                type="submit"
                className="primary-button mt-8 w-full"
              >
                Prepare agreement proposal
              </button>
            </section>

            <p className="text-center text-xs leading-6 text-gray-400">
              This is an initial website form. It does not yet send invitations,
              save information to a database, collect legally verified
              signatures or generate a legally executed agreement.
              Legal review is required before public use.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
