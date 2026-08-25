'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
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
  visible: number[] | undefined;
  visiblePos: number;
}

/**
 * Cards for carousel - styled for History page
 */
function HistoryCard({ record, visible, visiblePos }: HistoryCardProps) {
  const isVisible = visible?.includes(visiblePos); // may not need?
  const isVisibleLeft = visible?.at(0) === visiblePos || visible?.at(1) === visiblePos;
  const isVisibleCenter = visible?.at(2) === visiblePos;
  const isVisibleRight = visible?.at(3) === visiblePos || visible?.at(4) === visiblePos;

  return (
    <CarouselItem
      className={
        `flex flex-col bg-(--primary-red) border-black border-2 rounded-[20px]
        w-full`
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
        width={809}
        height={503}
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

export default function HistoryPage() {

  // Embla API
  const [api, setApi] = useState<CarouselApi>();

  // Slide visibility
  const emblaOptions = useMemo(() => ({ inViewThreshold: 1 }), []);
  // useEmblaCarousel({ inViewThreshold: 1 })
  const [visible, setVisible] = useState<number[]>();

  // Update visible variable when carousel moves
  useEffect(() => {
    if (!api) return;

    // Callback
    const updateVisible = () => {
      // const visible = api.slidesInView();
      // setVisible(visible);
      // console.log('slides updated: ', visible);

      const centerSlide = api.selectedScrollSnap();
      const currVisible = [
        centerSlide - 2,
        centerSlide - 1,
        centerSlide,
        centerSlide + 1,
        centerSlide + 2
      ].filter((i) => i >= 0 && i < records.length);
      console.log('center', centerSlide);
      console.log('visible', currVisible);
      setVisible(currVisible);
    }
    updateVisible();

    // Event handling
    api.on('select', updateVisible);
    api.on('reInit', updateVisible);
    return () => {
      api.off('select', updateVisible);
      api.off('reInit', updateVisible);
    }
  }, [api]);


  return (
    <div 
      className='flex flex-col w-full h-full'
      style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }}
    >
      {/* Content: List and Carousel */}
      <div className='flex flex-row flex-1 min-h-0 justify-between'>
        {/* Years List */}
        <div className='flex min-h-0 flex-col align-start mb-[27px]'>
          {/* Header */}
          <h1 className='flex text-center items-center justify-center w-[255px] h-[119px] py-[35px] text-[33px] border-4 border-black uppercase bg-white'>
            Years
          </h1>
          {/* List Wrapper */}
          <div className='relative flex-1 min-h-0 overflow-y-auto no-scrollbar'>
            <div className='relative min-h-full w-[220px]'>
              {/* Background */}
              <div className='absolute inset-y-0 left-0 w-[187px] bg-black' />
              {/* List */}
              <ul className='relative z-10 flex flex-col gap-[20px]'>
                {
                  records.map((record, index) => (
                    <li
                      className={`flex justify-end pr-[20px] w-[208px] h-[46px] bg-(--primary-red) border-4 border-black text-[25px] text-white
                        hover:cursor-pointer`}
                      onClick={() => api?.scrollTo(index)}
                      key={record.year}
                    >
                      {record.year}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Carousel setApi={setApi} className="w-full h-full" opts={emblaOptions}>
          <CarouselContent>
            <CarouselItem />
            <CarouselItem />
            {
              records.map((record, index) => (
                <HistoryCard record={record} visible={visible} visiblePos={index} key={record.year} />
              ))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      
      </div>
    </div>
  )
}
