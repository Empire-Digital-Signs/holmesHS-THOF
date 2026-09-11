'use client'

import { useState } from 'react'
import { CoverflowCarousel, CoverflowSlide } from '@/components/ruixen/coverflow-carousel'
import logoImage from '../../../../public/images/logo.png'
import YearsList from '@/components/YearsList'
import { getTimeline } from '@/sanity/lib/client'
import { TIMELINE_QUERY_RESULT } from '@/sanity.types'

const records: TIMELINE_QUERY_RESULT = await getTimeline()

const years: number[] = records.map(r => r.year || -1).filter(year => year !== -1)

function TimelineCard({
  record,
  selected,
  hasPrev,
  prevCallback,
  hasNext,
  nextCallback,
}: {
  record: TIMELINE_QUERY_RESULT[number]
  selected: boolean
  hasPrev: boolean
  prevCallback: () => void
  hasNext: boolean
  nextCallback: () => void
}) {
  return (
    <div
      className={`flex h-full flex-col justify-start border-2 border-black ${selected ? 'bg-primary-red' : 'bg-white'} pb-[30px] bg-no-repeat bg-center`}
      style={!selected ? { backgroundImage: `url(${logoImage.src})`, backgroundSize: '190px' } : {}}
    >
      {selected
        ? (
            <>
              {/* Header: School and Year */}
              <div
                className='flex flex-col px-[20px] py-[10px] justify-center'
              >
                <h3
                  className='uppercase text-white hidden lg:block'
                >
                  Holmes High School
                </h3>
                <h2 className='text-white'>
                  {record.year}
                </h2>
              </div>

              <div className='flex min-h-0 flex-1 flex-col gap-[20px] bg-white p-[15px] overflow-hidden'>
                <h4
                  className='shrink-0 uppercase text-left text-primary-red text-ellipsis line-clamp-3'
                >
                  {record.title}
                </h4>
                <p
                  className='primary-text min-h-0 font-sans overflow-y-scroll overflow-hidden scrollbar scrollbar-track-white scrollbar-thumb-primary-red'
                >
                  {record.description}
                </p>
                {/* Buttons and Crest */}
                <div
                  className='mt-auto mb-[10px] flex justify-evenly items-center w-full gap-[5px]'
                >
                  <button
                    onPointerDown={e => e.stopPropagation()}
                    onPointerUp={e => e.stopPropagation()}
                    className={`${hasPrev ? 'visible' : 'invisible'} uppercase w-full h-min p-[10px] text-nowrap bg-primary-red text-white cursor-pointer`}
                    onClick={prevCallback}
                  >
                    {`< Previous`}
                  </button>
                  <button
                    onPointerDown={e => e.stopPropagation()}
                    onPointerUp={e => e.stopPropagation()}
                    className={`${hasNext ? 'visible' : 'invisible'} uppercase w-full h-min p-[10px] text-nowrap bg-primary-red text-white cursor-pointer`}
                    onClick={nextCallback}
                  >
                    {`Next >`}
                  </button>
                </div>
              </div>
            </>
          )
        : (
            <>
              {/* Header: School and Year */}
              <div
                className='flex flex-col pl-[20px] pt-[30px]'
              >
                <h6
                  className='uppercase text-primary-red hidden lg:block'
                >
                  Holmes High School
                </h6>
                <h5 className='text-primary-red'>
                  {record.year}
                </h5>
              </div>
              <div
                className='relative flex flex-1 flex-col justify-end p-3.5 h-3/4'
              >
                <p className='secondary-text line-clamp-3 font-sans text-black'>
                  {record.description}
                </p>
              </div>
            </>
          )}
    </div>
  )
}

export default function TimelinePage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const slides: CoverflowSlide[] = records.map((record: TIMELINE_QUERY_RESULT[number]) => ({
    src: '',
    alt: `${record.year} ${record.title}`,
  }))

  return (
    <>
      {/* Carousel */}
      <CoverflowCarousel
        slides={slides}
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
        cardWidth='clamp(300px, 30vw, 600px)'
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
          const hasPrev = index - 1 >= 0
          const hasNext = index + 1 < records.length
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
        onSelectYear={year => setSelectedIndex(years.indexOf(year))}
      />
    </>
  )
}
