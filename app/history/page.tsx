'use client'

import { useState } from 'react'
import { CoverflowCarousel, type CoverflowSlide } from '@/components/ruixen/coverflow-carousel'
import Image from 'next/image'
import crestImage from '../../public/images/crest.png'
import { getHistory } from '@/sanity/lib/client'
import { HISTORY_QUERY_RESULT } from '@/sanity.types'

const records: HISTORY_QUERY_RESULT = await getHistory()
const slides: CoverflowSlide[] = records.map(record => ({
  src: record.photo || '',
  alt: `${record.year} ${record.title}`,
}))

function HistoryCard({
  record,
  selected,
  textAlign,
  hasPrev,
  prevCallback,
  hasNext,
  nextCallback,
}: {
  record: HISTORY_QUERY_RESULT[number]
  selected: boolean
  textAlign: 'left' | 'center' | 'right'
  hasPrev: boolean
  prevCallback: () => void
  hasNext: boolean
  nextCallback: () => void
}) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[textAlign]

  return (
    <div className={`flex h-full flex-col border-2 border-black ${selected ? 'bg-primary-red' : 'bg-white'} pb-[30px]`}>
      {selected
        ? (
            <>
              <h4 className={`px-3.5 ${alignmentClass} text-white`}>
                {record.year}
              </h4>
              <Image
                src='/images/history-image.png'
                alt={`${record.year}: ${record.title}`}
                width={809}
                height={503}
                className='object-cover h-[200px]'
              />
              <div className='relative flex min-h-0 flex-1 flex-col gap-[20px] bg-white p-[15px]'>
                <h2
                  className='uppercase text-center'
                >
                  {record.title}
                </h2>
                <p
                  className='primary-text min-h-0 overflow-hidden font-sans'
                >
                  {record.description}
                </p>
                {/* Buttons and Crest */}
                <div
                  className='absolute -bottom-[20px] left-0 flex justify-around items-center w-full'
                >
                  <button
                    onPointerDown={e => e.stopPropagation()}
                    onPointerUp={e => e.stopPropagation()}
                    className={`${hasPrev ? 'visible' : 'invisible'} uppercase w-[170px] h-[58px] bg-primary-red text-white cursor-pointer`}
                    onClick={prevCallback}
                  >
                    {`< Previous`}
                  </button>
                  {/* Crest */}
                  <Image
                    src='/images/crest.png'
                    alt=''
                    width={75}
                    height={108}
                    className=''
                  />
                  <button
                    onPointerDown={e => e.stopPropagation()}
                    onPointerUp={e => e.stopPropagation()}
                    className={`${hasNext ? 'visible' : 'invisible'} uppercase w-[170px] h-[58px] bg-primary-red text-white cursor-pointer`}
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
              <h5 className={`px-3.5 ${alignmentClass} text-black`}>
                {record.year}
              </h5>
              <div
                className='relative flex flex-1 flex-col justify-end p-3.5 h-3/4 bg-no-repeat bg-center opacity-50'
                style={{ backgroundImage: `url(${crestImage.src})`, backgroundSize: '132px 180px' }}
              >
                <p className='secondary-text line-clamp-3 font-sans text-black'>{record.description}</p>
              </div>
            </>
          )}
    </div>
  )
}

export default function HistoryPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div
      className='flex flex-col w-full h-full'
    >
      {/* Content: List and Carousel */}
      <div className='flex flex-row flex-1 min-h-0 justify-between'>
        {/* Years List */}
        <div className='flex min-h-0 flex-col align-start mb-[27px]'>
          {/* Header */}
          <h4
            className='flex text-center items-center justify-center border-4 border-black uppercase bg-white
            p-[30px] lg:px-[60px]'
          >
            Years
          </h4>
          {/* List Wrapper */}
          <div className='relative flex-1 min-h-0 overflow-y-auto no-scrollbar'>
            <div className='relative min-h-full w-full pr-[30px]'>
              {/* Background */}
              <div className='absolute inset-y-0 left-0 w-[calc(100%-60px)] bg-black' />
              {/* List */}
              <ul className='relative z-10 flex flex-col gap-[20px]'>
                {
                  records.map((record, index: number) => (
                    <li
                      className={`flex justify-end px-[20px] w-full bg-primary-red border-4 border-black text-white
                        hover:cursor-pointer`}
                      key={record.year}
                    >
                      <button
                        onClick={() => setSelectedIndex(index)}
                      >
                        {record.year}
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

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
          className='flex h-[750px] my-auto min-w-0 flex-1 items-center [&>div]:h-full [&>div>div]:h-full [&>div>div>div]:h-full!'
          cardClassName='h-full rounded-[20px] border-2 border-black'
          renderSlide={(_, index, selected) => {
            const hasPrev = index - 1 >= 0
            const hasNext = index + 1 < records.length
            return (
              <HistoryCard
                record={records[index]}
                selected={selected}
                textAlign={index < selectedIndex ? 'left' : index > selectedIndex ? 'right' : 'center'}
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

      </div>
    </div>
  )
}
