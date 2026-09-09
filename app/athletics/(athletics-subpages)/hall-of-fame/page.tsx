import InducteeDisplay from '@/components/InducteeDisplay'
import { ATHLETICS_PAGES } from '@/constants'
import { getInductees } from '@/sanity/lib/client'

export default async function HallOfFamePage() {
  const inductees = await getInductees()
  const page = ATHLETICS_PAGES.find(page => page.name === 'Hall of Fame')!

  return (
    <InducteeDisplay inductees={inductees.filter(i => i.hallOfFame === true)} page={page} />
  )
}
