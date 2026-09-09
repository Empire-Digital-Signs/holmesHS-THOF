import InducteeDisplay from '@/components/InducteeDisplay'
import { ACADEMICS_PAGES } from '@/constants'
import { getInductees } from '@/sanity/lib/client'

export default async function CareerAndTechnicalEducationPage() {
  const inductees = await getInductees()
  const page = ACADEMICS_PAGES.find(page => page.name === 'Career and Technical Education')!

  return <InducteeDisplay inductees={inductees.filter(i => i.careerAndTechnicalEducation)} page={page} />
}
