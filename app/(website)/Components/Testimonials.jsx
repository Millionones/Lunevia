"use client"
import React from 'react'
import { motion } from 'motion/react'

// Real Lunevia guest reviews (previously in the Swiper version), mapped to the
// scrolling-column layout. `role` shows the guest's city / experience.
const testimonials = [
    {
        text: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The warmth of the hospitality and attention to detail created something far more meaningful than a vacation — it was restoration.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aisha & Rahman",
        role: "Dubai",
    },
    {
        text: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Daniel M.",
        role: "London",
    },
    {
        text: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Meera S.",
        role: "Mumbai",
    },
    {
        text: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Priyanka N.",
        role: "Bangalore",
    },
    {
        text: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Thomas K.",
        role: "Berlin",
    },
    {
        text: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Fatima A.",
        role: "Abu Dhabi",
    },
    {
        text: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Arjun & Neha",
        role: "Hyderabad",
    },
    {
        text: "It was great not to have to use the inter-island terminal. The service is impeccable — they make you feel so welcome, and everything is truly a can-do attitude.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Christine Glassier",
        role: "Comfortable & Relaxing",
    },
    {
        text: "The stillness of the water and the quiet luxury of our suite gave us the calm we had been craving for years. We are already planning our return to Lunevia.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Omar & Layla",
        role: "Doha",
    },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialsColumn = ({ className, testimonials, duration }) => {
    return (
        <div className={className}>
            <motion.ul
                animate={{ translateY: "-50%" }}
                transition={{
                    duration: duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
            >
                {[...new Array(2).fill(0)].map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <motion.li
                                key={`${index}-${i}`}
                                aria-hidden={index === 1 ? "true" : "false"}
                                whileHover={{
                                    scale: 1.03,
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 17 },
                                }}
                                className="p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-sm transition-colors duration-300 cursor-default select-none group"
                            >
                                <blockquote className="m-0 p-0">
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 text-[15px]">
                                        {text}
                                    </p>
                                    <footer className="flex items-center gap-3 mt-6">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={`Guest ${name}`}
                                            loading="lazy"
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 transition-all duration-300"
                                        />
                                        <div className="flex flex-col">
                                            <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white">
                                                {name}
                                            </cite>
                                            <span className="text-sm leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5">
                                                {role}
                                            </span>
                                        </div>
                                    </footer>
                                </blockquote>
                            </motion.li>
                        ))}
                    </React.Fragment>
                ))}
            </motion.ul>
        </div>
    )
}

const Testimonials = () => {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-transparent py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 z-10 mx-auto max-w-6xl"
            >
                <div className="flex flex-col items-center justify-center max-w-[560px] mx-auto mb-16">
                    <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50">
                        Testimonials
                    </div>
                    <h2
                        id="testimonials-heading"
                        className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white"
                    >
                        What our guests say
                    </h2>
                    <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-md">
                        Lovely people, amazing experiences — stories from stays across Lunevia.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Scrolling guest testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={17} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={21} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={19} />
                </div>
            </motion.div>
        </section>
    )
}

export default Testimonials
