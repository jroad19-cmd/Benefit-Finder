export const diseaseCategories = {
  Cancer: [
    'Breast Cancer',
    'Lung Cancer',
    'Colon Cancer',
    'Prostate Cancer',
    'Leukemia',
    'Lymphoma',
    'Pancreatic Cancer',
    'Ovarian Cancer'
  ],
  Neurological: ['Parkinson\'s Disease', 'Multiple Sclerosis', 'Epilepsy', 'Stroke Recovery'],
  Cardiovascular: ['Heart Failure', 'Coronary Artery Disease', 'Atrial Fibrillation'],
  Autoimmune: ['Lupus', 'Rheumatoid Arthritis', 'Crohn\'s Disease'],
  Respiratory: ['COPD', 'Pulmonary Fibrosis', 'Severe Asthma'],
  MentalHealth: ['Major Depression', 'PTSD', 'Bipolar Disorder'],
  Mobility: ['Spinal Cord Injury', 'Amputation', 'Muscular Dystrophy'],
  Other: ['Diabetes', 'Kidney Disease', 'Vision Loss', 'Hearing Loss']
} as const;

export const benefitOptions = [
  'SSI',
  'SSDI',
  'SNAP',
  'Medicaid',
  'Medicare',
  'Medicare Part D',
  'Extra Help',
  'Veterans Benefits',
  'Housing Assistance'
];
