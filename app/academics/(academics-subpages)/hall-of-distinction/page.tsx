import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function HallOfDistinctionPage () {
  const inductees = await getInductees('hallOfDistinction == true')
  return (
    <InducteeDisplay inductees={inductees} />
  )
}
