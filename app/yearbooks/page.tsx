'use client'

import YearsList from '@/components/YearsList'
import { useState } from 'react'
import { YEARBOOK_URLS } from '@/constants'

const years = Object.keys(YEARBOOK_URLS).map(Number)

export default function YearbooksPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(years[0] ?? null)

  return (
    <>
      <div
        className='flex flex-col w-full h-full min-h-0 box-border pt-[20px] gap-[20px]'
      >
        {/* FlipHTML Embed */}
        <iframe
          src={selectedYear ? YEARBOOK_URLS[selectedYear] : ''}
          className='w-3/4 min-h-0 flex-1 mx-auto'
          title={`${selectedYear} Yearbook`}
        />

        {/* Wrapper maybe */}
        <div
          className=''
        >
          {/* Horizontal Years List */}
          <YearsList
            years={years}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />
        </div>
      </div>
    </>
  )
}
