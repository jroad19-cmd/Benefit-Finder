import { programs as defaultPrograms } from '@/data/programs';
import type { MatchResult, Profile, Program } from '@/lib/types';

const medicalAliases: Record<string, string[]> = {
  'Small Cell Lung Cancer': ['Small Cell Lung Cancer', 'Lung Cancer'],
  'Non-Small Cell Lung Cancer': ['Non-Small Cell Lung Cancer', 'Lung Cancer'],
  'Multiple Myeloma': ['Multiple Myeloma', 'Lymphoma', 'Leukemia']
};

function matchesMedicalTag(profileDisease: string, programTags?: string[]) {
  if (!programTags || programTags.length === 0) return true;
  if (!profileDisease) return false;
  const candidates = medicalAliases[profileDisease] ?? [profileDisease];
  return candidates.some((candidate) => programTags.includes(candidate));
}

function householdAdjustedAnnualLimit(program: Program, householdSize: number) {
  if (!program.annualIncomeMax) return undefined;
  return program.annualIncomeMax + Math.max(0, householdSize - 1) * (program.incomeIncreasePerAdditionalPersonAnnual ?? 0);
}

function householdAdjustedMonthlyLimit(program: Program, householdSize: number) {
  if (!program.monthlyIncomeMax) return undefined;
  return program.monthlyIncomeMax + Math.max(0, householdSize - 1) * (program.incomeIncreasePerAdditionalPersonMonthly ?? 0);
}

function addReason(condition: boolean, scoreRef: { value: number }, reasons: string[], text: string, points: number) {
  if (condition) {
    scoreRef.value += points;
    reasons.push(text);
  }
}

function buildMissingInfo(profile: Profile, program: Program) {
  const missing: string[] = [];
  if (!profile.zip) missing.push('Add ZIP code for local and state matching.');
  if (!profile.birthday) missing.push('Add birth date for age-based eligibility.');
  if (!profile.city || !profile.state) missing.push('Enter a full 5-digit ZIP code so city and state can auto-detect.');
  if (profile.monthlyIncome === 0) missing.push('Add monthly income for income-tested programs.');
  if (program.assetsMax && profile.assets === 0) missing.push('Add assets or savings to check resource-tested programs.');
  if (program.requiresDisability && !profile.disabilityStatus) missing.push('Program usually requires a disability determination or medical documentation.');
  if (program.currentBenefitTags?.includes('Medicare') && !profile.currentBenefits.includes('Medicare')) missing.push('Confirm whether Medicare is active.');
  if (program.currentBenefitTags?.includes('Medicaid') && !profile.currentBenefits.includes('Medicaid')) missing.push('Confirm whether Medicaid or Medical Assistance is active.');
  if (program.states && !profile.state) missing.push('Add state to verify state-specific rules.');
  if (program.medicalTags && !profile.diseaseName) missing.push('Add a diagnosed condition to improve disease grant matching.');
  if (program.housingTags?.length && !profile.housingStatus) missing.push('Add housing status to refine rent or homeowner programs.');
  return Array.from(new Set(missing));
}

export function calculateAge(birthday: string) {
  if (!birthday) return 0;
  const today = new Date();
  const birth = new Date(birthday);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

export function findMatches(profile: Profile, library: Program[] = defaultPrograms): MatchResult[] {
  const annualIncome = profile.monthlyIncome * 12;

  const results = library.flatMap((program) => {
    const annualLimit = householdAdjustedAnnualLimit(program, profile.householdSize);
    const monthlyLimit = householdAdjustedMonthlyLimit(program, profile.householdSize);
    const scoreRef = { value: 0 };
    const reasons: string[] = [];

    const stateCompatible = !program.states || !profile.state || program.states.includes(profile.state);
    const housingCompatible = !program.housingTags || !profile.housingStatus || program.housingTags.includes(profile.housingStatus);
    const employmentCompatible = !program.employmentTags || !profile.employmentStatus || program.employmentTags.includes(profile.employmentStatus);
    const benefitCompatible = !program.currentBenefitTags || program.currentBenefitTags.length === 0 || profile.currentBenefits.length === 0 || program.currentBenefitTags.some((b) => profile.currentBenefits.includes(b));
    const monthlyIncomeCompatible = !monthlyLimit || profile.monthlyIncome <= monthlyLimit;
    const annualIncomeCompatible = !annualLimit || annualIncome <= annualLimit;
    const assetsCompatible = !program.assetsMax || profile.assets <= program.assetsMax;
    const householdCompatible = !program.householdMax || profile.householdSize <= program.householdMax;
    const medicalCompatible = !program.medicalTags || matchesMedicalTag(profile.diseaseName, program.medicalTags);
    const veteranCompatible = !program.veteranOnly || profile.veteranStatus;
    const disabilityCompatible = !program.requiresDisability || profile.disabilityStatus;

    if (!stateCompatible || !housingCompatible || !employmentCompatible || !veteranCompatible || !disabilityCompatible) {
      return [];
    }

    if (program.id === 'pa-property-tax-rent-rebate') {
      const ageOrDisabilityEligible = profile.age >= 65 || profile.disabilityStatus;
      if (!ageOrDisabilityEligible) return [];
    }

    addReason(true, scoreRef, reasons, 'Program is in the search library.', 8);
    addReason(stateCompatible, scoreRef, reasons, 'Location matches this program scope.', 18);
    addReason(!program.minAge || profile.age >= program.minAge, scoreRef, reasons, 'Age appears to meet program rules.', 14);
    addReason(disabilityCompatible, scoreRef, reasons, 'Disability-related rule appears to fit.', 18);
    addReason(monthlyIncomeCompatible, scoreRef, reasons, monthlyLimit && profile.householdSize > 1 ? `Monthly income appears within the estimated range for a household of ${profile.householdSize}.` : 'Monthly income appears within the target range.', 16);
    addReason(annualIncomeCompatible, scoreRef, reasons, annualLimit && profile.householdSize > 1 ? `Annual income appears within the estimated range for a household of ${profile.householdSize}.` : 'Annual income appears within the target range.', 16);
    addReason(assetsCompatible, scoreRef, reasons, 'Assets appear within the target range.', 10);
    addReason(householdCompatible, scoreRef, reasons, 'Household size fits the available rule.', 5);
    addReason(medicalCompatible, scoreRef, reasons, 'Medical condition aligns with this disease-specific aid.', 24);
    addReason(benefitCompatible, scoreRef, reasons, 'Current benefit information supports this match.', 12);
    addReason(!program.veteranOnly || profile.veteranStatus, scoreRef, reasons, 'Veteran status aligns with program rules.', 18);
    addReason(!program.caregiverHelpful || profile.caregiverMode, scoreRef, reasons, 'Caregiver mode may improve this program fit.', 8);
    addReason(housingCompatible, scoreRef, reasons, 'Housing status matches this program type.', 10);
    addReason(employmentCompatible, scoreRef, reasons, 'Employment status fits this program type.', 8);
    addReason(profile.disabilityImpact === 'Severe', scoreRef, reasons, 'Severe disability impact may strengthen priority or need-based fit.', 6);
    addReason(profile.treatmentStatus === 'In Treatment' || profile.treatmentStatus === 'Newly Diagnosed', scoreRef, reasons, 'Current treatment timing may strengthen immediate assistance fit.', 6);

    if (!monthlyIncomeCompatible) reasons.push('Monthly income appears above this program's estimated range.');
    if (!annualIncomeCompatible) reasons.push('Annual income appears above this program's estimated range.');
    if (!assetsCompatible) reasons.push('Assets may be above this program's estimated resource limit.');
    if (!medicalCompatible && profile.diseaseName) reasons.push('Condition does not closely align with this disease-specific aid.');
    if (!benefitCompatible && profile.currentBenefits.length > 0) reasons.push('Current benefit status does not clearly support this match.');

    const score = Math.max(0, Math.min(100, scoreRef.value));
    const confidence: MatchResult['confidence'] = score >= 80 ? 'High' : score >= 55 ? 'Medium' : 'Low';

    return [{
      program,
      confidence,
      score,
      reasons: Array.from(new Set(reasons)),
      missingInfo: buildMissingInfo(profile, program)
    }];
  });

  return results.sort((a, b) => b.score - a.score);
}
