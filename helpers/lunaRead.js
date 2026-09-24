// Tracks which of Luna's suggested questions a visitor has already read, so the
// quick-reply chips rotate to fresh, unseen questions. Persisted in
// localStorage so "unread" survives across visits (mirrors the SSR-safe,
// try/catch style of lunaKnowledge.js). All access is guarded so it is a no-op
// during SSR or in private-mode/quota situations.
const READ_KEY = "luna_read_q";

// Canonical id for a question — shared by the writer and the chip filter so a
// stored question always matches the pool entry it came from.
export function normQ(q) {
    return String(q || "").toLowerCase().replace(/\s+/g, " ").trim();
}

export function getReadSet() {
    try {
        const raw = localStorage.getItem(READ_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
    } catch {
        return new Set();
    }
}

export function markRead(q) {
    const id = normQ(q);
    if (!id) return;
    try {
        const set = getReadSet();
        if (set.has(id)) return;
        set.add(id);
        localStorage.setItem(READ_KEY, JSON.stringify([...set]));
    } catch {
        /* SSR / private mode / quota — fine, just skip persisting */
    }
}

export function clearRead() {
    try {
        localStorage.removeItem(READ_KEY);
    } catch {
        /* no-op */
    }
}
