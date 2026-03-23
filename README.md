# Pennsylvania Senior & Disability Benefits Registry (Verified Starter Set)

This package is the reset for the app's eligibility layer.

It is intentionally strict and source-backed:
- Every entry is tied to an official source.
- Hard filters are separated from soft factors.
- Programs that need current income tables are marked as do not show 100% until current rules are loaded.
- Navigation/counseling results (PA MEDI, PA LINK) are separated from financial-benefit results.

## Files
- pa_program_registry.json — structured program inventory for app ingestion
- qa_truth_set.csv — minimum automated test cases the app must pass
- implementation_notes.md — how to wire the registry safely

## Rules the app should enforce
1. Never show a disease-specific grant unless diagnosis scope matches.
2. Never show state-only programs outside the required state.
3. Treat owner/renter, age, Medicaid/Medicare, employment, and diagnosis as hard gates where specified.
4. Never show 100% unless all hard gates pass and any required current income/resource tables are loaded.
5. Show Possibly eligible — more info needed when the official source confirms the program exists but exact current numeric thresholds are not yet encoded.

## Status labels to use
- Eligible — all hard filters passed and any numeric rules passed.
- Possibly eligible — more info needed — user passes known hard filters, but current numeric tables or required follow-up data are missing.
- Not eligible based on current inputs — one or more hard filters fail.
- Open search opportunity — for unclaimed property and similar search-based flows.
