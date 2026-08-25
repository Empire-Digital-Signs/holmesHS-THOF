'use client'

import Footer from '../../components/footer'
import Header from '@/components/header'
import background from '../../public/images/background.png'
import { MenuItem } from '@/types'
import Menu from '@/components/Menu'

export default function AcademicsPage() {

  const menuItems: MenuItem[] = [
    {title: 'Academic Programs', link: '/academics/academic-programs'},
    {title: 'Career and Technical Education', link: '/academics/career-and-technical-education'},
    {title: 'Hall of Distinction', link: '/academics/hall-of-distinction'},
  ];

  return (
    <div
      className='w-full h-full'
      style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }} >
      {/* Date and Time */}
      <Header variant="menu" />

      {/* Menu Items */}
      <Menu items={menuItems} />
    </div>
  )
}
