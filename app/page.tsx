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
        className='absolute top-[10vh] left-[20px] flex flex-col sm:flex-row z-10 gap-[20px]'
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
      {/* QR Code CTA: Only on larger screens */}
      {/* TODO: turn this into a dynamic component */}
      <div
        className='hidden absolute bottom-[20vh] right-[20px] sm:flex sm:flex-col md:flex-row items-center justify-end z-10 gap-[20px]'
      >
        {/* Text */}
        <div
          className='flex flex-col uppercase text-white w-full text-right'
        >
          <h1>Scan for</h1>
          <h2>on the go</h2>
          <h1>Access</h1>
        </div>
        {/* QR Code */}
        {/* TODO: replace this with real URL... Sanity? */}
        <img
          src='https://placehold.co/200x200'
          alt=''
          className=''
        />
      </div>
    </main>
  )
}
