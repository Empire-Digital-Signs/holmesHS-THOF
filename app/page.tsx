import HomeSlideshow from '../components/HomeSlideshow'
import Header from '../components/header'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <main className='overflow-hidden flex flex-1'>
      {/* Date and Time */}
      <Header variant='home' />

      {/* Slideshow fills entire screen
      *** TODO: Setup images in Sanity. Using placeholder for now.
      */}
      <HomeSlideshow />

      {/* Overlay images */}
      {/* Logo and School name */}
      {/* TODO: turn this into a dynamic component */}
      <Image
        src='/images/holmes-logo.png'
        alt='Holmes High School'
        fill
        className='object-contain'
      />
      {/* Side Banner */}
      {/* TODO: turn this into a dynamic component */}
      <Image
        src='/images/home-banner.png'
        alt='Holmes High School'
        fill
        className='object-contain object-right'
      />
      {/* QR Code */}
      {/* TODO: turn this into a dynamic component */}
      <Image
        src='/images/qr-code.png'
        alt='QR Code'
        fill
        className='object-contain object-right'
      />
    </main>
  )
}
