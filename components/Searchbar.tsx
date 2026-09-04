import React, { useRef, useState } from 'react'
import { Inductee } from '@/types'
import Image from 'next/image'
import OnScreenKeyboard from './OnScreenKeyboard'

type SearchbarProps<T extends Inductee> = {
  inductees: T[]
  setFilteredInductees: (items: T[]) => void
  placeholder?: string
  searchKeys?: (keyof T)[]
}

/**
 * Inductee Search Bar
 * @param inductees The list of inductees to filter
 * @param setFilteredInductees Function to update the filtered list of inductees
 * @param placeholder The placeholder text for the search input
 * @param searchKeys The keys in the inductee object to search against. First and last name by default.
 * @returns A search bar component that allows filtering a list of inductees
 */
export default function Searchbar<T extends Inductee>({
  inductees,
  setFilteredInductees,
  placeholder = 'Search inductees...',
  searchKeys = ['firstName', 'lastName'] as const,
}: SearchbarProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [showKeyboard, setShowKeyboard] = useState(false)

  const handleSearch = (value: string) => {
    setQuery(value)

    const normalizedQuery = value.trim().toLowerCase()

    if (!normalizedQuery) {
      setFilteredInductees(inductees)
      return
    }

    const filtered = inductees.filter(inductee =>
      searchKeys.some((key) => {
        const fieldValue = inductee[key]
        return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(normalizedQuery)
      }),
    )

    setFilteredInductees(filtered)
  }

  return (
    <>
      {/* Search bar container. Must be above the keyboard to clear search query */}
      <div className='w-full pl-[5px] z-40'>
        <div
          className='flex items-center gap-[10px] w-full bg-white rounded-[12px] p-[5px]'
          onClick={() => {
            inputRef.current?.focus()
            setShowKeyboard(true)
          }}
        >
          <Image
            src='/images/search.svg'
            alt='Search'
            onClick={() => inputRef.current?.focus()}
            width={53}
            height={53}
            style={{ cursor: 'pointer' }}
          />
          <input
            ref={inputRef}
            type='search'
            inputMode='search'
            value={query}
            onChange={event => handleSearch(event.target.value)}
            onClick={() => {
              inputRef.current?.focus()
              setShowKeyboard(true)
            }}
            placeholder={placeholder}
            aria-label='Search inductees'
            className='flex-1 min-w-0 primary-text h-full uppercase'
          />
        </div>
      </div>

      {showKeyboard && (
        <>
          {/* Must be above all elements except the search bar */}
          <div
            className='fixed inset-0 z-30 bg-black/10'
            onClick={() => setShowKeyboard(false)}
          />
          <OnScreenKeyboard
            value={query}
            onChange={(nextValue) => {
              setQuery(nextValue)
              handleSearch(nextValue)
            }}
            onClose={() => setShowKeyboard(false)}
          />
        </>
      )}
    </>
  )
}
