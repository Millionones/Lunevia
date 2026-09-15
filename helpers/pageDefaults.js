// Single source of truth for CMS-managed page content.
//
// These are the site's current hardcoded values. Both the public website (as
// render fallbacks) and the admin "Pages" editor (as starting values) consume
// them, so a page always renders correctly even before anything is saved, and
// the client edits real starting content rather than blanks.
//
// The backend stores a per-page `content` object; the website deep-merges the
// saved content OVER these defaults. Keep keys in sync with the components that
// read them, with helpers/pageSchema.js (the editor field map), and with the
// component render code.

const HERO_EXTRA = { buttonLabel: "", buttonLink: "" };

export const PAGE_DEFAULTS = {
    home: {
        hero: {
            eyebrow: "Luxury Resorts & Retreats",
            tagline: "Where architecture meets landscape.",
            slides: [
                { src: "/lunevia_home_hero1.jpg", alt: "A Lunevia resort amid the landscape" },
                { src: "/lunevia_home_hero2.jpg", alt: "A Lunevia resort, where architecture meets landscape" },
                { src: "/lunevia_home_hero3.jpg", alt: "A Lunevia backwater retreat at dusk" },
                { src: "/client-room-gallery/LBM05356.jpg", alt: "The light-filled reception at a Lunevia retreat" },
            ],
        },
        story: {
            image: "/About_Image_Lunevia.png",
            eyebrow: "Our Philosophy",
            title: "The LUNEVIA Way",
            subhead: "At LUNEVIA, we believe travel is not about places — it is about transformation.",
            paragraphs: [
                "Each of our properties is carefully selected, thoughtfully designed, and deeply connected to its surroundings. From secluded beachfront sanctuaries to hillside retreats wrapped in nature, every LUNEVIA stay is curated to awaken the senses and slow the rhythm of life.",
                "We create spaces where architecture meets landscape, where culture meets comfort, and where every detail is intentional.",
            ],
            ctaLabel: "Explore our locations",
            ctaLink: "/destinations",
        },
        destinations: {
            heading: "Discover Our Destinations",
            subtext: "Each LUNEVIA property is a world of its own — united by philosophy, distinct in character.",
        },
        gallery: {
            heading: "Moments of Refined Resort Living",
            eyebrow: "GALLERY",
            images: [],
        },
        testimonials: {
            badge: "Testimonials",
            heading: "What our guests say",
            subtext: "Lovely people, amazing experiences — stories from stays across Lunevia.",
            items: [
                { text: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The warmth of the hospitality and attention to detail created something far more meaningful than a vacation — it was restoration.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150", name: "Aisha & Rahman", role: "Dubai" },
                { text: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150", name: "Daniel M.", role: "London" },
                { text: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150", name: "Meera S.", role: "Mumbai" },
                { text: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150", name: "Priyanka N.", role: "Bangalore" },
                { text: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150", name: "Thomas K.", role: "Berlin" },
                { text: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150", name: "Fatima A.", role: "Abu Dhabi" },
                { text: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150", name: "Arjun & Neha", role: "Hyderabad" },
                { text: "It was great not to have to use the inter-island terminal. The service is impeccable — they make you feel so welcome, and everything is truly a can-do attitude.", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150", name: "Christine Glassier", role: "Comfortable & Relaxing" },
                { text: "The stillness of the water and the quiet luxury of our suite gave us the calm we had been craving for years. We are already planning our return to Lunevia.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150", name: "Omar & Layla", role: "Doha" },
            ],
        },
    },

    about: {
        hero: {
            eyebrow: "Our Story",
            title: "About LUNEVIA",
            subtitle: "",
            breadcrumbs: ["Home", "About LUNEVIA"],
            image: "/about-us-about.webp",
            zoom: "out",
            ...HERO_EXTRA,
        },
        about: {
            eyebrow: "About Us",
            title: "Elevated Resort Living — Defined by Thoughtful Design, Genuine Hospitality, and Timeless Comfort",
            image: "/about-us-about2.webp",
            paragraphs: [
                "Lunevia is a hospitality-focused brand engaged in owning, leasing, developing, and operating resorts, restaurants, and other hospitality properties. Our vision is to create destinations that combine comfort, elegance, and genuine hospitality, while delivering sustainable value through professional management and guest-centric operations.",
                "At Lunevia, we are committed to excellence in every aspect of hospitality — from property selection and concept development to daily operations, service standards, and guest engagement. We seek to create spaces that are not only beautiful and functional, but also enriching for guests, partners, and communities.",
                "Driven by a passion for hospitality and a focus on long-term growth, Lunevia aspires to build a trusted name known for quality experiences, efficient management, and distinctive destinations.",
            ],
        },
        usps: {
            heading: "Our USPs",
            subtext: "No two journeys are the same. Each LUNEVIA stay is tailored to the guest — from personalized dining to curated local adventures.",
            items: [
                { title: "Curated Hospitality Experiences", body: "We do not merely operate properties; we create thoughtfully designed hospitality experiences that leave a lasting impression on our guests." },
                { title: "Guest-Centric Approach", body: "Every decision at Lunevia is made with the guest experience in mind, ensuring comfort, convenience, and memorable service at every touchpoint." },
                { title: "Strong Operational Management", body: "Our properties are backed by structured systems, professional oversight, and operational discipline that ensure consistency and quality." },
                { title: "Distinctive Property Selection", body: "We focus on hospitality properties with character, potential, and location value, enabling us to create unique and appealing destinations." },
                { title: "End-to-End Hospitality Vision", body: "From concept to execution, Lunevia brings together property strategy, branding, operations, and service delivery under one unified vision." },
                { title: "Focus on Quality and Trust", body: "We maintain high standards in service, upkeep, compliance, and guest satisfaction, building trust among guests, landlords, partners, and stakeholders." },
                { title: "Growth with Sustainability", body: "Our approach balances expansion with long-term sustainability, ensuring every venture is built on strong fundamentals and enduring value." },
            ],
        },
        location: {
            heading: "Where to Find Us",
            subtext: "Rooted in God's Own Country — our flagship retreats trace the backwaters, hills, and shoreline of Kerala. Tap the card to explore.",
            label: "Kerala, India",
            coordinates: "9.4981° N, 76.3388° E",
        },
    },

    experience: {
        hero: {
            eyebrow: "Our Philosophy",
            title: "Travel With Intention",
            subtitle: "At LUNEVIA, every stay is thoughtfully curated to connect you with place, culture, and moments that linger long after the journey ends.",
            breadcrumbs: [],
            image: "/Experience_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
        philosophy: {
            image: "/Experience_about.png",
            eyebrow: "Our Philosophy",
            title: "Hospitality Rooted in Experience",
            paragraphs: [
                "At Lunevia, we believe hospitality is not just about offering a place to stay or dine, but about creating meaningful experiences that people remember. Our philosophy is rooted in warmth, authenticity, comfort, and thoughtful service.",
                "We aim to build spaces where guests feel welcomed, valued, and at ease. Every resort, restaurant, and hospitality property under Lunevia is envisioned as a destination that blends quality, care, and character — experiences that are aesthetically pleasing, operationally efficient, and emotionally memorable.",
                "For us, true hospitality lies in the details — the ambiance, the service, the people, and the sense of belonging that each guest carries back with them.",
            ],
        },
        pillars: {
            heading: "Core Philosophy Pillars",
            items: [
                { title: "Connection to Nature", body: "Our spaces are designed to blend seamlessly with their surroundings, allowing guests to experience Kerala's landscapes — from misty hills to serene waters — in their purest form." },
                { title: "Slow Luxury", body: "True luxury lies in time, privacy, and intention. At LUNEVIA, we create environments where guests can unwind, breathe, and rediscover the art of unhurried living." },
                { title: "Cultural Immersion", body: "Every destination celebrates local traditions, cuisine, and craftsmanship — offering authentic experiences that reflect the spirit of Kerala." },
                { title: "Thoughtful Hospitality", body: "Our team anticipates every detail so that guests can focus on what matters most — the experience." },
            ],
        },
        experiences: {
            eyebrow: "Curated Experiences",
            heading: "Designed Around You",
            subtext: "No two journeys are the same. Each LUNEVIA stay is tailored to the guest — from personalized dining to curated local adventures.",
            items: [
                { title: "Private Backwater Cruises", text: "Glide through still canals at dawn on a private canoe — kingfishers overhead and mist rising off the water." },
                { title: "Ayurvedic Wellness Rituals", text: "Time-honoured therapies and guided practices that restore body and mind, tailored entirely to you." },
                { title: "Plantation Walks in Munnar", text: "Wander emerald tea slopes with a local guide and taste the estate's freshest single-origin brew." },
                { title: "Sunset Beach Dining", text: "A candlelit table on the sand, a menu built around the day's catch, the Arabian Sea for a backdrop." },
                { title: "Kerala Cooking Sessions", text: "Cook alongside our chefs — spices, coconut and coastal recipes passed down through generations." },
            ],
        },
        closing: {
            eyebrow: "Your Journey Awaits",
            title: "Travel that inspires, restores, and transforms",
            subtext: "Every destination invites you to experience Kerala in a way that is intimate, meaningful, and unforgettable.",
            ctaLabel: "Explore Our Destinations",
            ctaLink: "/destinations",
        },
    },

    contact: {
        hero: {
            eyebrow: "Say Hello",
            title: "Contact Us",
            subtitle: "",
            breadcrumbs: ["Home", "Contact Us"],
            image: "/client-room-gallery/LBM04967.jpg",
            zoom: "in",
            ...HERO_EXTRA,
        },
        form: {
            eyebrow: "Contact Us",
            heading: "Get in Touch with Our Hospitality Team",
            subtext: "Have questions or need assistance with your booking? Our team is here to help — reach out anytime and we'll ensure your stay is smooth and memorable.",
            address: "LUNEVIA HOSPITALITY LLP, 8-63/A, Karimannoor, Thodupuzha, Idukki - 685581, Kerala, India",
            phones: ["+91 6238829339", "+91 6238899339"],
            email: "info@lunevia.in",
        },
    },

    destinations: {
        hero: {
            eyebrow: "Where We Are",
            title: "Destinations",
            subtitle: "",
            breadcrumbs: ["Home", "Destinations"],
            image: "/destinations-banner.jpg",
            zoom: "in",
            ...HERO_EXTRA,
        },
    },

    blog: {
        hero: {
            eyebrow: "The Journal",
            title: "Blogs",
            subtitle: "",
            breadcrumbs: ["Home", "Blogs"],
            image: "/About_us_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
        list: {
            eyebrow: "The Journal",
            heading: "Insights on Luxury Resort Living",
            subtext: "Stories, guides, and inspiration from across the Lunevia collection.",
        },
    },

    faq: {
        hero: {
            eyebrow: "Good to Know",
            title: "FAQs",
            subtitle: "",
            breadcrumbs: ["Home", "FAQs"],
            image: "/About_us_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
        groups: [
            {
                heading: "General Questions",
                subtext: "Everything you may wish to know before your stay.",
                items: [
                    { q: "How can I get room availability?", a: "Fill in the form in the upper right corner or click “Check prices” next to the room you like. Once you indicated your booking details, click on the “Check Availability” button, and all the available rooms with a variety of rates will be shown below." },
                    { q: "Is breakfast included in the price?", a: "It depends on the rate you choose. In general, information about breakfast is provided in rate details." },
                    { q: "How to make a reservation?", a: "Click a “Book” button next to the room rate you like. You will be immediately directed to a reservation page. Enter the required details and get your booking confirmation in a moment. You will also receive an instant booking confirmation on your email." },
                    { q: "What personal details should I provide?", a: "In order to make a reservation, you need to provide the guest's full name, e-mail address and phone number. If you choose the rate under prepayment terms, you need to enter the card number, card holder's name and CVV code. The payment process on our website is secure. Your personal data and every step of the booking process are protected with international security protocols." },
                    { q: "When and how do I receive my booking confirmation?", a: "Once the reservation is made, the confirmation page will be shown. Additionally, a letter of confirmation will be sent to your email." },
                    { q: "What are my payment options?", a: "The information concerning payment might vary depending on a room and a rate you choose. A free cancellation booking can be canceled free of charge before the cancellation deadline. A non-refundable booking is usually a cheaper option, but requires a cancellation fee." },
                    { q: "Can I make a reservation with a special request?", a: "You can send a special request to the hotel via the “Special requests” field on the reservation page or by contacting the hotel directly. However, we cannot guarantee that your request will be fulfilled. If you submit a special request, please wait for a call or an email from the hotel to get an update on your issue." },
                ],
            },
            {
                heading: "Cancellation and Refund related",
                subtext: "Everything you may wish to know before your stay.",
                items: [
                    { q: "How can I cancel my reservation?", a: "You can cancel your booking by following instructions in your confirmation e-mail. Please note that if the rate is non-refundable or the cancellation deadline has already passed, then the paid sum cannot be refunded." },
                    { q: "Can I get a refund after my reservation is cancelled?", a: "If cancellation of your booking involves full or partial refund, the funds will be reimbursed to your credit card within 1-2 days." },
                ],
            },
        ],
    },

    testimonials: {
        hero: {
            eyebrow: "Guest Voices",
            title: "Testimonials",
            subtitle: "",
            breadcrumbs: ["Home", "Testimonials"],
            image: "/About_us_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
        section: {
            eyebrow: "Guest Stories",
            heading: "Reflections from those who stayed",
            subtext: "Unfiltered words from guests across every Lunevia retreat.",
            items: [
                { name: "Aisha & Rahman", place: "Dubai", title: "An Experience Beyond Luxury", text: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The stillness of the water, the warmth of the hospitality, and the attention to detail created something far more meaningful than a vacation. It was restoration.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Daniel M.", place: "London", title: "Kerala, Reimagined", text: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Meera S.", place: "Mumbai", title: "Effortless Perfection", text: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Priyanka N.", place: "Bangalore", title: "Cliffside Serenity", text: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Thomas K.", place: "Berlin", title: "A Private World in the Forest", text: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Fatima A.", place: "Abu Dhabi", title: "Timeless Lakeside Elegance", text: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150" },
                { name: "Arjun & Neha", place: "Hyderabad", title: "A Wedding Beyond Our Dreams", text: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150" },
            ],
        },
    },

    privacy: {
        hero: {
            eyebrow: "Legal",
            title: "Privacy Policy",
            subtitle: "",
            breadcrumbs: ["Home", "Privacy Policy"],
            image: "/About_us_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
    },

    terms: {
        hero: {
            eyebrow: "Legal",
            title: "Terms & Conditions",
            subtitle: "",
            breadcrumbs: ["Home", "Terms & Conditions"],
            image: "/About_us_banner.png",
            zoom: "in",
            ...HERO_EXTRA,
        },
    },
};

// Ordered list the admin index renders. label = human name, slug = page key.
export const CMS_PAGES = [
    { slug: "home", label: "Home" },
    { slug: "about", label: "About LUNEVIA" },
    { slug: "experience", label: "Experience / Philosophy" },
    { slug: "contact", label: "Contact Us" },
    { slug: "destinations", label: "Destinations" },
    { slug: "blog", label: "Blog" },
    { slug: "faq", label: "FAQ" },
    { slug: "testimonials", label: "Testimonials" },
    { slug: "privacy", label: "Privacy Policy" },
    { slug: "terms", label: "Terms & Conditions" },
];

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

// Deep-merge saved CMS content OVER the defaults. Arrays are replaced wholesale
// (so an edited card list fully overrides the default one); objects merge key by
// key; null/undefined/"" values fall through to the default so a blank field
// never wipes the shipped copy.
export function mergeContent(defaults, cms) {
    if (!isObj(cms)) return defaults;
    const out = Array.isArray(defaults) ? [...defaults] : { ...defaults };
    for (const key of Object.keys(cms)) {
        const cv = cms[key];
        const dv = defaults ? defaults[key] : undefined;
        if (isObj(cv) && isObj(dv)) {
            out[key] = mergeContent(dv, cv);
        } else if (Array.isArray(cv)) {
            out[key] = cv.length ? cv : dv ?? cv;
        } else if (cv !== null && cv !== undefined && cv !== "") {
            out[key] = cv;
        }
    }
    return out;
}

// Convenience: merged content for a page given the raw CMS `content` object.
export function pageContent(page, cms) {
    return mergeContent(PAGE_DEFAULTS[page] || {}, cms || {});
}
