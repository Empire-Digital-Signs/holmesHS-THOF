export type MenuItem = {
  title: string
  link: string
}

export type Page = {
  name: string
  destination: string
}

// Get single Inductee from query result array
export type Inductee = INDUCTEES_QUERY_RESULT[number]
