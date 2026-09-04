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
    <div className='flex min-h-0 flex-1 flex-col w-full'>
      <h4
        className='shrink-0 bg-primary-red border-4 border-black
          text-white uppercase flex items-center justify-center
          p-[30px] lg:px-[60px]'
      >
        Inductees
      </h4>
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
              className={`text-center uppercase cursor-pointer
                flex items-center justify-center border-4 border-black py-[10px] lg:py-[20px]
                ${isSelected ? 'bg-primary-red text-white' : 'bg-white text-black'}`}
            >
              <button
                onClick={() => onSelect(inductee)}
                className='uppercase text-center'
              >
                {inductee.firstName}
                {' '}
                {inductee.lastName}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
