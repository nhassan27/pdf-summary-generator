import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromPDF } from '@/lib/pdfParser'
import { generateSummary } from '@/lib/llmClient'

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file from form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB for free tier)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Extract text from PDF
    console.log('Extracting text from PDF...')
    const text = await extractTextFromPDF(file)

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text found in PDF. The PDF might be scanned or empty.' },
        { status: 400 }
      )
    }

    // Generate summary using LLM
    console.log('Generating executive summary...')
    const summary = await generateSummary(text)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Error processing PDF:', error)
    return NextResponse.json(
      { error: 'Failed to process PDF. Please try again.' },
      { status: 500 }
    )
  }
}

