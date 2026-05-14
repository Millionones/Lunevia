import Image from "next/image";

import Hero from './Components/Hero'
import Story from './Components/Story'
import Destinations from './Components/Destinations'
import Gallery from './Components/Gallery'
import Testimonials from './Components/Testimonials'
export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Destinations />
      <Gallery />
      {/* <Testimonials /> */}
    </>
  );
}
