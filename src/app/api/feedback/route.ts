import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertFeedbackSchema } from '@/shared/schema'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertFeedbackSchema.parse(body)
    const feedback = await storage.createFeedback(validatedData)
    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    console.error('Error creating feedback:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid feedback data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const feedbackList = await storage.getAllFeedback()
    return NextResponse.json(feedbackList)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { message: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
} 