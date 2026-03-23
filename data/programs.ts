import type { Program } from '@/lib/types';

export const programs: Program[] = [
  {
    id: 'pa-property-tax-rent-rebate',
    name: 'Pennsylvania Property Tax/Rent Rebate Program',
    category: 'Housing Relief',
    scope: 'State',
    states: ['PA'],
    annualIncomeMax: 48110,
    difficulty: 'Easy',
    approvalEstimate: 'Several weeks to a few months during filing season',
    description:
      'Rebates for eligible older adults, widows or widowers, and people with disabilities who paid property tax or rent in Pennsylvania.',
    eligibilitySummary: [
      'PA resident homeowner or renter',
      'Age 65+, widow/widower 50+, or disabled adult 18+',
      'Annual household income $48,110 or less',
      'Standard rebates generally range from $380 to $1,000, with some supplemental rebates available'
    ],
    documents: ['Photo ID', 'Proof of income', 'Rent certificate or property tax receipts', 'Social Security numbers for household members'],
    applySteps: ['Apply online through myPATH, by mail, or in person', 'Upload or attach income proof and rent/tax documents', 'Track rebate status after filing'],
    websiteLabel: 'Official PA rebate page',
    websiteUrl: 'https://www.pa.gov/agencies/revenue/ptrr'
  },
  {
    id: 'pa-snap',
    name: 'Pennsylvania SNAP',
    category: 'Food Assistance',
    scope: 'State',
    states: ['PA'],
    difficulty: 'Moderate',
    approvalEstimate: 'Usually within 30 days; faster for emergencies',
    description:
      'Monthly food assistance through the Supplemental Nutrition Assistance Program for eligible Pennsylvania households.',
    eligibilitySummary: [
      'Eligibility depends on household size, income, and certain deductions',
      'Older adults and disabled households may have different SNAP treatment than other households',
      'Pennsylvania offers a simplified SNAP application for seniors and people with disabilities'
    ],
    documents: ['Photo ID', 'Proof of address', 'Income proof', 'Expense information such as rent, utilities, and medical costs'],
    applySteps: ['Apply through COMPASS, by phone, by mail, or at a County Assistance Office', 'Complete any required interview', 'Provide requested verifications'],
    websiteLabel: 'Official PA SNAP page',
    websiteUrl: 'https://www.pa.gov/agencies/dhs/resources/snap'
  },
  {
    id: 'pa-medicaid-opd',
    name: 'Pennsylvania Medicaid for Older People and People with Disabilities',
    category: 'Health Coverage',
    scope: 'State',
    states: ['PA'],
    minAge: 65,
    monthlyIncomeMax: 1016.1,
    difficulty: 'Complex',
    approvalEstimate: 'Several weeks to a few months',
    description:
      'Medical Assistance coverage for older adults, people with disabilities, and people who are blind, including pathways that may help with long-term services and supports.',
    eligibilitySummary: [
      'For older adults age 65+ or people with disabilities or blindness',
      'Resource rules may apply',
      'Pennsylvania also lists medically needy pathways and long-term care related applications'
    ],
    documents: ['Photo ID', 'Proof of income', 'Bank and asset statements', 'Medicare information if applicable', 'Disability or medical records if applicable'],
    applySteps: ['Apply through COMPASS, by phone, by mail, or in person', 'Submit financial verification and any disability-related records', 'Respond to any follow-up requests from DHS'],
    websiteLabel: 'Official PA Medicaid older adults/disability page',
    websiteUrl: 'https://www.pa.gov/agencies/dhs/resources/aging-physical-disabilities/medicaid-older-people-and-people-with-disabilities'
  },
  {
    id: 'pa-community-healthchoices',
    name: 'Pennsylvania Community HealthChoices (CHC)',
    category: 'Long-Term Services',
    scope: 'State',
    states: ['PA'],
    caregiverHelpful: true,
    currentBenefitTags: ['Medicaid'],
    difficulty: 'Complex',
    approvalEstimate: 'Often 1 to 3 months depending on assessments',
    description:
      'Managed care program for older adults and people with physical disabilities who need Medicaid long-term services and supports or are dual eligible for Medicare and Medicaid.',
    eligibilitySummary: [
      'For older adults and individuals with physical disabilities',
      'Commonly relevant for people needing long-term services in the home or community',
      'Often tied to Medicaid and functional assessments'
    ],
    documents: ['Medicaid information', 'Medicare card if applicable', 'Medical and functional assessment records', 'Proof of identity and residency'],
    applySteps: ['Apply for Medicaid if not already enrolled', 'Work with DHS and CHC enrollment contacts', 'Complete functional needs assessment and plan selection'],
    websiteLabel: 'Official PA CHC apply page',
    websiteUrl: 'https://www.pa.gov/services/dhs/apply-for-community-healthchoices'
  },
  {
    id: 'pa-medicare-savings',
    name: 'Pennsylvania Medicare Savings Programs',
    category: 'Medicare Cost Help',
    scope: 'State',
    states: ['PA'],
    minAge: 65,
    currentBenefitTags: ['Medicare'],
    difficulty: 'Moderate',
    approvalEstimate: '2 to 6 weeks',
    description:
      'Programs that can help pay Medicare Part A and Part B costs for Pennsylvanians with limited income and resources.',
    eligibilitySummary: [
      'Requires Medicare',
      'Income and resource limits apply',
      'May save more than $1,900 per year according to PA MEDI guidance'
    ],
    documents: ['Medicare card', 'Proof of income', 'Asset statements', 'Photo ID'],
    applySteps: ['Apply through COMPASS, by phone, or through a County Assistance Office', 'Provide Medicare and financial information', 'Call PA MEDI for counseling help if needed'],
    websiteLabel: 'Official PA MEDI savings guidance',
    websiteUrl: 'https://www.pa.gov/agencies/aging/aging-programs-and-services/pa-medi-medicare-counseling'
  },
  {
    id: 'extra-help',
    name: 'Extra Help for Medicare Part D',
    category: 'Medication Assistance',
    scope: 'Federal',
    currentBenefitTags: ['Medicare', 'Medicare Part D'],
    difficulty: 'Easy',
    approvalEstimate: '2 to 6 weeks',
    description:
      'Federal Low-Income Subsidy that lowers Medicare Part D premiums and prescription costs. Pennsylvania refers users to SSA and PA MEDI for help applying.',
    eligibilitySummary: ['Requires Medicare drug coverage eligibility', 'Income and resources are reviewed', 'PA MEDI can help compare options and explain savings'],
    documents: ['Medicare information', 'Proof of income', 'Asset information'],
    applySteps: ['Apply through Social Security', 'Provide financial information', 'Use PA MEDI if you want counseling support'],
    websiteLabel: 'PA MEDI explanation of Extra Help',
    websiteUrl: 'https://www.pa.gov/agencies/aging/aging-programs-and-services/pa-medi-medicare-counseling'
  },
  {
    id: 'pa-pace-pacenet',
    name: 'Pennsylvania PACE / PACENET',
    category: 'Medication Assistance',
    scope: 'State',
    states: ['PA'],
    minAge: 65,
    difficulty: 'Moderate',
    approvalEstimate: '2 to 6 weeks',
    description:
      'Pennsylvania prescription assistance for adults age 65 and older to reduce out-of-pocket medication costs.',
    eligibilitySummary: [
      'Age 65 or older',
      'PA resident for at least 90 days before application',
      'Cannot be enrolled in Medicaid prescription benefit',
      'Income is based on the previous calendar year'
    ],
    documents: ['Photo ID', 'Proof of Pennsylvania residency', 'Previous-year income information', 'Medicare Part D plan information if applicable'],
    applySteps: ['Complete the PACE/PACENET application', 'Provide previous-year income details', 'Coordinate with any Medicare drug coverage already in place'],
    websiteLabel: 'Official PA PACE/PACENET page',
    websiteUrl: 'https://www.pa.gov/services/aging/apply-for-the-pharmaceutical-assistance-contract-for-the-elderly'
  },
  {
    id: 'pa-liheap',
    name: 'Pennsylvania LIHEAP',
    category: 'Utility Assistance',
    scope: 'State',
    states: ['PA'],
    difficulty: 'Moderate',
    approvalEstimate: 'Varies during the season',
    description:
      'Heating assistance grants for Pennsylvania households with low incomes, including crisis grants for households in danger of losing heat.',
    eligibilitySummary: [
      'Seasonal program',
      'Cash grants generally range from $200 to $1,000 based on household size, income, and fuel type',
      'Crisis grants may be available for households facing emergency heating situations'
    ],
    documents: ['Proof of identity', 'Proof of income for household members', 'Recent heating bill or fuel information', 'Utility account information'],
    applySteps: ['Apply online through COMPASS or submit the paper application', 'Provide household income and heating documentation', 'Follow up quickly if applying for crisis help'],
    websiteLabel: 'Official PA LIHEAP page',
    websiteUrl: 'https://www.pa.gov/agencies/dhs/resources/liheap'
  },
  {
    id: 'pa-senior-food-box',
    name: 'Pennsylvania Senior Food Box Program',
    category: 'Food Assistance',
    scope: 'State',
    states: ['PA'],
    minAge: 60,
    difficulty: 'Easy',
    approvalEstimate: 'Varies by local food bank availability',
    description:
      'Monthly shelf-stable food boxes for eligible older adults distributed through food banks.',
    eligibilitySummary: [
      'Age 60 or older',
      'Household income below 130% of the U.S. poverty level',
      'Distributed locally through food banks'
    ],
    documents: ['Photo ID', 'Proof of age', 'Proof of income', 'Proof of address'],
    applySteps: ['Contact your local food bank or aging network', 'Complete the local eligibility form', 'Pick up the monthly food box or arrange proxy help if available'],
    websiteLabel: 'Official PA food programs for older adults page',
    websiteUrl: 'https://www.pa.gov/agencies/dhs/resources/ending-hunger/food-programs-for-older-adults'
  },
  {
    id: 'pa-senior-farmers-market',
    name: 'Pennsylvania Senior Farmers Market Nutrition Program',
    category: 'Food Assistance',
    scope: 'State',
    states: ['PA'],
    minAge: 60,
    difficulty: 'Easy',
    approvalEstimate: 'Seasonal distribution',
    description:
      'Seasonal vouchers or checks for eligible older adults to buy Pennsylvania-grown fruits and vegetables.',
    eligibilitySummary: [
      'Age 60 or older',
      'Income eligibility rules apply',
      'Checks are distributed annually between June 1 and September 30 and redeemed by November 30'
    ],
    documents: ['Photo ID', 'Proof of age', 'Income information', 'Proxy form if someone else is picking up benefits'],
    applySteps: ['Apply through the local Area Agency on Aging or county distribution partner', 'Receive checks during the distribution period', 'Redeem them at participating farm stands or markets'],
    websiteLabel: 'Official PA senior farmers market page',
    websiteUrl: 'https://www.pa.gov/agencies/aging/aging-programs-and-services/meals-and-food-assistance'
  },
  {
    id: 'pa-retired-vehicle-registration',
    name: 'Pennsylvania Retired Status Vehicle Registration',
    category: 'Transportation',
    scope: 'State',
    states: ['PA'],
    annualIncomeMax: 30778,
    employmentTags: ['Retired'],
    difficulty: 'Easy',
    approvalEstimate: 'A few weeks after mailing initial application',
    description:
      'Reduced vehicle registration processing fee for retired Pennsylvanians who meet income and vehicle rules.',
    eligibilitySummary: [
      'Must be retired and receiving Social Security, SSI, retirement benefits, pensions, or annuities',
      'Total income must be $30,778 or less',
      'Vehicle must weigh 9,000 pounds or less',
      'Only one vehicle per qualified applicant may receive retired status'
    ],
    documents: ['Pennsylvania driver license or ID', 'Vehicle registration information', 'Proof of retirement income or benefits', 'Completed MV-371 form'],
    applySteps: ['Complete MV-371 and gather supporting proof', 'Mail the initial application to PennDOT', 'Renew online later once approved'],
    websiteLabel: 'Official PA retired registration page',
    websiteUrl: 'https://www.pa.gov/services/dmv/apply-for-retired-status-vehicle-registration'
  },
  {
    id: 'pa-unclaimed-property',
    name: 'Pennsylvania Unclaimed Property Search',
    category: 'Unclaimed Money',
    scope: 'Unclaimed Money',
    states: ['PA'],
    difficulty: 'Easy',
    approvalEstimate: 'Depends on claim review and documents',
    description:
      'Pennsylvania Treasury lets residents search for forgotten money, dormant accounts, insurance proceeds, and similar property.',
    eligibilitySummary: [
      'Search by your name, former names, or old addresses',
      'Pennsylvania Treasury says it is seeking owners of more than $3.5 billion in unclaimed property',
      'Claims may require proof of identity and past address or ownership'
    ],
    documents: ['Photo ID', 'Proof of current and possibly past addresses', 'Claim-specific ownership documents if requested'],
    applySteps: ['Search the Treasury website', 'Start a claim for matching property', 'Upload requested supporting documents and monitor claim status'],
    websiteLabel: 'Official PA unclaimed property search',
    websiteUrl: 'https://unclaimedproperty.patreasury.gov/en/'
  },
  {
    id: 'pa-state-blind-pension',
    name: 'Pennsylvania State Blind Pension',
    category: 'Cash Assistance',
    scope: 'State',
    states: ['PA'],
    minAge: 21,
    annualIncomeMax: 4260,
    assetsMax: 7500,
    requiresDisability: true,
    difficulty: 'Moderate',
    approvalEstimate: 'Varies by county review',
    description:
      'State-funded cash assistance for certain Pennsylvanians with significant visual impairment who meet income and property rules.',
    eligibilitySummary: [
      'Age 21 or older',
      'Annual net income including the benefit may not exceed $4,260',
      'Combined real and personal property may not exceed $7,500',
      'Must meet the program vision standard and be a Pennsylvania resident'
    ],
    documents: ['Eye exam or vision verification', 'Photo ID', 'Proof of income', 'Property and asset records', 'Proof of Pennsylvania residency'],
    applySteps: ['Apply through your County Assistance Office in person or by mail', 'Provide vision and financial documentation', 'Respond to follow-up requests from the CAO'],
    websiteLabel: 'Official PA State Blind Pension page',
    websiteUrl: 'https://www.pa.gov/services/dhs/apply-for-the-state-blind-pension-program'
  },
  {
    id: 'pa-mawd',
    name: 'Pennsylvania Medical Assistance for Workers with Disabilities (MAWD)',
    category: 'Health Coverage',
    scope: 'State',
    states: ['PA'],
    requiresDisability: true,
    employmentTags: ['Working'],
    difficulty: 'Complex',
    approvalEstimate: 'Several weeks to a few months',
    description:
      'MAWD helps Pennsylvanians with disabilities keep Medical Assistance while working, even when earnings are higher than in some other Medicaid pathways.',
    eligibilitySummary: [
      'Designed for Pennsylvanians with disabilities who are employed',
      'Lets qualifying people keep full Medical Assistance while working',
      'There may be a monthly premium for coverage'
    ],
    documents: ['Proof of disability', 'Recent pay stubs or work verification', 'Photo ID', 'Income and asset records'],
    applySteps: ['Apply through your County Assistance Office or the MAWD application', 'Submit proof of work and disability', 'Review any premium obligation'],
    websiteLabel: 'Official PA MAWD page',
    websiteUrl: 'https://www.pa.gov/services/dhs/apply-for-medical-assistance-for-workers-with-disabilities-mawd'
  },
  {
    id: 'pa-bccpt',
    name: 'Pennsylvania Breast & Cervical Cancer Prevention and Treatment (BCCPT)',
    category: 'Cancer Treatment Coverage',
    scope: 'State',
    states: ['PA'],
    medicalTags: ['Breast Cancer'],
    difficulty: 'Moderate',
    approvalEstimate: 'Varies based on medical and coverage review',
    description:
      'Medicaid coverage pathway for uninsured or underinsured Pennsylvanians under age 65 who are screened and diagnosed with breast or cervical cancer or certain precancerous conditions.',
    eligibilitySummary: [
      'Pennsylvania resident under age 65',
      'Screened and diagnosed with breast cancer, cervical cancer, or certain precancerous conditions',
      'Intended for people without health insurance or with insufficient coverage'
    ],
    documents: ['Diagnosis and treatment documentation', 'Proof of identity and Pennsylvania residency', 'Insurance information if any', 'Application form'],
    applySteps: ['Complete the BCCPT application', 'Provide diagnosis and coverage information', 'Submit to the state program for review'],
    websiteLabel: 'Official PA BCCPT page',
    websiteUrl: 'https://www.pa.gov/services/dhs/apply-for-the-breast-cervical-cancer-prevention-treatment'
  },
  {
    id: 'pa-bccedp-screening',
    name: 'Pennsylvania Breast & Cervical Cancer Early Detection Program',
    category: 'Cancer Screening',
    scope: 'State',
    states: ['PA'],
    difficulty: 'Easy',
    approvalEstimate: 'Local scheduling and provider availability',
    description:
      'Free breast and cervical cancer screening program for eligible Pennsylvanians through the Department of Health.',
    eligibilitySummary: [
      'For Pennsylvania residents who meet age, income, and insurance status rules',
      'Supports screening and follow-up diagnostic services',
      'Can be a pathway into BCCPT treatment coverage when appropriate'
    ],
    documents: ['Proof of Pennsylvania residency', 'Insurance information', 'Income information', 'Basic demographic information'],
    applySteps: ['Contact the program or an enrolled provider', 'Confirm screening eligibility', 'Complete screening intake and follow-up scheduling'],
    websiteLabel: 'Official PA BCCEDP page',
    websiteUrl: 'https://www.pa.gov/services/health/apply-for-breast-and-cervical-cancer-prevention-program'
  },
  {
    id: 'pa-medi-counseling',
    name: 'PA MEDI Medicare Counseling',
    category: 'Benefits Counseling',
    scope: 'State',
    states: ['PA'],
    minAge: 65,
    difficulty: 'Easy',
    approvalEstimate: 'Usually immediate counseling or scheduled follow-up',
    description:
      'Free Medicare counseling that can help Pennsylvanians compare plans and understand programs like Medicare Savings Programs and Extra Help.',
    eligibilitySummary: [
      'Especially useful for Medicare beneficiaries and near-retirees',
      'Can help compare Medicare Advantage and Part D options',
      'Can help explain savings programs and application paths'
    ],
    documents: ['Medicare card', 'Current plan information', 'Medication list', 'Questions about bills or notices'],
    applySteps: ['Call the PA MEDI helpline or contact your local program', 'Prepare plan details and medication list', 'Use counseling results to apply for savings programs or choose coverage'],
    websiteLabel: 'Official PA MEDI page',
    websiteUrl: 'https://www.pa.gov/agencies/aging/aging-programs-and-services/pa-medi-medicare-counseling'
  },
  {
    id: 'ssa-ssi',
    name: 'Supplemental Security Income (SSI)',
    category: 'Cash Assistance',
    scope: 'Federal',
    requiresDisability: true,
    difficulty: 'Complex',
    approvalEstimate: 'Often several months',
    description: 'Federal cash assistance for people with disabilities or older adults with limited income and resources.',
    eligibilitySummary: ['Federal disability or age-based benefit', 'Income and resource rules apply'],
    documents: ['Photo ID', 'Medical records', 'Income proof', 'Asset records'],
    applySteps: ['Apply with SSA', 'Provide financial records', 'Provide medical evidence if applying based on disability']
  },
  {
    id: 'ssdi',
    name: 'Social Security Disability Insurance (SSDI)',
    category: 'Cash Assistance',
    scope: 'Federal',
    requiresDisability: true,
    difficulty: 'Complex',
    approvalEstimate: 'Often several months',
    description: 'Federal disability income support for people with enough work history and qualifying disability.',
    eligibilitySummary: ['Work credits matter', 'Medical disability determination required'],
    documents: ['Photo ID', 'Work history', 'Medical records', 'Medication list'],
    applySteps: ['Apply with SSA', 'Provide work history', 'Submit medical evidence']
  }
];
