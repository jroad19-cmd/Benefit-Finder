export const programs = [
  {
    id: 'pa-ptrr',
    name: 'Pennsylvania Property Tax/Rent Rebate',
    category: 'Tax Relief',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.pa.gov/agencies/revenue/ptrr',
    applyUrl: 'https://www.mypath.pa.gov',
    summary: 'Rebate for eligible older adults, widows/widowers, and people with disabilities.',
    hard: {
      state: ['PA'],
      ageOrDisability: true,
      housing: ['Own', 'Rent'],
      annualIncomeMax: 48110
    },
    docs: ['Photo ID', 'Proof of income', 'Rent certificate or property tax receipts', 'Birth date or disability proof'],
    eligibilityHighlights: ['Annual income must be $48,110 or less', 'Must be in Pennsylvania', 'Must be homeowner or renter'],
    reasonsTemplate: ['Income within posted limit', 'PA resident', 'Housing type is eligible'],
    matchType: 'benefit'
  },
  {
    id: 'pa-homestead',
    name: 'Pennsylvania Homestead/Farmstead Exclusion (Act 1 of 2006)',
    category: 'Tax Relief',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://dced.pa.gov/local-government/property-tax-relief-homestead-exclusion/',
    applyUrl: 'https://dced.pa.gov/local-government/property-tax-relief-homestead-exclusion/',
    summary: 'School property tax relief for owner-occupied primary residences through the homestead/farmstead exclusion.',
    hard: {
      state: ['PA'],
      housing: ['Own'],
      primaryResidenceRequired: true
    },
    docs: ['Homestead application with county assessment office', 'Proof primary residence', 'Property information'],
    eligibilityHighlights: ['Owner-occupied primary residence only', 'Not a renter program', 'Separate from PTRR'],
    reasonsTemplate: ['Owner occupancy fits program', 'PA property-tax relief program'],
    matchType: 'benefit'
  },
  {
    id: 'pa-liheap',
    name: 'Pennsylvania LIHEAP',
    category: 'Utility Help',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.pa.gov/services/dhs/apply-for-the-low-income-home-energy-assistance-program-liheap',
    applyUrl: 'https://www.compass.state.pa.us',
    summary: 'Seasonal heating assistance program for eligible households.',
    hard: {
      state: ['PA'],
      housing: ['Own', 'Rent', 'Homeless'],
      needsHouseholdIncomeReview: true
    },
    docs: ['ID', 'Proof of income for household members', 'Utility bill or fuel vendor information'],
    eligibilityHighlights: ['Seasonal program', 'Household-size-based income rules', 'Requires current income review'],
    reasonsTemplate: ['PA resident', 'Household-based utility assistance'],
    matchType: 'needs-review'
  },
  {
    id: 'pa-pace-pacenet',
    name: 'Pennsylvania PACE/PACENET',
    category: 'Prescription Help',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.pa.gov/services/aging/apply-for-the-pharmaceutical-assistance-contract-for-the-elderly',
    applyUrl: 'https://www.pa.gov/services/aging/apply-for-the-pharmaceutical-assistance-contract-for-the-elderly',
    summary: 'Prescription assistance for Pennsylvania residents age 65 and older.',
    hard: {
      state: ['PA'],
      minAge: 65,
      housing: ['Own', 'Rent', 'Homeless'],
      needsIncomeReview: true
    },
    docs: ['Photo ID', 'Proof of age', 'Proof of PA residency', 'Income documents'],
    eligibilityHighlights: ['Age 65+', 'PA resident', 'Income review required'],
    reasonsTemplate: ['Age fits program', 'PA resident'],
    matchType: 'needs-review'
  },
  {
    id: 'pa-state-blind-pension',
    name: 'Pennsylvania State Blind Pension',
    category: 'Cash Assistance',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.pa.gov/services/dhs/apply-for-the-state-blind-pension-program',
    applyUrl: 'https://www.compass.state.pa.us',
    summary: 'Cash assistance for qualifying blind Pennsylvanians.',
    hard: {
      state: ['PA'],
      disabilityKeywords: ['Blindness', 'Blind', 'Low Vision'],
      annualIncomeMax: 4260,
      assetsMax: 7500
    },
    docs: ['Medical proof of blindness', 'Income proof', 'Asset proof'],
    eligibilityHighlights: ['Vision-based eligibility', 'Annual net income cap', 'Property/resource cap'],
    reasonsTemplate: ['Disability type appears relevant', 'Income/assets may fit'],
    matchType: 'benefit'
  },
  {
    id: 'pa-chc',
    name: 'Pennsylvania Community HealthChoices',
    category: 'Long-Term Services',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.pa.gov/services/dhs/apply-for-community-healthchoices',
    applyUrl: 'https://www.pa.gov/services/dhs/apply-for-community-healthchoices',
    summary: 'Managed care for Pennsylvanians who have Medicaid and need LTSS or are dual eligible.',
    hard: {
      state: ['PA'],
      minAge: 21,
      requiresMedicaid: true,
      needsLTCReview: true
    },
    docs: ['Medicaid information', 'Functional/medical need documentation'],
    eligibilityHighlights: ['Age 21+', 'Requires Medicaid', 'LTSS or dual-eligibility review'],
    reasonsTemplate: ['State and age fit basic gate'],
    matchType: 'needs-review'
  },
  {
    id: 'pa-unclaimed',
    name: 'Pennsylvania Unclaimed Property Search',
    category: 'Unclaimed Money',
    geography: 'PA',
    sourceType: 'official',
    sourceUrl: 'https://www.patreasury.gov/unclaimed-property/',
    applyUrl: 'https://unclaimedproperty.patreasury.gov/en/',
    summary: 'Search Pennsylvania Treasury for unclaimed property owed to you.',
    hard: {
      state: ['PA']
    },
    docs: ['Name variations', 'Past addresses', 'Proof of identity'],
    eligibilityHighlights: ['Search opportunity, not a scored benefit'],
    reasonsTemplate: ['PA-related money search option'],
    matchType: 'search'
  },
  {
    id: 'mmrf-financial-assistance',
    name: 'MMRF Financial Assistance and Transportation Resources',
    category: 'Cancer Support',
    geography: 'National',
    sourceType: 'nonprofit',
    sourceUrl: 'https://themmrf.org/support/financial-assistance-and-transportation/',
    applyUrl: 'https://themmrf.org/support/financial-assistance-and-transportation/',
    summary: 'Multiple myeloma support resources, including transportation and financial-assistance resource links.',
    hard: {
      diseaseAnyOf: ['Multiple Myeloma']
    },
    docs: ['Diagnosis confirmation', 'Treatment center details', 'Financial need info may be requested by partner programs'],
    eligibilityHighlights: ['Multiple myeloma specific support resources'],
    reasonsTemplate: ['Diagnosis directly matches program focus'],
    matchType: 'resource'
  },
  {
    id: 'lls-travel-blood-cancer',
    name: 'Blood Cancer United Susan Lang Patient Travel Assistance',
    category: 'Cancer Support',
    geography: 'National',
    sourceType: 'nonprofit',
    sourceUrl: 'https://www.lls.org/support-resources/financial-support/susan-lang-pay-it-forward-patient-travel-assistance-program',
    applyUrl: 'https://www.lls.org/support-resources/financial-support/susan-lang-pay-it-forward-patient-travel-assistance-program',
    summary: 'Travel and lodging support for blood cancer patients with significant financial need.',
    hard: {
      diseaseFamilyAnyOf: ['Blood Cancer'],
      requiresFinancialNeed: true
    },
    docs: ['Diagnosis confirmation', 'Treatment/travel details', 'Income or hardship information'],
    eligibilityHighlights: ['Blood cancer only', 'Financial need required'],
    reasonsTemplate: ['Diagnosis fits blood-cancer family'],
    matchType: 'needs-review'
  },
  {
    id: 'cancercare-copay',
    name: 'CancerCare Co-Payment Assistance Information',
    category: 'Cancer Support',
    geography: 'National',
    sourceType: 'nonprofit',
    sourceUrl: 'https://www.cancercare.org/publications/284-how_co-payment_assistance_foundations_help',
    applyUrl: 'https://www.cancercare.org',
    summary: 'Information and referrals for co-pay, premium, and travel assistance foundations.',
    hard: {
      diseaseCategory: ['Cancer']
    },
    docs: ['Diagnosis information', 'Insurance information'],
    eligibilityHighlights: ['Cancer-related support resource'],
    reasonsTemplate: ['Cancer diagnosis category fits'],
    matchType: 'resource'
  }
];

export const diseaseFamilies = {
  'Multiple Myeloma': ['Cancer', 'Blood Cancer'],
  'Leukemia': ['Cancer', 'Blood Cancer'],
  'Lymphoma': ['Cancer', 'Blood Cancer'],
  'Small Cell Lung Cancer': ['Cancer', 'Lung Cancer'],
  'Non-Small Cell Lung Cancer': ['Cancer', 'Lung Cancer'],
  'Lung Cancer': ['Cancer', 'Lung Cancer'],
  'Breast Cancer': ['Cancer'],
  'Colon Cancer': ['Cancer'],
  'Prostate Cancer': ['Cancer'],
  'Pancreatic Cancer': ['Cancer'],
  'Ovarian Cancer': ['Cancer']
};

export const diseaseOptions = [
  'Multiple Myeloma',
  'Leukemia',
  'Lymphoma',
  'Small Cell Lung Cancer',
  'Non-Small Cell Lung Cancer',
  'Lung Cancer',
  'Breast Cancer',
  'Colon Cancer',
  'Prostate Cancer',
  'Pancreatic Cancer',
  'Ovarian Cancer',
  'Blindness',
  'Low Vision',
  'Other Disability'
];
