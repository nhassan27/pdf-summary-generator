# 🚀 Deployment Guide

## Option 1: Deploy to Vercel (Recommended - FREE)

Vercel is the easiest way to deploy Next.js applications. It's made by the same team that created Next.js!

### Step-by-Step Deployment:

#### 1. Create a Vercel Account
- Go to [https://vercel.com/signup](https://vercel.com/signup)
- Sign up with GitHub, GitLab, or email (it's free!)

#### 2. Install Vercel CLI
```bash
npm install -g vercel
```

#### 3. Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

#### 4. Deploy Your App
From your project directory, run:
```bash
vercel
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account name
- **Link to existing project?** → No
- **Project name?** → summary-generator (or your choice)
- **Directory?** → ./ (just press Enter)
- **Override settings?** → No

Your app will be deployed in about 1-2 minutes!

#### 5. Add Environment Variable
After deployment:
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

#### 6. Redeploy with Environment Variable
```bash
vercel --prod
```

**Done!** Your app is now live at: `https://your-project-name.vercel.app`

---

## Option 2: Deploy to Netlify (Alternative - FREE)

### Step-by-Step:

#### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. Build Your App
```bash
npm run build
```

#### 3. Deploy
```bash
netlify deploy
```

Follow the prompts and select "Create & configure a new site"

#### 4. Add Environment Variable
```bash
netlify env:set GROQ_API_KEY "your_api_key_here"
```

#### 5. Deploy to Production
```bash
netlify deploy --prod
```

---

## Option 3: Deploy to Railway (Alternative - FREE)

### Step-by-Step:

#### 1. Create Railway Account
- Go to [https://railway.app](https://railway.app)
- Sign up with GitHub

#### 2. Install Railway CLI
```bash
npm install -g @railway/cli
```

#### 3. Login
```bash
railway login
```

#### 4. Initialize Project
```bash
railway init
```

#### 5. Add Environment Variable
```bash
railway variables set GROQ_API_KEY=your_api_key_here
```

#### 6. Deploy
```bash
railway up
```

---

## Testing Your Deployment

After deployment, test your app:

1. Visit your deployed URL
2. Click "Attach PDF File"
3. Upload a test PDF (2-3 pages)
4. Click "Generate Summary"
5. Verify the summary appears correctly

---

## Troubleshooting Deployment

### "Build failed"
- Make sure all files are committed (if using Git)
- Check that `package.json` has all dependencies
- Verify Node.js version is 18 or higher

### "API key not found"
- Double-check environment variable name is exactly: `GROQ_API_KEY`
- Make sure you redeployed after adding the environment variable
- Check that the API key is valid at https://console.groq.com

### "Function timeout"
- For very large PDFs, you may need to upgrade to a paid plan
- For 2-3 page PDFs, this shouldn't happen on free tier

---

## Free Tier Limits

### Vercel Free Tier:
- ✅ 100GB bandwidth/month
- ✅ Unlimited requests
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Perfect for this app!

### Netlify Free Tier:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS

### Railway Free Tier:
- ✅ $5 free credit/month
- ✅ Should be enough for moderate use

---

## Custom Domain (Optional)

### On Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### On Netlify:
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration instructions

---

## Monitoring Your App

### Vercel Analytics (Free):
1. Go to your project dashboard
2. Click "Analytics" tab
3. See visitor stats, performance metrics

### Check Groq Usage:
1. Go to [https://console.groq.com](https://console.groq.com)
2. Click "Usage" to see API call statistics
3. Free tier: 14,400 requests/day

---

## Updating Your Deployed App

When you make changes to your code:

### Vercel:
```bash
vercel --prod
```

### Netlify:
```bash
netlify deploy --prod
```

### Railway:
```bash
railway up
```

---

## Security Best Practices

1. ✅ **Never commit `.env.local`** to Git (it's in `.gitignore`)
2. ✅ **Use environment variables** for API keys (never hardcode)
3. ✅ **Rotate API keys** periodically
4. ✅ **Monitor usage** to detect unusual activity

---

## Cost Estimate

For typical usage (10-50 summaries per day):

- **Hosting**: $0/month (Vercel/Netlify free tier)
- **Groq API**: $0/month (free tier: 14,400 requests/day)
- **Total**: **$0/month** 🎉

---

**Your app is now accessible to anyone with the URL!** Share it with your elderly users and they can use it from any device with a web browser.

