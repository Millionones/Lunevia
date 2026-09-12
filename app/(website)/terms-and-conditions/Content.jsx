import React from 'react'
import LegalDoc from '../Components/LegalDoc'

const groups = [
    {
        id: 'terms',
        intro: 'Welcome to LUNEVIA. These Terms & Conditions govern your access to and use of the LUNEVIA website, hospitality services, resorts, restaurants, and related guest experiences. By using our website, submitting enquiries, making reservations, or accessing our services, you agree to comply with the following terms.',
        sections: [
            {
                id: 'about-lunevia',
                title: 'About LUNEVIA',
                body: [
                    { p: 'LUNEVIA is a hospitality-focused brand engaged in the ownership, leasing, development, management, and operation of resorts, restaurants, and hospitality destinations. Our mission is to create thoughtfully curated experiences that combine comfort, elegance, and genuine hospitality through professional management and guest-focused service.' },
                ],
            },
            {
                id: 'acceptance-of-terms',
                title: 'Acceptance of Terms',
                body: [
                    { p: 'By accessing the LUNEVIA website or using any of our services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.' },
                    { p: 'If you do not agree with any part of these terms, you should discontinue use of our website and services.' },
                ],
            },
            {
                id: 'reservations-enquiries',
                title: 'Reservations & Enquiries',
                body: [
                    { p: 'All reservations, enquiries, and booking requests are subject to:' },
                    { ul: ['Availability', 'Confirmation by LUNEVIA', 'Applicable pricing and payment requirements'] },
                    { p: 'Submission of an enquiry form does not constitute a confirmed reservation until official confirmation is provided by our team.' },
                    { p: 'LUNEVIA reserves the right to refuse, modify, or cancel reservations in circumstances including but not limited to:' },
                    { ul: ['Availability limitations', 'Pricing inaccuracies', 'Fraudulent transactions', 'Violation of guest policies'] },
                ],
            },
            {
                id: 'rates-payments-charges',
                title: 'Rates, Payments & Charges',
                body: [
                    { p: 'All pricing displayed or communicated by LUNEVIA is subject to change without prior notice.' },
                    { p: 'Unless otherwise specified:' },
                    { ul: ['Rates are quoted in Indian Rupees (INR)', 'Applicable taxes and service charges may apply', 'Additional services and experiences may incur separate charges'] },
                    { p: 'Accepted payment methods may include:' },
                    { ul: ['Credit / Debit Cards', 'Bank Transfers', 'Approved Digital Payment Methods'] },
                ],
            },
            {
                id: 'cancellation-refund-policy',
                title: 'Cancellation & Refund Policy',
                body: [
                    { p: 'Cancellation and refund policies may vary depending on:' },
                    { ul: ['Property type', 'Booking category', 'Promotional offers', 'Seasonal periods'] },
                    { p: 'Specific cancellation terms will be communicated during the reservation process.' },
                    { p: 'Refunds, where applicable, will be processed within a reasonable timeframe depending on payment providers and banking institutions.' },
                    { p: 'LUNEVIA reserves the right to apply cancellation or no-show charges where necessary.' },
                ],
            },
            {
                id: 'guest-check-in-stay',
                title: 'Guest Check-In & Stay Requirements',
                body: [
                    { p: 'Guests may be required to present valid government-issued identification during check-in in accordance with applicable laws and property policies.' },
                    { p: 'Check-in and check-out timings vary by property and will be communicated at the time of booking confirmation.' },
                    { p: 'Requests for early check-in, late check-out, or additional occupancy are subject to availability and may involve additional charges.' },
                ],
            },
            {
                id: 'guest-conduct',
                title: 'Guest Conduct & Property Use',
                body: [
                    { p: 'Guests are expected to:' },
                    { ul: ['Respect property rules and staff instructions', 'Maintain appropriate conduct during their stay', 'Avoid unlawful, disruptive, or damaging behavior'] },
                    { p: 'LUNEVIA reserves the right to deny access, terminate stays, or request guests to vacate the premises without refund in situations involving misconduct, illegal activities, harassment, excessive disturbance, or property damage.' },
                ],
            },
            {
                id: 'restaurants-experiences',
                title: 'Restaurants, Experiences & Activities',
                body: [
                    { p: 'LUNEVIA may offer dining experiences, wellness services, cultural activities, excursions, and curated guest experiences either directly or through third-party partners.' },
                    { p: 'Participation in activities is voluntary and undertaken at the guest’s own discretion and risk.' },
                    { p: 'Guests are responsible for informing LUNEVIA of:' },
                    { ul: ['Medical conditions', 'Allergies', 'Dietary restrictions', 'Accessibility requirements'] },
                ],
            },
            {
                id: 'website-usage',
                title: 'Website Usage',
                body: [
                    { p: 'All content on the LUNEVIA website, including text, branding, logos, photographs, videos, graphics, and design assets, is the property of LUNEVIA unless otherwise stated and is protected under applicable intellectual property laws.' },
                    { p: 'Users may not:' },
                    { ul: ['Reproduce website content without permission', 'Attempt unauthorized access to systems', 'Distribute malicious software or harmful content', 'Misuse enquiry forms or communication channels'] },
                ],
            },
            {
                id: 'privacy-data-collection',
                title: 'Privacy & Data Collection',
                body: [
                    { p: 'Personal information submitted through our website or during reservations will be handled in accordance with our Privacy Policy.' },
                    { p: 'Information may be collected for:' },
                    { ul: ['Reservation management', 'Guest communication', 'Service improvement', 'Legal and operational compliance'] },
                ],
            },
            {
                id: 'third-party-services',
                title: 'Third-Party Services',
                body: [
                    { p: 'Certain services provided through LUNEVIA properties may involve third-party providers, including transportation services, activity operators, payment gateways, and external booking systems.' },
                    { p: 'LUNEVIA is not responsible for acts, omissions, delays, or service failures caused by third-party providers.' },
                ],
            },
            {
                id: 'limitation-of-liability',
                title: 'Limitation of Liability',
                body: [
                    { p: 'To the maximum extent permitted under applicable law, LUNEVIA shall not be liable for indirect or consequential damages, travel disruptions, delays caused by external factors, loss of personal belongings, or service interruptions beyond reasonable control.' },
                ],
            },
            {
                id: 'force-majeure',
                title: 'Force Majeure',
                body: [
                    { p: 'LUNEVIA shall not be held responsible for failure or delay in performance resulting from circumstances beyond reasonable control, including natural disasters, extreme weather conditions, government restrictions, transportation disruptions, public health emergencies, or civil disturbances.' },
                ],
            },
            {
                id: 'modifications-to-terms',
                title: 'Modifications to Terms',
                body: [
                    { p: 'LUNEVIA reserves the right to modify or update these Terms & Conditions at any time without prior notice.' },
                    { p: 'Updated versions will become effective immediately upon publication on the website.' },
                ],
            },
            {
                id: 'governing-law',
                title: 'Governing Law & Jurisdiction',
                body: [
                    { p: 'These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.' },
                    { p: 'Any disputes arising in relation to these terms shall fall under the jurisdiction of the appropriate courts in Kerala, India.' },
                ],
            },
            {
                id: 'contact-information',
                title: 'Contact Information',
                body: [
                    { p: 'For questions regarding these Terms & Conditions, please contact:' },
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
