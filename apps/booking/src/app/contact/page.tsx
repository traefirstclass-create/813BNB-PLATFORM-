import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 813BNB — phone, email, office hours, and live chat.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Contact us</h1>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <dl className="space-y-4 text-charcoal-700">
            <div>
              <dt className="text-sm font-semibold text-charcoal-500">Phone</dt>
              <dd>{"{{PHONE_NUMBER}}"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-charcoal-500">Email</dt>
              <dd>{"{{CONTACT_EMAIL}}"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-charcoal-500">Office hours</dt>
              <dd>{"{{OFFICE_HOURS}}"}</dd>
            </div>
          </dl>
          <div className="mt-6 aspect-video w-full rounded-l bg-charcoal-100 flex items-center justify-center text-sm text-charcoal-400">
            Interactive map placeholder — connect Google Maps API key to enable.
          </div>
          <p className="mt-4 text-sm text-charcoal-500">
            Live chat is available via the widget in the bottom-right corner — first response is AI-assisted with a
            handoff to our team for anything it can&apos;t answer.
          </p>
        </div>
        <div>
          <LeadForm sourcePage="/contact" submitLabel="Send message" messagePlaceholder="How can we help?" />
        </div>
      </div>
    </div>
  );
}
