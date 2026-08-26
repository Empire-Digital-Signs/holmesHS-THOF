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

      {selectedInductee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedInductee(null)}
        >
          <div
            className="w-[600px] overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedInductee.photoUrl || '/nophoto-v5.png'}
              alt={`${selectedInductee.firstName} ${selectedInductee.lastName}`}
              className="h-auto w-full object-cover"
              width={600}
              height={600}
            />
            <div className="p-4">
              <h2 className="text-[27px] font-bold">{selectedInductee.lastName}</h2>
              <h3 className="text-[20px]">{selectedInductee.firstName}</h3>
              <p className="mt-2">{selectedInductee.bio}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}