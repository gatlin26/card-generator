import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const showcaseCards = await storage.getShowcaseCards()
    return NextResponse.json(showcaseCards)
  } catch (error) {
    console.error('Error fetching showcase cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch showcase cards' },
      { status: 500 }
    )
  }
} 