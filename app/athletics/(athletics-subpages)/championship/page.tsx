import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function ChampionshipsPage() {
  const inductees = await getInductees('defined(championshipName)')
  return (
    <InducteeDisplay inductees={inductees} />
  )
}
