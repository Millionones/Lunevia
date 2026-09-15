"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail } from 'lucide-react'
import { validateEmail, validateMobile } from '../../../helpers/functions';
import { post } from '../../../helpers/api'
import { DotPattern } from '@/components/ui/dot-pattern'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import Reveal from '../Components/Reveal'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const inputClass =
    "w-full rounded-xl border border-neutral-300/70 bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-white/10"
const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"

const ContactForm = ({ data }) => {
    const c = { ...PAGE_DEFAULTS.contact.form, ...(data || {}) }
    const phones = Array.isArray(c.phones) && c.phones.length ? c.phones : PAGE_DEFAULTS.contact.form.phones
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        comments: "",
    });

    const [submit, setSubmit] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            if (formData.firstName.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the First Name")
            }
            if (formData.lastName.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the Last Name")
            }
            if (!validateEmail(formData.email)) {
                setSubmit(false);
                return toast.error("Please Enter Valid Email")
            }
            if (!validateMobile(formData.mobile)) {
                setSubmit(false);
                return toast.error("Please Enter Valid Mobile Number")
            }
            if (formData.subject.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the Subject")
            }
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            let data = await response.json();
            if (data.success) {
                const response = await post("contact/", formData)
                if (response.success) {
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: "",
                        subject: "",
                        comments: "",
                    });

                    toast.success(response.message);
                }
            }
            setSubmit(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
            setSubmit(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-transparent py-20 md:py-28">
            <DotPattern className="pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-300/40 dark:fill-neutral-700/40 [mask-image:radial-gradient(70%_60%_at_50%_10%,black,transparent)]" />
            <div className="cmpad">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left — contact info */}
                    <Reveal>
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                            {c.eyebrow}
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                            {c.heading}
                        </h2>
                        <p className="mt-5 max-w-md leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {c.subtext}
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-800 dark:bg-white/10 dark:text-neutral-100">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">Location</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {c.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-800 dark:bg-white/10 dark:text-neutral-100">
                                    <Phone className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">Phone</h3>
                                    <div className="mt-1 flex flex-col text-sm text-neutral-600 dark:text-neutral-400">
                                        {phones.map((p, i) => (
                                            <a key={i} href={`tel:${String(p).replace(/\s+/g, '')}`} className="transition-colors hover:text-neutral-900 dark:hover:text-white">{p}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-800 dark:bg-white/10 dark:text-neutral-100">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">Email</h3>
                                    <a href={`mailto:${c.email}`} className="mt-1 block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                                        {c.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right — form */}
                    <Reveal delay={0.12}>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 md:p-8"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>First Name</label>
                                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Last Name</label>
                                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Email Address</label>
                                    <input type="text" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Mobile Number</label>
                                    <input type="tel" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className={labelClass}>Subject</label>
                                <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="mt-5">
                                <label className={labelClass}>Comments / Questions</label>
                                <textarea placeholder="Comments" rows={6} name="comments" value={formData.comments} onChange={handleChange} className={`${inputClass} resize-none`}></textarea>
                            </div>
                            <div className="mt-7">
                                {submit === false ? (
                                    <LiquidButton type="submit" className="px-10">SEND MESSAGE</LiquidButton>
                                ) : (
                                    <button type="button" className="send-btn loader-btn" aria-label="Sending">
                                        <img src="/loader.svg" alt="" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
