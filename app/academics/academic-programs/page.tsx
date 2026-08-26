'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getInductees } from '@/lib/sanity'
import InducteeList from '@/components/InducteeList'
import { Inductee, Page } from '@/types'
import InducteeGallery from '@/components/InducteeGallery'

//TODO: update for academics page

// temp data
const inductees: Inductee[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'Johnny',
    lastName: 'Appleseed',
    year: 2000,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
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
