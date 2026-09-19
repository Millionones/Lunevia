import { revalidatePath, revalidateTag } from "next/cache";

// On-demand revalidation endpoint.
//
// The public pages are cached with ISR (`export const revalidate = 3600`), so a
// CMS edit would otherwise take up to an hour to appear. The admin panel calls
// this endpoint (same-origin) after every successful create / update / delete —
// see `triggerRevalidate()` in `helpers/api.js` — which marks the cached pages
// stale. Next 16 regenerates each affected page lazily on its next visit, so the
// change shows the moment the page is reloaded.
//
// Auth: same-origin requests are allowed because the admin runs on this same
// origin. If a `REVALIDATE_SECRET` env is set, a matching `x-revalidate-secret`
// header is also accepted — use that to drive this from a server-to-server
// webhook on the backend later, keeping the secret off the client.
export async function POST(request) {
    const secret = process.env.REVALIDATE_SECRET;
    const provided = request.headers.get("x-revalidate-secret");
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // No Origin header => not a browser cross-site call (e.g. server webhook);
    // otherwise the Origin's host must match the request host (same-origin).
    const originHost = origin ? origin.replace(/^https?:\/\//, "") : null;
    const sameOrigin = !origin || (host != null && originHost === host);
    const secretOk = secret ? provided === secret : false;

    if (!sameOrigin && !secretOk) {
        return Response.json(
            { revalidated: false, error: "Forbidden" },
            { status: 401 }
        );
    }

    // Optional finer-grained targeting; defaults to a full public-site purge.
    let body = {};
    try {
        body = await request.json();
    } catch {
        // no / invalid body — fall through to the default full revalidation
    }
    const paths = Array.isArray(body.paths) ? body.paths : [];
    const tags = Array.isArray(body.tags) ? body.tags : [];

    try {
        if (paths.length === 0 && tags.length === 0) {
            // Purge every cached public page. Regeneration is lazy (per page, on
            // its next visit), so this stays cheap even on a small server.
            revalidatePath("/", "layout");
        } else {
            for (const p of paths) revalidatePath(p);
            for (const t of tags) revalidateTag(t, "max");
        }
        return Response.json({ revalidated: true, now: Date.now() });
    } catch (error) {
        console.error("revalidate failed", error);
        return Response.json(
            { revalidated: false, error: "Revalidation failed" },
            { status: 500 }
        );
    }
}
