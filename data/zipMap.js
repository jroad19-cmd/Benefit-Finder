export const zipMap = {
  '15628': { city: 'Donegal', county: 'Westmoreland', state: 'PA' },
  '15658': { city: 'Ligonier', county: 'Westmoreland', state: 'PA' },
  '19104': { city: 'Philadelphia', county: 'Philadelphia', state: 'PA' },
  '15213': { city: 'Pittsburgh', county: 'Allegheny', state: 'PA' },
  '17101': { city: 'Harrisburg', county: 'Dauphin', state: 'PA' }
};

export function detectLocation(zip, manualState, manualCity) {
  const cleanZip = String(zip || '').replace(/\D/g, '').slice(0, 5);
  const exact = zipMap[cleanZip];
  return {
    zip: cleanZip,
    state: (manualState || exact?.state || '').toUpperCase(),
    city: manualCity || exact?.city || '',
    county: exact?.county || ''
  };
}
