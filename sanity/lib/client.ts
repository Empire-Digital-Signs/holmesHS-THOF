import { createClient, defineQuery } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Defined queries for GROQ typing
const SLIDES_QUERY = defineQuery(`
  *[_id == "mainSlideshow"][0].slides[]{
    "imageUrl": photo.asset->url,
    transitionDuration,
    duration,
    startDate,
    endDate,
  }`)

const INDUCTEES_QUERY = (filter: string = '') => defineQuery(`
  *[_type == "inductee"${filter ? ` && ${filter}` : ''}] | order(year desc, lastName asc) {
    firstName,
    lastName,
    year,
    bio,
    "photo": photo.asset->url
  }`)

const HISTORY_QUERY = defineQuery(`
  *[_type == 'history'] | order(year asc) {
    title,
    year,
    description,
    "photo": photo.asset->url
  }`)

const TIMELINE_QUERY = defineQuery(`
  *[_type == 'timeline'] | order(year asc) {
    title,
    year,
    description,
  }`)

/**
 * Retrieves slides for the home page slideshow.
 * @returns Array of slides with the image URL and duration
 */
export async function getSlides() {
  const slides = await client.fetch(SLIDES_QUERY)
  return slides
}

/**
 * Retrieves inductees based on filter.
 * @param filter Condition to apply to query
 * @returns List of inductees
 */
export async function getInductees(filter = '') {
  const inductees = await client.fetch(INDUCTEES_QUERY(filter))
  return inductees
}

/**
 * Retrieves history entries.
 * @returns List of history items
 */
export async function getHistory() {
  const history = await client.fetch(HISTORY_QUERY)
  return history
};

/**
 * Retrieves timeline entries.
 * @returns List of timeline items
 */
export async function getTimeline() {
  const timeline = await client.fetch(TIMELINE_QUERY)
  return timeline
}
