'use client'

import { useState, useEffect } from 'react'

interface HeaderProps {
  // Home: Home page
  // Menu: Academics and Athletics landing pages (with menus)
  variant: 'home' | 'menu'
}

/**
 * Displays the time and date.
 * @returns TSX Component
 */
export default function Header({ variant }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDay = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <header
      // 32px measured from QR code image
      className={`
        absolute top-0 right-0 py-[32px] px-[32px] z-50 whitespace-pre
        flex text-right justify-end ${variant === 'home' ? 'flex-col' : 'flex-row'}
        ${variant === 'home' ? 'text-white' : 'text-primary-red'}
        ${variant === 'menu' ? 'bg-white rounded-bl-2xl' : ''}
      `}
    >
      {/* Date/Time */}
      {variant === 'home'
        ? (
            <>
              <h3>{formattedDay}</h3>
              <h3>{formattedTime}</h3>
            </>
          )
        : (
            <>
              <h5>{formattedDay}</h5>
              <h5>{'\t' + formattedTime}</h5>
            </>
          )}
    </header>
  )
}
