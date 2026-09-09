import HomeSlideshow from '../components/HomeSlideshow'
import Header from '../components/header'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <main className='overflow-hidden flex flex-1'>
      {/* Date and Time */}
      <Header variant='home' />

      {/* Slideshow fills entire screen */}
      <HomeSlideshow />

      {/* Logo and School name */}
      <div
        className='flex flex-col sm:flex-row mt-[10vh] z-10 gap-[20px] ml-[20px]'
      >
        {/* Logo */}
        <Image
          src='/images/logo.png'
          alt=''
          width={200}
          height={200}
          className='h-auto w-[clamp(100px,20vw,200px)] object-contain'
        />
        {/* School name */}
        <div
          className='flex flex-col justify-center items-start uppercase text-white '
        >
          <h1>Holmes</h1>
          <h1>High School</h1>
        </div>
      </div>

      {/* Side Banner */}
      {/* TODO: turn this into a dynamic component */}
      <Image
        src='/images/home-banner.png'
        alt='Holmes High School'
        fill
        className='object-fill object-right'
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
