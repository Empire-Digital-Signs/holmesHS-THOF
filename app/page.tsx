import HomeSlideshow from '../components/HomeSlideshow'
import Header from '../components/header'
import Image from 'next/image'

// Helper function to determine if browser is mobile
// Mobile device does not need QR code
export function isMobile(): boolean {
  // Modern regex check
  const ua = navigator.userAgent
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return true
  }

  // Fallback for Mac Intel
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true
  }

  return false
}

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
          className='w-[clamp(100px,20vw,200px)] h-auto object-contain'
        />
        {/* School name */}
        <div
          className='flex flex-col justify-center items-start uppercase text-white [text-shadow:2px_2px_4px_rgb(0_0_0/75%)]'
        >
          <h1>Holmes</h1>
          <h1>High School</h1>
        </div>
      </div>

      {/* Side Banner */}
      <Image
        src='/images/home-banner.png'
        alt=''
        width={1920}
        height={1080}
        className='w-screen h-screen object-fill z-9'
      />

      {/* Crest over the banner */}
      <Image
        src='/images/crest.png'
        alt=''
        width={200}
        height={295}
        className='hidden md:block absolute opacity-50 right-[10vw] top-1/2 -translate-y-1/2 z-10 w-[clamp(200px,20vw,400px)] h-auto object-contain'
      />

      {/* QR Code CTA: Only on larger screens */}
      {
        !isMobile()
          ? null
          : (
              <div
                className='hidden absolute bottom-[12vw] mb-[20px] right-[20px] sm:flex sm:flex-col md:flex-row items-center justify-end z-10 gap-[20px]'
              >
                {/* Text */}
                <div
                  className='flex flex-col uppercase text-white w-full text-right [text-shadow:2px_2px_4px_rgb(0_0_0/75%)]'
                >
                  <h1 className='leading-[3rem]'>Scan for</h1>
                  <h2 className='leading-[3rem]'>on the go</h2>
                  <h1 className='leading-[3rem]'>Access</h1>
                </div>
                {/* QR Code */}
                {/* TODO: replace this with real URL... Sanity? */}
                <img
                  src='https://placehold.co/200x200'
                  alt=''
                  className=''
                />
              </div>
            )
      }

    </main>
  )
}
