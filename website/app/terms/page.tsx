
import Link from "next/link";
import { Heart } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fff8fa] px-5 py-12 text-[#30232a]">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-rose-600">
          <Heart fill="currentColor" size={22} />
          Prominent Hearts
        </Link>

        <h1 className="mt-12 text-4xl font-black">Terms of Use</h1>
        <p className="mt-3 text-sm text-gray-500">
          Preliminary terms for Prominent Hearts, owned by All Prominent Ghana Limited.
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">1. Eligibility</h2>
            <p className="mt-3">
              Prominent Hearts is exclusively for adults aged 18 years and above.
              Anyone under 18 is not permitted to register or use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">2. Honest information</h2>
            <p className="mt-3">
              Members must provide truthful information about themselves,
              their age, identity and relationship intentions. Impersonation
              and misleading profiles are prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">3. Respectful conduct</h2>
            <p className="mt-3">
              Harassment, threats, hate speech, fraud, exploitation,
              intimidation and abusive behaviour are not permitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">4. Relationship intentions</h2>
            <p className="mt-3">
              Members should select relationship intentions honestly.
              The platform does not guarantee marriage, relationships
              or compatibility between members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">5. Safety and reporting</h2>
            <p className="mt-3">
              Members should protect their personal information, exercise
              caution when meeting people and report suspicious or abusive
              accounts. Never send money to someone simply because they
              request it through the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">6. Account restrictions</h2>
            <p className="mt-3">
              Accounts that violate platform rules may be investigated,
              restricted or suspended, subject to the platform's procedures
              and applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">7. Changes to these terms</h2>
            <p className="mt-3">
              These terms may be updated as the platform develops.
              Members should review the current version periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#30232a]">8. Contact</h2>
            <p className="mt-3">
              Prominent Hearts is owned by All Prominent Ghana Limited.
              Official support and contact details will be published
              on the platform.
            </p>
          </section>
        </div>

        <p className="mt-12 rounded-2xl bg-rose-50 p-5 text-sm leading-6 text-rose-800">
          Important: This is an initial website draft, not a final legal
          agreement. It should be reviewed and completed by a qualified
          legal professional before public launch.
        </p>

        <Link href="/" className="mt-8 inline-block font-bold text-rose-600">
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
