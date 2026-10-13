'use client'

import { SLIDES_QUERY_RESULT } from '@/sanity.types'
import { getSlides } from '@/sanity/lib/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const DEFAULT_FADE_MS = 2000

export default function HomeSlideshow() {
  const [slides, setSlides] = useState<SLIDES_QUERY_RESULT>()
  const [index, setIndex] = useState<number>(0)
  const [fadeTime, setFadeTime] = useState<number>(DEFAULT_FADE_MS)

  // Fetch slides once on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const slides = await getSlides()
      setSlides(slides)

      // If only one slide, do not fade
      if (slides && slides.length > 1) {
        setFadeTime(slides?.[0]?.transitionDuration || DEFAULT_FADE_MS)
      }
      else {
        setFadeTime(0)
      }
    }
    fetchSlides()
  }, [])

  const now = new Date()
  const activeSlides = slides?.filter((slide) => {
    const start = slide.startDate ? new Date(slide.startDate) : null
    const end = slide.endDate ? new Date(slide.endDate) : null
    if (start && now < start) return false
    if (end && now > end) return false
    return true
  })

  // Cycle slides
  useEffect(() => {
    if (activeSlides?.length === 0) return

    const duration = (activeSlides?.[index]?.duration || 5) * 1000 + fadeTime
    const timer = setTimeout(() => {
      setIndex(prev => (prev + 1) % (activeSlides?.length || 1))
    }, duration)

    return () => clearTimeout(timer)
  }, [index, activeSlides?.length, activeSlides, fadeTime])

  if (!activeSlides?.length) return null
  const slide = activeSlides?.[index]

  return (
    <div className='absolute w-full flex-1 h-full overflow-hidden bg-black'>
      <AnimatePresence mode='sync'>
        <motion.div
          key={index}
          className='absolute inset-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: fadeTime / 1000,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={slide.imageUrl || ''}
            alt=''
            className='w-full h-full object-cover'
            width={1920}
            height={1080}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
