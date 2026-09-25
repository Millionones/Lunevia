import { get } from "./api";
import { LUNA_FALLBACK_KB, withFallback, hasKnowledge } from "./lunaFallback";

// Luna fetches the whole knowledge base once per browser session and answers
// entirely on the client — no server round-trip per message. The payload is
// small (FAQ text + short room/destination summaries), so we cache it in
// sessionStorage and reuse it across page navigations within the session.
const CACHE_KEY = "luna_kb";

function readCache() {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function writeCache(kb) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(kb));
    } catch {
        /* private mode / quota — fine, just skip caching */
    }
}

// Returns the aggregated knowledge base ({ brand, faqs, rooms, destinations }).
// Never returns null: if the backend is unreachable or sends nothing usable, Luna
// falls back to the shipped defaults so the chat is never "literally plain".
export async function getLunaKnowledge() {
    const cached = readCache();
    if (cached) return cached;

    try {
        const response = await get("luna/knowledge");
        const kb = response?.data ?? null;
        if (hasKnowledge(kb)) {
            // Good live data — backfill any gaps and cache it for the session.
            const merged = withFallback(kb);
            writeCache(merged);
            return merged;
        }
        // Reached the backend but it had nothing to say — use the local defaults
        // WITHOUT caching, so a later reload can still pick up real data.
        return LUNA_FALLBACK_KB;
    } catch {
        // Network/backend failure — same graceful local defaults, uncached.
        return LUNA_FALLBACK_KB;
    }
}
