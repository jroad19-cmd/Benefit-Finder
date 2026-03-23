# BenefitFinder Pro Stronger Build

This is a beginner-friendly Next.js starter app for a senior and disabled grant and benefit finder.

## Stronger features included
- Multi-profile storage in local browser storage
- Caregiver mode
- Disease-specific grant matching
- Cancer subtypes and treatment-stage input
- Confidence meter and match scoring
- Missing info prompts
- Print results
- Voice input for notes when browser supports speech recognition
- Voice output for top results when browser supports speech synthesis
- Pennsylvania starter state-program logic

## Important note
This starter is structured for deployment and product demos. It does **not** yet contain a live nationwide database or real-time API connections.

## Very beginner-friendly GitHub + Vercel steps

### 1) Extract the zip
- Right-click the zip file
- Choose **Extract All**
- Open the extracted folder

### 2) Create a GitHub account
- Sign up on GitHub if needed
- After signing in, click **New repository**
- Name it something like `benefitfinder-pro-stronger`
- Leave it public or private, either works on free GitHub
- Click **Create repository**

### 3) Upload files to GitHub in the browser
- Open your new empty repository
- Click **uploading an existing file**
- Drag all extracted files and folders into the page
- Wait for upload to finish
- Click **Commit changes**

### 4) Create a free Vercel account
- Sign in to Vercel
- Choose the option to continue with GitHub
- Authorize Vercel to access your GitHub repositories

### 5) Import the project into Vercel
- In Vercel click **Add New Project**
- Find your GitHub repository
- Click **Import**
- Vercel should detect Next.js automatically

### 6) Build settings for free Vercel
Normally Vercel will fill these in automatically:
- Install Command: `npm install`
- Build Command: `npm run build`
- Output: leave blank for Next.js

Then click **Deploy**.

### 7) Open your live app
After deploy finishes, Vercel gives you a web address for the app.

## Local development
```bash
npm install
npm run dev
```

## Files to edit later
- `components/BenefitFinderApp.tsx` = UI and local profile logic
- `data/programs.ts` = benefit program data and matching catalog
- `data/medicalConditions.ts` = disease category and disease dropdown data
- `lib/match.ts` = confidence and eligibility scoring logic
- `lib/zip.ts` = starter ZIP to location mapping
