export const zipMap: Record<string, { city: string; state: string }> = {
  '15632': { city: 'Greensburg', state: 'PA' },
  '15636': { city: 'Harrison City', state: 'PA' },
  '16601': { city: 'Altoona', state: 'PA' },
  '17101': { city: 'Harrisburg', state: 'PA' },
  '18101': { city: 'Allentown', state: 'PA' },
  '18503': { city: 'Scranton', state: 'PA' },
  '19104': { city: 'Philadelphia', state: 'PA' },
  '19601': { city: 'Reading', state: 'PA' },
  '10001': { city: 'New York', state: 'NY' },
  '15213': { city: 'Pittsburgh', state: 'PA' },
  '30301': { city: 'Atlanta', state: 'GA' },
  '60601': { city: 'Chicago', state: 'IL' },
  '90001': { city: 'Los Angeles', state: 'CA' }
};
const prefixMap: Record<string, { city: string; state: string }> = {
  '150': { city: 'Beaver County area', state: 'PA' }, '151': { city: 'Monroeville area', state: 'PA' }, '152': { city: 'Pittsburgh', state: 'PA' }, '153': { city: 'Washington County area', state: 'PA' }, '154': { city: 'Uniontown area', state: 'PA' }, '155': { city: 'Somerset area', state: 'PA' }, '156': { city: 'Greensburg area', state: 'PA' }, '157': { city: 'Indiana area', state: 'PA' }, '159': { city: 'Johnstown area', state: 'PA' }, '166': { city: 'Altoona', state: 'PA' }, '168': { city: 'State College area', state: 'PA' }, '171': { city: 'Harrisburg', state: 'PA' }, '174': { city: 'York', state: 'PA' }, '176': { city: 'Lancaster', state: 'PA' }, '180': { city: 'Allentown area', state: 'PA' }, '181': { city: 'Allentown', state: 'PA' }, '185': { city: 'Scranton', state: 'PA' }, '187': { city: 'Wilkes-Barre area', state: 'PA' }, '190': { city: 'Delaware County area', state: 'PA' }, '191': { city: 'Philadelphia', state: 'PA' }, '194': { city: 'Norristown area', state: 'PA' }, '196': { city: 'Reading', state: 'PA' },
  '100': { city: 'New York', state: 'NY' }, '303': { city: 'Atlanta', state: 'GA' }, '606': { city: 'Chicago', state: 'IL' }, '900': { city: 'Los Angeles', state: 'CA' }
};
function inferStateByRange(zip: string) {
  const num = Number(zip);
  if (Number.isNaN(num)) return { city: '', state: '' };
  if (num >= 15001 && num <= 19640) return { city: 'Pennsylvania area', state: 'PA' };
  if (num >= 10001 && num <= 14925) return { city: 'New York area', state: 'NY' };
  if (num >= 30002 && num <= 31999) return { city: 'Georgia area', state: 'GA' };
  if (num >= 60001 && num <= 62999) return { city: 'Illinois area', state: 'IL' };
  if (num >= 90001 && num <= 96162) return { city: 'California area', state: 'CA' };
  return { city: '', state: '' };
}
export function inferLocationFromZip(zip: string) {
  if (!zip || zip.length < 5) return { city: '', state: '' };
  const normalized = zip.slice(0, 5);
  return zipMap[normalized] ?? prefixMap[normalized.slice(0, 3)] ?? inferStateByRange(normalized);
}
