'use client'

import { useRouter, usePathname} from 'next/navigation'
import { useEffect } from 'react'

interface FooterProps {
  onHallOfFameClick?: () => void
}

const pages = [
  { name: 'History', path: '/history' },
  { name: 'Academics', path: '/academics' },
  { name: 'Athletics', path: '/athletics' },
  { name: 'Yearbooks', path: '/yearbooks' },
]

export default function Footer({ onHallOfFameClick }: FooterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleHallOfFameClick = () => {
    if (pathname === '/hall-of-fame' && onHallOfFameClick) {
      onHallOfFameClick()
    } else {
      router.push('/hall-of-fame')
    }
  }

  // Handle rounded edges based on current path
  useEffect(() => {
    const historyButton = document.getElementById('history-button');
    const academicsButton = document.getElementById('academics-button');
    const athleticsButton = document.getElementById('athletics-button');
    const yearbooksButton = document.getElementById('yearbooks-button');

    // Remove all possible additions before rendering (home page has no rounded edges)
    const removeRoundedEdges = () => {
      historyButton?.classList.remove('rounded-tr-2xl');
      academicsButton?.classList.remove('rounded-tl-2xl');
      academicsButton?.classList.remove('rounded-tr-2xl');
      athleticsButton?.classList.remove('rounded-tl-2xl');
      athleticsButton?.classList.remove('rounded-tr-2xl');
      yearbooksButton?.classList.remove('rounded-tl-2xl');
    };

    switch (pathname) {
      case '/history': // Academic left edge rounded
        removeRoundedEdges();
        academicsButton?.classList.add('rounded-tl-2xl');
        return;

      case '/academics': // History right edge rounded, Athletics left edge rounded
        removeRoundedEdges();
        historyButton?.classList.add('rounded-tr-2xl');
        athleticsButton?.classList.add('rounded-tl-2xl');
        return;

      case '/athletics': // Academics right edge rounded, Yearbooks left edge rounded
        removeRoundedEdges();
        academicsButton?.classList.add('rounded-tr-2xl');
        yearbooksButton?.classList.add('rounded-tl-2xl');
        return;

      case '/yearbooks': // Athletics right edge rounded
        removeRoundedEdges();
        athleticsButton?.classList.add('rounded-tr-2xl');
        return;

      default:
        return;
    }
  }, [pathname])

  return (
    <footer className="w-full h-[161px] absolute bottom-0 flex items-end bg-(--primary-red) z-50 shadow-[0_-8px_12px_-6px_rgba(0,0,0,0.6)]">
      { pages.map((page, key) => (
        <button
          id={page.name.toLowerCase() + '-button'}
          className={
            `h-[135px] flex-1 uppercase transition whitespace-nowrap overflow-hidden truncate text-[41.5px]

            ${pathname === page.path ? 'var(--primary-red) text-white' : 'bg-white text-black'}
          `}
          key={key}
          onMouseEnter={(e) => {
            if (pathname !== page.path) {
              e.currentTarget.style.backgroundColor = 'var(--primary-red)'
              e.currentTarget.style.color = 'white'
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== page.path) {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.color = 'black'
            }
          }}
          onClick={() => 
            pathname === page.path ? router.push('/') : router.push(page.path)
          }
        >
          {page.name}
        </button>
      ))}
    </footer>
  )
}
