import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

/**
 * Retrieves inductees based on filter.
 * @param filter Condition to apply to query
 * @returns List of inductees
 */
export async function getInductees(filter = '') {
  const inductees = await client.fetch(`
    *[_type == "inductee"${filter ? ` && ${filter}` : ''}] | order(year desc, lastName asc) {
      firstName,
      lastName,
      year,
      bio,
      "photo": photo.asset->url
    }
  `);
  return inductees;
}

/**
 * Retrieves history entries.
 * @returns List of history items
 */
export async function getHistory() {
  const history = await client.fetch(`
    *[_type == 'history'] | order(year asc) {
      title,
      year,
      description,
      "photo": photo.asset->url
    }
  `);
  return history;
};

/**
 * Retrieves timeline entries.
 * @returns List of timeline items
 */
export async function getTimeline() {
  const timeline = await client.fetch(`
    *[_type == 'timeline'] | order(year asc) {
      title,
      year,
      description,
    }
  `);
  return timeline;
}