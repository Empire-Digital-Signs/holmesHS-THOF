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
      className='bg-cover bg-no-repeat bg-center h-[444px] w-[290px] flex justify-center items-center'
      style={{ backgroundImage: `url(${MenuBanner.src})` }}
    >
      <button
      // TODO: adjust padding to text fits inside as banner is resized
        className='text-center text-black pt-[75px] pb-[280px] mx-2 uppercase'
        onClick={() => { router.push(item.link) }}
      >
        {item.title}
      </button>
    </div>
  )
}
