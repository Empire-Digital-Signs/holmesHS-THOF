export type MenuItem = {
  title: string
  link: string
}

export type InducteeSearchKey = 'firstName' | 'lastName' | 'academicPrograms' | 'careerAndTechnicalEducation' | 'championships' | 'hodYear' | 'hofYear'

export type Page = {
  name: string
  destination: string
  hasPopup: boolean
  listName: string
  searchKeys: InducteeSearchKey[]
  isAscending: boolean
}

// Get single Inductee from query result array
export type Inductee = INDUCTEES_QUERY_RESULT[number]
