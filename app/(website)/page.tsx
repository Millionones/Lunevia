import Hero from './Components/Hero'
import Story from './Components/Story'
import Destinations from './Components/Destinations'
import Gallery from './Components/Gallery'
import Testimonials from './Components/Testimonials'
// @ts-ignore - JS helper
import { serverGet } from '@/helpers/serverApi'
// @ts-ignore - JS helper
import { loadPage } from '@/helpers/serverPage'

// Revalidate the homepage (and its cached fetches) hourly.
export const revalidate = 3600

export default async function Home() {
  const res = await serverGet('website/destination?limit=6')
  const destinations = res?.data ?? []
  const content = await loadPage('home')

  return (
    <>
      <Hero hero={content.hero} />
      <Story data={content.story} />
      <Destinations
        data={destinations}
        heading={content.destinations?.heading}
        subtext={content.destinations?.subtext}
      />
      <Gallery data={content.gallery?.images} />
      <Testimonials data={content.testimonials} />
    </>
  );
}
