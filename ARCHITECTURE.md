# 🏗️ Application Architecture

## System Overview

This is a **simplified, serverless architecture** designed for processing 2-3 page PDFs with minimal infrastructure.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER DEVICE                          │
│                    (Desktop/Tablet/Phone)                    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Web Browser                           │     │
│  │  ┌──────────────────────────────────────────┐     │     │
│  │  │         React Frontend (page.tsx)        │     │     │
│  │  │                                          │     │     │
│  │  │  • File upload component                │     │     │
│  │  │  • Large buttons (elderly-friendly)     │     │     │
│  │  │  • Summary display                      │     │     │
│  │  │  • Loading states                       │     │     │
│  │  └──────────────────────────────────────────┘     │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS POST /api/summarize
                            │ (FormData with PDF file)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL CLOUD PLATFORM                     │
│                      (Free Tier Hosting)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Next.js API Route (route.ts)              │     │
│  │                                                    │     │
│  │  1. Receive PDF file                              │     │
│  │  2. Validate file type & size                     │     │
│  │  3. Call PDF parser                               │     │
│  │  4. Call LLM client                               │     │
│  │  5. Return summary                                │     │
│  └────────────────────────────────────────────────────┘     │
│                            │                                 │
│                            ├──────────────┐                  │
│                            ▼              ▼                  │
│  ┌──────────────────────────┐  ┌──────────────────────┐     │
│  │   pdfParser.ts           │  │   llmClient.ts       │     │
│  │                          │  │                      │     │
│  │  • Convert File→Buffer   │  │  • Format prompt     │     │
│  │  • Extract text          │  │  • Call Groq API     │     │
│  │  • Return plain text     │  │  • Return summary    │     │
│  └──────────────────────────┘  └──────────────────────┘     │
│                                          │                   │
└──────────────────────────────────────────┼───────────────────┘
                                           │
                                           │ HTTPS API Call
                                           ▼
                            ┌──────────────────────────┐
                            │      Groq Cloud API      │
                            │   (Free Tier - 14.4K/day)│
                            │                          │
                            │  • Llama 3.1 Model       │
                            │  • Generate summary      │
                            │  • Return in 5-15 sec    │
                            └──────────────────────────┘
```

---

## Component Details

### 1. Frontend Layer (React/Next.js)

**File**: `app/page.tsx`

**Responsibilities**:
- Display large, elderly-friendly UI
- Handle file selection
- Show loading states
- Display summary results
- Error handling and user feedback

**Key Features**:
- Client-side component (`'use client'`)
- State management with React hooks
- Form data handling
- Responsive design with Tailwind CSS

---

### 2. API Layer (Next.js API Routes)

**File**: `app/api/summarize/route.ts`

**Responsibilities**:
- Receive PDF uploads
- Validate file type and size
- Orchestrate PDF parsing and summarization
- Return JSON response
- Error handling

**Request Flow**:
```typescript
POST /api/summarize
Content-Type: multipart/form-data

Request Body:
- file: PDF file (max 10MB)

Response:
{
  "summary": "Generated summary text..."
}

Error Response:
{
  "error": "Error message"
}
```

---

### 3. PDF Processing Layer

**File**: `lib/pdfParser.ts`

**Technology**: `pdf-parse` npm package

**Process**:
1. Convert File object to Buffer
2. Parse PDF structure
3. Extract text content
4. Return plain text string

**Limitations**:
- Works with text-based PDFs only
- Scanned PDFs (images) won't work without OCR
- Optimized for 2-3 page documents

---

### 4. AI Summarization Layer

**File**: `lib/llmClient.ts`

**Technology**: Groq SDK (Llama 3.1 model)

**Process**:
1. Receive extracted text
2. Truncate if needed (max 10,000 chars)
3. Format prompt for elderly-friendly output
4. Call Groq API
5. Return summary

**Configuration**:
- Model: `llama-3.1-8b-instant`
- Temperature: 0.3 (more focused, less creative)
- Max tokens: 1000 (sufficient for summaries)

---

### 5. External Services

#### Groq API
- **Purpose**: AI-powered text summarization
- **Model**: Llama 3.1 (8B parameters)
- **Speed**: 1-2 seconds response time
- **Cost**: Free tier (14,400 requests/day)
- **Authentication**: API key in environment variable

#### Vercel Platform
- **Purpose**: Hosting and deployment
- **Features**: 
  - Serverless functions
  - Automatic HTTPS
  - CDN for static assets
  - Environment variable management
- **Cost**: Free tier (100GB bandwidth)

---

## Data Flow

### Successful Request:

```
1. User selects PDF file
   ↓
2. Frontend sends FormData to /api/summarize
   ↓
3. API validates file (type, size)
   ↓
4. pdfParser extracts text (~1-2 seconds)
   ↓
5. llmClient sends text to Groq API
   ↓
6. Groq processes and returns summary (~5-15 seconds)
   ↓
7. API returns JSON response to frontend
   ↓
8. Frontend displays summary in large text box
```

**Total Time**: 10-20 seconds

---

### Error Handling:

```
Error at any step
   ↓
Catch block in API route
   ↓
Log error to console
   ↓
Return 400/500 error with user-friendly message
   ↓
Frontend displays error in red box
```

---

## Deployment Architecture

### Development:
```
Local Machine
├── npm run dev
├── Next.js dev server (port 3000)
└── Hot reload enabled
```

### Production (Vercel):
```
Vercel Edge Network
├── Global CDN
├── Serverless Functions (API routes)
├── Automatic HTTPS
├── Environment Variables (GROQ_API_KEY)
└── Zero-downtime deployments
```

---

## Security Architecture

### API Key Protection:
- ✅ Stored in `.env.local` (not committed to Git)
- ✅ Accessed via `process.env.GROQ_API_KEY`
- ✅ Only available server-side (API routes)
- ✅ Never exposed to frontend/browser

### File Upload Security:
- ✅ Type validation (PDF only)
- ✅ Size limit (10MB max)
- ✅ No file storage (processed in memory)
- ✅ Automatic cleanup after processing

### Network Security:
- ✅ HTTPS only (enforced by Vercel)
- ✅ CORS handled by Next.js
- ✅ No authentication needed (simpler for elderly users)

---

## Scalability Considerations

### Current Limits (Free Tier):
- **Groq API**: 14,400 requests/day (~600/hour)
- **Vercel**: 100GB bandwidth/month
- **Processing**: ~3-6 requests/minute (due to LLM latency)

### Scaling Options:
1. **More traffic**: Upgrade Vercel plan ($20/month for 1TB)
2. **More API calls**: Upgrade Groq plan (pay-per-use)
3. **Faster processing**: Use parallel processing or caching

### Current Architecture Supports:
- ✅ 100-500 users/day
- ✅ 10-50 concurrent requests
- ✅ Global distribution via CDN

---

## Technology Choices Rationale

| Choice | Reason |
|--------|--------|
| **Next.js** | Full-stack in one framework, easy deployment |
| **Serverless** | No server management, auto-scaling, cost-effective |
| **Groq** | Fastest free LLM API, good quality |
| **pdf-parse** | Lightweight, no external dependencies |
| **Tailwind CSS** | Rapid UI development, responsive by default |
| **TypeScript** | Type safety, better developer experience |
| **Vercel** | Zero-config deployment, made for Next.js |

---

## Monitoring & Observability

### Built-in Monitoring:
- **Vercel Dashboard**: Request logs, errors, performance
- **Groq Console**: API usage, rate limits, errors
- **Browser Console**: Client-side errors (for debugging)

### Key Metrics to Watch:
- API response time (should be < 20 seconds)
- Error rate (should be < 5%)
- Groq API usage (stay under 14,400/day)
- Vercel bandwidth (stay under 100GB/month)

---

## Future Enhancements (Optional)

### Potential Additions:
1. **OCR Support**: Handle scanned PDFs (Tesseract.js)
2. **Multi-language**: Support non-English documents
3. **Summary History**: Store recent summaries (add database)
4. **Email Delivery**: Send summary via email
5. **Batch Processing**: Upload multiple PDFs at once
6. **Custom Prompts**: Let users customize summary style

### Would Require:
- Database (PostgreSQL/Supabase)
- Email service (SendGrid/Resend)
- More complex state management
- User authentication

---

**This architecture is intentionally simple to keep costs at $0 and complexity low for elderly users!**

