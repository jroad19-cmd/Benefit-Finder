import { programs, zipMap } from '../data/programs';

function calcAge(birthDate) {
  if (!birthDate) return null;
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

function diseaseGroupsFor(name, category) {
  const groups = new Set();
  if (category === 'Cancer') groups.add('Cancer');
  if (['Leukemia', 'Lymphoma', 'Multiple Myeloma'].includes(name)) groups.add('Blood Cancer');
  return groups;
}

export function detectLocation(zip) {
  const clean = String(zip || '').replace(/\D/g, '').slice(0, 5);
  return zipMap[clean] || null;
}

export function getDerivedProfile(profile) {
  const location = detectLocation(profile.zip);
  const state = profile.state || location?.state || '';
  const city = profile.city || location?.city || '';
  const age = calcAge(profile.birthDate);
  return { ...profile, state, city, age };
}

export function matchPrograms(profile) {
  const p = getDerivedProfile(profile);
  const groups = diseaseGroupsFor(p.diseaseName, p.diseaseCategory);

  return programs.map((program) => {
    const reasons = [];
    const blockers = [];

    if (!(program.states.includes('ALL') || program.states.includes(p.state))) {
      blockers.push('Wrong state for this program.');
    }

    if (program.housingAllowed && !program.housingAllowed.includes(p.housingStatus)) {
      blockers.push('Housing status does not fit this program.');
    }

    if (program.ownerOccupiedOnly && p.housingStatus !== 'Own') {
      blockers.push('Program requires owner-occupied housing.');
    }

    if (typeof program.minAge === 'number') {
      const agePass = typeof p.age === 'number' && p.age >= program.minAge;
      const disabledPass = Boolean(program.allowsDisabledOverride && p.isDisabled);
      if (!agePass && !disabledPass) blockers.push('Age/disability requirement not met.');
    }

    if (typeof program.annualIncomeMax === 'number') {
      if (!Number.isFinite(Number(p.annualIncome)) || Number(p.annualIncome) > program.annualIncomeMax) {
        blockers.push('Annual income is above the limit for this program.');
      }
    }

    if (program.diseaseScope === 'specific') {
      if (!program.diseases?.includes(p.diseaseName)) blockers.push('Diagnosis does not match this disease-specific program.');
    }

    if (program.diseaseScope === 'group') {
      const ok = (program.diseaseGroups || []).some((g) => groups.has(g));
      if (!ok) blockers.push('Diagnosis does not match this program group.');
    }

    let status = 'eligible';
    if (blockers.length) status = 'ineligible';
    else if (program.statusIfMissingInfo === 'possible') status = 'possible';

    if (!blockers.length) {
      if (p.state === 'PA' && program.states.includes('PA')) reasons.push('State matches Pennsylvania requirement.');
      if (program.housingAllowed?.includes(p.housingStatus)) reasons.push('Housing status fits this program.');
      if (program.diseaseScope === 'specific') reasons.push('Diagnosis matches the program exactly.');
      if (program.diseaseScope === 'group') reasons.push('Diagnosis fits the program disease group.');
      if (typeof program.annualIncomeMax === 'number') reasons.push(`Income is within the ${program.annualIncomeMax.toLocaleString()} limit.`);
    }

    return { ...program, status, reasons, blockers };
  }).filter((x) => x.status !== 'ineligible');
}
