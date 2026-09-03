import HomeSlideshow from '../components/HomeSlideshow'
import Header from '../components/header'
import { getHomeSlides } from '../lib/sanity'
import Image from 'next/image'

export const revalidate = 60

export default async function HomePage() {
  const slides = await getHomeSlides()

  return (
    <main className='overflow-hidden flex flex-1'>
      {/* Date and Time */}
      <Header variant='home' />

      {/* Slideshow fills entire screen
      *** TODO: Setup images in Sanity. Using placeholder for now.
      */}
      {/* <HomeSlideshow/> */}
      <Image
        src='/images/slideshow-image.png'
        alt='Slideshow Placeholder'
        fill
        className='object-cover'
      />

      {/* Overlay images */}
      {/* Logo and School name */}
      <Image
        src='/images/holmes-logo.png'
        alt='Holmes High School'
        fill
        className='object-contain'
      />
      {/* Side Banner */}
      <Image
        src='/images/home-banner.png'
        alt='Holmes High School'
        fill
        className='object-contain object-right'
      />
      {/* QR Code */}
      <Image
        src='/images/qr-code.png'
        alt='QR Code'
        fill
        className='object-contain object-right'
      />
    </main>
  )
}
