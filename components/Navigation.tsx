'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import background from '@/public/images/background.png'

const pages = [
  { name: 'History', path: '/history' },
  { name: 'Academics', path: '/academics' },
  { name: 'Athletics', path: '/athletics' },
  { name: 'Yearbooks', path: '/yearbooks' },
]

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle rounded edges based on current path
  useEffect(() => {
    // Get buttons
    const historyButton = document.getElementById('history-button')
    const academicsButton = document.getElementById('academics-button')
    const athleticsButton = document.getElementById('athletics-button')
    const yearbooksButton = document.getElementById('yearbooks-button')

    // Remove all possible additions before rendering (home page has no rounded edges)
    const removeRoundedEdges = () => {
      historyButton?.classList.remove('rounded-tr-2xl')
      academicsButton?.classList.remove('rounded-tl-2xl')
      academicsButton?.classList.remove('rounded-tr-2xl')
      athleticsButton?.classList.remove('rounded-tl-2xl')
      athleticsButton?.classList.remove('rounded-tr-2xl')
      yearbooksButton?.classList.remove('rounded-tl-2xl')
    }

    // Add rounded edges based on the current path
    if (pathname?.startsWith('/history')) {
      removeRoundedEdges()
      academicsButton?.classList.add('rounded-tl-2xl')
    }
    else if (pathname?.startsWith('/academics')) {
      historyButton?.classList.add('rounded-tr-2xl')
      athleticsButton?.classList.add('rounded-tl-2xl')
    }
    else if (pathname?.startsWith('/athletics')) {
      academicsButton?.classList.add('rounded-tr-2xl')
      yearbooksButton?.classList.add('rounded-tl-2xl')
    }
    else if (pathname?.startsWith('/yearbooks')) {
      athleticsButton?.classList.add('rounded-tr-2xl')
    }
  }, [pathname])

  const getBorderClasses = (pageName: string) => {
    let classes = ''

    // If home page, do not return borders
    if (pathname === '/') return

    if (pathname?.startsWith('/history') && pageName === pages[1].name) {
      classes += 'rounded-tl-2xl '
    }
    if (pathname?.startsWith('/academics')) {
      if (pageName === pages[0].name) classes += 'rounded-tr-2xl '
      if (pageName === pages[2].name) classes += 'rounded-tl-2xl '
    }
    if (pathname?.startsWith('/athletics')) {
      if (pageName === pages[1].name) classes += 'rounded-tr-2xl '
      if (pageName === pages[3].name) classes += 'rounded-tl-2xl '
    }
    if (pathname?.startsWith('/yearbooks') && pageName === pages[3].name) {
      classes += 'rounded-tr-2xl '
    }
    return classes
  }

  return (
    <>
      <button
        type='button'
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(isOpen => !isOpen)}
        className={`
          ${isMenuOpen ? 'bg-black border-white' : 'bg-white border-black'}
          fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center sm:hidden border-3`}
      >
        <Image
          src={isMenuOpen ? '/images/close.svg' : '/images/menu.svg'}
          alt=''
          aria-hidden='true'
          width={28}
          height={28}
          className='h-7 w-7'
        />
      </button>

      <div
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 flex min-h-screen w-screen flex-col bg-cover bg-center transition-transform duration-300 ease-in-out sm:hidden ${
          isMenuOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }}
      >
        <header className='px-8 pt-12 pb-8 text-center text-2xl font-bold uppercase text-white'>
          Holmes High School
          <br />
          Touch Hall of Fame
        </header>
        <div className='flex flex-1 flex-col justify-start'>
          {pages.map((page) => {
            const isActive = pathname === page.path || pathname?.startsWith(page.path + '/')

            return (
              <button
                type='button'
                className={`w-full border-b border-black/20 px-8 py-6 text-right text-2xl font-bold uppercase ${
                  isActive ? 'bg-primary-red text-white' : 'bg-white text-black'
                }`}
                key={page.path}
                onClick={() => {
                  setIsMenuOpen(false)
                  router.push(page.path)
                }}
              >
                {page.name}
              </button>
            )
          })}
        </div>
      </div>

      <nav className='hidden w-full pt-[25px] items-end bg-primary-red z-10 shadow-[0_-8px_12px_-6px_rgba(0,0,0,0.6)] sm:flex'>
        { pages.map((page, key) => (
          <button
            id={page.name.toLowerCase() + '-button'}
            className={
              `flex-1 uppercase whitespace-nowrap overflow-hidden cursor-pointer truncate
              p-[10px] md:p-[30px]
              ${pathname === page.path || pathname?.startsWith(page.path + '/')
            ? 'bg-primary-red text-white'
            : 'bg-white text-black'}

              ${getBorderClasses(page.name)}
            `
            }
            key={key}
            onClick={() =>
              pathname === page.path || pathname?.startsWith(page.path + '/') ? router.push('/') : router.push(page.path)}
          >
            {page.name}
          </button>
        ))}
      </nav>
    </>
  )
}
