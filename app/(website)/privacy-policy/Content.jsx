import React from 'react'
import LegalDoc from '../Components/LegalDoc'

const groups = [
    {
        id: 'privacy-policy',
        heading: 'Privacy Policy',
        intro: 'At LUNEVIA, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you access our website, submit enquiries, make reservations, or engage with our hospitality services.',
        sections: [
            {
                id: 'information-we-collect',
                title: 'Information We Collect',
                body: [
                    { p: 'We may collect personal information including:' },
                    { ul: ['Full name', 'Email address', 'Phone number', 'Travel preferences and booking details', 'Payment and billing information', 'Special requests or dietary requirements'] },
                ],
            },
            {
                id: 'how-we-use-your-information',
                title: 'How We Use Your Information',
                body: [
                    { p: 'Your information may be used for:' },
                    { ul: ['Processing reservations and enquiries', 'Providing guest support and concierge services', 'Improving our website and hospitality experiences', 'Sending booking confirmations and service updates', 'Ensuring security and legal compliance'] },
                ],
            },
            {
                id: 'data-protection',
                title: 'Data Protection',
                body: [
                    { p: 'LUNEVIA implements reasonable security measures to protect your personal information from unauthorized access, misuse, disclosure, or alteration.' },
                    { p: 'While we strive to safeguard your data, no digital platform or internet transmission can guarantee complete security.' },
                ],
            },
            {
                id: 'third-party-services',
                title: 'Third-Party Services',
                body: [
                    { p: 'We may work with trusted third-party providers for payment processing, booking systems, analytics, and hospitality-related services.' },
                    { p: 'These providers may have access to limited information necessary to perform their services but are expected to maintain confidentiality and data protection standards.' },
                ],
            },
            {
                id: 'cookies-analytics',
                title: 'Cookies & Analytics',
                body: [
                    { p: 'Our website may use cookies and analytics tools to improve user experience, monitor website performance, and understand visitor behavior.' },
                    { p: 'By using our website, you consent to the use of such technologies unless disabled through your browser settings.' },
                ],
            },
            {
                id: 'your-rights',
                title: 'Your Rights',
                body: [
                    { p: 'You may request access to, correction of, or deletion of your personal information by contacting us directly.' },
                    { p: 'LUNEVIA reserves the right to retain information where required for legal, operational, or security purposes.' },
                ],
            },
            {
                id: 'policy-updates',
                title: 'Policy Updates',
                body: [
                    { p: 'This Privacy Policy may be updated periodically without prior notice. Continued use of our services after updates constitutes acceptance of the revised policy.' },
                ],
            },
        ],
    },
    {
        id: 'refund-cancellation-policy',
        heading: 'Refund & Cancellation Policy',
        intro: 'At LUNEVIA, we understand that travel plans may change. Our Refund & Cancellation Policy is designed to ensure transparency while maintaining operational commitments across our hospitality properties and experiences.',
        sections: [
            {
                id: 'reservation-cancellation',
                title: 'Reservation Cancellation',
                body: [
                    { p: 'Cancellation requests must be submitted through official communication channels including email or confirmed booking platforms.' },
                    { p: 'Cancellation policies may vary depending on:' },
                    { ul: ['Property or destination', 'Seasonal periods', 'Promotional or discounted bookings', 'Exclusive packages or curated experiences'] },
                ],
            },
            {
                id: 'refund-eligibility',
                title: 'Refund Eligibility',
                body: [
                    { p: 'Eligible refunds, where applicable, will be processed based on the cancellation terms associated with the reservation.' },
                    { p: 'Refunds may not apply in cases involving:' },
                    { ul: ['Last-minute cancellations', 'No-show reservations', 'Non-refundable promotional bookings', 'Partially utilized stays or services'] },
                ],
            },
            {
                id: 'refund-processing-timeline',
                title: 'Refund Processing Timeline',
                body: [
                    { p: 'Approved refunds are generally processed within 7–14 business days depending on the payment provider, banking institution, and payment method used during the reservation.' },
                ],
            },
            {
                id: 'modification-of-reservations',
                title: 'Modification of Reservations',
                body: [
                    { p: 'Changes to reservation dates, occupancy, or guest details are subject to availability and may involve additional charges or revised pricing.' },
                ],
            },
            {
                id: 'force-majeure',
                title: 'Force Majeure',
                body: [
                    { p: 'LUNEVIA shall not be held responsible for cancellations, delays, or service interruptions caused by circumstances beyond reasonable control, including natural disasters, extreme weather conditions, government restrictions, transportation disruptions, or public emergencies.' },
                ],
            },
            {
                id: 'contact-us',
                title: 'Contact Us',
                body: [
                    { p: 'For questions regarding our Privacy Policy or Refund & Cancellation Policy, please contact:' },
                    {
                        ul: [
                            <>Email: <a href="mailto:info@lunevia.in" className="underline hover:text-neutral-900 dark:hover:text-white">info@lunevia.in</a></>,
                            <>Phone: <a href="tel:+916238829339" className="underline hover:text-neutral-900 dark:hover:text-white">+91 6238829339</a></>,
                            <>Phone: <a href="tel:+916238899339" className="underline hover:text-neutral-900 dark:hover:text-white">+91 6238899339</a></>,
                        ],
                    },
                ],
            },
        ],
    },
]

const Content = () => <LegalDoc groups={groups} />

export default Content
