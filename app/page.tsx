'use client'

import { useState, useRef } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError('')
        setSummary('')
      } else {
        setError('Please select a PDF file')
        setFile(null)
      }
    }
  }

  const handleAttachClick = () => {
    // If there's already a summary, clear everything first (Start Over)
    if (summary) {
      handleClear()
    }
    fileInputRef.current?.click()
  }

  const handleGenerateSummary = async () => {
    if (!file) {
      setError('Please attach a PDF file first')
      return
    }

    setLoading(true)
    setError('')
    setSummary('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const data = await response.json()
      setSummary(data.summary)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setFile(null)
    setSummary('')
    setError('')
    setCopied(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      // Reset the "Copied!" message after 3 seconds
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            PDF Summary Generator
          </h1>
          <p className="text-2xl text-gray-600">
            Upload your PDF and get a quick summary
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Attach File Button (also serves as Start Over) */}
          <div className="mb-8">
            <button
              onClick={handleAttachClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold py-8 px-12 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {summary ? '🔄 Attach New PDF File' : '📎 Attach PDF File'}
            </button>

            {file && !summary && (
              <div className="mt-6 p-6 bg-green-50 border-4 border-green-300 rounded-xl">
                <p className="text-2xl text-green-800 font-semibold">
                  ✓ File attached: {file.name}
                </p>
              </div>
            )}
          </div>

          {/* Generate Summary Button */}
          {file && !summary && (
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-3xl font-bold py-8 px-12 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed mb-6"
            >
              {loading ? '⏳ Generating Summary...' : '✨ Generate Summary'}
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-6 bg-red-50 border-4 border-red-300 rounded-xl">
              <p className="text-2xl text-red-800 font-semibold">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Summary Display */}
          {summary && (
            <div className="mb-6">
              <div className="bg-blue-50 border-4 border-blue-300 rounded-xl p-8">
                <p className="text-2xl text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>

              {/* Copy Button */}
              <div className="mt-6">
                <button
                  onClick={handleCopySummary}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {copied ? '✓ Copied!' : '📋 Copy Summary'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

