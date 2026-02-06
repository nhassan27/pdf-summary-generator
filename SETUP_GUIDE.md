# 🚀 Quick Setup Guide

Follow these simple steps to get your PDF Summary Generator running:

## Step 1: Install Node.js (if not already installed)

Download and install from: [https://nodejs.org](https://nodejs.org)
- Choose the LTS (Long Term Support) version
- Follow the installer instructions

## Step 2: Install Dependencies

Open Terminal (Mac) or Command Prompt (Windows) in this folder and run:

```bash
npm install
```

This will take 2-3 minutes to download all required packages.

## Step 3: Get Your Free Groq API Key

1. Open your browser and go to: **https://console.groq.com**
2. Click "Sign Up" (it's free!)
3. After signing in, click "API Keys" in the left menu
4. Click "Create API Key"
5. Give it a name like "PDF Summarizer"
6. **Copy the API key** (you'll need it in the next step)

## Step 4: Create Environment File

1. Find the file named `.env.local.example` in this folder
2. Make a copy and rename it to `.env.local`
3. Open `.env.local` in a text editor
4. Replace `your_groq_api_key_here` with the API key you copied
5. Save the file

**Example:**
```
GROQ_API_KEY=gsk_abc123xyz456...
```

## Step 5: Start the Application

In Terminal/Command Prompt, run:

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

## Step 6: Open in Browser

Open your web browser and go to:

**http://localhost:3000**

You should see the PDF Summary Generator with a big blue "Attach PDF File" button!

## 🎉 You're Ready!

### How to Use:
1. Click the **"📎 Attach PDF File"** button
2. Select a PDF from your computer (2-3 pages works best)
3. Click **"✨ Generate Summary"**
4. Wait 10-20 seconds
5. Read your summary!

## ⚠️ Troubleshooting

### "Command not found: npm"
- You need to install Node.js first (see Step 1)

### "Failed to generate summary"
- Make sure your `.env.local` file has the correct API key
- Check that you're connected to the internet
- Verify your API key at https://console.groq.com

### Port 3000 already in use
- Stop any other applications using port 3000
- Or run: `npm run dev -- -p 3001` to use port 3001 instead

## 📞 Need Help?

- Check the main README.md file for more details
- Visit https://console.groq.com/docs for Groq API help
- Make sure your PDF is text-based (not a scanned image)

---

**Enjoy your PDF Summary Generator!** 🎊

