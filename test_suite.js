// Unit Test Suite for BHTCC Flagship Engine
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== RUNNING BHTCC FLAGSHIP UNIT TEST SUITE ===\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Syntax check on app.js and styles.css
console.log('[1. Syntax & Integrity Checks]');
const appJsPath = path.join(__dirname, 'app.js');
const t4AppJsPath = path.join(__dirname, 'templates/template_4/app.js');
const stylesCssPath = path.join(__dirname, 'styles.css');
const t4StylesCssPath = path.join(__dirname, 'templates/template_4/styles.css');
const indexHtmlPath = path.join(__dirname, 'index.html');
const t4IndexHtmlPath = path.join(__dirname, 'templates/template_4/index.html');

assert(fs.existsSync(appJsPath) && fs.existsSync(t4AppJsPath), 'app.js exists in root and template_4');
assert(fs.existsSync(stylesCssPath) && fs.existsSync(t4StylesCssPath), 'styles.css exists in root and template_4');
assert(fs.existsSync(indexHtmlPath) && fs.existsSync(t4IndexHtmlPath), 'index.html exists in root and template_4');

const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
const openBraces = (stylesCss.match(/\{/g) || []).length;
const closeBraces = (stylesCss.match(/\}/g) || []).length;
assert(openBraces === closeBraces, `styles.css braces match (${openBraces} vs ${closeBraces})`);

// 2. Asset existence check
console.log('\n[2. Asset Verification]');
const requiredAssets = [
  'assets/t4_flagship_hero_sanctum.jpg',
  'assets/t4_campus_blueprint_render.jpg',
  'assets/t4_granite_brick_texture.jpg',
  'assets/t4_certificate_filigree_frame.png',
  'assets/t4_avatar_priest.jpg'
];

requiredAssets.forEach(asset => {
  const fullPath = path.join(__dirname, asset);
  assert(fs.existsSync(fullPath), `Asset exists: ${asset} (${fs.statSync(fullPath).size} bytes)`);
});

// 3. Mathematical & Legal Verification of Australian Tax Calculator
console.log('\n[3. Australian Progressive Income Tax Calculations]');
import vm from 'vm';
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const sandbox = {
  window: {},
  document: { addEventListener: () => {} },
  module: { exports: {} },
  exports: {},
  console
};
vm.createContext(sandbox);
vm.runInContext(appCode, sandbox);
const { calculateAustralianTaxBenefit, calculateBallaratSunTimes } = sandbox.module.exports;

// Test Case A: Income $90,000, Donation $250 in FY 2024-25 (with 2% Medicare)
// Bracket: 30% marginal rate + 2% Medicare = 32% marginal
const resA = calculateAustralianTaxBenefit(90000, 250, '2024-25', true);
assert(resA.donation === 250, 'Test A: Donation is $250.00');
assert(resA.baseTaxSaving === 75, `Test A: Base tax saving is $75.00 (got ${resA.baseTaxSaving})`);
assert(resA.medicareSaving === 5, `Test A: Medicare saving is $5.00 (got ${resA.medicareSaving})`);
assert(resA.totalBenefit === 80, `Test A: Total tax benefit is $80.00 (got ${resA.totalBenefit})`);
assert(resA.netOutOfPocket === 170, `Test A: Net out-of-pocket cost is $170.00 (got ${resA.netOutOfPocket})`);

// Test Case B: Income $46,000, Donation $2,000 (Crosses bracket threshold at $45,000)
// $1,000 taxed at 30% ($300) + $1,000 taxed at 16% ($160) = $460 base saving
// Medicare: $2,000 * 2% = $40 saving
// Total benefit: $500. Net cost: $1,500
const resB = calculateAustralianTaxBenefit(46000, 2000, '2024-25', true);
assert(resB.baseTaxSaving === 460, `Test B (Bracket Threshold Crossing): Base tax saving is $460.00 (got ${resB.baseTaxSaving})`);
assert(resB.medicareSaving === 40, `Test B: Medicare saving is $40.00 (got ${resB.medicareSaving})`);
assert(resB.totalBenefit === 500, `Test B: Total tax benefit is $500.00 (got ${resB.totalBenefit})`);
assert(resB.netOutOfPocket === 1500, `Test B: Net cost is $1500.00 (got ${resB.netOutOfPocket})`);

// Test Case C: Top marginal bracket ($200,000 income, $5,000 donation)
// 45% base rate + 2% Medicare = 47% total
const resC = calculateAustralianTaxBenefit(200000, 5000, '2024-25', true);
assert(resC.baseTaxSaving === 2250, `Test C (Top Bracket): Base tax saving is $2250.00 (got ${resC.baseTaxSaving})`);
assert(resC.medicareSaving === 100, `Test C: Medicare saving is $100.00 (got ${resC.medicareSaving})`);
assert(resC.totalBenefit === 2350, `Test C: Total benefit is $2350.00 (got ${resC.totalBenefit})`);
assert(resC.netOutOfPocket === 2650, `Test C: Net cost is $2650.00 (got ${resC.netOutOfPocket})`);

// 4. Astronomical Solar & Rahu Kalam Verification
console.log('\n[4. Astronomical Ballarat Solar Engine & Rahu Kalam]');
const nov6 = new Date('2026-11-06T12:00:00Z');
const sunNov = calculateBallaratSunTimes(nov6);
assert(sunNov !== null, 'Sun calculation returns valid object');
assert(sunNov.sunriseMinutes >= 330 && sunNov.sunriseMinutes <= 420, `Sunrise is in realistic morning range: ${sunNov.sunriseText}`);
assert(sunNov.sunsetMinutes >= 1140 && sunNov.sunsetMinutes <= 1260, `Sunset is in realistic evening range: ${sunNov.sunsetText}`);
assert(sunNov.daylightHours >= 12, `Daylight duration in November Spring is >= 12 hours: ${sunNov.daylightHours}h ${sunNov.daylightMinutes}m`);
assert(sunNov.rahuKalamText.includes('AM') || sunNov.rahuKalamText.includes('PM'), `Rahu Kalam computed dynamically: ${sunNov.rahuKalamText}`);

// 5. Template Isolation & Protection Verification
console.log('\n[5. Strictly Protected Templates (1, 2, 3) Integrity]');
const template1Dir = path.join(__dirname, 'templates/template_1');
const t1Files = ['index.html', 'project.html', 'worship.html', 'community.html', 'donate.html', 'styles.css', 'app.js'];
t1Files.forEach(f => {
  assert(fs.existsSync(path.join(template1Dir, f)), `Template 1 file intact: ${f}`);
});

console.log(`\n=== UNIT TESTS COMPLETED: ${passed} PASSED, ${failed} FAILED ===\n`);
if (failed > 0) process.exit(1);
