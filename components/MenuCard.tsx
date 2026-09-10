import { MenuItem } from '../types'
import MenuBanner from '@/public/images/menu-banner.png'
import { useRouter } from 'next/navigation'

/**
 * Displays a menu item with a banner background and text title.
 * @param item - Item to display
 * @returns TSX Element
 */
export default function MenuCard({ item }: { item: MenuItem }) {
  const router = useRouter()

  return (
    <div
      className='relative aspect-3/5 w-full max-w-[290px] shrink-0 bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${MenuBanner.src})` }}
    >
      <button
        className='absolute inset-0 w-full pt-[70px] pb-[280px] px-2 text-center text-black uppercase'
        onClick={() => { router.push(item.link) }}
      >
        {item.title}
      </button>
    </div>
  )
}
