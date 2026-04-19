# Free Hosting Guide - නොමිලේ Host කරන්නේ කොහොමද?

## 🚀 BEST FREE HOSTING OPTIONS

මේ site එක නොමිලේ host කරන්න පුළුවන් හොඳම platforms:

---

## 1. 🌟 NETLIFY (RECOMMENDED) ⭐

### Why Netlify?
- ✅ **100% FREE** for personal projects
- ✅ **Automatic HTTPS** (SSL certificate)
- ✅ **Global CDN** (fast worldwide)
- ✅ **Automatic deployments** from Git
- ✅ **Custom domain** support
- ✅ **100GB bandwidth/month**
- ✅ **Easy to use**
- ✅ **No credit card required**

### How to Deploy:

**Method 1: Drag & Drop (Easiest)**

```bash
# 1. Build your project
npm run build

# 2. Go to https://app.netlify.com/drop
# 3. Drag the 'dist' folder
# 4. Done! Your site is live!
```

**Method 2: CLI (Recommended)**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build your project
npm run build

# 3. Login to Netlify
netlify login

# 4. Deploy
netlify deploy --prod --dir=dist

# 5. Follow the prompts
# 6. Your site is live!
```

**Method 3: Git Integration (Best)**

```bash
# 1. Push your code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 2. Go to https://app.netlify.com
# 3. Click "Add new site" → "Import an existing project"
# 4. Connect to GitHub
# 5. Select your repository
# 6. Build settings:
#    - Build command: npm run build
#    - Publish directory: dist
# 7. Click "Deploy site"
# 8. Done! Auto-deploys on every push!
```

### Custom Domain:
```
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., yoursite.com)
4. Update DNS records at your domain provider
5. Done! HTTPS auto-enabled
```

### Free Plan Limits:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Unlimited deployments

**Perfect for this project!** ✅

---

## 2. 🔷 VERCEL

### Why Vercel?
- ✅ **100% FREE** for personal projects
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Git integration**
- ✅ **Custom domain**
- ✅ **100GB bandwidth/month**
- ✅ **Fast deployments**

### How to Deploy:

**Method 1: CLI**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Follow prompts
# 5. Done!
```

**Method 2: Git Integration**

```bash
# 1. Push to GitHub
git push

# 2. Go to https://vercel.com
# 3. Click "Add New" → "Project"
# 4. Import from GitHub
# 5. Select repository
# 6. Click "Deploy"
# 7. Done! Auto-deploys on push
```

### Free Plan Limits:
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Unlimited sites

**Great alternative!** ✅

---

## 3. 🔥 FIREBASE HOSTING

### Why Firebase?
- ✅ **FREE** (Spark plan)
- ✅ **Google infrastructure**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Custom domain**
- ✅ **10GB storage**
- ✅ **360MB/day bandwidth**

### How to Deploy:

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: dist
# - Single-page app: Yes
# - GitHub auto-deploy: Optional

# 4. Build
npm run build

# 5. Deploy
firebase deploy --only hosting

# 6. Done!
```

### Free Plan Limits:
- ✅ 10GB storage
- ✅ 360MB/day bandwidth (~10GB/month)
- ✅ Custom domain

**Good for small traffic!** ✅

---

## 4. 📦 GITHUB PAGES

### Why GitHub Pages?
- ✅ **100% FREE**
- ✅ **Automatic HTTPS**
- ✅ **Direct from GitHub**
- ✅ **Custom domain**
- ✅ **100GB bandwidth/month**
- ✅ **Simple setup**

### How to Deploy:

**Method 1: gh-pages package**

```bash
# 1. Install gh-pages
npm install -D gh-pages

# 2. Add to package.json scripts:
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# 3. Deploy
npm run deploy

# 4. Enable GitHub Pages in repo settings
# Settings → Pages → Source: gh-pages branch
# 5. Done!
```

**Method 2: GitHub Actions**

```yaml
# Create .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Free Plan Limits:
- ✅ 1GB storage
- ✅ 100GB bandwidth/month
- ✅ Custom domain

**Simple & reliable!** ✅

---

## 5. 🌐 CLOUDFLARE PAGES

### Why Cloudflare Pages?
- ✅ **100% FREE**
- ✅ **Cloudflare CDN**
- ✅ **Automatic HTTPS**
- ✅ **Git integration**
- ✅ **Custom domain**
- ✅ **Unlimited bandwidth**
- ✅ **DDoS protection**

### How to Deploy:

```bash
# 1. Push to GitHub
git push

# 2. Go to https://pages.cloudflare.com
# 3. Click "Create a project"
# 4. Connect to GitHub
# 5. Select repository
# 6. Build settings:
#    - Build command: npm run build
#    - Build output: dist
# 7. Click "Save and Deploy"
# 8. Done!
```

### Free Plan Limits:
- ✅ **Unlimited bandwidth** 🎉
- ✅ 500 builds/month
- ✅ Unlimited sites

**Best for high traffic!** ✅

---

## 6. 🎯 RENDER

### Why Render?
- ✅ **FREE** tier available
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Git integration**
- ✅ **Custom domain**
- ✅ **100GB bandwidth/month**

### How to Deploy:

```bash
# 1. Push to GitHub
git push

# 2. Go to https://render.com
# 3. Click "New" → "Static Site"
# 4. Connect to GitHub
# 5. Select repository
# 6. Build settings:
#    - Build command: npm run build
#    - Publish directory: dist
# 7. Click "Create Static Site"
# 8. Done!
```

### Free Plan Limits:
- ✅ 100GB bandwidth/month
- ✅ Unlimited sites

**Solid choice!** ✅

---

## 📊 COMPARISON TABLE

| Platform | Bandwidth | Storage | Custom Domain | HTTPS | CDN | Best For |
|----------|-----------|---------|---------------|-------|-----|----------|
| **Netlify** ⭐ | 100GB/mo | Unlimited | ✅ | ✅ | ✅ | **Best Overall** |
| **Vercel** | 100GB/mo | Unlimited | ✅ | ✅ | ✅ | Fast Deploys |
| **Firebase** | 10GB/mo | 10GB | ✅ | ✅ | ✅ | Small Traffic |
| **GitHub Pages** | 100GB/mo | 1GB | ✅ | ✅ | ❌ | Simple Setup |
| **Cloudflare** | **Unlimited** | Unlimited | ✅ | ✅ | ✅ | **High Traffic** |
| **Render** | 100GB/mo | Unlimited | ✅ | ✅ | ✅ | Alternative |

---

## 🏆 RECOMMENDATION

### For This Project:

**#1 Choice: NETLIFY** ⭐
```
Why?
- Easiest to use
- Drag & drop deployment
- Automatic HTTPS
- 100GB bandwidth (enough for most sites)
- Free custom domain
- No credit card needed
- Perfect for React/Vite projects
```

**#2 Choice: CLOUDFLARE PAGES**
```
Why?
- Unlimited bandwidth
- Best CDN
- DDoS protection
- Great for high traffic
```

**#3 Choice: VERCEL**
```
Why?
- Fast deployments
- Great developer experience
- Good for React projects
```

---

## 🚀 QUICK START (NETLIFY)

### 5 Steps to Deploy:

**Step 1: Build**
```bash
npm run build
```

**Step 2: Create Account**
```
Go to https://app.netlify.com
Sign up (free, no credit card)
```

**Step 3: Deploy**
```
Method A: Drag & drop 'dist' folder to https://app.netlify.com/drop
Method B: Connect GitHub and auto-deploy
```

**Step 4: Custom Domain (Optional)**
```
Site settings → Domain management → Add custom domain
```

**Step 5: Done!**
```
Your site is live! 🎉
Example: https://your-site.netlify.app
```

---

## 🔧 ENVIRONMENT VARIABLES

### For Netlify:

```bash
# 1. Go to Site settings → Environment variables
# 2. Add variables:
GEMINI_API_KEY=your-key-here
FIREBASE_API_KEY=your-key-here

# 3. Redeploy
# 4. Done!
```

### For Vercel:

```bash
# 1. Go to Project settings → Environment Variables
# 2. Add variables
# 3. Redeploy
```

### For Firebase:

```bash
# Use .env.production file
# Firebase automatically uses it
```

---

## 📱 CUSTOM DOMAIN SETUP

### Step 1: Buy Domain
```
Recommended registrars:
- Namecheap (cheap, reliable)
- Google Domains
- Cloudflare (cheapest)
- GoDaddy
```

### Step 2: Connect to Netlify
```
1. Netlify → Site settings → Domain management
2. Add custom domain
3. Copy DNS records
4. Add to your domain registrar
5. Wait 24-48 hours for DNS propagation
6. Done! HTTPS auto-enabled
```

### DNS Records Example:
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify IP)

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 🔒 SECURITY TIPS

### Before Deploying:

**1. Check .env files**
```bash
# Make sure .env.local is in .gitignore
# Never commit API keys to Git
```

**2. Use environment variables**
```bash
# Add API keys in hosting platform
# Not in code
```

**3. Enable HTTPS**
```bash
# All platforms auto-enable HTTPS
# Make sure it's active
```

**4. Restrict API keys**
```bash
# Firebase: Add domain restrictions
# Gemini: Add domain restrictions
```

---

## 📊 MONITORING

### After Deployment:

**1. Check Analytics**
```
Netlify → Analytics (built-in)
Or add Google Analytics
```

**2. Monitor Bandwidth**
```
Check usage in platform dashboard
Stay within free limits
```

**3. Check Performance**
```
Use Google PageSpeed Insights
Optimize if needed
```

---

## 🐛 TROUBLESHOOTING

### Build Fails?
```bash
# Check build logs
# Common issues:
- Missing dependencies: npm install
- Build command wrong: npm run build
- Node version: Use Node 18+
```

### Site Not Loading?
```bash
# Check:
- Build completed successfully
- Publish directory is 'dist'
- No errors in browser console
```

### 404 Errors?
```bash
# Add _redirects file in public folder:
/*    /index.html   200

# Or in netlify.toml:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 💰 COST BREAKDOWN

### Free Tier (Forever):
```
Netlify: FREE
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Custom domain
- HTTPS

Cost: $0/month ✅
```

### If You Exceed Free Tier:
```
Netlify Pro: $19/month
- 1TB bandwidth
- 25,000 build minutes
- Better support

But for this project, FREE tier is enough! ✅
```

---

## 🎯 FINAL RECOMMENDATION

### Best Setup:

**Hosting:** Netlify (Free)
**Domain:** Namecheap (~$10/year)
**Total Cost:** ~$10/year

**Or 100% Free:**
**Hosting:** Netlify (Free)
**Domain:** Use Netlify subdomain (yoursite.netlify.app)
**Total Cost:** $0/year ✅

---

## 📋 DEPLOYMENT CHECKLIST

### Before Deploy:
- [ ] Build works locally (`npm run build`)
- [ ] No errors in console
- [ ] All features tested
- [ ] API keys in environment variables
- [ ] .env.local in .gitignore
- [ ] Code pushed to GitHub

### Deploy:
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add environment variables
- [ ] Deploy!

### After Deploy:
- [ ] Test all features
- [ ] Check mobile view
- [ ] Test forms
- [ ] Check analytics
- [ ] Add custom domain (optional)
- [ ] Share with world! 🎉

---

## 🚀 QUICK DEPLOY COMMANDS

### Netlify:
```bash
npm install -g netlify-cli
npm run build
netlify login
netlify deploy --prod --dir=dist
```

### Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

---

සියල්ල හරියටම තියෙනවා! 🎉

**Best Choice:** Netlify (Free, Easy, Reliable)

**Deploy කරන්න:**
```bash
1. npm run build
2. Go to https://app.netlify.com/drop
3. Drag 'dist' folder
4. Done! Your site is live! 🚀
```

**Cost:** $0/month (FREE forever!)

---

## 📞 SUPPORT

Need help?
- Netlify Docs: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com
- This guide: Read again! 😊

**Happy hosting!** 🎉🚀
