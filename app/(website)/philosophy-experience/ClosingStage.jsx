import React from 'react'
import Link from 'next/link'
const ClosingStage = () => {
    return (
        <section className='closing-stage-section'>
            <div className='cmpad'>
                <div className='closing-stage-inner'>
                    <div className='closing-stage-header'>
                        <h2>Your Journey Awaits</h2>
                        <p>At LUNEVIA, we believe travel should inspire, restore, and transform.</p>
                        <p>Every destination invites you to experience Kerala in a way that is intimate, meaningful, and unforgettable.</p>
                    </div>
                    <Link href="/destinations" className='closing-stage-link'>
                        <button>Explore Our Destinations</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ClosingStage