import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Story = () => {
    return (
        <section className='story-section'>
            <div className="cmpad">
                <div className='story-inner'>
                    <div className='story-media'>
                        <img src="/About_Image_Lunevia.png" alt="" />
                    </div>
                    <div className='story-para'>
                        <h1>The LUNEVIA Way</h1>
                        <h5>At LUNEVIA, we believe travel is not about places — it is about transformation.</h5>
                        <p>Each of our properties is carefully selected, thoughtfully designed, and deeply connected to its surroundings. From secluded beachfront sanctuaries to hillside retreats wrapped in nature, every LUNEVIA stay is curated to awaken the senses and slow the rhythm of life.</p>
                        <p>We create spaces where architecture meets landscape, where culture meets comfort, and where every detail is intentional.</p>
                        <div className='mt-4'>
                            <Button>
                                <Link href="/destinations">
                                    Explore our locations
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Story