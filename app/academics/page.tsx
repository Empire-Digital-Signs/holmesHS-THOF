'use client'

import Header from '@/components/header'
import { MenuItem } from '@/types'
import Menu from '@/components/Menu'

export default function AcademicsPage() {
  const menuItems: MenuItem[] = [
    { title: 'Academic Programs', link: '/academics/academic-programs' },
    { title: 'Career and Technical Education', link: '/academics/career-and-technical-education' },
    { title: 'Hall of Distinction', link: '/academics/hall-of-distinction' },
  ]

  return (
    <div className='w-full h-full'>
      {/* Date and Time */}
      <Header variant='menu' />

      {/* Menu Items */}
      <Menu items={menuItems} />
    </div>
  )
}
