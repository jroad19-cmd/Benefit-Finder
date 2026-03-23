# BenefitFinder Pro - Pennsylvania Data Build

This build upgrades the app with **real Pennsylvania program data** and official state program links.

## Added or upgraded program data
- Pennsylvania Property Tax/Rent Rebate Program
- Pennsylvania SNAP
- Pennsylvania Medicaid for Older People and People with Disabilities
- Pennsylvania Community HealthChoices (CHC)
- Pennsylvania Medicare Savings Programs guidance
- Pennsylvania PACE / PACENET
- Pennsylvania LIHEAP
- Pennsylvania Senior Food Box Program
- Pennsylvania Senior Farmers Market Nutrition Program
- Pennsylvania Retired Status Vehicle Registration
- Pennsylvania Unclaimed Property Search
- Pennsylvania State Blind Pension
- Pennsylvania Medical Assistance for Workers with Disabilities (MAWD)
- Pennsylvania Breast & Cervical Cancer Prevention and Treatment (BCCPT)
- Pennsylvania Breast & Cervical Cancer Early Detection Program (BCCEDP)
- PA MEDI counseling

## What changed in the app
- Added official program URLs and labels inside results cards
- Added official eligibility highlights to each result
- Improved matching logic for:
  - monthly vs annual income tests
  - assets/resource-tested programs
  - retirement/employment-sensitive programs
  - housing-sensitive programs
- Kept multi-profile and caregiver mode
- Kept voice input and voice output
- Kept print support

## GitHub update steps
1. Download this zip file.
2. Extract it on your computer.
3. Open your GitHub repo.
4. Replace the old files with the files from this extracted folder.
5. Commit the changes.
6. Vercel should auto-deploy, or you can click Redeploy in Vercel.

## Vercel settings
- Framework Preset: Next.js
- Install Command: npm install
- Build Command: npm run build

## Notes
- This app now includes official Pennsylvania program references and starter eligibility logic.
- It is still not a live API integration with every county or nonprofit source.
- You can keep extending `data/programs.ts` with more local county and city programs.
