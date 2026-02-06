# PDF Summary Generator

A simple, elderly-friendly web application that generates summaries from PDF documents using AI.

## Features

- ✅ **Large, Easy-to-Read Interface** - Designed for elderly users with big buttons and clear text
- ✅ **Simple Workflow** - Just attach a PDF and click to generate summary
- ✅ **Fast Processing** - Optimized for 2-3 page documents
- ✅ **Free to Use** - Uses Groq's free API tier (14,400 requests/day)
- ✅ **No Database Required** - Stateless processing, no data stored

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Free Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create an API key
4. Copy the API key

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Groq API key:

```
GROQ_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Click "Attach PDF File"** - Select a PDF from your computer (2-3 pages recommended)
2. **Click "Generate Summary"** - Wait 10-20 seconds while the AI creates a summary
3. **Read the Summary** - The summary will appear in a large, easy-to-read box
4. **Click "Start Over"** - Process another document

## Deployment (Free)

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add your environment variable in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GROQ_API_KEY` with your API key value

4. Redeploy:
```bash
vercel --prod
```

Your app will be live at a free Vercel URL!

## Technology Stack

- **Frontend**: React with Next.js 14
- **Styling**: Tailwind CSS (large, accessible components)
- **PDF Processing**: pdf-parse library
- **AI Summarization**: Groq API (Llama 3.1 model)
- **Hosting**: Vercel (free tier)

## File Structure

```
summary_generator/
├── app/
│   ├── page.tsx              # Main UI (large buttons, simple layout)
│   ├── layout.tsx            # App layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── summarize/
│           └── route.ts      # API endpoint for processing
├── lib/
│   ├── pdfParser.ts          # PDF text extraction
│   └── llmClient.ts          # Groq API integration
├── package.json
├── next.config.js
└── README.md
```

## Troubleshooting

### "No text found in PDF"
- The PDF might be scanned (image-based). This app works best with text-based PDFs.
- Try a different PDF file.

### "Failed to generate summary"
- Check that your `GROQ_API_KEY` is correctly set in `.env.local`
- Make sure you have internet connection
- Verify your Groq API key is valid at [https://console.groq.com](https://console.groq.com)

### Slow processing
- For 2-3 page PDFs, processing should take 10-20 seconds
- Larger PDFs may take longer
- Check your internet connection speed

## Cost

**100% FREE** when using:
- Groq free tier: 14,400 requests per day
- Vercel free tier: 100GB bandwidth, unlimited requests
- No credit card required for either service

## Support

For issues or questions, check:
- Groq Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)
- Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)

## License

MIT

