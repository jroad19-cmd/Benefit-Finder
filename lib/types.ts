export type Confidence = 'High' | 'Medium' | 'Low';

export type Program = {
  id: string;
  name: string;
  category: string;
  scope: 'Federal' | 'State' | 'Local' | 'Nonprofit' | 'Unclaimed Money';
  states?: string[];
  minAge?: number;
  requiresDisability?: boolean;
  incomeMax?: number;
  householdMax?: number;
  medicalTags?: string[];
  currentBenefitTags?: string[];
  housingTags?: string[];
  veteranOnly?: boolean;
  caregiverHelpful?: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Complex';
  approvalEstimate: string;
  description: string;
  documents: string[];
  applySteps: string[];
  websiteLabel?: string;
  websiteUrl?: string;
};

export type Profile = {
  id: string;
  label: string;
  fullName: string;
  birthday: string;
  age: number;
  zip: string;
  city: string;
  state: string;
  citizenship: 'Citizen' | 'Permanent Resident' | 'Other' | '';
  householdSize: number;
  monthlyIncome: number;
  assets: number;
  employmentStatus: 'Retired' | 'Working' | 'Unable to Work' | 'Unemployed' | '';
  disabilityStatus: boolean;
  disabilityImpact: 'Mild' | 'Moderate' | 'Severe' | '';
  veteranStatus: boolean;
  housingStatus: 'Own' | 'Rent' | 'Homeless' | 'Living with Family' | '';
  caregiverMode: boolean;
  relationshipToUser: string;
  currentBenefits: string[];
  diseaseCategory: string;
  diseaseName: string;
  cancerStage: string;
  treatmentStatus: string;
  notes: string;
};

export type MatchResult = {
  program: Program;
  confidence: Confidence;
  score: number;
  reasons: string[];
  missingInfo: string[];
};
