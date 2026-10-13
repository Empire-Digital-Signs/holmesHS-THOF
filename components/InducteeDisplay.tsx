'use client'

import { useMemo, useState } from 'react'
import InducteeGallery from './InducteeGallery'
import InducteeList from './InducteeList'
import Searchbar from './Searchbar'
import { INDUCTEES_QUERY_RESULT } from '@/sanity.types'
import { Inductee, Page } from '@/types'

/**
 * Displays inductees and additional information. Used for inductee pages.
 * @param inductees - All unfiltered inductee data.
 * @param page - Page the gallery will appear on.
 * @returns Searchable list and gallery display of inductees.
 */
export default function InducteeDisplay({ inductees, page }: { inductees: INDUCTEES_QUERY_RESULT, page: Page }) {
  // The inductee to center on
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null)
  const [listFilteredInductees, setListFilteredInductees] = useState<INDUCTEES_QUERY_RESULT>(inductees)
  const [searchQuery, setSearchQuery] = useState('')
  // Shows the sidebar when there is no active popup
  const showSidebar = !(page.hasPopup && selectedInductee)

  // Determines the active set of inductees based on the selected list item
  const activeInductees = selectedListItem ? listFilteredInductees : inductees

  // Gets the filtered search of inductees
  const filteredInductees = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) return activeInductees

    return activeInductees.filter(inductee => ['firstName', 'lastName'].some((key) => {
      const value = inductee[key as keyof typeof inductee]

      if (typeof value === 'string') return value.toLowerCase().includes(normalizedQuery)
      if (typeof value === 'number') return String(value).includes(normalizedQuery)
      return Array.isArray(value)
        && value.some(item => typeof item === 'string' && item.toLowerCase().includes(normalizedQuery))
    }))
  }, [activeInductees, searchQuery])

  return (
    <>
      <div
        className='flex min-h-0 flex-1 flex-col'
      >
        {/* List and Gallery Wrapper */}
        <div
          className='grid min-h-0 flex-1 grid-cols-4'
        >
          {/* Inductee List and Searchbar */}
          {showSidebar && (
            <div className='h-full min-h-0 flex-col gap-[20px] items-start hidden md:flex col-span-1'>
              <InducteeList
                allInductees={inductees}
                listName={page.listName}
                searchKeys={page.searchKeys}
                isAscending={page.isAscending}
                selectedListItem={selectedListItem}
                onFilter={(content, matchingInductees) => {
                  setSelectedInductee(null)
                  setSelectedListItem(content)
                  setListFilteredInductees(content ? (matchingInductees ?? inductees) : inductees) // Use matchingIndutees unless null. Defaults to all inductees
                }}
              />
              <Searchbar
                inductees={activeInductees}
                query={searchQuery}
                onSearch={setSearchQuery}
              />
            </div>
          )}
          <InducteeGallery
            inductees={filteredInductees}
            selectedInductee={selectedInductee}
            onSelect={setSelectedInductee}
            hasPopup={page.hasPopup}
          />
        </div>
      </div>
    </>
  )
}
