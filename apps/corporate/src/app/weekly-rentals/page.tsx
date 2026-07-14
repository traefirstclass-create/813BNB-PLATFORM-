import type { Metadata } from "next";
import { ButtonLink } from "@813bnb/ui";
import { BOOKING_SITE_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Weekly Rentals in Tampa Bay",
  description:
    "Furnished weekly rentals across Tampa Bay for traveling workers, families in transition, insurance-claim housing, and relocations.",
};

const useCases = [
  { title: "Traveling workers", body: "Contractors, travel nurses on short assignments, and project crews who need a week or two, not a full lease." },
  { title: "Insurance-claim housing", body: "Displaced homeowners working with an adjuster while repairs are underway." },
  { title: "Relocations", body: "A landing pad while you house-hunt or wait on a closing date." },
  { title: "Family transitions", body: "Extra space for visiting family or a bridge between homes." },
];

export default function WeeklyRentalsInfoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Weekly Rentals in Tampa Bay</h1>
      <p className="mt-4 text-charcoal-600">
        Fully furnished, all-inclusive weekly stays across South Tampa, Downtown, Ybor City, Hyde Park, Davis
        Islands, Channelside, and Seminole Heights — booked and paid for directly, with no long-term lease.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {useCases.map((u) => (
          <div key={u.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-semibold text-charcoal-900">{u.title}</h2>
            <p className="mt-1 text-sm text-charcoal-600">{u.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-l border border-teal-200 bg-teal-50 p-6 text-center">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Ready to book?</h2>
        <p className="mt-1 text-sm text-charcoal-600">
          Search live availability and book directly on our reservation platform, 813BNB.
        </p>
        <ButtonLink href={`${BOOKING_SITE_URL}/weekly-rentals`} variant="accent" className="mt-4">
          Book a weekly stay
        </ButtonLink>
      </div>
    </div>
  );
}
