import { Inductee } from '@/types'

/**
 * Renders a list of inductees with search functionality.
 * @param inductees - An array of inductee objects to display in the list.
 * @returns A searchable list of inductees.
 */
export default function InducteeList({
  inductees,
  selectedInductee,
  onSelect,
}: {
  inductees: Inductee[]
  selectedInductee: Inductee | null
  onSelect: (inductee: Inductee) => void
}) {
  return (
    <div className='flex min-h-0 flex-1 flex-col w-[412px]'>
      <h2
        className='shrink-0 bg-primary-red w-[412px] h-[117px] border-4 border-black
          text-white text-[33px] uppercase flex items-center justify-center'
      >
        Inductees
      </h2>
      <ul className='min-h-0 flex-1 overflow-y-auto bg-black
        scrollbar scrollbar-w-[15px] scrollbar-track-black scrollbar-thumb-primary-red scrollbar-thumb-rounded-full
        '
      >
        {inductees.map((inductee: Inductee, index: number) => {
          const isSelected = selectedInductee?.firstName === inductee.firstName
            && selectedInductee?.lastName === inductee.lastName
            && selectedInductee?.year === inductee.year
          return (
            <li
              key={`${inductee.firstName}-${inductee.lastName}-${inductee.year}-${index}`}
              onClick={() => onSelect(inductee)}
              className={`text-center text-[20px] uppercase cursor-pointer
                flex items-center justify-center border-4 border-black h-[80px]
                ${isSelected ? 'bg-primary-red text-white' : 'bg-white text-black'}`}
            >
              {inductee.firstName}
              {' '}
              {inductee.lastName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
