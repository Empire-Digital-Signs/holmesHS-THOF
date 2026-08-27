'use client'

import Header from '@/components/header'
import background from '../../public/images/background.png'
import { MenuItem, Page } from '@/types'
import Menu from '@/components/Menu'

const subMenuPages: Page[] = [
  {
    name: 'Academic Programs',
    destination: '/academics/academic-programs'
  },
  {
    name: 'Career and Technical Education',
    destination: '/academics/career-and-technical-education'
  },
  {
    name: 'Hall of Distinction',
    destination: '/academics/hall-of-distinction'
  }
];

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
      {/* <SubMenu pages={subMenuPages} /> */}
      <Menu items={menuItems} />
    </div>
  )
}
