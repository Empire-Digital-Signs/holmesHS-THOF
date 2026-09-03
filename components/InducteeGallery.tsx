import { Inductee } from '@/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import InducteeCard from './InducteeCard'

// Helper function to generate the inductee key from the gallery.
const getInducteeKey = (inductee: Inductee) => `${inductee.firstName}-${inductee.lastName}-${inductee.year}`

/**
 * Renders a gallery of inductees.
 * @param inductees - An array of inductee objects to display in the gallery.
 * @param selectedInductee - The currently selected inductee to scroll to.
 * @param onSelect - A callback function to handle selection of an inductee.
 * @returns Gallery of inductee cards.
 */
export default function InducteeGallery({
  inductees,
  selectedInductee,
  onSelect,
}: {
  inductees: Inductee[]
  selectedInductee: Inductee | null
  onSelect: (inductee: Inductee | null) => void
}) {
  const [detailInductee, setDetailInductee] = useState<Inductee | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!selectedInductee) return

    const key = getInducteeKey(selectedInductee)
    const card = cardRefs.current[key]

    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
  }, [selectedInductee, inductees])

  return (
    <div className="relative flex-1 min-h-0">
      {detailInductee ? (
        <div
          className="h-full w-full p-[62px]"
          onClick={(e) => { setDetailInductee(null); e.stopPropagation() }}
        >
          <div className='flex h-full w-full min-h-0'>
            {/* Left Side: Information */}
            <div className='my-[30px] flex min-h-0 flex-1 flex-col bg-white'>
              {/* Header */}
              <div className='flex justify-between p-[15px] gap-[10px]'>
                {/* Header Left */}
                <div className='flex flex-col'>
                  <h2 className='text-[45px]'>
                    {detailInductee.year}
                  </h2>
                  <Image
                    src={'/images/logo.png'}
                    alt={'Holmes Logo'}
                    width={100}
                    height={100}
                  />
                </div>
                {/* Header Right */}
                <div className='flex flex-col gap-[7px] w-full text-right uppercase'>
                  <h2 className='text-[62px]'>
                    {detailInductee.lastName}
                  </h2>
                  <h3 className='text-[44px]'>
                    {detailInductee.firstName}
                  </h3>
                </div>
              </div>
              {/* Bio */}
              <p className='ml-[56px] my-[36px] mx-[30px] min-h-0 flex-1 overflow-y-auto scrollbar scrollbar-track-white scrollbar-thumb-primary-red font-sans text-[24px]'>
                {detailInductee.bio}
              </p>
            </div>
            {/* Right Side: Image */}
            <div className='relative h-full min-h-0 flex-1'>
              { detailInductee.photo ? (
                <Image
                  src={detailInductee.photo}
                  alt={`${detailInductee.firstName} ${detailInductee.lastName}`}
                  className="object-cover"
                  fill
                />
              ) : (
                <div className="absolute inset-0 bg-black" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
        {inductees.length === 0 ? (
          // If no indctees, display message
          <div className='h-full flex justify-center items-center'>
            <p className="text-center text-[36px] my-auto text-white">
              No inductees found.
            </p>
          </div>
        ):(
          <div className="h-full p-8 overflow-y-auto no-scrollbar">
            <div className="grid gap-4 grid-cols-4 gap-x-[40px] gap-y-[20px]">
              {inductees.map((inductee: Inductee, index: number) => {
                const key = getInducteeKey(inductee)
                const isSelected = selectedInductee ? getInducteeKey(selectedInductee) === key : false

              return (
                <InducteeCard
                  key={`${key}-${index}`}
                  inductee={inductee}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  onOpenDetail={setDetailInductee}
                  cardRef={(element) => {
                    cardRefs.current[key] = element
                  }}
                />
              )
            })}
            </div>
          </div>
        )}
        </>
      )}
    </div>
  )
}