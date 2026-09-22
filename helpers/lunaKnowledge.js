import { get } from "./api";

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

// Returns the aggregated knowledge base ({ brand, faqs, rooms, destinations })
// or null on failure (Luna then shows a graceful "reach us directly" fallback).
export async function getLunaKnowledge() {
    const cached = readCache();
    if (cached) return cached;

    try {
        const response = await get("luna/knowledge");
        const kb = response?.data ?? null;
        if (kb) writeCache(kb);
        return kb;
    } catch {
        return null;
    }
}
