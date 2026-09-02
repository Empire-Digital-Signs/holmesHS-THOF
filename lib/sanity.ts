import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'orysir1u',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getHomeSlides() {
  const slides = await sanityClient.fetch(`
    *[_type == "homeSlideshow"][0].slides[]{
      image,
      duration,
      startDate,
      endDate
    }
  `)

  // Convert image objects to usable URLs
  return slides.map((slide: any) => ({
    ...slide,
    imageUrl: slide.image ? urlFor(slide.image).url() : undefined,
  }))
}