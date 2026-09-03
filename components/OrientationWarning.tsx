'use client'

import { useEffect, useState } from 'react'

export default function OrientationWarning() {
  const [isUnsupportedOrientation, setIsUnsupportedOrientation] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const updateOrientation = () => {
      // Project supports as little as 1080px wide for portrait,
      // otherwise prompt user to rotate device to landscape
      const unsupportedOrientation
        = window.innerWidth < 1080 && window.innerHeight > window.innerWidth

      setIsUnsupportedOrientation(unsupportedOrientation)
      if (!unsupportedOrientation) {
        setIsDismissed(false)
      }
    }

    updateOrientation()

    // Get new orientation when window is resized or orientation is changed
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)

    return () => {
      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  if (!isUnsupportedOrientation || isDismissed) {
    // Go back to app
    return null
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6'
      role='alertdialog'
      aria-modal='true'
      aria-labelledby='orientation-warning-title'
      onClick={() => setIsDismissed(true)}
    >
      <div
        className='w-full max-w-md border-4 border-primary-red bg-white p-8 text-center shadow-2xl'
        onClick={event => event.stopPropagation()}
      >
        <h2 id='orientation-warning-title' className='mb-4 text-2xl text-black uppercase'>
          Notice
        </h2>
        <p className='text-base leading-relaxed text-black'>
          For the best experience, please rotate your device to landscape.
        </p>
        <button
          type='button'
          className='mt-6 border-2 border-black px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white uppercase'
          onClick={() => setIsDismissed(true)}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  )
}
