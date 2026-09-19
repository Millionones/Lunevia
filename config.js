
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-lunevia.onrender.com/api/";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api-lunevia.onrender.com";

// Guard against silently editing production data during local development. When
// NEXT_PUBLIC_API_URL is unset we fall back to the LIVE Render API above, so a
// missing Lunevia/.env.local would point admin CRUD at prod. Warn loudly (dev
// only) so it's obvious. In production the env is always set (Vercel), so this
// never fires there.
if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "[config] NEXT_PUBLIC_API_URL is not set — using the LIVE production API " +
      "(https://api-lunevia.onrender.com). Create Lunevia/.env.local to target a local backend " +
      "before using the CMS, or you will be editing production data."
  );
}

// Third-party booking engine. Every "Book Now" / "Book Your Stay" CTA opens this
// directly (new tab) instead of routing to an internal booking page.
export const BOOKING_URL =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "https://www.secure-booking-engine.com/accounts/irNf-cNuTdbCw-jo1dErsQ/properties/Q8K5oqMdhnRu9P_DKGkutw/booking-engine/web/source/4wsctBw6Oq6j-g9XuxeRzQ/";