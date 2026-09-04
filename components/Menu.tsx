import { MenuItem } from '../types'
import MenuCard from './MenuCard'

export default function Menu({ items }: { items: MenuItem[] }) {
  return (
    <div className='w-full h-full flex items-center justify-around gap-[30px] flex-row flex-wrap pt-[120px] overflow-y-scroll'>
      {items.map((item, index) => (
        <MenuCard item={item} key={index} />
      ))}
    </div>
  )
}
