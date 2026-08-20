'use client'

import Footer from '../../components/footer'
import Header from '@/components/header'
import background from '../../public/images/background.png'
import { MenuItem } from '@/types'
import Menu from '@/components/Menu'

export default function AthleticsPage() {

  const menuItems: MenuItem[] = [
    {title: 'Hall of Fame', link: '/athletics/hall-of-fame'},
    {title: 'Championship', link: '/athletics/championship'},
    {title: 'Timeline', link: '/athletics/timeline'},
  ]

  return (
    <div
      className='w-full h-full'
      style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }} >
      {/* Date and Time */}
      <Header variant="menu" />

      {/* Menu Items */}
      <Menu items={menuItems} />

      {/* Nav */}
      <Footer />
    </div>
  )
}
