'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react'

const pages = [
  { name: 'History', path: '/history' },
  { name: 'Academics', path: '/academics' },
  { name: 'Athletics', path: '/athletics' },
  { name: 'Yearbooks', path: '/yearbooks' },
]

export default function Footer() {

  const router = useRouter();
  const pathname = usePathname();

  // Handle rounded edges based on current path
  useEffect(() => {

    console.log('pathname', pathname);

    // Get buttons
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

    // Add rounded edges based on the current path
    if (pathname.startsWith('/history')) {
      removeRoundedEdges();
      academicsButton?.classList.add('rounded-tl-2xl');
    }
    else if (pathname.startsWith('/academics')) {
      historyButton?.classList.add('rounded-tr-2xl');
      athleticsButton?.classList.add('rounded-tl-2xl');
    }
    else if (pathname.startsWith('/athletics')) {
      academicsButton?.classList.add('rounded-tr-2xl');
      yearbooksButton?.classList.add('rounded-tl-2xl');
    }
    else if (pathname.startsWith('/yearbooks')) {
      athleticsButton?.classList.add('rounded-tr-2xl');
    }
  }, [pathname]);

  const getBorderClasses = (pageName: string) => {

    let classes = '';

    if (pathname.startsWith('/history') && pageName === pages[1].name) {
      classes += 'rounded-tl-2xl ';
    }
    if (pathname.startsWith('/academics')) {
      if (pageName === pages[0].name) classes += 'rounded-tr-2xl ';
      if (pageName === pages[2].name) classes += 'rounded-tl-2xl ';
    }
    if (pathname.startsWith('/athletics')) {
      if (pageName === pages[1].name) classes += 'rounded-tr-2xl ';
      if (pageName === pages[3].name) classes += 'rounded-tl-2xl ';
    }
    if (pathname.startsWith('/yearbooks') && pageName === pages[3].name) {
      classes += 'rounded-tr-2xl ';
    }
    return classes;
  };

  return (
    <footer className="w-full pt-[25px] flex items-end bg-primary-red z-50 shadow-[0_-8px_12px_-6px_rgba(0,0,0,0.6)]">
      { pages.map((page, key) => (
        <button
          id={page.name.toLowerCase() + '-button'}
          className={
            `h-[135px] flex-1 uppercase transition whitespace-nowrap overflow-hidden truncate text-[41.5px] cursor-pointer

            ${pathname === page.path || pathname.startsWith(page.path + '/') ?
              'bg-primary-red text-white' :
              'bg-white text-black'}

            ${getBorderClasses(page.name)}
          `}
          key={key}
          onClick={() => 
            pathname === page.path || pathname.startsWith(page.path + '/') ? router.push('/') : router.push(page.path)
          }
        >
          {page.name}
        </button>
      ))}
    </footer>
  )
}
