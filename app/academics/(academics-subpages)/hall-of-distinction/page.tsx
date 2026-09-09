import InducteeDisplay from '@/components/InducteeDisplay'
import { ACADEMICS_PAGES } from '@/constants'
import { getInductees } from '@/sanity/lib/client'

export default async function HallOfDistinctionPage() {
  const inductees = await getInductees()
  const page = ACADEMICS_PAGES.find(page => page.name === 'Hall of Distinction')!

  return (
    <InducteeDisplay inductees={inductees.filter(i => i.hallOfDistinction)} page={page} />
  )
}
