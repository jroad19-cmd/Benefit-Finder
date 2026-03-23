'use client';

import { useMemo, useState } from 'react';
import { programs, diseaseOptions } from '@/data/programs';
import { detectLocation } from '@/data/zipMap';
import { matchPrograms } from '@/lib/match';

const initial = {
  birthDate: '1955-01-01',
  age: 71,
  zip: '15658',
  state: 'PA',
  city: 'Ligonier',
  housing: 'Own',
  annualIncome: '30000',
  assets: '1000',
  disabled: 'No',
  disabilityType: '',
  medicaid: 'No',
  disease: 'Multiple Myeloma'
};

function calcAge(birthDate) {
  if (!birthDate) return 0;
  const dob = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age > 0 ? age : 0;
}

export default function BenefitFinderApp() {
  const [profile, setProfile] = useState(initial);

  const location = useMemo(
    () => detectLocation(profile.zip, profile.state, profile.city),
    [profile.zip, profile.state, profile.city]
  );

  const effectiveProfile = useMemo(
    () => ({ ...profile, state: location.state, city: location.city, age: calcAge(profile.birthDate) }),
    [profile, location]
  );

  const results = useMemo(() => matchPrograms(effectiveProfile, programs), [effectiveProfile]);

  const onChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const warnings = [];
  if (profile.zip && !location.city) warnings.push('ZIP code was not found exactly. State fallback may be in use.');
  if (effectiveProfile.state !== 'PA') warnings.push('Pennsylvania-only programs are intentionally excluded when state is not PA.');

  return (
    <main>
      <div className="header">
        <div>
          <h1>Benefit Finder Verified PA</h1>
          <p className="small">Hard rules first. No program should appear unless its required gates pass.</p>
        </div>
        <div className="card" style={{ minWidth: 240 }}>
          <div className="stat">Detected location</div>
          <div><strong>{location.city || 'Unknown city'}</strong>{location.state ? `, ${location.state}` : ''}</div>
          <div className="small">ZIP {location.zip || '—'}{location.county ? ` • ${location.county} County` : ''}</div>
          <div className="stat" style={{ marginTop: 8 }}>Live matches</div>
          <div><strong>{results.length}</strong></div>
        </div>
      </div>

      <div className="grid">
        <section className="card">
          <h2>Profile</h2>
          <label>
            Birth date
            <input type="date" value={profile.birthDate} onChange={(e) => onChange('birthDate', e.target.value)} />
          </label>
          <label>
            ZIP code
            <input value={profile.zip} onChange={(e) => onChange('zip', e.target.value)} />
          </label>
          <label>
            State
            <input value={profile.state} onChange={(e) => onChange('state', e.target.value.toUpperCase())} />
          </label>
          <label>
            City override
            <input value={profile.city} onChange={(e) => onChange('city', e.target.value)} />
          </label>
          <label>
            Housing
            <select value={profile.housing} onChange={(e) => onChange('housing', e.target.value)}>
              <option>Own</option>
              <option>Rent</option>
              <option>Homeless</option>
            </select>
          </label>
          <label>
            Annual income
            <input value={profile.annualIncome} onChange={(e) => onChange('annualIncome', e.target.value)} />
          </label>
          <label>
            Assets
            <input value={profile.assets} onChange={(e) => onChange('assets', e.target.value)} />
          </label>
          <label>
            Disabled
            <select value={profile.disabled} onChange={(e) => onChange('disabled', e.target.value)}>
              <option>No</option>
              <option>Yes</option>
            </select>
          </label>
          <label>
            Disability type
            <input value={profile.disabilityType} onChange={(e) => onChange('disabilityType', e.target.value)} />
          </label>
          <label>
            Medicaid
            <select value={profile.medicaid} onChange={(e) => onChange('medicaid', e.target.value)}>
              <option>No</option>
              <option>Yes</option>
            </select>
          </label>
          <label>
            Disease / condition
            <select value={profile.disease} onChange={(e) => onChange('disease', e.target.value)}>
              {diseaseOptions.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <div className="small">Calculated age: <strong>{effectiveProfile.age}</strong></div>
        </section>

        <section>
          {warnings.map((w) => <div key={w} className="warn">{w}</div>)}
          <div className="card" style={{ marginBottom: 14 }}>
            <h2>Results</h2>
            <p className="small">These results update immediately from the current profile. Programs are filtered out completely when hard rules fail.</p>
          </div>
          {results.map((r) => (
            <article key={r.id} className="result card">
              <div className="header">
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>{r.name}</h3>
                  <div className={`badge ${r.status === 'Eligible' ? 'eligible' : r.status.startsWith('Possibly') ? 'review' : 'resource'}`}>{r.status}</div>
                  <div className="small" style={{ marginTop: 8 }}>{r.category} • {r.geography}</div>
                </div>
                <div>
                  <div className="stat">Confidence</div>
                  <div><strong>{r.confidence}%</strong></div>
                </div>
              </div>
              <p>{r.summary}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <strong>Why it appears</strong>
                  <ul className="reasons">
                    {r.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>Official eligibility highlights</strong>
                  <ul className="highlights">
                    {r.eligibilityHighlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <strong>Document checklist</strong>
                  <ul className="docs">
                    {r.docs.map((doc) => <li key={doc}>{doc}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>Links</strong>
                  <p><a href={r.sourceUrl} target="_blank">Official or primary source</a></p>
                  <p><a href={r.applyUrl} target="_blank">Apply / learn more</a></p>
                </div>
              </div>
            </article>
          ))}
          {!results.length && <div className="card">No current matches. Change the profile and results will update immediately.</div>}
        </section>
      </div>
    </main>
  );
}
