import { Inductee } from '@/types'
import InducteeCard from './InducteeCard'

export default function InducteeGallery({ inductees }: { inductees: Inductee[] }) {
  return (
    <section className="flex-1 p-8 overflow-y-auto no-scrollbar">
      <div className="grid gap-4 grid-cols-4 gap-x-[40px] gap-y-[20px]">
        {inductees.map((inductee: Inductee, index: number) => (
          <InducteeCard key={index} inductee={inductee} />
        ))}
      </div>
    </section>
  )
}