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
    <>
      <button
        className='bg-contain bg-no-repeat bg-center h-[444px] w-[290px] flex justify-center items-center'
        style={{ backgroundImage: `url(${MenuBanner.src})`, backgroundSize: 'contain' }}
        onClick={() => { router.push(item.link) }}
      >
        <p
          className='text-center text-black mt-[75px] mb-[280px] mx-2 text-[24px] uppercase'
        >
          {item.title}
        </p>
      </button>
    </>
  )
}
