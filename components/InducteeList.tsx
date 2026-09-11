import { Inductee } from '@/types'

/**
 * Renders a list of inductees with search functionality.
 * @param allInductees - An array of inductee objects to display in the list.
 * @param listName - Header of the list.
 * @param searchKeys - Criteria to search in the inductees.
 * @param selectedListItem - The selected item in the list.
 * @param onFilter - Callback to update Gallery according to the selected item in the list.
 * @returns A searchable list of inductees.
 */
export default function InducteeList({
  allInductees,
  listName,
  searchKeys,
  selectedListItem,
  onFilter,
}: {
  allInductees: Inductee[]
  listName: string
  searchKeys: (keyof Inductee)[]
  selectedListItem: string | null
  onFilter: (content: string | null, inductees?: Inductee[]) => void
}) {
  const listItems: string[] = searchKeys.length === 2
    ? allInductees.map(inductee => `${inductee.firstName ?? ''} ${inductee.lastName ?? ''}`.trim())
    : Array.from(new Set(
        allInductees.flatMap(inductee => searchKeys.flatMap((key) => {
          const value = inductee[key]
          return Array.isArray(value) ? value.map(String) : value != null ? [String(value)] : []
        })),
      ))

  return (
    <div className='flex min-h-0 flex-1 flex-col w-full'>
      <h4
        className='shrink-0 bg-primary-red border-4 border-black
          text-white uppercase flex items-center justify-center text-center
          p-[30px] lg:px-[60px]'
      >
        {listName}
      </h4>
      <ul className='min-h-0 flex-1 overflow-y-auto bg-black
        scrollbar scrollbar-w-[15px] scrollbar-track-black scrollbar-thumb-primary-red scrollbar-thumb-rounded-full
        '
      >
        {listItems.map((content, index) => {
          const isSelected = selectedListItem === content
          return (
            <button
              key={`${content}-${index}`}
              className={`text-center uppercase cursor-pointer w-full
                  flex items-center justify-center border-4 border-black p-[10px] lg:py-[20px]
                  ${isSelected ? 'bg-primary-red text-white' : 'bg-white text-black'}`}
              onClick={() => {
                // If selected, go back to all inductees
                if (isSelected) {
                  onFilter(null)
                  return
                }

                // Find matching inductees to content criteria
                const matchingInductees = allInductees.filter((candidate) => {
                  const fullName = `${candidate.firstName ?? ''} ${candidate.lastName ?? ''}`.trim().toLowerCase()
                  if (fullName === content.toLowerCase()) return true
                  return searchKeys.some((key) => {
                    const value = candidate[key]
                    return Array.isArray(value)
                      ? value.some(item => String(item) === content)
                      : value != null && String(value) === content
                  })
                })
                onFilter(content, matchingInductees)
              }}
            >
              {content}
            </button>
          )
        })}
      </ul>
    </div>
  )
}
