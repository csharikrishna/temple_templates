# Project: Mobile-First Responsive Website Remediation & QA

## Architecture
- Canonical root website: `index.html`, `styles.css`, `app.js` (served at `http://localhost:3000/`)
- Alternate active template: `templates/template_4/index.html`, `templates/template_4/styles.css` (served at `http://localhost:3000/templates/template_4/`)
- Protected legacy templates (DO NOT TOUCH): `templates/template_1/`, `templates/template_2/`, `templates/template_3/`
- Verification suite: `test_suite.js` (run via `node test_suite.js`)
- Dev server: running at `http://localhost:3000/`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Viewport Inspection (R1) | Inspect rendered routes on localhost:3000/ and /templates/template_4/ across 375px, 430px, 768px, 1024px, 1440px | M1 | ORIGINAL_REQUEST |
| 2 | Screenshot Collection (R1) | Full-page & component screenshots in audit_artifacts/screenshots/ | M1 | ORIGINAL_REQUEST |
| 3 | Adversarial QA Audit (R2) | Audit responsiveness, mobile-first design, visual design quality, interactive behavior, accessibility, CSS hygiene | M2 | ORIGINAL_REQUEST |
| 4 | Audit Issue Log (R2) | Actionable prioritized audit issues in audit_artifacts/audit_issues.md (Critical, High, Medium, Polish) | M2 | ORIGINAL_REQUEST |
| 5 | Mobile-First Baseline CSS (R3) | Refactor/enhance canonical active files to mobile-first baseline (>=44px touch targets, 0 overflow) | M3 | ORIGINAL_REQUEST |
| 6 | Progressive Enhancement (R3) | Scale naturally to tablet (768px), laptop (1024px), desktop (1440px) | M3 | ORIGINAL_REQUEST |
| 7 | Scope Protection (R4) | Absolute protection of templates/template_1/, template_2/, template_3/; direct editing only, no python scripts | M3 | ORIGINAL_REQUEST |
| 8 | Regression & Test Verification (R5) | Ensure node test_suite.js passes 100%, 0 console errors, post-remediation screenshots | M4 | ORIGINAL_REQUEST |
| 9 | Final Execution Summary (R5) | Structured final execution summary report | M5 | ORIGINAL_REQUEST |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Visual Intelligence Inspection | Capture multi-viewport baseline screenshots for root and template_4 routes | none | DONE |
| 2 | M2: Adversarial QA & Audit Report | Audit mobile responsiveness, touch targets, overflow, typography, a11y, generate audit_issues.md | M1 | DONE |
| 3 | M3: Mobile-First Remediation | Lead engineering remediation of canonical active files (index.html, styles.css, template_4) | M2 | DONE |
| 4 | M4: Regression & Post-Fix Visual QA | Verify node test_suite.js passes 100%, re-capture screenshots across all viewports, confirm issue resolution | M3 | DONE |
| 5 | M5: Forensic Integrity Audit & Synthesis | teamwork_auditor verification, final execution summary report | M4 | DONE |

## Code Layout
- Root Active Files: `index.html`, `styles.css`
- Template 4 Active Files: `templates/template_4/index.html`, `templates/template_4/styles.css`
- Protected (Read-Only): `templates/template_1/`, `templates/template_2/`, `templates/template_3/`
- Test Harness: `test_suite.js`
- Artifacts: `audit_artifacts/screenshots/`, `audit_artifacts/audit_issues.md`
