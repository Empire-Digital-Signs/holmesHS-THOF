import SubMenu from '@/components/SubMenu'
import { ACADEMICS_PAGES } from '@/constants'
import type { ReactNode } from 'react'

export default function AcademicsSubpagesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='flex flex-col justify-between gap-[15px] h-full'>
      {children}
      <SubMenu pages={ACADEMICS_PAGES} />
    </div>
  )
}
