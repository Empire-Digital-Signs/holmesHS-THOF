import { NextResponse } from 'next/server'
import { sanityClient } from '../../../lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const slides = await sanityClient.fetch(`
    *[_id == "mainSlideshow"][0].slides[]{
      "imageUrl": photo.asset->url,
      "title": name,
      duration,
    }
  `)

  return NextResponse.json(slides)
}
