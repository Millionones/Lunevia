"use client"
import React from 'react'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'

// Real Lunevia guest reviews. Avatars reuse the same set as the homepage
// testimonials section for a consistent look across the site.
const testimonials = [
    {
        name: 'Aisha & Rahman',
        place: 'Dubai',
        title: 'An Experience Beyond Luxury',
        text: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The stillness of the water, the warmth of the hospitality, and the attention to detail created something far more meaningful than a vacation. It was restoration.",
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Daniel M.',
        place: 'London',
        title: 'Kerala, Reimagined',
        text: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable.",
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Meera S.',
        place: 'Mumbai',
        title: 'Effortless Perfection',
        text: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest.",
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Priyanka N.',
        place: 'Bangalore',
        title: 'Cliffside Serenity',
        text: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile.",
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Thomas K.',
        place: 'Berlin',
        title: 'A Private World in the Forest',
        text: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape.",
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Fatima A.',
        place: 'Abu Dhabi',
        title: 'Timeless Lakeside Elegance',
        text: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable.",
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        name: 'Arjun & Neha',
        place: 'Hyderabad',
        title: 'A Wedding Beyond Our Dreams',
        text: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical.",
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
    },
]

const EASE = [0.22, 1, 0.36, 1]

const Stars = () => (
    <div className="mb-4 flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
        ))}
    </div>
)

const TestimonialContents = () => {
    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="cmpad">
                {/* Section header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        Guest Stories
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Reflections from those who stayed
                    </h2>
                    <p className="mx-auto mt-5 max-w-md leading-relaxed text-neutral-600 dark:text-neutral-400">
                        Unfiltered words from guests across every Lunevia retreat.
                    </p>
                </div>

                {/* Masonry of glass testimonial cards */}
                <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
                            className="group mb-6 break-inside-avoid rounded-3xl border border-neutral-200/80 bg-white/85 p-8 shadow-lg shadow-black/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/85"
                        >
                            <Quote className="mb-4 h-8 w-8 text-neutral-300 dark:text-neutral-700" aria-hidden />
                            <Stars />
                            <h3 className="mb-3 text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                                {t.title}
                            </h3>
                            <blockquote className="m-0 p-0">
                                <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                    {t.text}
                                </p>
                                <figcaption className="mt-6 flex items-center gap-3">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        width={44}
                                        height={44}
                                        loading="lazy"
                                        className="h-11 w-11 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800"
                                    />
                                    <span className="flex flex-col">
                                        <cite className="not-italic font-semibold tracking-tight text-neutral-900 dark:text-white">
                                            {t.name}
                                        </cite>
                                        <span className="text-sm text-neutral-500">{t.place}</span>
                                    </span>
                                </figcaption>
                            </blockquote>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialContents
