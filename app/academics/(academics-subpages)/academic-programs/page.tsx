import InducteeDisplay from '@/components/InducteeDisplay'
import { getInductees } from '@/sanity/lib/client'

export default async function AcademicProgramsPage() {
  const inductees = await getInductees('defined(academicProgram)')

  return (
    <InducteeDisplay inductees={inductees} />
  )
}
