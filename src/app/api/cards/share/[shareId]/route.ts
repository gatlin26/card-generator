import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

interface RouteParams {
  params: {
    shareId: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const shareId = params.shareId
    const card = await storage.getCardByShareId(shareId)
    
    if (!card) {
      return NextResponse.json(
        { message: 'Card not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error fetching shared card:', error)
    return NextResponse.json(
      { message: 'Failed to fetch card' },
      { status: 500 }
    )
  }
} 