import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Investors",
  description: "Real estate investment opportunities with Tampa Bay Lodging Corporation — joint ventures, portfolio acquisitions, and build-to-rent.",
};

const ways = [
  { title: "Joint Ventures", body: "Partner directly on acquisition, renovation, and stabilization of individual assets." },
  { title: "Portfolio Acquisitions", body: "Participate in multi-property acquisitions across the Tampa Bay furnished-rental portfolio." },
  { title: "Development Projects", body: "Ground-up and value-add development opportunities in target Tampa Bay submarkets." },
  { title: "Build-to-Rent", body: "Purpose-built rental communities designed and operated for the furnished/mid-term rental model." },
];

export default function InvestorsPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-charcoal-900 px-4 py-20 text-center text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Investment Opportunities</p>
          <h1 className="mt-3 font-display text-display-1 font-semibold">
            Invest in Tampa Bay&apos;s furnished-rental market with an operator, not a spreadsheet
          </h1>
          <p className="mt-4 text-charcoal-200">
            Tampa Bay Lodging Corporation operates the assets we raise capital for — we&apos;re not a passthrough
            fund. {"{{INVESTMENT_THESIS_SUMMARY}}"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Why Tampa Bay</h2>
        <p className="mt-3 text-charcoal-600">
          {"{{MARKET_THESIS_TAMPA_BAY}}"} — placeholder pending Rasheen&apos;s market thesis, target returns, and
          track record. Do not publish investment claims without verified, compliant figures.
        </p>

        <h2 className="mt-10 font-display text-display-3 font-semibold text-charcoal-900">Ways to invest</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ways.map((w) => (
            <div key={w.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
              <h3 className="font-display text-base font-semibold text-charcoal-900">{w.title}</h3>
              <p className="mt-1 text-sm text-charcoal-600">{w.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 font-display text-display-3 font-semibold text-charcoal-900">Structure</h2>
        <p className="mt-3 text-charcoal-600">
          {"{{DEAL_STRUCTURE_DETAILS}}"} — minimum investment, target hold period, and distribution structure to be
          supplied before this section goes live.
        </p>

        <div className="mt-10 rounded-l border border-teal-200 bg-teal-50 p-6">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">Talk with us</h2>
          <p className="mt-1 text-sm text-charcoal-600">
            Share a bit about your investment interest and we&apos;ll follow up to schedule a call.
          </p>
          <div className="mt-4 max-w-lg">
            <LeadForm
              type="INVESTOR"
              sourcePage="/investors"
              submitLabel="Book a call"
              showInvestmentFields
              messagePlaceholder="What are you hoping to invest in?"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
