import { serverGet } from "./serverApi";
import { pageContent } from "./pageDefaults";

// Server Component helper: fetch a page's CMS content and deep-merge it over the
// shipped defaults. Returns the merged content object, so callers can read
// `content.hero`, `content.gallery`, etc. with confidence they're populated.
// serverGet returns null on failure (Render cold start / offline), in which case
// the pure defaults render — the page never breaks.
export async function loadPage(page) {
    const res = await serverGet(`website/page/${page}`);
    return pageContent(page, res?.data?.content);
}
