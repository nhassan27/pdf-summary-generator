# ⚡ Quick Deploy Guide (5 Minutes)

## Fastest Way to Get Your App Online

### **Step 1: GitHub (2 minutes)**
1. Go to https://github.com/new
2. Repository name: `pdf-summary-generator`
3. Click "Create repository"
4. Run these commands in your terminal:
```bash
cd /Users/nadeemh/Downloads/summary_generator
git remote add origin https://github.com/YOUR_USERNAME/pdf-summary-generator.git
git push -u origin main
```

### **Step 2: Vercel (3 minutes)**
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Click "Import Project"
4. Select `pdf-summary-generator`
5. Add Environment Variable:
   - Name: `GROQ_API_KEY`
   - Value: `YOUR_GROQ_API_KEY_HERE`
6. Click "Deploy"
7. Wait 2 minutes
8. Done! 🎉

### **Your URL:**
```
https://pdf-summary-generator-YOUR_USERNAME.vercel.app
```

Share this URL with your user!

---

## Alternative: Deploy Without GitHub

If you don't want to use GitHub:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy directly:
```bash
cd /Users/nadeemh/Downloads/summary_generator
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - What's your project's name? **pdf-summary-generator**
   - In which directory is your code? **./**
   - Want to override settings? **N**

4. When asked for environment variables:
   - Add `GROQ_API_KEY` with your API key

5. Done! You'll get a URL immediately.

---

## Even Faster: One Command Deploy

If you have Vercel CLI installed:

```bash
cd /Users/nadeemh/Downloads/summary_generator
vercel --prod -e GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual Groq API key.

---

**That's it! Your app is live! 🚀**

