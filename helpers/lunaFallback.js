import { PAGE_DEFAULTS } from "./pageDefaults";

// Offline/last-resort knowledge base for Luna. The live knowledge is fetched from
// the backend (see lunaKnowledge.js), but that call can fail — Render cold-starts,
// a network blip, CORS, or a freshly-seeded DB — and when it returns nothing the
// chat used to open "literally plain" (no FAQ chips, only the fallback line).
//
// To guarantee Luna always has something useful to say, we build a KB from the
// same defaults the public FAQ page ships (PAGE_DEFAULTS.faq.groups) plus the
// brand/contact constants. Shape matches what buildIndex() in lunaMatch expects:
// { brand:{name,about,contact,property}, faqs:[{q,a}], rooms:[], destinations:[] }.

const faqs = (PAGE_DEFAULTS?.faq?.groups || [])
    .flatMap((g) => g?.items || [])
    .filter((it) => it?.q && it?.a)
    .map((it) => ({ q: it.q, a: it.a }));

const contact = PAGE_DEFAULTS?.contact?.form || {};

export const LUNA_FALLBACK_KB = {
    brand: {
        name: "Lunevia",
        about:
            "Lunevia is a collection of luxury resorts and retreats in Kerala. Our flagship, Crown Woods Munnar, sits amid tea estates, valleys, and waterfalls — a perfect ambience for a relaxed, nature-immersed stay.",
        contact: {
            phone: (contact.phones && contact.phones[0]) || "+91 6238899339",
            whatsapp: "+91 6238899339",
            email: contact.email || "info@lunevia.in",
        },
        property: {
            name: "Crown Woods Munnar",
            location: "Munnar, Idukki, Kerala",
        },
    },
    faqs,
    rooms: [],
    destinations: [],
};

// True when a knowledge base actually carries something Luna can answer with, so
// we can tell an empty/failed backend response apart from a good one.
export function hasKnowledge(kb) {
    if (!kb) return false;
    const hasFaqs = Array.isArray(kb.faqs) && kb.faqs.length > 0;
    const hasRooms = Array.isArray(kb.rooms) && kb.rooms.length > 0;
    const hasDest = Array.isArray(kb.destinations) && kb.destinations.length > 0;
    const hasBrand = !!(kb.brand && (kb.brand.about || kb.brand.property?.location));
    return hasFaqs || hasRooms || hasDest || hasBrand;
}

// Merge a live KB with the fallback so the chips are never empty: keep everything
// the backend sent, but backfill FAQs and brand info when they're missing.
export function withFallback(kb) {
    if (!hasKnowledge(kb)) return LUNA_FALLBACK_KB;
    const merged = { ...kb };
    if (!Array.isArray(merged.faqs) || merged.faqs.length === 0) {
        merged.faqs = LUNA_FALLBACK_KB.faqs;
    }
    if (!merged.brand || (!merged.brand.about && !merged.brand.property?.location)) {
        merged.brand = { ...LUNA_FALLBACK_KB.brand, ...(merged.brand || {}) };
    }
    return merged;
}
