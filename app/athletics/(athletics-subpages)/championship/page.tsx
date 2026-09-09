import InducteeDisplay from '@/components/InducteeDisplay'
import { ATHLETICS_PAGES } from '@/constants'
import { getInductees } from '@/sanity/lib/client'

export default async function ChampionshipsPage() {
  const inductees = await getInductees()
  const page = ATHLETICS_PAGES.find(page => page.name === 'Championship')!
  return (
    <InducteeDisplay inductees={inductees.filter(i => i.championships)} page={page} />
  )
}
