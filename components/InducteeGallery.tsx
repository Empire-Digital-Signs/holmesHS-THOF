import { Inductee } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import InducteeCard from './InducteeCard'

export default function InducteeGallery({ inductees }: { inductees: Inductee[] }) {
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)

  return (
    <>
      <section className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <div className="grid gap-4 grid-cols-4 gap-x-[40px] gap-y-[20px]">
        {inductees.map((inductee: Inductee, index: number) => (
            <InducteeCard
              key={index}
              inductee={inductee}
              onSelect={setSelectedInductee}
            />
        ))}
        </div>
      </section>

      {/* Popup Overlay */}
      {selectedInductee && (
        // Overlay
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {setSelectedInductee(null); e.stopPropagation()}}
        >
          {/* Information */}
          <div className='flex flex-col'>
            {/* Header */}
            <div className='flex'>
              {/* Header Left */}
              <div className='flex flex-col'>
                <h2 className=''>
                  {selectedInductee.year}
                </h2>
                {/* TODO: Logo here */}
                {/* <Image /> */}
              </div>
              {/* Header Right */}
              <div className='flex flex-col'>
                <h2 className=''>
                  {selectedInductee.lastName}
                </h2>
                <h3 className=''>
                  {selectedInductee.firstName}
                </h3>
              </div>
            </div>
            {/* Bio */}
            <p className=''>
              {selectedInductee.bio}
            </p>
          </div>
          {/* Image */}
          <Image
            src={selectedInductee.photoUrl || '/nophoto-v5.png'}
            alt={`${selectedInductee.firstName} ${selectedInductee.lastName}`}
            className="object-cover"
            width={200}
            height={200}
          />
        </div>
      )}
    </>
  )
}