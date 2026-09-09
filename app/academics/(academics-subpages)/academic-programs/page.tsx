import InducteeDisplay from '@/components/InducteeDisplay'
import { ACADEMICS_PAGES } from '@/constants'
import { getInductees } from '@/sanity/lib/client'

export default async function AcademicProgramsPage() {
  const inductees = await getInductees()
  const page = ACADEMICS_PAGES.find(page => page.name === 'Academic Programs')!

  return (
    <InducteeDisplay
      inductees={inductees.filter(i => i.academicPrograms)}
      page={page}
    />
  )
}
