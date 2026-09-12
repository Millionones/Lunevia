import { API_URL } from "../config";

/**
 * Server-side data fetch with ISR caching. Use only in Server Components.
 * Returns the parsed JSON body, or `null` on any failure so callers can
 * render a graceful fallback (the live API is Render free-tier and can
 * cold-start / time out during `next build`).
 *
 * @param {string} path      API path relative to API_URL (e.g. "website/destination?limit=6")
 * @param {number} revalidate ISR revalidation window in seconds (default 1h)
 */
export async function serverGet(path, revalidate = 3600) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
