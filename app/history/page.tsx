'use client'

import { useState, useRef, useEffect } from 'react'
import background from '../../public/images/background.png'
import Footer from '../../components/footer'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { HistoryItem } from '@/types'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'


//TODO: import history facts from CSV
const records: HistoryItem[] = [
    {
      year: 1910,
      title: '0 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },
    {
      year: 1911,
      title: '1 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },
    {
      year: 1912,
      title: '2 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1913,
      title: '3 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1914,
      title: '4 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1915,
      title: '5 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1916,
      title: '6 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1917,
      title: '7 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1918,
      title: '8 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1919,
      title: '9 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },{
      year: 1920,
      title: '10 School Opened',
      description: 'Holmes High School opened its doors on January 6th, 1919 — initially operating under the name Covington High School. The new institution would grow to become one of the most respected high schools in Kentucky.'
    },
]

type HistoryCardProps = {
  record: HistoryItem;
  visiblePos: number;
}

export default function HistoryPage() {

  // Embla API
  const [api, setApi] = useState<CarouselApi>();

  // Slide visibility
  useEmblaCarousel({ inViewThreshold: 1 })
  const [visible, setVisible] = useState<number[]>();

  // Update visible variable when carousel moves
  useEffect(() => {
    if (!api) return;

    // Callback
    const updateVisible = () => {
      const visible = api.slidesInView();
      setVisible(visible);
      console.log(visible);
      console.log('not in view: ', api.slidesNotInView());
    }
    updateVisible();

    // Event handling
    api.on('settle', updateVisible);
    return () => {
      api.off('settle', updateVisible);
    }
  }, [api]);

  function HistoryCard({ record, visiblePos }: HistoryCardProps) {
    const isVisible = visible?.includes(visiblePos); // may not need?
    const isVisibleLeft = visible?.at(0) === visiblePos || visible?.at(1) === visiblePos;
    const isVisibleCenter = visible?.at(2) === visiblePos;
    const isVisibleRight = visible?.at(3) === visiblePos || visible?.at(4) === visiblePos;

    return (
      <CarouselItem
        className={
          `flex flex-col bg-(--primary-red) border-black border-2 rounded-[20px]
          w-full m-[5px]`
        }
      >
        <p
          className={`text-white
            ${isVisibleLeft ? 'text-left' : isVisibleRight ? 'text-right' : 'text-center' }
            ${isVisibleCenter ? 'text-[28px]' : 'text-[34px]'}`}
        >
          {record.year}
        </p>
        <Image
          src="/images/history-image.png" alt={''}
          width='809'
          height='503'
          className='object-center'
        />
        <div
          className='bg-white mb-[30px] p-[10px] flex flex-col gap-[30px]'
        >
          <p
            className='uppercase text-[25px] text-center'
          >
            {record.title}
          </p>
          <p
            className='font-sans text-[16px]'
          >
            {record.description}
          </p>
        </div>
      </CarouselItem>
    )
  }

  return (
    <div 
      className='w-full h-full'
      style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }}
    >
      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {
            records.map((record, index) => (
              <HistoryCard record={record} visiblePos={index} key={index} />
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Nav bar */}
      <Footer />
    </div>
  )
}
