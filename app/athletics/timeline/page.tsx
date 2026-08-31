'use client'

import { useState } from 'react'
import { CoverflowCarousel, CoverflowSlide } from '@/components/ruixen/coverflow-carousel';
import { HistoryItem } from '@/types';
import logoImage from '../../../public/images/logo.png';
import Image from 'next/image';
import YearsList from '@/components/YearsList';

// TODO: get data from api
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
];

const years: number[] = records.map((r) => r.year);

function TimelineCard({
  record,
  selected,
  hasPrev,
  prevCallback,
  hasNext,
  nextCallback
}: {
  record: HistoryItem
  selected: boolean
  hasPrev: boolean
  prevCallback: () => void
  hasNext: boolean
  nextCallback: () => void
}) {

  return (
    <div
      className={`flex h-full flex-col border-2 border-black ${selected ? 'bg-primary-red' : 'bg-white' } pb-[30px] bg-no-repeat bg-center`}
      style={!selected ? { backgroundImage: `url(${logoImage.src})`, backgroundSize: '190px' } : {}}
    >
      {/* Header: School and Year */}
      <div
        className='flex flex-col pl-[20px] pt-[30px]'
      >
        <h2
          className={`uppercase text-[22px] ${selected ? 'text-white' : 'text-primary-red'}`}
        >
          Holmes High School
        </h2>
        <p className={`${selected ? 'text-[58px] text-white' : 'text-[38px] text-primary-red'}`}>
          {record.year}
        </p>
      </div>
      {selected ? (
        <>
          <div className='relative flex min-h-0 flex-1 flex-col gap-[20px] bg-white p-[15px]'>
            <p
              className='uppercase text-left text-[22px] text-primary-red'
            >
              {record.title}
            </p>
            <p
              className='min-h-0 overflow-hidden font-sans text-[18px]'
            >
              {record.description}
            </p>
            {/* Buttons and Crest */}
            <div
              className='absolute bottom-[20px] left-0 flex justify-around items-center w-full'
            >
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                className={`${hasPrev ? 'visible' : 'invisible'} uppercase text-[16px] w-[170px] h-[58px] bg-primary-red text-white cursor-pointer`}
                onClick={prevCallback}
              >
                {`< Previous`}
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                className={`${hasNext ? 'visible' : 'invisible'} uppercase text-[16px] w-[170px] h-[58px] bg-primary-red text-white cursor-pointer`}
                onClick={nextCallback}
              >
                {`Next >`}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          className='relative flex flex-1 flex-col justify-end p-3.5 h-3/4'
          
        >
          <p className='line-clamp-3 font-sans text-[18px] text-black'>{record.description}</p>
        </div>
      )}
    </div>
  )
}

export default function TimelinePage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const slides: CoverflowSlide[] = records.map((record) => ({
    src: '',
    alt: `${record.year} ${record.title}`
  }))

  // TODO: If loading: return...?

  return (
    <>
      {/* Carousel */}
      <CoverflowCarousel
        slides={slides}
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
        cardWidth='30vw'
        gap={0}
        rotate={0}
        depth={1.25}
        fade={0}
        loop={false}
        showNavigation={false}
        label='Holmes High School history'
        className='flex h-[600px] my-auto min-w-0 flex-1 items-center [&>div]:h-full [&>div>div]:h-full [&>div>div>div]:h-full!'
        cardClassName='h-full rounded-[20px] border-2 border-black'
        renderSlide={(_, index, selected) => {
          const hasPrev = index - 1 >= 0;
          const hasNext = index + 1 < records.length;
          return (
            <TimelineCard
              record={records[index]}
              selected={selected}
              hasPrev={hasPrev}
              prevCallback={() => {
                if (hasPrev) setSelectedIndex(index - 1)
              }}
              hasNext={hasNext}
              nextCallback={() => {
                if (hasNext) setSelectedIndex(index + 1)
              }}
            />
          )
        }}
      />

      {/* Years List */}
      <YearsList
        years={years}
        selectedYear={years[selectedIndex]}
        onSelectYear={(year) => setSelectedIndex(years.indexOf(year))}
      />
    </>
  )
}
