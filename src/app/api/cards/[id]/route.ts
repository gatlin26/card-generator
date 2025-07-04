import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertCardSchema, cardContentSchema } from '@/shared/schema'
import { z } from 'zod'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    const card = await storage.getCard(id)
    
    if (!card) {
      return NextResponse.json(
        { message: 'Card not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { message: 'Failed to fetch card' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updates = insertCardSchema.partial().parse(body)
    
    if (updates.content) {
      cardContentSchema.parse(updates.content)
    }
    
    const card = await storage.updateCard(id, updates)
    
    if (!card) {
      return NextResponse.json(
        { message: 'Card not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('Error updating card:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid card data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Failed to update card' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    const deleted = await storage.deleteCard(id)
    
    if (!deleted) {
      return NextResponse.json(
        { message: 'Card not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Card deleted successfully' })
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { message: 'Failed to delete card' },
      { status: 500 }
    )
  }
} 