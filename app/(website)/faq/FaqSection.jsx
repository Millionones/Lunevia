"use client"
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { arrowIconSvg } from '../../styles/icons'

const FaqSection = () => {

    const [open, setOpen] = useState(null)
    const [genData, setGenData] = useState([
        {
            qus: 'How can I get room availability?',
            ans: 'Fill in the form in the upper right corner or click “Check prices” next to the room you like. Once you indicated your booking details, click on the “Check Availability” button, and all the available rooms with a variety of rates will be shown below.'
        },
        {
            qus: 'Is breakfast included in the price?',
            ans: 'It depends on the rate you choose. In general, information about breakfast is provided in rate details.'
        },
        {
            qus: 'How to make a reservation?',
            ans: 'Click a “Book” button next to the room rate you like. You will be immediately directed to a reservation page. Enter the required details and get your booking confirmation in a moment. You will also receive an instant booking confirmation on your email.'
        },
        {
            qus: 'What personal details should I provide?',
            ans: 'In order to make a reservation, you need to provide the guest’s full name, e-mail address and phone number. If you choose the rate under prepayment terms, you need to enter the card number, card holder’s name and CVV code. The payment process on our website is secure. Your personal data and every step of the booking process are protected with international security protocols.'
        },
        {
            qus: 'When and how do I receive my booking confirmation?',
            ans: 'Once the reservation is made, the confirmation page will be shown. Additionally, a letter of confirmation will be sent to your email.'
        },
        {
            qus: 'What are my payment options?',
            ans: 'The information concerning payment might vary depending on a room and a rate you choose. A free cancellation booking can be canceled free of charge before the cancellation deadline. A non-refundable booking is usually a cheaper option, but requires a cancellation fee.'
        },
        {
            qus: 'Can I make a reservation with a special request?',
            ans: 'You can send a special request to the hotel via the “Special requests” field on the reservation page or by contacting the hotel directly. However, we cannot guarantee that your request will be fulfilled. If you submit a special request, please wait for a call or an email from the hotel to get an update on your issue.'
        },
       
    ])

    const [othData,setOthData] = useState([
         {
            qus: 'How can I cancel my reservation?',
            ans: 'You can cancel your booking by following instructions in your confirmation e-mail. Please note that if the rate is non-refundable or the cancellation deadline has already passed, then the paid sum cannot be refunded.'
        },
        {
            qus: 'Can I get a refund after my reservation is cancelled?',
            ans: 'If cancellation of your booking involves full or partial refund, the funds will be reimbursed to your credit card within 1-2 days.'
        }
    ])

    const handleOpen = (idx) => {
        if (idx == open) {
            setOpen(null)
        } else {
            setOpen(idx)
        }
    }

    return (
        <section className='faq-section'>
            <div className='cmpad'>
                <div>
                    <div className='faq-inner'>
                        <div className='faq-left-header'>
                            <h5>Faq</h5>
                            <h2>General Questions</h2>
                            <p>Everything you may wish to know before your stay.</p>
                        </div>
                        <div className='faqs'>
                            {
                                genData.map((item, idx) => (
                                    <Collapsible open={open == idx} onOpenChange={() => handleOpen(idx)} className='Collapsible'>
                                        <CollapsibleTrigger>
                                            <p>{item.qus}</p>
                                            <span className={`faq-icon ${open == idx ? 'faq-open' : ''}`}>{arrowIconSvg}</span>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className='CollapsibleContent'>
                                            {item.ans}
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))
                            }
                        </div>
                    </div>
                    <div className='faq-inner'>
                        <div className='faq-left-header'>
                            <h5 className='hidden sm:flex'>Faq</h5>
                            <h2>Cancellation and Refund related</h2>
                            <p>Everything you may wish to know before your stay.</p>
                        </div>
                        <div className='faqs'>
                            {
                                othData.map((item, idx) => (
                                    <Collapsible open={open == idx} onOpenChange={() => handleOpen(idx)} className='Collapsible'>
                                        <CollapsibleTrigger>
                                            <p>{item.qus}</p>
                                            <span className={`faq-icon ${open == idx ? 'faq-open' : ''}`}>{arrowIconSvg}</span>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className='CollapsibleContent'>
                                            {item.ans}
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default FaqSection