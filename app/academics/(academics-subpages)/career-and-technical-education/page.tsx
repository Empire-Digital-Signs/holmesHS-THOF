import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function CareerAndTechnicalEducationPage() {
  const inductees = await getInductees('defined(careerAndTechnicalEducation)')
  return (
    <InducteeDisplay inductees={inductees} />
  )
}
