# Rework — Property edit page

Tracked here for a dedicated rework pass (kept on the `rework` branch).

## 1. Save flow is broken/confusing (multi-step wizard)
File: `app/(cms)/admin/(pages)/properties/[slug]/Properties.jsx` (+ `create/` twin).

- The editor is a 4-step wizard: Property Details → Rooms → Amenities → Near by Locations.
- `updateData()` only stores each step in memory and advances the tab. The **actual PUT to
  the backend fires only after step 4** (`updateProperty` → `put('destination/'+slug)`).
- So changing just the banner requires clicking "Save & Continue" through all 4 tabs.
- The step-1 `onSubmit` shows a **misleading** `toast.success("Property details saved")`
  even though nothing was persisted yet (see `PropertyDetails.jsx:77-95`).

**Goal:** let each section save/persist on its own (or a single explicit Save that PUTs
immediately), and only show a success toast on a real, confirmed save. Same fix for the
`create/` flow.

## 2. Scrolling issue on this page
- There is a scrolling problem on the property edit page that needs to be fixed
  (to be reproduced and diagnosed during the rework).

---
_Immediate/unrelated work (About-us Find Us → Google Map) shipped separately on `client-v2`._
