import Hero from './Components/Hero'
import Story from './Components/Story'
import Destinations from './Components/Destinations'
import Gallery from './Components/Gallery'
import Testimonials from './Components/Testimonials'
// @ts-ignore - JS helper
import { serverGet } from '@/helpers/serverApi'

// Revalidate the homepage (and its cached fetches) hourly.
export const revalidate = 3600

export default async function Home() {
  const res = await serverGet('website/destination?limit=6')
  const destinations = res?.data ?? []

  return (
    <>
      <Hero />
      <Story />
      <Destinations data={destinations} />
      <Gallery />
      <Testimonials />
    </>
  );
}
