import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateSummary(
  text: string,
  summaryType: 'executive' | 'detailed' = 'executive'
): Promise<string> {
  try {
    // Limit text length to avoid token limits (for 2-3 pages this should be fine)
    const maxChars = 10000
    const truncatedText = text.length > maxChars ? text.substring(0, maxChars) : text

    // Different prompts based on summary type
    const systemPrompt =
      summaryType === 'executive'
        ? 'You are a marine survey report analyzer. Extract ALL critical information from marine survey reports including cargo damage, vessel damage, crew incidents, and marine casualties. Output ONLY bullet points. NEVER write "Here is", "Summary", "Executive Summary", or ANY introductory sentence. Your first character must be a bullet point (•) or dash (-). Ensure NO important fact is left behind.'
        : 'You are an expert at creating comprehensive, detailed summaries. Create thorough summaries that cover all important aspects of the document. Use clear language and organize information with bullet points and sections. Include context, key findings, and important details.'

    const userPrompt =
      summaryType === 'executive'
        ? `Analyze this marine survey report and extract ALL important information. First character MUST be • or -. No introduction. No labels. Start NOW with bullet points covering:

1. INCIDENT DETAILS: Date, time, location, vessel name/IMO number
2. TYPE OF DAMAGE: What was damaged (cargo/ship/crew) and extent of damage
3. CAUSE/ORIGIN: Root cause or suspected cause
4. PARTIES INVOLVED: Ship owner, cargo owner, surveyor, insurance company
5. SURVEY FINDINGS: Key observations and surveyor conclusions
6. FINANCIAL IMPACT: Estimated damages, claim amounts, insured values
7. RECOMMENDATIONS: Surveyor recommendations or required actions
8. LIABILITY: Who is responsible or potentially liable
9. DOCUMENTATION: Reference numbers, policy numbers, claim numbers
10. NEXT STEPS: Required follow-up actions or deadlines

Include ALL dates, names, numbers, amounts, and critical facts. Do NOT omit any important information.

Document:
${truncatedText}`
        : `Please create a detailed, comprehensive summary of this document. Include all important information, key findings, and relevant details. Organize the information clearly:\n\n${truncatedText}`

    const maxTokens = summaryType === 'executive' ? 1000 : 1500

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      model: 'llama-3.1-8b-instant', // Fast and free on Groq
      temperature: 0.3,
      max_tokens: maxTokens,
    })

    let summary = completion.choices[0]?.message?.content || 'Unable to generate summary'

    // Post-process to remove any unwanted introductory text
    if (summaryType === 'executive') {
      // Remove common unwanted phrases at the start
      const unwantedPhrases = [
        /^Here is a brief executive summary.*?:\s*/i,
        /^Here is a summary.*?:\s*/i,
        /^Here is.*?:\s*/i,
        /^Summary:\s*/i,
        /^\*\*Summary\*\*:?\s*/i,
        /^\*\*Executive Summary\*\*:?\s*/i,
        /^Executive Summary:?\s*/i,
        /^\*\*Case Overview\*\*:?\s*/i,
        /^Case Overview:?\s*/i,
        /^Brief summary:?\s*/i,
        /^The document.*?following points?:?\s*/i,
        /^This document.*?following:?\s*/i,
      ]

      for (const phrase of unwantedPhrases) {
        summary = summary.replace(phrase, '')
      }

      // Trim any leading/trailing whitespace
      summary = summary.trim()
    }

    return summary
  } catch (error) {
    console.error('Error generating summary:', error)
    throw new Error('Failed to generate summary')
  }
}

