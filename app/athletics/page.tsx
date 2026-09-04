'use client'

import Header from '@/components/header'
import { MenuItem } from '@/types'
import Menu from '@/components/Menu'

export default function AthleticsPage() {
  const menuItems: MenuItem[] = [
    { title: 'Hall of Fame', link: '/athletics/hall-of-fame' },
    { title: 'Championship', link: '/athletics/championship' },
    { title: 'Timeline', link: '/athletics/timeline' },
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
