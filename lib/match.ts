import { programs } from '@/data/programs';
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

export function findMatches(profile: Profile): MatchResult[] {
  const annualIncome = profile.monthlyIncome * 12;

  const results = programs.map((program) => {
    const annualLimit = householdAdjustedAnnualLimit(program, profile.householdSize);
    const monthlyLimit = householdAdjustedMonthlyLimit(program, profile.householdSize);
    const scoreRef = { value: 0 };
    const reasons: string[] = [];

    addReason(true, scoreRef, reasons, 'Program is in the search library.', 8);
    addReason(!program.states || program.states.includes(profile.state), scoreRef, reasons, 'Location matches this program scope.', 18);
    addReason(!program.minAge || profile.age >= program.minAge, scoreRef, reasons, 'Age appears to meet program rules.', 14);
    addReason(!program.requiresDisability || profile.disabilityStatus, scoreRef, reasons, 'Disability-related rule appears to fit.', 18);
    addReason(!monthlyLimit || profile.monthlyIncome <= monthlyLimit, scoreRef, reasons, monthlyLimit && profile.householdSize > 1 ? `Monthly income appears within the estimated range for a household of ${profile.householdSize}.` : 'Monthly income appears within the target range.', 16);
    addReason(!annualLimit || annualIncome <= annualLimit, scoreRef, reasons, annualLimit && profile.householdSize > 1 ? `Annual income appears within the estimated range for a household of ${profile.householdSize}.` : 'Annual income appears within the target range.', 16);
    addReason(!program.assetsMax || profile.assets <= program.assetsMax, scoreRef, reasons, 'Assets appear within the target range.', 10);
    addReason(!program.householdMax || profile.householdSize <= program.householdMax, scoreRef, reasons, 'Household size fits the available rule.', 5);
    addReason(!program.medicalTags || matchesMedicalTag(profile.diseaseName, program.medicalTags), scoreRef, reasons, 'Medical condition aligns with this disease-specific aid.', 24);
    addReason(!program.currentBenefitTags || program.currentBenefitTags.some((b) => profile.currentBenefits.includes(b)), scoreRef, reasons, 'Current benefit information supports this match.', 12);
    addReason(!program.veteranOnly || profile.veteranStatus, scoreRef, reasons, 'Veteran status aligns with program rules.', 18);
    addReason(!program.caregiverHelpful || profile.caregiverMode, scoreRef, reasons, 'Caregiver mode may improve this program fit.', 8);
    addReason(!program.housingTags || program.housingTags.includes(profile.housingStatus), scoreRef, reasons, 'Housing situation aligns with this program.', 10);
    addReason(!program.employmentTags || program.employmentTags.includes(profile.employmentStatus), scoreRef, reasons, 'Employment or retirement status aligns with this program.', 10);
    addReason(Boolean(profile.city && profile.state), scoreRef, reasons, `Location was detected as ${profile.city}, ${profile.state}.`, 4);

    const missingInfo = buildMissingInfo(profile, program);
    if (program.states && profile.state && !program.states.includes(profile.state)) scoreRef.value -= 40;
    if (program.minAge && profile.age && profile.age < program.minAge) scoreRef.value -= 35;
    if (program.requiresDisability && !profile.disabilityStatus) scoreRef.value -= 38;
    if (monthlyLimit && profile.monthlyIncome > monthlyLimit) scoreRef.value -= 24;
    if (annualLimit && annualIncome > annualLimit) scoreRef.value -= 24;
    if (program.assetsMax && profile.assets > program.assetsMax) scoreRef.value -= 18;
    if (program.veteranOnly && !profile.veteranStatus) scoreRef.value -= 45;
    if (program.medicalTags && profile.diseaseName && !matchesMedicalTag(profile.diseaseName, program.medicalTags)) scoreRef.value -= 30;
    if (program.housingTags && profile.housingStatus && !program.housingTags.includes(profile.housingStatus)) scoreRef.value -= 15;
    if (program.employmentTags && profile.employmentStatus && !program.employmentTags.includes(profile.employmentStatus)) scoreRef.value -= 15;

    if (program.requiresDisability && profile.disabilityStatus && profile.disabilityImpact === 'Severe') { scoreRef.value += 6; reasons.push('Severe disability impact may strengthen need-based eligibility.'); }
    if (program.medicalTags && profile.treatmentStatus && ['In Treatment', 'Newly Diagnosed', 'Long-Term Disability'].includes(profile.treatmentStatus)) { scoreRef.value += 5; reasons.push('Treatment status may strengthen medical assistance matching.'); }

    const score = Math.max(0, Math.min(100, scoreRef.value));
    const confidence = score >= 70 ? 'High' : score >= 45 ? 'Medium' : 'Low';

    return {
      program,
      score,
      confidence,
      reasons,
      missingInfo
    } satisfies MatchResult;
  });

  return results.sort((a, b) => b.score - a.score);
}
