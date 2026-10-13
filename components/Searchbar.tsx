'use client'

import { useRef, useState } from 'react'
import { Inductee } from '@/types'
import Image from 'next/image'
import OnScreenKeyboard from './OnScreenKeyboard'

// Helper function to determine if browser is mobile
// Mobile device does not need on-screen keyboard.
export function isMobile(): boolean {
  // Modern regex check
  const ua = navigator.userAgent
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return true
  }

  // Fallback for Mac Intel
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true
  }

  return false
}

type SearchbarProps = {
  inductees: Inductee[]
  setFilteredInductees?: (items: Inductee[]) => void
  placeholder?: string
  searchKeys?: (keyof Inductee)[]
  query?: string
  onSearch?: (value: string) => void
}

/**
 * Inductee Search Bar
 * @param inductees The list of inductees to filter
 * @param setFilteredInductees Function to update the filtered list of inductees
 * @param placeholder The placeholder text for the search input
 * @param searchKeys The keys in the inductee object to search against. First and last name by default.
 * @param query The current search query
 * @param onSearch Function to handle search query changes
 * @returns A search bar component that allows filtering a list of inductees
 */
export default function Searchbar({
  inductees,
  setFilteredInductees,
  placeholder = 'Search...',
  searchKeys = ['firstName', 'lastName'] as const,
  query,
  onSearch,
}: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [internalQuery, setInternalQuery] = useState('')
  const [showKeyboard, setShowKeyboard] = useState(false)
  const currentQuery = query ?? internalQuery

  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value)
    }
    else {
      setInternalQuery(value)
    }

    if (!setFilteredInductees) return

    const normalizedQuery = value.trim().toLowerCase()

    if (!normalizedQuery) {
      setFilteredInductees(inductees)
      return
    }

    const filtered = inductees.filter(inductee =>
      searchKeys.some((key) => {
        const fieldValue = inductee[key]
        if (typeof fieldValue === 'string') return fieldValue.toLowerCase().includes(normalizedQuery)
        if (typeof fieldValue === 'number') return String(fieldValue).includes(normalizedQuery)
        return Array.isArray(fieldValue)
          && fieldValue.some(value => typeof value === 'string' && value.toLowerCase().includes(normalizedQuery))
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
            value={currentQuery}
            onChange={event => handleSearch(event.target.value)}
            onClick={() => {
              inputRef.current?.focus()
              setShowKeyboard(true)
            }}
            placeholder={placeholder}
            aria-label='Search inductees'
            className='flex-1 min-w-0 primary-text h-full uppercase text-ellipsis'
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
          {
            // If not mobile, display keyboard
            !isMobile() && (
              <OnScreenKeyboard
                value={currentQuery}
                onChange={(nextValue) => {
                  handleSearch(nextValue)
                }}
                onClose={() => setShowKeyboard(false)}
              />
            )
          }

        </>
      )}
    </>
  )
}
