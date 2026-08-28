import { useRef } from "react"

/**
 * Creates a horizontal list of buttons for each year.
 * @param years - Years to display as buttons.
 * @param selectedYear - The currently selected year.
 * @param onSelectYear - Callback function to handle year selection.
 * @returns A list of years.
 */
export default function YearsList({ years, selectedYear, onSelectYear }: { years: number[], selectedYear: number | null, onSelectYear: (year: number) => void }) {
  
  // Handle moving list with buttons
  const yearButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const selectedIndex = selectedYear === null ? -1 : years.indexOf(selectedYear);

  const moveSelection = (direction: -1 | 1) => {
    const nextIndex = selectedIndex + direction;

    if (nextIndex < 0 || nextIndex >= years.length) return;

    const nextYear = years[nextIndex];
    onSelectYear(nextYear);

    // Bring year into view if not already
    yearButtonRefs.current[nextYear]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  return (
    <div className='flex min-w-0 w-auto self-stretch items-center justify-between gap-5 mx-[100px] bg-white rounded-[16px] mb-[10px] px-[20px]'>
      {/* Left button */}
      <button
        type="button"
        onClick={() => moveSelection(-1)}
        disabled={selectedIndex <= 0}
        aria-label="Previous year"
        className="shrink-0 disabled:opacity-30"
      >
        <svg viewBox="0 0 50 50" className="w-[50px] h-[50px]" aria-hidden="true">
          <polygon points="43.301,0 43.301,50 0,25" fill="var(--primary-red)" />
        </svg>
      </button>
      <ul className="flex gap-3.75 min-w-0 w-full overflow-x-auto no-scrollbar p-2.5">
        {years.map((year) => {
          const isSelected = selectedYear === year

          return (
            <li key={year} className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() => onSelectYear(year)}
                ref={(button) => { yearButtonRefs.current[year] = button }}
                aria-pressed={isSelected}
                className={`flex items-center justify-center
                  text-center text-[24px] uppercase cursor-pointer p-[2px]
                  border-10 rounded-full
                  ${isSelected ? 'border-primary-red' : 'border-transparent'}`}
              >
                {year}
              </button>
            </li>
          )
        })}
      </ul>
      {/* Right button */}
      <button
        type="button"
        onClick={() => moveSelection(1)}
        disabled={selectedIndex === -1 || selectedIndex >= years.length - 1}
        aria-label="Next year"
        className="shrink-0 disabled:opacity-30"
      >
        <svg viewBox="0 0 50 50" className="w-[50px] h-[50px]" aria-hidden="true">
          <polygon points="6.699,0 50,25 6.699,50" fill="var(--primary-red)" />
        </svg>
      </button>
    </div>
  )
}