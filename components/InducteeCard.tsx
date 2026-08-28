import { Inductee } from '@/types'
import Image from 'next/image'

/**
 * Renders a card for an inductee with their photo and name. Clicking the card will trigger the onSelect callback.
 * @param inductee - The inductee object containing their details.
 * @param onSelect - Callback function to be called when the card is clicked, passing the selected inductee.
 * @returns A clickable card component displaying the inductee's photo and name.
 */
export default function InducteeCard({
  inductee,
  onSelect,
}: {
  inductee: Inductee
  onSelect: (inductee: Inductee) => void
}) {

  return (
    <>
      <div
        className="relative h-[350px] overflow-hidden cursor-pointer bg-black"
        onClick={() => onSelect(inductee)}
      >
        {/* Bottom layer: No image available */}
        {/* <img
          src="/nophoto-v5.png" 
          alt="No photo available"
          className="absolute inset-0 w-full h-full object-cover object-center"
        /> */}
        
        {/* Middle layer: Inductee photo (when available) */}
        {inductee.photoUrl && (
          <Image 
            src={inductee.photoUrl}
            alt={`${inductee.firstName} ${inductee.lastName}`}
            className="absolute inset-0 object-cover"
            fill
          />
        )}

        {/* Open icon in bottom right */}
        {/* TODO: get icon SVG */}
        
        {/* Text content */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-red/70 from-0% via-primary-red/30 via-10% to-transparent to-20%" />
        <div className="absolute bottom-[10px] left-[15px] flex flex-col items-start text-white uppercase">
          <span className='text-[27px]'>
            {inductee.lastName}
          </span>
          <span className='text-[20px]'>
            {inductee.firstName}
          </span>
        </div>
      </div>

    </>
  )
}