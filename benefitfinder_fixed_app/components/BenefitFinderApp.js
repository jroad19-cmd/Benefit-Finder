'use client';

import { useMemo, useState } from 'react';
import { diseaseCategories } from '../data/programs';
import { detectLocation, getDerivedProfile, matchPrograms } from '../lib/match';

const initialProfile = {
  birthDate: '',
  zip: '15658',
  city: '',
  state: 'PA',
  annualIncome: '',
  housingStatus: 'Own',
  isDisabled: false,
  diseaseCategory: 'Cancer',
  diseaseName: 'Multiple Myeloma'
};

export default function BenefitFinderApp() {
  const [profile, setProfile] = useState(initialProfile);
  const derived = useMemo(() => getDerivedProfile(profile), [profile]);
  const results = useMemo(() => matchPrograms(profile), [profile]);
  const location = detectLocation(profile.zip);
  const diseaseOptions = diseaseCategories[profile.diseaseCategory] || [];

  function update(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Benefit Finder</h1>
        <div className="small">Verified-rule rebuild for Pennsylvania testing. Results recalculate immediately when inputs change.</div>
      </div>
      <div className="grid">
        <div className="card">
          <label>
            Birth date
            <input type="date" value={profile.birthDate} onChange={(e) => update('birthDate', e.target.value)} />
          </label>
          <div className="row">
            <label>
              ZIP code
              <input value={profile.zip} onChange={(e) => update('zip', e.target.value)} />
            </label>
            <label>
              State
              <select value={profile.state} onChange={(e) => update('state', e.target.value)}>
                <option value="">Select</option>
                <option value="PA">PA</option>
                <option value="AL">AL</option>
                <option value="OH">OH</option>
              </select>
            </label>
          </div>
          <div className="small">Detected location: {location ? `${location.city}, ${location.state}` : 'No ZIP match yet'}</div>
          <label>
            Annual income
            <input type="number" value={profile.annualIncome} onChange={(e) => update('annualIncome', e.target.value)} />
          </label>
          <label>
            Housing status
            <select value={profile.housingStatus} onChange={(e) => update('housingStatus', e.target.value)}>
              <option value="Own">Own</option>
              <option value="Rent">Rent</option>
              <option value="Homeless">Homeless</option>
            </select>
          </label>
          <label>
            Disabled
            <select value={profile.isDisabled ? 'yes' : 'no'} onChange={(e) => update('isDisabled', e.target.value === 'yes')}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <div className="row">
            <label>
              Disease category
              <select value={profile.diseaseCategory} onChange={(e) => update('diseaseCategory', e.target.value)}>
                <option value="Cancer">Cancer</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Disease name
              <select value={profile.diseaseName} onChange={(e) => update('diseaseName', e.target.value)}>
                {diseaseOptions.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </label>
          </div>
          <div className="small">Derived profile: {derived.city || 'Unknown city'}, {derived.state || 'Unknown state'} {typeof derived.age === 'number' ? `• Age ${derived.age}` : ''}</div>
        </div>

        <div className="card">
          <div className="count">Showing {results.length} matching results</div>
          {results.map((result) => (
            <div className="resultCard" key={result.id}>
              <div className={`badge badge-${result.status}`}>{result.status === 'eligible' ? 'Eligible' : 'Possibly Eligible'}</div>
              <h3>{result.name}</h3>
              {result.source ? <p><a href={result.source} target="_blank">Official source</a></p> : null}
              <p><strong>Official eligibility highlights</strong></p>
              <ul>
                {result.officialHighlights.map((line) => <li key={line}>{line}</li>)}
              </ul>
              {result.reasons.length ? (
                <>
                  <p><strong>Why this is showing</strong></p>
                  <ul>
                    {result.reasons.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
