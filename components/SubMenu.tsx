'use client'

import { Page } from '@/types'
import { usePathname, useRouter } from 'next/navigation'

export default function SubMenu({ pages }: { pages: Page[] }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='w-full min-w-0 flex items-stretch justify-center gap-[20px] overflow-hidden z-20 mb-[10px]'>
      {pages.map((page, index) => {
        // Create shape for ends of menu items. Create a perfect rectangle for all middle items.
        let clipPath = ''
        let polygonPoints = '0,0 100,0 100,100 0,100'

        if (index === 0) { // left most item
          clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%)'
          polygonPoints = '0,0 100,0 100,100 12,100'
        }
        else if (index === 2) { // right most item
          clipPath = 'polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)'
          polygonPoints = '0,0 100,0 88,100 0,100'
        }

        // Resolve pathname
        const isSelected = pathname.includes(page.destination)

        // Create outline based on button position
        const outlineSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolygon points='${polygonPoints}' fill='none' stroke='black' stroke-width='6' vector-effect='non-scaling-stroke' /%3E%3C/svg%3E")`

        return (
          <button
            key={index}
            onClick={() => router.push(page.destination)}
            style={{
              clipPath,
              ['--button-clip']: clipPath,
              ['--button-outline']: outlineSvg,
            } as React.CSSProperties}
            className={`
              submenu-button relative isolate min-w-0 shrink basis-0 flex-1 overflow-hidden font-bold uppercase text-center px-[26px] lg:p-[16px]
              before:absolute before:inset-0 before:z-[-1] before:[clip-path:var(--button-clip)]
              before:[background-image:var(--button-outline)] before:bg-no-repeat before:bg-size-[100%_100%]
              ${isSelected
            ? 'bg-black text-white'
            : 'bg-white text-black'
          }`}
          >
            {page.name}
          </button>
        )
      })}
    </div>
  )
}
