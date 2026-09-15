// Declarative editor schema per page, consumed by the admin Pages editor.
// The editor renders these groups/fields generically, so adding an editable
// section is a data change here (+ a matching key in PAGE_DEFAULTS + the
// component reading that key). `name` is a dot-path into the page `content`.
//
// Field types:
//   text | textarea            — a single value at `name`
//   image                      — image upload storing a URL at `name`
//   stringlist                 — array of primitives at `name`; `kind` = text|textarea|image
//   list                       — array of objects at `name`; `itemFields` are relative-name fields
//
// Groups are just visual sections (a titled card).

const heroFields = () => [
    { type: "text", name: "hero.eyebrow", label: "Eyebrow" },
    { type: "text", name: "hero.title", label: "Title" },
    { type: "textarea", name: "hero.subtitle", label: "Subtitle" },
    { type: "image", name: "hero.image", label: "Banner image" },
    { type: "text", name: "hero.buttonLabel", label: "Button label (optional)" },
    { type: "text", name: "hero.buttonLink", label: "Button link (optional)", placeholder: "/contact-us or https://…" },
];

export const PAGE_SCHEMA = {
    home: [
        {
            label: "Banner",
            fields: [
                { type: "text", name: "hero.eyebrow", label: "Eyebrow" },
                { type: "text", name: "hero.tagline", label: "Tagline" },
                {
                    type: "list",
                    name: "hero.slides",
                    label: "Hero slides",
                    addLabel: "Add slide",
                    itemFields: [
                        { type: "image", name: "src", label: "" },
                        { type: "text", name: "alt", label: "Alt text" },
                    ],
                },
            ],
        },
        {
            label: "Story section",
            fields: [
                { type: "image", name: "story.image", label: "Image" },
                { type: "text", name: "story.eyebrow", label: "Eyebrow" },
                { type: "text", name: "story.title", label: "Title" },
                { type: "textarea", name: "story.subhead", label: "Sub-headline" },
                { type: "stringlist", name: "story.paragraphs", label: "Paragraphs", kind: "textarea", addLabel: "Add paragraph" },
                { type: "text", name: "story.ctaLabel", label: "CTA label" },
                { type: "text", name: "story.ctaLink", label: "CTA link" },
            ],
        },
        {
            label: "Destinations section",
            fields: [
                { type: "text", name: "destinations.heading", label: "Heading" },
                { type: "textarea", name: "destinations.subtext", label: "Subtext" },
            ],
        },
        {
            label: "Gallery images",
            help: "Leave empty to use the site's default gallery images.",
            fields: [
                { type: "stringlist", name: "gallery.images", label: "Images", kind: "image", addLabel: "Add image" },
            ],
        },
        {
            label: "Testimonials section",
            fields: [
                { type: "text", name: "testimonials.badge", label: "Badge" },
                { type: "text", name: "testimonials.heading", label: "Heading" },
                { type: "textarea", name: "testimonials.subtext", label: "Subtext" },
                {
                    type: "list",
                    name: "testimonials.items",
                    label: "Testimonials",
                    addLabel: "Add testimonial",
                    itemFields: [
                        { type: "textarea", name: "text", label: "Quote" },
                        { type: "text", name: "name", label: "Name" },
                        { type: "text", name: "role", label: "Role / location" },
                        { type: "image", name: "image", label: "Photo" },
                    ],
                },
            ],
        },
    ],

    about: [
        { label: "Banner", fields: heroFields() },
        {
            label: "About section",
            fields: [
                { type: "text", name: "about.eyebrow", label: "Eyebrow" },
                { type: "textarea", name: "about.title", label: "Title" },
                { type: "image", name: "about.image", label: "Image" },
                { type: "stringlist", name: "about.paragraphs", label: "Paragraphs", kind: "textarea", addLabel: "Add paragraph" },
            ],
        },
        {
            label: "USPs",
            fields: [
                { type: "text", name: "usps.heading", label: "Heading" },
                { type: "textarea", name: "usps.subtext", label: "Subtext" },
                {
                    type: "list",
                    name: "usps.items",
                    label: "USP cards",
                    addLabel: "Add USP",
                    itemFields: [
                        { type: "text", name: "title", label: "Title" },
                        { type: "textarea", name: "body", label: "Body" },
                    ],
                },
            ],
        },
        {
            label: "Location",
            fields: [
                { type: "text", name: "location.heading", label: "Heading" },
                { type: "textarea", name: "location.subtext", label: "Subtext" },
                { type: "text", name: "location.label", label: "Location label" },
                { type: "text", name: "location.coordinates", label: "Coordinates" },
            ],
        },
    ],

    experience: [
        { label: "Banner", fields: heroFields() },
        {
            label: "Philosophy section",
            fields: [
                { type: "image", name: "philosophy.image", label: "Image" },
                { type: "text", name: "philosophy.eyebrow", label: "Eyebrow" },
                { type: "textarea", name: "philosophy.title", label: "Title" },
                { type: "stringlist", name: "philosophy.paragraphs", label: "Paragraphs", kind: "textarea", addLabel: "Add paragraph" },
            ],
        },
        {
            label: "Pillars",
            fields: [
                { type: "text", name: "pillars.heading", label: "Heading" },
                {
                    type: "list",
                    name: "pillars.items",
                    label: "Pillars",
                    addLabel: "Add pillar",
                    itemFields: [
                        { type: "text", name: "title", label: "Title" },
                        { type: "textarea", name: "body", label: "Body" },
                    ],
                },
            ],
        },
        {
            label: "Experiences",
            fields: [
                { type: "text", name: "experiences.eyebrow", label: "Eyebrow" },
                { type: "text", name: "experiences.heading", label: "Heading" },
                { type: "textarea", name: "experiences.subtext", label: "Subtext" },
                {
                    type: "list",
                    name: "experiences.items",
                    label: "Experience cards",
                    addLabel: "Add experience",
                    itemFields: [
                        { type: "text", name: "title", label: "Title" },
                        { type: "textarea", name: "text", label: "Text" },
                    ],
                },
            ],
        },
        {
            label: "Closing section",
            fields: [
                { type: "text", name: "closing.eyebrow", label: "Eyebrow" },
                { type: "textarea", name: "closing.title", label: "Title" },
                { type: "textarea", name: "closing.subtext", label: "Subtext" },
                { type: "text", name: "closing.ctaLabel", label: "CTA label" },
                { type: "text", name: "closing.ctaLink", label: "CTA link" },
            ],
        },
    ],

    contact: [
        { label: "Banner", fields: heroFields() },
        {
            label: "Contact details",
            fields: [
                { type: "text", name: "form.eyebrow", label: "Eyebrow" },
                { type: "textarea", name: "form.heading", label: "Heading" },
                { type: "textarea", name: "form.subtext", label: "Subtext" },
                { type: "textarea", name: "form.address", label: "Address" },
                { type: "stringlist", name: "form.phones", label: "Phone numbers", kind: "text", addLabel: "Add phone" },
                { type: "text", name: "form.email", label: "Email" },
            ],
        },
    ],

    destinations: [{ label: "Banner", fields: heroFields() }],

    blog: [
        { label: "Banner", fields: heroFields() },
        {
            label: "List header",
            fields: [
                { type: "text", name: "list.eyebrow", label: "Eyebrow" },
                { type: "text", name: "list.heading", label: "Heading" },
                { type: "textarea", name: "list.subtext", label: "Subtext" },
            ],
        },
    ],

    faq: [
        { label: "Banner", fields: heroFields() },
        {
            label: "FAQ groups",
            help: "Each group is a titled block of question/answer pairs.",
            fields: [
                {
                    type: "list",
                    name: "groups",
                    label: "Groups",
                    addLabel: "Add group",
                    itemFields: [
                        { type: "text", name: "heading", label: "Group heading" },
                        { type: "textarea", name: "subtext", label: "Group subtext" },
                        {
                            type: "list",
                            name: "items",
                            label: "Questions",
                            addLabel: "Add question",
                            itemFields: [
                                { type: "text", name: "q", label: "Question" },
                                { type: "textarea", name: "a", label: "Answer" },
                            ],
                        },
                    ],
                },
            ],
        },
    ],

    testimonials: [
        { label: "Banner", fields: heroFields() },
        {
            label: "Testimonials section",
            fields: [
                { type: "text", name: "section.eyebrow", label: "Eyebrow" },
                { type: "textarea", name: "section.heading", label: "Heading" },
                { type: "textarea", name: "section.subtext", label: "Subtext" },
                {
                    type: "list",
                    name: "section.items",
                    label: "Testimonials",
                    addLabel: "Add testimonial",
                    itemFields: [
                        { type: "text", name: "name", label: "Name" },
                        { type: "text", name: "place", label: "Place" },
                        { type: "text", name: "title", label: "Title" },
                        { type: "textarea", name: "text", label: "Quote" },
                        { type: "image", name: "image", label: "Photo" },
                    ],
                },
            ],
        },
    ],

    privacy: [{ label: "Banner", fields: heroFields() }],
    terms: [{ label: "Banner", fields: heroFields() }],
};

// Build a blank item for a `list` field from its itemFields (nested lists → []).
export function blankItem(itemFields) {
    const obj = {};
    for (const f of itemFields) {
        obj[f.name] = f.type === "list" ? [] : "";
    }
    return obj;
}
