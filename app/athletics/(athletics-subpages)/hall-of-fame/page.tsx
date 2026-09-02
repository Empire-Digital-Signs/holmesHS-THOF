import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function HallOfFamePage() {
  const inductees = await getInductees('hallOfFame == true')
  return (
    <InducteeDisplay inductees={inductees} />
  )
}
