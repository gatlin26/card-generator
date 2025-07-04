import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertCardSchema, cardContentSchema } from '@/shared/schema'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') 
      ? parseInt(searchParams.get('userId') as string) 
      : 1 // Default user for MVP
    
    const cards = await storage.getUserCards(userId)
    return NextResponse.json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json(
      { message: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertCardSchema.parse(body)
    
    // Validate content structure
    cardContentSchema.parse(validatedData.content)
    
    // Ensure content is provided
    const cardData = {
      ...validatedData,
      content: validatedData.content || {}
    }
    
    const card = await storage.createCard(cardData)
    return NextResponse.json(card, { status: 201 })
  } catch (error) {
    console.error('Error creating card:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid card data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Failed to create card' },
      { status: 500 }
    )
  }
} 