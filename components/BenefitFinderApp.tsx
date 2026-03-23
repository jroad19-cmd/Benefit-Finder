'use client';

import { useEffect, useMemo, useState } from 'react';
import { benefitOptions, diseaseCategories } from '@/data/medicalConditions';
import { calculateAge, findMatches } from '@/lib/match';
import type { MatchResult, Profile } from '@/lib/types';
import { inferLocationFromZip } from '@/lib/zip';

const emptyProfile = (): Profile => ({
  id: `profile-${Date.now()}`,
  label: 'My Profile',
  fullName: '',
  birthday: '',
  age: 0,
  zip: '',
  city: '',
  state: '',
  citizenship: '',
  householdSize: 1,
  monthlyIncome: 0,
  assets: 0,
  employmentStatus: '',
  disabilityStatus: false,
  disabilityImpact: '',
  veteranStatus: false,
  housingStatus: '',
  caregiverMode: false,
  relationshipToUser: '',
  currentBenefits: [],
  diseaseCategory: '',
  diseaseName: '',
  cancerStage: '',
  treatmentStatus: '',
  notes: ''
});

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    start: () => void;
    stop: () => void;
  }

  interface SpeechRecognitionEvent {
    results: {
      [key: number]: {
        [key: number]: { transcript: string };
      };
      length: number;
    };
  }
}

export default function BenefitFinderApp() {
  const [profiles, setProfiles] = useState<Profile[]>([emptyProfile()]);
  const [activeProfileId, setActiveProfileId] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string>('');
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('benefitfinder-profiles-v2');
    if (saved) {
      const parsed = JSON.parse(saved) as Profile[];
      if (parsed.length > 0) {
        setProfiles(parsed);
        setActiveProfileId(parsed[0].id);
        return;
      }
    }
    const first = emptyProfile();
    setProfiles([first]);
    setActiveProfileId(first.id);
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    if (profiles.length) {
      window.localStorage.setItem('benefitfinder-profiles-v2', JSON.stringify(profiles));
    }
  }, [profiles]);

  useEffect(() => {
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];
  const results = useMemo(() => (activeProfile ? findMatches(activeProfile) : []), [activeProfile]);

  function updateProfile<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfiles((current) =>
      current.map((profile) => {
        if (profile.id !== activeProfileId) return profile;
        const updated = { ...profile, [key]: value };
        if (key === 'birthday') updated.age = calculateAge(String(value));
        if (key === 'zip') {
          const location = inferLocationFromZip(String(value));
          updated.city = location.city;
          updated.state = location.state;
        }
        if (key === 'diseaseCategory' && value !== profile.diseaseCategory) {
          updated.diseaseName = '';
          updated.cancerStage = '';
        }
        return updated;
      })
    );
  }

  function toggleBenefit(benefit: string) {
    if (!activeProfile) return;
    const has = activeProfile.currentBenefits.includes(benefit);
    updateProfile('currentBenefits', has ? activeProfile.currentBenefits.filter((b) => b !== benefit) : [...activeProfile.currentBenefits, benefit]);
  }

  function addProfile() {
    const newProfile = { ...emptyProfile(), label: `Profile ${profiles.length + 1}` };
    setProfiles((current) => [...current, newProfile]);
    setActiveProfileId(newProfile.id);
  }

  function deleteProfile(id: string) {
    const next = profiles.filter((p) => p.id !== id);
    if (!next.length) return;
    setProfiles(next);
    if (id === activeProfileId) setActiveProfileId(next[0].id);
  }

  function speakTopResults() {
    if (!('speechSynthesis' in window) || !results.length) return;
    const top = results.slice(0, 3).map((r) => `${r.program.name}, ${r.confidence} chance, score ${r.score}.`).join(' ');
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(top));
  }

  function startVoiceNotes() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition || !activeProfile) return;
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updateProfile('notes', `${activeProfile.notes}${activeProfile.notes ? ' ' : ''}${transcript}`);
    };
    recognition.start();
  }

  function saveResultsAsPrint() {
    window.print();
  }

  return (
    <main className="pageShell">
      <section className="hero">
        <div>
          <p className="eyebrow">Senior and disabled benefit discovery</p>
          <h1>BenefitFinder Pro Stronger Build</h1>
          <p className="subcopy">
            Guided benefit matching for federal, state, local, nonprofit, and unclaimed money opportunities. Built for seniors, disabled users,
            caregivers, desktops, and smartphones.
          </p>
        </div>
        <div className="heroActions">
          <button onClick={addProfile}>Add Profile</button>
          <button onClick={saveResultsAsPrint}>Print Results</button>
          <button onClick={speakTopResults} disabled={!results.length}>Read Top Results</button>
        </div>
      </section>

      <section className="grid twoCol">
        <aside className="card sidebar">
          <h2>Saved Profiles</h2>
          <div className="profileList">
            {profiles.map((profile) => (
              <div key={profile.id} className={`profileItem ${profile.id === activeProfileId ? 'active' : ''}`}>
                <button className="profileSelect" onClick={() => setActiveProfileId(profile.id)}>
                  <strong>{profile.label || 'Unnamed Profile'}</strong>
                  <span>{profile.fullName || 'No name yet'}</span>
                </button>
                {profiles.length > 1 && <button className="danger" onClick={() => deleteProfile(profile.id)}>Delete</button>}
              </div>
            ))}
          </div>
          <p className="smallMuted">Profiles are stored in this browser with local storage.</p>
        </aside>

        {activeProfile && (
          <section className="card formCard">
            <h2>Profile Builder</h2>
            <div className="grid formGrid">
              <label>
                Profile label
                <input value={activeProfile.label} onChange={(e) => updateProfile('label', e.target.value)} />
              </label>
              <label>
                Full name
                <input value={activeProfile.fullName} onChange={(e) => updateProfile('fullName', e.target.value)} />
              </label>
              <label>
                Birthday
                <input type="date" value={activeProfile.birthday} onChange={(e) => updateProfile('birthday', e.target.value)} />
              </label>
              <label>
                Auto-detected age
                <input value={activeProfile.age || ''} readOnly />
              </label>
              <label>
                ZIP code
                <input value={activeProfile.zip} onChange={(e) => updateProfile('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} />
              </label>
              <label>
                Detected city
                <input value={activeProfile.city} readOnly />
              </label>
              <label>
                Detected state
                <input value={activeProfile.state} readOnly />
              </label>
              <label>
                Citizenship
                <select value={activeProfile.citizenship} onChange={(e) => updateProfile('citizenship', e.target.value as Profile['citizenship'])}>
                  <option value="">Select</option>
                  <option value="Citizen">Citizen</option>
                  <option value="Permanent Resident">Permanent Resident</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Household size
                <input type="number" min="1" value={activeProfile.householdSize} onChange={(e) => updateProfile('householdSize', Number(e.target.value || 1))} />
              </label>
              <label>
                Monthly income
                <input type="number" min="0" value={activeProfile.monthlyIncome} onChange={(e) => updateProfile('monthlyIncome', Number(e.target.value || 0))} />
              </label>
              <label>
                Assets
                <input type="number" min="0" value={activeProfile.assets} onChange={(e) => updateProfile('assets', Number(e.target.value || 0))} />
              </label>
              <label>
                Employment status
                <select value={activeProfile.employmentStatus} onChange={(e) => updateProfile('employmentStatus', e.target.value as Profile['employmentStatus'])}>
                  <option value="">Select</option>
                  <option value="Retired">Retired</option>
                  <option value="Working">Working</option>
                  <option value="Unable to Work">Unable to Work</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </label>
              <label className="checkboxRow">
                <input type="checkbox" checked={activeProfile.disabilityStatus} onChange={(e) => updateProfile('disabilityStatus', e.target.checked)} />
                Disabled or limited by a condition
              </label>
              <label>
                Disability impact
                <select value={activeProfile.disabilityImpact} onChange={(e) => updateProfile('disabilityImpact', e.target.value as Profile['disabilityImpact'])}>
                  <option value="">Select</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </label>
              <label className="checkboxRow">
                <input type="checkbox" checked={activeProfile.veteranStatus} onChange={(e) => updateProfile('veteranStatus', e.target.checked)} />
                Veteran or survivor household
              </label>
              <label>
                Housing status
                <select value={activeProfile.housingStatus} onChange={(e) => updateProfile('housingStatus', e.target.value as Profile['housingStatus'])}>
                  <option value="">Select</option>
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                  <option value="Homeless">Homeless</option>
                  <option value="Living with Family">Living with Family</option>
                </select>
              </label>
              <label className="checkboxRow">
                <input type="checkbox" checked={activeProfile.caregiverMode} onChange={(e) => updateProfile('caregiverMode', e.target.checked)} />
                Caregiver mode
              </label>
              <label>
                Relationship to user
                <input value={activeProfile.relationshipToUser} onChange={(e) => updateProfile('relationshipToUser', e.target.value)} placeholder="Self, mother, client, spouse" />
              </label>
              <label>
                Disease category
                <select value={activeProfile.diseaseCategory} onChange={(e) => updateProfile('diseaseCategory', e.target.value)}>
                  <option value="">Select</option>
                  {Object.keys(diseaseCategories).map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              <label>
                Disease name
                <select value={activeProfile.diseaseName} onChange={(e) => updateProfile('diseaseName', e.target.value)}>
                  <option value="">Select</option>
                  {selectedDiseaseNames.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </label>
              {activeProfile.diseaseCategory === 'Cancer' && (
                <label>
                  Cancer stage
                  <select value={activeProfile.cancerStage} onChange={(e) => updateProfile('cancerStage', e.target.value)}>
                    <option value="">Select</option>
                    <option value="Stage 0">Stage 0</option>
                    <option value="Stage 1">Stage 1</option>
                    <option value="Stage 2">Stage 2</option>
                    <option value="Stage 3">Stage 3</option>
                    <option value="Stage 4">Stage 4</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </label>
              )}
              <label>
                Treatment status
                <select value={activeProfile.treatmentStatus} onChange={(e) => updateProfile('treatmentStatus', e.target.value)}>
                  <option value="">Select</option>
                  <option value="In Treatment">In Treatment</option>
                  <option value="Newly Diagnosed">Newly Diagnosed</option>
                  <option value="Follow-Up Care">Follow-Up Care</option>
                  <option value="Long-Term Disability">Long-Term Disability</option>
                </select>
              </label>
            </div>

            <div className="sectionBlock">
              <h3>Current benefits</h3>
              <div className="chips">
                {benefitOptions.map((benefit) => (
                  <button key={benefit} className={activeProfile.currentBenefits.includes(benefit) ? 'chip activeChip' : 'chip'} onClick={() => toggleBenefit(benefit)}>
                    {benefit}
                  </button>
                ))}
              </div>
            </div>

            <div className="sectionBlock">
              <div className="sectionTitleRow">
                <h3>Notes</h3>
                <button onClick={startVoiceNotes} disabled={!voiceSupported}>Voice Input</button>
              </div>
              <textarea value={activeProfile.notes} onChange={(e) => updateProfile('notes', e.target.value)} rows={5} placeholder="Add caregiver notes, diagnosis details, or barriers to applying." />
              {!voiceSupported && <p className="smallMuted">Voice input depends on browser support.</p>}
            </div>
          </section>
        )}
      </section>

      <section className="card resultsCard">
        <div className="sectionTitleRow">
          <div>
            <h2>Matched Results</h2>
            <p className="smallMuted">Results are grouped by confidence so users can focus first on the strongest opportunities.</p>
          </div>
        </div>

        <div className="summaryRow">
          <div className="summaryBox"><strong>{results.filter((r) => r.confidence === 'High').length}</strong><span>High chance</span></div>
          <div className="summaryBox"><strong>{results.filter((r) => r.confidence === 'Medium').length}</strong><span>Possible fit</span></div>
          <div className="summaryBox"><strong>{results.filter((r) => r.confidence === 'Low').length}</strong><span>Lower fit</span></div>
        </div>

        <div className="resultsList">
          {results.map((result: MatchResult) => (
            <article key={result.program.id} className="resultCard">
              <div className="resultHeader">
                <div>
                  <p className="meta">{result.program.scope} · {result.program.category}</p>
                  <h3>{result.program.name}</h3>
                  <p>{result.program.description}</p>
                </div>
                <div className="scoreWrap">
                  <div className={`confidenceBadge ${result.confidence.toLowerCase()}`}>{result.confidence}</div>
                  <div className="meter"><div className="meterFill" style={{ width: `${result.score}%` }} /></div>
                  <span>{result.score}% match</span>
                </div>
              </div>

              <div className="resultMetaGrid">
                <div><strong>Difficulty:</strong> {result.program.difficulty}</div>
                <div><strong>Approval:</strong> {result.program.approvalEstimate}</div>
              </div>

              <div className="whyPanel">
                <strong>Why you may qualify</strong>
                <ul>
                  {result.reasons.slice(0, 4).map((reason) => <li key={reason}>{reason}</li>)}
                </ul>
              </div>

              {result.missingInfo.length > 0 && (
                <div className="missingPanel">
                  <strong>Missing info prompts</strong>
                  <ul>
                    {result.missingInfo.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              )}

              <button className="linkButton" onClick={() => setExpandedId(expandedId === result.program.id ? '' : result.program.id)}>
                {expandedId === result.program.id ? 'Hide program details' : 'Show program details'}
              </button>

              {expandedId === result.program.id && (
                <div className="drawer">
                  <div>
                    <strong>Required documents</strong>
                    <ul>
                      {result.program.documents.map((doc) => <li key={doc}>{doc}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong>How to apply</strong>
                    <ol>
                      {result.program.applySteps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
