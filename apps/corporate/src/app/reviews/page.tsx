import type { Metadata } from "next";
import { Badge } from "@813bnb/ui";
import { prisma } from "@813bnb/db";
import { fetchGoogleReviews } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Guest, video, and agency testimonials for Tampa Bay Lodging Corporation and 813BNB.",
};

const sampleTestimonials = [
  {
    authorName: "Sample Guest",
    rating: 5,
    body: "Sample testimonial — replace with a real guest review before launch.",
    source: "GUEST",
  },
  {
    authorName: "Sample Agency Partner",
    rating: 5,
    body: "Sample agency testimonial — replace with a real partner quote before launch.",
    source: "AGENCY",
  },
];

export default async function ReviewsPage() {
  const [google, dbReviews] = await Promise.all([
    fetchGoogleReviews(),
    prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
  ]);

  const reviews = dbReviews.length > 0 ? dbReviews : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Reviews</h1>

      {google ? (
        <p className="mt-2 text-charcoal-600">
          {google.rating.toFixed(1)} ★ average from {google.total} Google reviews.
        </p>
      ) : (
        <p className="mt-2 text-sm text-charcoal-500">
          Live Google Reviews aren&apos;t connected yet — set <code>GOOGLE_PLACES_API_KEY</code> and{" "}
          <code>GOOGLE_PLACES_PLACE_ID</code> to pull real ratings automatically.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {google?.reviews.map((r, i) => (
          <div key={i} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-charcoal-900">{r.authorName}</p>
              <Badge variant="teal">Google</Badge>
            </div>
            <p className="mt-1 text-sm text-charcoal-500">{"★".repeat(r.rating)} · {r.relativeTime}</p>
            <p className="mt-2 text-sm text-charcoal-700">{r.text}</p>
          </div>
        ))}

        {!google &&
          (reviews ?? sampleTestimonials).map((r, i) => (
            <div key={i} className="rounded-l border border-dashed border-charcoal-300 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-charcoal-900">
                  {"authorName" in r ? r.authorName : "Sample"}
                </p>
                <Badge variant="orange">Sample</Badge>
              </div>
              <p className="mt-1 text-sm text-charcoal-500">{"★".repeat(r.rating)}</p>
              <p className="mt-2 text-sm text-charcoal-700">{"body" in r ? r.body : ""}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
