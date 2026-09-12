import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import DestinationBanners from './DestinationBanners'

const Destinations = ({ data = [], showViewAll = true }) => {
  return (
    <section className='destination destination--full bg-transparent'>
      <div className='cmpad'>
        <div className='destination-header destination-header--center'>
          <h4>Discover Our Destinations</h4>
          <p>Each LUNEVIA property is a world of its own — united by philosophy, distinct in character.</p>
          {showViewAll && (
            <Link href="/destinations">
              <Button>Show All</Button>
            </Link>
          )}
        </div>
        <DestinationBanners data={data} />
      </div>
    </section>
  )
}

export default Destinations
