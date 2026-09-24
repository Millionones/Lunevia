// Luna's avatar. Drop a dedicated image at `public/luna.png` and it is used
// everywhere; until then the on-brand crescent mark is shown automatically via
// the <img> onError fallback. NOTE (next/image asset caching): if you replace
// luna.png later, rename the file to bust the cache.
export const LUNA_AVATAR = "/luna.png"
export const LUNA_FALLBACK_AVATAR = "/crescent-mark.png"

export const LUNA_INTRO_TEXT = "Hi, I am Luna, how may I assist you?"

// Full-figure poses for the animated homepage-hero character. Both share an
// identical canvas so they crossfade in place (idle → raises hand to wave).
// Fall back to the round avatar if a pose image is missing.
export const LUNA_POSE_IDLE = "/luna/luna-idle.png"
export const LUNA_POSE_WAVE = "/luna/luna-wave.png"

// Copy shown in the hero character's speech bubble.
export const LUNA_HERO_BUBBLE = "Hi, I'm Luna 🌙 Need help planning your stay?"
