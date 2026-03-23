export const zipMap: Record<string, { city: string; state: string }> = {
  '15632': { city: 'Greensburg', state: 'PA' },
  '15636': { city: 'Harrison City', state: 'PA' },
  '16601': { city: 'Altoona', state: 'PA' },
  '19104': { city: 'Philadelphia', state: 'PA' },
  '10001': { city: 'New York', state: 'NY' },
  '15213': { city: 'Pittsburgh', state: 'PA' },
  '30301': { city: 'Atlanta', state: 'GA' },
  '60601': { city: 'Chicago', state: 'IL' },
  '90001': { city: 'Los Angeles', state: 'CA' }
};

export function inferLocationFromZip(zip: string) {
  return zipMap[zip] ?? { city: '', state: '' };
}
