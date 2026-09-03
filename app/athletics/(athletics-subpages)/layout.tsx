import SubMenu from '@/components/SubMenu'
import { ATHLETICS_PAGES } from '@/constants'
import type { ReactNode } from 'react'

export default function AthleticsSubpagesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='flex flex-col justify-between gap-[15px] h-full'>
      {children}
      <SubMenu pages={ATHLETICS_PAGES} />
    </div>
  )
}
