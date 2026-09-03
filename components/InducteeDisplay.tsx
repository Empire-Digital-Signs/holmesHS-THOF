'use client'

import { useState } from 'react'
import InducteeGallery from './InducteeGallery'
import InducteeList from './InducteeList'
import { Inductee } from '@/types'
import Searchbar from './Searchbar'

/**
 * Displays inductees and additional information. Used for inductee pages.
 * @returns Searchable list and gallery display of inductees.
 */
export default function InducteeDisplay({ inductees }: { inductees: Inductee[] }) {
  // Store inductee data
  const [filteredInductees, setFilteredInductees] = useState<Inductee[]>(inductees)
  // The inductee to center on
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)

  return (
    <>
      <div
        className='flex h-full min-h-0 flex-col'
      >
        {/* List and Gallery Wrapper */}
        <div
          className='flex h-full min-h-0 flex-row'
        >
          {/* Inductee List and Searchbar */}
          <div className='flex h-full min-h-0 flex-col gap-[20px] items-start'>
            <InducteeList
              inductees={filteredInductees}
              selectedInductee={selectedInductee}
              onSelect={setSelectedInductee}
            />
            <Searchbar
              inductees={inductees}
              setFilteredInductees={setFilteredInductees}
            />
          </div>
          <InducteeGallery
            inductees={filteredInductees}
            selectedInductee={selectedInductee}
            onSelect={setSelectedInductee}
          />
        </div>
      </div>
    </>
  )
}
