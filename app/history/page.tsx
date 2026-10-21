import client from '@/tina/__generated__/client'
import HistoryClient from './HistoryClient'

export default async function HistoryPage() {
  const result = await client.queries.historyConnection({
    sort: 'year',
  })

  return (
    <HistoryClient
      query={result.query}
      variables={result.variables}
      data={result.data}
    />
  )
}
