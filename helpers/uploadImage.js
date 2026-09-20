import { post } from "./api";

// Shared CMS image uploader. Every admin form uses this instead of hand-rolling
// its own upload, so image handling behaves identically everywhere and can't
// silently fail (see the "Banner image is required" root-cause fix).
//
// What it does:
//  1. Validates the file type/size on the client (fast, clear errors).
//  2. Downscales/re-encodes large raster images IN THE BROWSER before upload, so
//     a 4K/8K original never gets shipped whole to the free-tier API (the thing
//     that stalled/failed). SVG and GIF pass through untouched (vector/animated).
//  3. Uploads via the existing `post()` helper to `common/image/:folder`.
//  4. Throws a real, message-bearing Error so callers can show the true cause.

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

// Sanity cap. Raster images are downscaled in the browser BEFORE this is checked,
// so it only really bites pass-through types (SVG/GIF) or a raster that failed to
// decode and is being shipped whole. Generous so legitimate 4K/8K photos — which
// downscale to a few hundred KB — always get through.
const MAX_INPUT_BYTES = 40 * 1024 * 1024; // 40MB

// Longest edge after client downscale. The backend re-encodes to 1600px webp, so
// 2000 leaves headroom while cutting a 4K upload to a fraction of its size.
const MAX_EDGE = 2000;
const WEBP_QUALITY = 0.82;

// Downscale a raster image in the browser. Returns a File to upload (or the
// original file when compression isn't applicable / not worth it).
async function downscaleInBrowser(file) {
  // Vector (SVG) and animated (GIF) formats must not be rasterized to a canvas.
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  if (typeof document === "undefined" || typeof createImageBitmap === "undefined") {
    return file; // not in a browser (SSR) — let the server handle the original
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // decode failed — upload the original and let the server try
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));

  // Small, already-reasonable images: don't bother re-encoding.
  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
    bitmap.close?.();
    return file;
  }

  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close?.();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
  );
  if (!blob) return file; // toBlob unsupported — fall back to the original

  const base = (file.name || "image").replace(/\.[^.]+$/, "");
  return new File([blob], `${base}.webp`, { type: "image/webp" });
}

/**
 * Upload a single image to the CMS storage bucket.
 * @param {File} file    the file chosen by the user
 * @param {string} folder destination folder (e.g. "destination", "about-property")
 * @returns {Promise<string>} the public URL of the stored image
 * @throws {Error} with a human-readable message on any failure
 */
export async function uploadImage(file, folder) {
  if (!file) throw new Error("No file selected");

  if (file.type && !ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Use PNG, JPG, WEBP, SVG or GIF.");
  }

  // Downscale FIRST, then size-gate what we actually send. A 4K/8K PNG can be
  // 15-40MB on disk but shrinks to a few hundred KB here — checking the cap
  // before this would reject exactly the files the downscaler exists to rescue.
  const toSend = await downscaleInBrowser(file);

  if (toSend.size > MAX_INPUT_BYTES) {
    const mb = Math.round(MAX_INPUT_BYTES / (1024 * 1024));
    throw new Error(
      `Image is too large (max ${mb}MB after processing). Please choose a smaller file.`
    );
  }

  const formData = new FormData();
  formData.append("file", toSend, toSend.name || file.name || "image");

  try {
    const res = await post(`common/image/${folder}`, formData);
    const url = res?.data?.url;
    if (!url) throw new Error("Upload succeeded but no image URL was returned.");
    return url;
  } catch (err) {
    // `post()` rejects with the server's error body ({ message } or string) on a
    // response, or throws on a network error — surface the most useful message.
    const message =
      (err && err.message) ||
      (err && err.data && err.data.message) ||
      (typeof err === "string" ? err : null) ||
      "Image upload failed. Please try again.";
    throw new Error(message);
  }
}

export default uploadImage;
