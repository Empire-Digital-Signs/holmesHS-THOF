import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function CareerAndTechnicalEducationPage() {
  const inductees = await getInductees()
  return (
    <InducteeDisplay inductees={inductees.filter(i => i.careerAndTechnicalEducation)} />
  )
}
