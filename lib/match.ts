import { programs } from '@/data/programs';
import type { MatchResult, Profile, Program } from '@/lib/types';

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
  if (profile.monthlyIncome === 0) missing.push('Add monthly income for income-tested programs.');
  if (program.requiresDisability && !profile.disabilityStatus) missing.push('Program usually requires a disability determination or medical documentation.');
  if (program.currentBenefitTags?.includes('Medicare') && !profile.currentBenefits.includes('Medicare')) missing.push('Confirm whether Medicare is active.');
  if (program.states && !profile.state) missing.push('Add state to verify state-specific rules.');
  if (program.medicalTags && !profile.diseaseName) missing.push('Add a diagnosed condition to improve disease grant matching.');
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
  const results = programs.map((program) => {
    const scoreRef = { value: 0 };
    const reasons: string[] = [];

    addReason(true, scoreRef, reasons, 'Program added to search library.', 10);
    addReason(!program.states || program.states.includes(profile.state), scoreRef, reasons, 'Location matches this program scope.', 20);
    addReason(!program.minAge || profile.age >= program.minAge, scoreRef, reasons, 'Age appears to meet program rule.', 15);
    addReason(!program.requiresDisability || profile.disabilityStatus, scoreRef, reasons, 'Disability-related rule appears to fit.', 20);
    addReason(!program.incomeMax || profile.monthlyIncome <= program.incomeMax, scoreRef, reasons, 'Income appears within the target range.', 20);
    addReason(!program.householdMax || profile.householdSize <= program.householdMax, scoreRef, reasons, 'Household size fits the available rule.', 5);
    addReason(!program.medicalTags || program.medicalTags.includes(profile.diseaseName), scoreRef, reasons, 'Medical condition aligns with this disease-specific aid.', 25);
    addReason(!program.currentBenefitTags || program.currentBenefitTags.some((b) => profile.currentBenefits.includes(b)), scoreRef, reasons, 'Current benefit information supports this match.', 15);
    addReason(!program.veteranOnly || profile.veteranStatus, scoreRef, reasons, 'Veteran status aligns with program rules.', 20);
    addReason(!program.caregiverHelpful || profile.caregiverMode, scoreRef, reasons, 'Caregiver mode may improve this program fit.', 10);

    const missingInfo = buildMissingInfo(profile, program);
    if (program.states && profile.state && !program.states.includes(profile.state)) scoreRef.value -= 40;
    if (program.minAge && profile.age && profile.age < program.minAge) scoreRef.value -= 35;
    if (program.requiresDisability && !profile.disabilityStatus) scoreRef.value -= 40;
    if (program.incomeMax && profile.monthlyIncome > program.incomeMax) scoreRef.value -= 25;
    if (program.veteranOnly && !profile.veteranStatus) scoreRef.value -= 45;
    if (program.medicalTags && profile.diseaseName && !program.medicalTags.includes(profile.diseaseName)) scoreRef.value -= 30;

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
