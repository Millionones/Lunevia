
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-lunevia.onrender.com/api/";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api-lunevia.onrender.com";

// Third-party booking engine. Every "Book Now" / "Book Your Stay" CTA opens this
// directly (new tab) instead of routing to an internal booking page.
export const BOOKING_URL =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "https://www.secure-booking-engine.com/accounts/irNf-cNuTdbCw-jo1dErsQ/properties/Q8K5oqMdhnRu9P_DKGkutw/booking-engine/web/source/4wsctBw6Oq6j-g9XuxeRzQ/";