import { Inductee } from '@/types'
import Image from 'next/image'
import type { Ref } from 'react'

/**
 * Renders a card for an inductee with their photo and name. Clicking the card will trigger the onSelect callback.
 * @param inductee - The inductee object containing their details.
 * @param onSelect - Callback function to be called when the card is clicked, passing the selected inductee.
 * @param onOpenDetail - Callback to handle popup.
 * @returns A clickable card component displaying the inductee's photo and name.
 */
export default function InducteeCard({
  inductee,
  onSelect,
  onOpenDetail,
  isSelected = false,
  cardRef,
  hasPopup = false,
}: {
  inductee: Inductee
  onSelect: (inductee: Inductee) => void
  onOpenDetail?: (inductee: Inductee) => void
  isSelected?: boolean
  cardRef?: Ref<HTMLDivElement>
  hasPopup?: boolean
}) {
  return (
    <>
      <div
        ref={cardRef}
        className={`relative h-[350px] overflow-hidden ${hasPopup && 'cursor-pointer'} bg-black transition-all`}
        onClick={() => {
          if (hasPopup) {
            onSelect(inductee)
            onOpenDetail?.(inductee)
          }
        }}
      >
        {/* Inductee photo or black placeholder */}
        {inductee.photo
          ? (
              <Image
                src={inductee.photo}
                alt={`${inductee.firstName} ${inductee.lastName}`}
                className='absolute inset-0 object-cover'
                fill
              />
            )
          : (
              <div className='absolute inset-0 bg-black' />
            )}

        {/* Open icon in bottom right if this page has popups on */}
        {
          hasPopup && (
            <Image
              src='/images/circle-plus.svg'
              alt='Expand'
              width={66}
              height={66}
              className='absolute bottom-0 right-0 z-10'
            />
          )
        }

        {/* Text content */}
        <div className='absolute inset-0 bg-linear-to-t from-primary-red/70 from-0% via-primary-red/30 via-10% to-transparent to-20%' />
        <div className='absolute bottom-[10px] left-[15px] right-[15px] flex min-w-0 flex-col items-stretch text-white uppercase'>
          <h5 className='w-full min-w-0 line-clamp-2 text-ellipsis'>
            {inductee.lastName}
          </h5>
          <h6 className='w-full min-w-0 line-clamp-2 text-ellipsis'>
            {inductee.firstName}
          </h6>
        </div>
      </div>

    </>
  )
}
