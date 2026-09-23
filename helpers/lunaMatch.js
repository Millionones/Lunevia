// Rule-based retrieval for Luna. Pure, dependency-free: builds a small index of
// Q&A entries from the knowledge base (FAQs + derived brand/room/destination
// answers) and scores the user's query against it by keyword/tag overlap plus a
// phrase bonus. Returns the best answer above a threshold, else a friendly
// fallback with suggested questions.

const STOPWORDS = new Set([
    "the", "and", "for", "are", "was", "you", "your", "our", "how", "what",
    "when", "where", "does", "will", "can", "with", "about", "have", "has",
    "there", "this", "that", "from", "any", "all", "into", "out", "not", "but",
    "get", "please", "tell", "want", "need", "would", "could", "should", "who",
]);

const tokenize = (text = "") =>
    String(text)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOPWORDS.has(w));

const money = (n) => (Number(n) > 0 ? `₹${Number(n).toLocaleString("en-IN")}` : "");

// Build the searchable index once per knowledge base.
export function buildIndex(kb) {
    if (!kb) return [];
    const entries = [];
    const brand = kb.brand || {};
    const contact = brand.contact || {};
    const property = brand.property || {};

    // Real FAQs (already plain text from the backend).
    for (const f of kb.faqs || []) {
        if (f?.q && f?.a) {
            entries.push({
                q: f.q,
                a: f.a,
                tags: f.tags && f.tags.length ? f.tags : tokenize(f.q),
                suggest: true,
            });
        }
    }

    // Derived brand answers so common intents always resolve. `priority: 1`
    // lets these high-level intents win ties against incidental FAQ keyword
    // overlaps (e.g. "rooms" also appears in a Wi-Fi FAQ).
    if (brand.about) {
        entries.push({
            q: `About ${brand.name || "Lunevia"}`,
            a: brand.about,
            tags: tokenize(`about ${brand.name} lunevia who what story`),
            suggest: true,
            priority: 1,
        });
    }
    if (property.location) {
        entries.push({
            q: "Where are you located?",
            a: `${property.name || brand.name} is located in ${property.location}.`,
            tags: tokenize(`where located location address reach map ${property.location} ${property.name}`),
            suggest: true,
            priority: 1,
        });
    }
    if (contact.phone || contact.email || contact.whatsapp) {
        const bits = [];
        if (contact.phone) bits.push(`call us at ${contact.phone}`);
        if (contact.whatsapp) bits.push(`WhatsApp ${contact.whatsapp}`);
        if (contact.email) bits.push(`email ${contact.email}`);
        entries.push({
            q: "How can I contact you?",
            a: `You can ${bits.join(", ")}.`,
            tags: tokenize("contact phone call whatsapp email reach enquiry book booking reservation"),
            suggest: true,
            priority: 1,
        });
    }

    // Rooms — a summary entry plus one entry per room.
    const rooms = kb.rooms || [];
    if (rooms.length) {
        const list = rooms
            .map((r) => `${r.title}${money(r.price) ? ` (from ${money(r.price)})` : ""}`)
            .join(", ");
        entries.push({
            q: "What rooms are available?",
            a: `We offer: ${list}. Ask me about any room for more detail.`,
            tags: tokenize("rooms room accommodation stay suite cottage villa available options"),
            suggest: true,
            priority: 1,
        });
        for (const r of rooms) {
            const parts = [];
            if (r.description) parts.push(r.description);
            if (money(r.price)) parts.push(`Price starts from ${money(r.price)} per night.`);
            if (r.features && r.features.length) parts.push(`Features: ${r.features.join(", ")}.`);
            entries.push({
                q: r.title,
                a: parts.join(" ") || r.title,
                tags: tokenize(`${r.title} room price rate cost features ${r.destinationTitle || ""}`),
                suggest: false,
            });
        }
    }

    // Destinations.
    for (const d of kb.destinations || []) {
        if (d?.title) {
            entries.push({
                q: d.title,
                a: d.description || d.title,
                tags: tokenize(`${d.title} destination property resort stay location`),
                suggest: false,
            });
        }
    }

    return entries;
}

// A few starter questions shown as quick-reply chips.
export function getSuggestions(kb, n = 5) {
    const idx = buildIndex(kb);
    return idx
        .filter((e) => e.suggest)
        .slice(0, n)
        .map((e) => e.q);
}

// Score a single entry against the query tokens.
function scoreEntry(entry, queryTokens, rawQuery) {
    let score = 0;
    const tagSet = new Set(entry.tags);
    for (const t of queryTokens) {
        if (tagSet.has(t)) score += 2;
        if (entry.q.toLowerCase().includes(t)) score += 1;
    }
    // Phrase bonus: the whole (normalised) question appears in the query or vice versa.
    const q = entry.q.toLowerCase();
    if (rawQuery.length > 3 && (rawQuery.includes(q) || q.includes(rawQuery))) score += 3;
    return score;
}

const FALLBACK =
    "I'm not sure about that one yet. You can reach our team directly, or try one of the questions below.";

// Match a user query. Returns { answer, suggestions, matched }.
export function matchLuna(query, kb) {
    const suggestions = getSuggestions(kb, 5);
    const rawQuery = String(query || "").toLowerCase().trim();
    const queryTokens = tokenize(query);

    if (!kb || !queryTokens.length) {
        return { answer: FALLBACK, suggestions, matched: false };
    }

    const index = buildIndex(kb);
    let best = null;
    let bestScore = 0;
    for (const entry of index) {
        const s = scoreEntry(entry, queryTokens, rawQuery);
        // Higher score wins; on a tie, the higher-priority (intent) entry wins.
        if (
            s > bestScore ||
            (s === bestScore && s > 0 && (entry.priority || 0) > (best?.priority || 0))
        ) {
            bestScore = s;
            best = entry;
        }
    }

    // Threshold: need at least one solid keyword/tag hit.
    if (best && bestScore >= 2) {
        return { answer: best.a, suggestions, matched: true };
    }
    return { answer: FALLBACK, suggestions, matched: false };
}
