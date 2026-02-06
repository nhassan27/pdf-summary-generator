import pdf from 'pdf-parse'

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Parse PDF
    const data = await pdf(buffer)
    
    // Return extracted text
    return data.text
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

