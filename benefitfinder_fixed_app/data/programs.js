export const programs = [
  {
    id: 'pa-ptrr',
    name: 'PA Property Tax/Rent Rebate',
    type: 'state',
    states: ['PA'],
    diseaseScope: 'none',
    housingAllowed: ['Own', 'Rent'],
    ownerOccupiedOnly: false,
    minAge: 65,
    allowsDisabledOverride: true,
    annualIncomeMax: 48110,
    statusIfMissingInfo: 'possible',
    officialHighlights: [
      'Pennsylvania program for eligible older adults and people with disabilities.',
      'Published annual income ceiling up to $48,110.',
      'Rebates can reach up to $1,000.'
    ],
    source: 'https://www.pa.gov/agencies/revenue/ptrr'
  },
  {
    id: 'pa-homestead',
    name: 'PA Homestead/Farmstead Exclusion (Act 1 of 2006)',
    type: 'state',
    states: ['PA'],
    diseaseScope: 'none',
    housingAllowed: ['Own'],
    ownerOccupiedOnly: true,
    statusIfMissingInfo: 'possible',
    officialHighlights: [
      'Separate from PTRR.',
      'Created under the Taxpayer Relief Act, Act 1 of Special Session 1 of 2006.',
      'Applies to owner-occupied primary residences through county assessment offices.'
    ],
    source: 'https://dced.pa.gov/local-government/property-tax-relief-homestead-exclusion/'
  },
  {
    id: 'mmrf',
    name: 'Multiple Myeloma Research Foundation Financial Assistance Resources',
    type: 'nonprofit',
    states: ['ALL'],
    diseaseScope: 'specific',
    diseases: ['Multiple Myeloma'],
    officialHighlights: [
      'Multiple myeloma focused support resource.',
      'Includes financial assistance and transportation resource guidance.'
    ],
    source: 'https://themmrf.org/support/financial-assistance-and-transportation/'
  },
  {
    id: 'lls-travel',
    name: 'LLS Travel Assistance for Blood Cancer Patients',
    type: 'nonprofit',
    states: ['ALL'],
    diseaseScope: 'group',
    diseaseGroups: ['Blood Cancer'],
    officialHighlights: [
      'Blood cancer travel assistance resource.',
      'Relevant for leukemia, lymphoma, and multiple myeloma.'
    ],
    source: 'https://www.lls.org/support-resources/financial-support/susan-lang-pay-it-forward-patient-travel-assistance-program'
  },
  {
    id: 'generic-cancer',
    name: 'General Cancer Support Resource',
    type: 'nonprofit',
    states: ['ALL'],
    diseaseScope: 'group',
    diseaseGroups: ['Cancer'],
    officialHighlights: [
      'General cancer support bucket for broad assistance programs.'
    ],
    source: ''
  },
  {
    id: 'lung-travel',
    name: 'Lung Cancer Travel and Treatment Support',
    type: 'nonprofit',
    states: ['ALL'],
    diseaseScope: 'specific',
    diseases: ['Lung Cancer', 'Small Cell Lung Cancer', 'Non-Small Cell Lung Cancer'],
    officialHighlights: [
      'Only for lung cancer cases.'
    ],
    source: ''
  }
];

export const diseaseCategories = {
  Cancer: [
    'Breast Cancer',
    'Lung Cancer',
    'Small Cell Lung Cancer',
    'Non-Small Cell Lung Cancer',
    'Colon Cancer',
    'Prostate Cancer',
    'Leukemia',
    'Lymphoma',
    'Multiple Myeloma'
  ],
  Other: ['None']
};

export const zipMap = {
  '15658': { city: 'Ligonier', state: 'PA' },
  '15628': { city: 'Donegal', state: 'PA' }
};
