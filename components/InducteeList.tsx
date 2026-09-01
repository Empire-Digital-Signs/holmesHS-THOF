import { useState } from 'react';
import { Inductee } from '@/types';

/**
 * Renders a list of inductees with search functionality.
 * @param inductees - An array of inductee objects to display in the list.
 * @returns A searchable list of inductees.
 */
export default function InducteeList({ inductees }: { inductees: Inductee[] }) {
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col w-[412px]">
      <h2
        className='shrink-0 bg-primary-red w-[412px] h-[117px] border-4 border-black
          text-white text-[33px] uppercase flex items-center justify-center'
      >
        Inductees
      </h2>
      <ul className="min-h-0 flex-1 overflow-y-auto
        scrollbar scrollbar-w-[15px] scrollbar-track-black scrollbar-thumb-primary-red scrollbar-thumb-rounded-full
        ">
        {inductees.map((inductee: Inductee, index: number) => {
          const isSelected = selectedInductee === inductee;
          return (
            <li
              key={index}
              onClick={() => setSelectedInductee(inductee)}
              className={`text-center text-[20px] uppercase cursor-pointer
                flex items-center justify-center border-4 border-black h-[80px]
                ${isSelected ? 'bg-primary-red text-white' : 'bg-white text-black'}`}
            >
              {inductee.firstName} {inductee.lastName}
            </li>
          )
        })}
      </ul>
    </div>
  );
}