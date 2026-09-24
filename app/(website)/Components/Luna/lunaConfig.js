// Luna's avatar. Drop a dedicated image at `public/luna.png` and it is used
// everywhere; until then the on-brand crescent mark is shown automatically via
// the <img> onError fallback. NOTE (next/image asset caching): if you replace
// luna.png later, rename the file to bust the cache.
export const LUNA_AVATAR = "/luna.png"
export const LUNA_FALLBACK_AVATAR = "/crescent-mark.png"

export const LUNA_INTRO_TEXT = "Hi, I am Luna, how may I assist you?"

// Full-figure waving pose for the homepage-hero character. Luna peeks in from
// the bottom-right corner, already mid-wave. Falls back to the round avatar if
// the pose image is missing. (Rename this file if you swap the art later —
// next/image caches by URL. See lunevia-nextimage-asset-cache.)
export const LUNA_POSE_HERO = "/luna/luna-hero.png"

// Copy shown in the hero character's speech bubble.
export const LUNA_HERO_BUBBLE = "Hi, I'm Luna 🌙 Need help planning your stay?"
