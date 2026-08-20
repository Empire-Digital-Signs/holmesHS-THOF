'use client'

import { useState, useEffect } from 'react'

/**
 * Displays the time and date.
 * @returns TSX Component
 */
export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDay = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  console.log(formattedDay);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <header
      // 32px measured from QR code image
      className="
        absolute top-0 right-0 mt-[32px] mr-[32px] z-50
        flex-col text-right justify-end
        px-[clamp(12px,1.2vw,28px)]
        h-[8vh] min-h-[72px] max-h-[140px]
        text-white
      "
    >
      {/* Date/Time */}
      <div
        className="
          whitespace-nowrap
          text-[clamp(12px,1.6vw,28px)]
        "
      >
        {formattedDay}
      </div>
      <div
        className="
          whitespace-nowrap
          text-[clamp(12px,1.6vw,28px)]
        "
      >
        {formattedTime}
      </div>
    </header>
  )
}