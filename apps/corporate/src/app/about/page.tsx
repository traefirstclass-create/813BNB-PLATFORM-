import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Tampa Bay Lodging Corporation and founder Rasheen \"Cuir\" Castell.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">About Tampa Bay Lodging Corporation</h1>
      <div className="mt-6 space-y-5 text-charcoal-700">
        <p>
          Tampa Bay Lodging Corporation is a Florida corporation based in Tampa, FL, founded and operated by
          Rasheen &ldquo;Cuir&rdquo; Castell. The company also operates under the trade names Fresh Start
          Management Group, Tom Well Investment Group, and Old West Lofts / Old West Studio Lofts.
        </p>
        <p>
          We serve guests, agencies, corporate clients, property owners, and investors across the Tampa Bay area —
          from short-term guest stays booked on 813BNB, to government and agency emergency housing, to full-service
          property management and real estate investment partnerships.
        </p>

        <h2 className="font-display text-lg font-semibold text-charcoal-900">Leadership</h2>
        <p>
          Rasheen &ldquo;Cuir&rdquo; Castell, Founder & Operator. {"{{LEADERSHIP_BIO}}"} — placeholder pending a
          verified bio from Rasheen.
        </p>

        <h2 className="font-display text-lg font-semibold text-charcoal-900">Mission</h2>
        <p>
          {"{{MISSION_STATEMENT}}"} — placeholder pending final copy.
        </p>
      </div>
    </div>
  );
}
