import { env } from "./env";

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

interface PlacesResponse {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: {
      author_name: string;
      rating: number;
      text: string;
      relative_time_description: string;
    }[];
  };
}

/**
 * Fetches live Google Reviews via the Places API when GOOGLE_PLACES_API_KEY
 * and GOOGLE_PLACES_PLACE_ID are set. Without them, returns null so the page
 * can fall back to clearly-labeled sample testimonials instead of pretending
 * to have real review data.
 */
export async function fetchGoogleReviews(): Promise<{ rating: number; total: number; reviews: GoogleReview[] } | null> {
  if (!env.googlePlaces.apiKey || !env.googlePlaces.placeId) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", env.googlePlaces.placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", env.googlePlaces.apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data: PlacesResponse = await res.json();
  if (!data.result) return null;

  return {
    rating: data.result.rating ?? 0,
    total: data.result.user_ratings_total ?? 0,
    reviews: (data.result.reviews ?? []).map((r) => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
    })),
  };
}
