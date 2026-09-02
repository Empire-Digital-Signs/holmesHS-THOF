import { type SchemaTypeDefinition } from 'sanity'
import { historyType } from './historyType'
import { inducteeType } from './inducteeType'
import { timelineType } from './timelineType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [historyType, inducteeType, timelineType],
}
