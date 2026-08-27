'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getInductees } from '@/lib/sanity'
import InducteeList from '@/components/InducteeList'
import { Inductee, Page } from '@/types'
import InducteeGallery from '@/components/InducteeGallery'

// temp data
const inductees: Inductee[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting except its a really long paragraph that goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on.',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Johnny',
    lastName: 'Appleseed',
    year: 2000,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },

]

export default function AcademicProgramsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)

  // Use React Query to fetch and cache inductees
  const { data: inducteeData = [], isLoading } = useQuery<Inductee[]>({
    queryKey: ['inductees'],
    queryFn: getInductees,
  })

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-cover bg-center">
        <p className="text-white text-4xl">Loading...</p>
      </div>
    )
  }

  return (
    <>      
      <div
        className="flex h-full min-h-0 flex-col"
      >
        {/* List and Gallery Wrapper */}
        <div
          className='flex h-full min-h-0 flex-row'
        >
          <InducteeList inductees={inductees} />
          <InducteeGallery inductees={inductees} />
        </div>
      </div>
    </>
  )
}
