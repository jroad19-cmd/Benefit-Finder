# Implementation notes

## 1) Separate hard filters from scoring
Do not use a single score as the primary eligibility decision.
Use this order:
1. hard filter check
2. numeric threshold check
3. only then score/prioritize among remaining programs

## 2) Example pseudo-logic

```ts
const gate = evaluateHardFilters(profile, program);

if (!gate.passes) {
  return { status: "Not eligible based on current inputs", reasons: gate.reasons };
}

const numeric = evaluateNumericRules(profile, program);

if (numeric.missingCurrentTable) {
  return { status: "Possibly eligible — more info needed", reasons: numeric.reasons };
}

if (!numeric.passes) {
  return { status: "Not eligible based on current inputs", reasons: numeric.reasons };
}

return { status: "Eligible", reasons: [...gate.reasons, ...numeric.reasons] };
```

## 3) Disease-matching rules
- disease_scope = specific diagnosis only => exact match only
- disease_scope = general cancer => any cancer diagnosis allowed
- never let lung cancer grants match multiple myeloma

## 4) State and housing rules
Examples:
- PTRR => PA only; housing must be owner or renter
- Homestead/Farmstead => PA only; owner-occupied primary residence only
- MATP => PA + Medical Assistance required
- CHC => PA + Medicaid + 21+ + pathway

## 5) Current thresholds still needed
For a production-grade engine, add and version:
- LIHEAP household-size income table
- PACE/PACENET current income table
- Senior Farmers Market current income table
- exact PA MSP intake path and any state-specific counting rules
- Medicaid pathway tables/resources by category

Until those are encoded and versioned, the UI should not display 100%.
