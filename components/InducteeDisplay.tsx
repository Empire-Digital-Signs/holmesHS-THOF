import { useState } from "react";
import InducteeGallery from "./InducteeGallery";
import InducteeList from "./InducteeList";
import { Inductee } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getInductees } from '@/lib/sanity'
import Searchbar from "./Searchbar";

// temp data
const inductees_temp: Inductee[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting except its a really long paragraph that goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on.',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Johnny',
    lastName: 'Appleseed',
    year: 2000,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Bob',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: ''
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },
  {
    firstName: 'First',
    lastName: 'Last',
    year: 2020,
    bio: 'Something interesting',
    photoUrl: '/images/inductee-temp.png'
  },

]

/**
 * Displays inductees and additional information. Used for inductee pages.
 * @returns Searchable list and gallery display of inductees.
 */
export default function InducteeDisplay() {

  // Store inductee data
  const [inductees, setInductees] = useState<Inductee[]>(inductees_temp);
  const [filteredInductees, setFilteredInductees] = useState<Inductee[]>(inductees_temp);

  // The inductee to center on
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null);

  // Use React Query to fetch and cache inductees
  const { data: inducteeData = [], isLoading } = useQuery<Inductee[]>({
    queryKey: ['inductees'],
    queryFn: getInductees,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-cover bg-center">
        <p className="text-white text-4xl">Loading...</p>
      </div>
    )
  }

  return (
    <>      
      <div
        className="flex h-full min-h-0 flex-col"
      >
        {/* List and Gallery Wrapper */}
        <div
          className='flex h-full min-h-0 flex-row'
        >
          {/* Inductee List and Searchbar */}
          <div className='flex h-full min-h-0 flex-col gap-[20px] items-start'>
            <InducteeList
              inductees={filteredInductees}
              selectedInductee={selectedInductee}
              onSelect={setSelectedInductee}
            />
            <Searchbar
              inductees={inductees}
              setFilteredInductees={setFilteredInductees}
            />
          </div>
          <InducteeGallery
            inductees={filteredInductees}
            selectedInductee={selectedInductee}
            onSelect={setSelectedInductee}
          />
        </div>
      </div>
    </>
  )
}