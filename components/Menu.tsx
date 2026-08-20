import { MenuItem } from '../types'
import MenuCard from './MenuCard'


export default function Menu({ items }: { items: MenuItem[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-[165px]">
      {items.map((item, index) => (
        <MenuCard item={item} key={index} />
      ))}
    </div>
  )
}