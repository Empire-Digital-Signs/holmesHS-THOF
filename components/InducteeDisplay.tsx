'use client'

import { useState } from 'react'
import InducteeGallery from './InducteeGallery'
import InducteeList from './InducteeList'
import Searchbar from './Searchbar'
import { INDUCTEES_QUERY_RESULT } from '@/sanity.types'
import { Inductee } from '@/types'

/**
 * Displays inductees and additional information. Used for inductee pages.
 * @returns Searchable list and gallery display of inductees.
 */
export default function InducteeDisplay({ inductees, usePopup = false }: { inductees: INDUCTEES_QUERY_RESULT, usePopup?: boolean }) {
  // Store inductee data
  const [filteredInductees, setFilteredInductees] = useState<INDUCTEES_QUERY_RESULT>(inductees)
  // The inductee to center on
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)

  return (
    <>
      <div
        className='flex min-h-0 flex-1 flex-col'
      >
        {/* List and Gallery Wrapper */}
        <div
          className='flex min-h-0 flex-1 flex-row'
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
            usePopup={usePopup}
          />
        </div>
      </div>
    </>
  )
}
