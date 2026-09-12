// Mobile responsiveness audit harness (Phase 0 of the mobile-polish plan).
//
// Sweeps every route across a matrix of mobile/tablet/desktop viewports and both
// themes. For each combination it (a) asserts there is no horizontal overflow and
// (b) writes a full-page screenshot. Detail-page slugs are discovered dynamically
// from the list pages so the script keeps working as content changes.
//
// Usage (Node 24):
//   node scripts/mobile-audit.mjs                     # audits http://localhost:3000
//   BASE_URL=http://localhost:3000 node scripts/mobile-audit.mjs
//   TAG=baseline node scripts/mobile-audit.mjs        # screenshots -> .mobile-audit/baseline/
//
// Requires the app to already be running (next dev, or next build && next start).

import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TAG = process.env.TAG || "run";
const OUT_DIR = path.join(process.cwd(), ".mobile-audit", TAG);

const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 667 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-414", width: 414, height: 896 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const THEMES = ["light", "dark"];

// Static routes always audited. Detail routes are appended after discovery.
const STATIC_ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/About-LUNEVIA" },
  { name: "destinations", path: "/destinations" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/Contact-us" },
  { name: "faq", path: "/faq" },
  { name: "philosophy", path: "/philosophy-experience" },
  { name: "testimonials", path: "/testimonials" },
  { name: "privacy", path: "/privacy-policy" },
  { name: "terms", path: "/terms-and-conditions" },
];

const slug = (s) => s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();

// Pull the first in-app link under a list page whose href starts with `prefix`.
async function discoverFirstLink(page, listPath, prefix) {
  try {
    await page.goto(BASE_URL + listPath, { waitUntil: "networkidle", timeout: 45000 });
    const href = await page.evaluate((pfx) => {
      const a = Array.from(document.querySelectorAll("a[href]")).find((el) => {
        const h = el.getAttribute("href") || "";
        return h.startsWith(pfx) && h !== pfx && h.length > pfx.length + 1;
      });
      return a ? a.getAttribute("href") : null;
    }, prefix);
    return href;
  } catch (e) {
    console.warn(`  ! discovery failed for ${listPath}: ${e.message}`);
    return null;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  // --- Discover dynamic detail routes ---
  const discoverCtx = await browser.newContext();
  const discoverPage = await discoverCtx.newPage();
  const routes = [...STATIC_ROUTES];

  const destHref = await discoverFirstLink(discoverPage, "/destinations", "/destinations/");
  if (destHref) {
    routes.push({ name: "destination-detail", path: destHref });
    // Try to find a room link inside the destination detail page.
    const roomHref = await discoverFirstLink(discoverPage, destHref, destHref);
    if (roomHref && roomHref !== destHref) routes.push({ name: "room-detail", path: roomHref });
  }
  const blogHref = await discoverFirstLink(discoverPage, "/blog", "/blog/");
  if (blogHref) routes.push({ name: "blog-detail", path: blogHref });
  await discoverCtx.close();

  console.log(`Auditing ${routes.length} routes x ${VIEWPORTS.length} viewports x ${THEMES.length} themes`);
  console.log(`Screenshots -> ${OUT_DIR}\n`);

  const overflowFailures = [];
  const errors = [];

  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      // next-themes reads localStorage key "theme" on mount and sets <html class>.
      await ctx.addInitScript((t) => {
        try { localStorage.setItem("theme", t); } catch {}
      }, theme);

      const page = await ctx.newPage();

      for (const route of routes) {
        const label = `${route.name} | ${vp.name} | ${theme}`;
        try {
          await page.goto(BASE_URL + route.path, { waitUntil: "networkidle", timeout: 60000 });
          // Ensure the theme class is applied even if hydration timing races.
          await page.evaluate((t) => {
            const r = document.documentElement;
            r.classList.remove("light", "dark");
            r.classList.add(t);
          }, theme);

          // Trigger lazy/whileInView/ScrollTrigger content by scrolling through.
          await page.evaluate(async () => {
            await new Promise((resolve) => {
              let y = 0;
              const step = () => {
                window.scrollTo(0, y);
                y += Math.max(300, window.innerHeight * 0.8);
                if (y < document.body.scrollHeight) {
                  setTimeout(step, 120);
                } else {
                  window.scrollTo(0, 0);
                  setTimeout(resolve, 300);
                }
              };
              step();
            });
          });

          const metrics = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
          }));
          const overflow = metrics.scrollWidth - metrics.innerWidth;
          if (overflow > 1) {
            // Identify the widest offending elements for triage.
            const offenders = await page.evaluate(() => {
              const vw = window.innerWidth;
              const bad = [];
              for (const el of Array.from(document.body.querySelectorAll("*"))) {
                const r = el.getBoundingClientRect();
                if (r.right > vw + 1 && r.width > 4) {
                  bad.push({
                    tag: el.tagName.toLowerCase(),
                    cls: (el.className && el.className.toString ? el.className.toString() : "").slice(0, 80),
                    right: Math.round(r.right),
                    width: Math.round(r.width),
                  });
                }
              }
              return bad.sort((a, b) => b.right - a.right).slice(0, 5);
            });
            overflowFailures.push({ label, overflow, offenders });
            console.log(`  ✗ OVERFLOW +${overflow}px  ${label}`);
            offenders.forEach((o) =>
              console.log(`      ${o.tag}.${o.cls}  right=${o.right} w=${o.width}`)
            );
          } else {
            console.log(`  ✓ ${label}`);
          }

          const file = path.join(OUT_DIR, `${theme}__${vp.name}__${slug(route.name)}.png`);
          await page.screenshot({ path: file, fullPage: true });
        } catch (e) {
          errors.push({ label, error: e.message });
          console.log(`  ! ERROR ${label}: ${e.message}`);
        }
      }
      await ctx.close();
    }
  }

  await browser.close();

  const report = { baseUrl: BASE_URL, tag: TAG, routes: routes.map((r) => r.path), overflowFailures, errors };
  await writeFile(path.join(OUT_DIR, "report.json"), JSON.stringify(report, null, 2));

  console.log("\n=== SUMMARY ===");
  console.log(`Overflow failures: ${overflowFailures.length}`);
  console.log(`Errors: ${errors.length}`);
  if (overflowFailures.length === 0 && errors.length === 0) {
    console.log("PASS: no horizontal overflow on any route/viewport/theme.");
  }
  console.log(`Report: ${path.join(OUT_DIR, "report.json")}`);

  // Non-zero exit if the audit found real problems, so CI/callers can gate on it.
  process.exitCode = overflowFailures.length > 0 ? 1 : 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
