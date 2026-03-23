import { diseaseFamilies } from '@/data/programs';

function normalizeMoney(value) {
  const n = Number(String(value || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function passesDisease(program, profile) {
  const disease = profile.disease || '';
  const families = diseaseFamilies[disease] || [];
  const hard = program.hard || {};

  if (hard.diseaseAnyOf && !hard.diseaseAnyOf.includes(disease)) return false;
  if (hard.diseaseFamilyAnyOf && !hard.diseaseFamilyAnyOf.some((f) => families.includes(f))) return false;
  if (hard.diseaseCategory && !hard.diseaseCategory.some((f) => families.includes(f) || disease === f)) return false;
  if (hard.disabilityKeywords) {
    const hay = `${profile.disease} ${profile.disabilityType || ''}`.toLowerCase();
    if (!hard.disabilityKeywords.some((kw) => hay.includes(kw.toLowerCase()))) return false;
  }
  return true;
}

function passesHard(program, profile) {
  const hard = program.hard || {};
  const annualIncome = normalizeMoney(profile.annualIncome);
  const assets = normalizeMoney(profile.assets);
  const isDisabled = profile.disabled === 'Yes';
  const age = Number(profile.age || 0);

  if (hard.state && !hard.state.includes(profile.state)) return false;
  if (hard.minAge && age < hard.minAge) return false;
  if (hard.housing && !hard.housing.includes(profile.housing)) return false;
  if (hard.annualIncomeMax && annualIncome > hard.annualIncomeMax) return false;
  if (hard.assetsMax && assets > hard.assetsMax) return false;
  if (hard.ageOrDisability && !(age >= 65 || isDisabled)) return false;
  if (hard.requiresMedicaid && profile.medicaid !== 'Yes') return false;
  if (!passesDisease(program, profile)) return false;
  return true;
}

function statusFor(program) {
  if (program.matchType === 'benefit') return 'Eligible';
  if (program.matchType === 'needs-review') return 'Possibly eligible — more info needed';
  return 'Resource / next step';
}

export function matchPrograms(profile, programs) {
  const eligible = [];
  for (const program of programs) {
    if (!passesHard(program, profile)) continue;

    eligible.push({
      ...program,
      status: statusFor(program),
      confidence: program.matchType === 'benefit' ? 100 : program.matchType === 'needs-review' ? 70 : 55,
      reasons: [...(program.reasonsTemplate || [])]
    });
  }
  return eligible;
}
