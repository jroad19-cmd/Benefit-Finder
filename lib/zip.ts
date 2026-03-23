export type ZipLocation = { city: string; state: string; approximate?: boolean };

export const zipMap: Record<string, ZipLocation> = {
  '10001': { city: 'New York', state: 'NY' },
  '15213': { city: 'Pittsburgh', state: 'PA' },
  '15622': { city: 'Champion', state: 'PA' },
  '15628': { city: 'Donegal', state: 'PA' },
  '15632': { city: 'Greensburg', state: 'PA' },
  '15636': { city: 'Harrison City', state: 'PA' },
  '15642': { city: 'Irwin', state: 'PA' },
  '15650': { city: 'Latrobe', state: 'PA' },
  '15668': { city: 'Murrysville', state: 'PA' },
  '15679': { city: 'Ruffs Dale', state: 'PA' },
  '15687': { city: 'Stahlstown', state: 'PA' },
  '15689': { city: 'Seward', state: 'PA' },
  '16601': { city: 'Altoona', state: 'PA' },
  '16801': { city: 'State College', state: 'PA' },
  '17101': { city: 'Harrisburg', state: 'PA' },
  '17401': { city: 'York', state: 'PA' },
  '17601': { city: 'Lancaster', state: 'PA' },
  '18101': { city: 'Allentown', state: 'PA' },
  '18503': { city: 'Scranton', state: 'PA' },
  '18701': { city: 'Wilkes-Barre', state: 'PA' },
  '19104': { city: 'Philadelphia', state: 'PA' },
  '19401': { city: 'Norristown', state: 'PA' },
  '19601': { city: 'Reading', state: 'PA' },
  '30301': { city: 'Atlanta', state: 'GA' },
  '60601': { city: 'Chicago', state: 'IL' },
  '90001': { city: 'Los Angeles', state: 'CA' }
};

const prefixMap: Record<string, ZipLocation> = {
  '150': { city: 'Beaver area', state: 'PA', approximate: true },
  '151': { city: 'Monroeville area', state: 'PA', approximate: true },
  '152': { city: 'Pittsburgh area', state: 'PA', approximate: true },
  '153': { city: 'Washington area', state: 'PA', approximate: true },
  '154': { city: 'Uniontown area', state: 'PA', approximate: true },
  '155': { city: 'Somerset area', state: 'PA', approximate: true },
  '156': { city: 'Westmoreland County area', state: 'PA', approximate: true },
  '157': { city: 'Indiana area', state: 'PA', approximate: true },
  '159': { city: 'Johnstown area', state: 'PA', approximate: true },
  '166': { city: 'Altoona area', state: 'PA', approximate: true },
  '168': { city: 'State College area', state: 'PA', approximate: true },
  '171': { city: 'Harrisburg area', state: 'PA', approximate: true },
  '174': { city: 'York area', state: 'PA', approximate: true },
  '176': { city: 'Lancaster area', state: 'PA', approximate: true },
  '180': { city: 'Lehigh Valley area', state: 'PA', approximate: true },
  '181': { city: 'Allentown area', state: 'PA', approximate: true },
  '185': { city: 'Scranton area', state: 'PA', approximate: true },
  '187': { city: 'Wilkes-Barre area', state: 'PA', approximate: true },
  '190': { city: 'Delaware County area', state: 'PA', approximate: true },
  '191': { city: 'Philadelphia area', state: 'PA', approximate: true },
  '194': { city: 'Montgomery County area', state: 'PA', approximate: true },
  '196': { city: 'Reading area', state: 'PA', approximate: true },
  '100': { city: 'New York area', state: 'NY', approximate: true },
  '303': { city: 'Atlanta area', state: 'GA', approximate: true },
  '606': { city: 'Chicago area', state: 'IL', approximate: true },
  '900': { city: 'Los Angeles area', state: 'CA', approximate: true }
};

function inferStateByRange(zip: string): ZipLocation {
  const num = Number(zip);
  if (Number.isNaN(num)) return { city: '', state: '' };
  if (num >= 15001 && num <= 19640) return { city: 'Pennsylvania area', state: 'PA', approximate: true };
  if (num >= 10001 && num <= 14925) return { city: 'New York area', state: 'NY', approximate: true };
  if (num >= 30002 && num <= 31999) return { city: 'Georgia area', state: 'GA', approximate: true };
  if (num >= 60001 && num <= 62999) return { city: 'Illinois area', state: 'IL', approximate: true };
  if (num >= 90001 && num <= 96162) return { city: 'California area', state: 'CA', approximate: true };
  return { city: '', state: '' };
}

export function inferLocationFromZip(zip: string): ZipLocation {
  if (!zip || zip.length < 5) return { city: '', state: '' };
  const normalized = zip.slice(0, 5);
  return zipMap[normalized] ?? prefixMap[normalized.slice(0, 3)] ?? inferStateByRange(normalized);
}
