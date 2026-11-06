/**
 * ============================================================================
 * BALLARAT HINDU TEMPLE & CULTURAL CENTRE (BHTCC) - DIGITAL FLAGSHIP ENGINE
 * Template 4 Canonical Implementation
 *
 * Architecture:
 * 1. Astronomical Ballarat Panchang Live Engine (NOAA Solar Algorithm, Rahu Kalam, Aarti Countdown)
 * 2. Australian DGR Progressive Tax Calculator (ITAA 1997 / FY 2024-25 & 2025-26 Revised Stage 3)
 * 3. Digital Gotra Sankalp Generator & Certificate Studio (Vedic Gotras, Token Generation, WhatsApp, Print)
 * 4. 5-Acre Ross Creek Campus Interactive Zone Explorer (Masterplan Visualization & Hotspots)
 * 5. Interactive Granite Brick Sponsorship Matrix & 3D Gold Engraving
 * 6. Web Audio API Physical Temple Bell Synthesizer & Living Diya Physics
 * 7. Modals, Filtering, Currency Toggle & Accessibility Safeguards
 * ============================================================================
 */

'use strict';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initLivePanchangamEngine();
    initBrickTaxMatrix();
    initLivingDiyaStage();
    initGotraSankalpGenerator();
    initCampusZoneExplorer();
    initPujaFilters();
    initModals();
    initCurrencyToggle();
  });
}

/* ==========================================================================
   1. ASTRONOMICAL BALLARAT PANCHANG LIVE ENGINE & AARTI COUNTDOWN
   Location: 110 Vaggs Rd, Ross Creek VIC 3351 (-37.6433°S, 143.8153°E)
   Timezone: Australia/Melbourne (Automatic AEDT / AEST transitions)
   ========================================================================== */

const BHTCC_COORDINATES = {
  name: '110 Vaggs Rd, Ross Creek VIC 3351',
  lat: -37.6433,
  lng: 143.8153,
  timeZone: 'Australia/Melbourne'
};

// Configurable BHTCC Daily Agamic Schedule (Provisional schedule for Regional Victoria)
const BHTCC_AARTI_SCHEDULE = [
  { name: 'Kakad / Suprabhatam Aarti', time: '08:00', minutes: 8 * 60 },
  { name: 'Madhyahna Maha Aarti',      time: '12:30', minutes: 12 * 60 + 30 },
  { name: 'Sandhya Dhoop & Deepa Aarti', time: '19:00', minutes: 19 * 60 },
  { name: 'Sayana Shanti Aarti',        time: '20:30', minutes: 20 * 60 + 30 }
];

/**
 * High-accuracy NOAA Solar Calculation for Sunrise & Sunset
 * Accounts for day of year, solar declination, equation of time, and 90.833° refraction angle.
 */
function calculateBallaratSunTimes(targetDate, lat = BHTCC_COORDINATES.lat, lng = BHTCC_COORDINATES.lng) {
  const startOfYear = new Date(Date.UTC(targetDate.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((targetDate - startOfYear) / 86400000) + 1;

  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;

  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + (targetDate.getUTCHours() - 12) / 24);

  // Equation of time in minutes
  const eqtime = 229.18 * (
    0.000075 +
    0.001868 * Math.cos(gamma) -
    0.032077 * Math.sin(gamma) -
    0.014615 * Math.cos(2 * gamma) -
    0.040849 * Math.sin(2 * gamma)
  );

  // Solar declination in radians
  const decl = 0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  // Solar zenith for sunrise/sunset (90.833° for atmospheric refraction and solar radius)
  const zenith = 90.833 * toRad;

  const cosHourAngle = (Math.cos(zenith) - Math.sin(lat * toRad) * Math.sin(decl)) /
                       (Math.cos(lat * toRad) * Math.cos(decl));

  // Guard against extreme polar latitudes (not applicable to Ballarat, but good engineering)
  if (cosHourAngle > 1 || cosHourAngle < -1) return null;

  const hourAngle = Math.acos(cosHourAngle) * toDeg;

  // UTC minutes from midnight
  const sunriseUtcMinutes = 720 - 4 * (lng + hourAngle) - eqtime;
  const sunsetUtcMinutes  = 720 - 4 * (lng - hourAngle) - eqtime;

  // Compute exact Australia/Melbourne offset in minutes for target date
  const utcDate = new Date(targetDate.toLocaleString('en-US', { timeZone: 'UTC' }));
  const melDate = new Date(targetDate.toLocaleString('en-US', { timeZone: BHTCC_COORDINATES.timeZone }));
  const tzOffsetMinutes = Math.round((melDate.getTime() - utcDate.getTime()) / 60000);

  const sunriseLocalMin = (sunriseUtcMinutes + tzOffsetMinutes + 1440) % 1440;
  const sunsetLocalMin  = (sunsetUtcMinutes + tzOffsetMinutes + 1440) % 1440;
  const daylightMinutes = sunsetLocalMin - sunriseLocalMin;

  // Traditional Vedic 8-part daytime division for Rahu Kalam:
  // Order of Rahu segments from Sunrise for Sun..Sat: [8, 2, 7, 5, 6, 4, 3]
  const rahuOrder = [8, 2, 7, 5, 6, 4, 3];
  const dayOfWeek = melDate.getDay(); // 0 is Sunday
  const segmentNumber = rahuOrder[dayOfWeek];
  const partDuration = daylightMinutes / 8;

  const rahuStartMin = sunriseLocalMin + (segmentNumber - 1) * partDuration;
  const rahuEndMin = sunriseLocalMin + segmentNumber * partDuration;

  function formatMinutes(min) {
    let h = Math.floor(min / 60);
    const m = Math.floor(min % 60);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  return {
    sunriseText: formatMinutes(sunriseLocalMin),
    sunsetText: formatMinutes(sunsetLocalMin),
    sunriseMinutes: sunriseLocalMin,
    sunsetMinutes: sunsetLocalMin,
    daylightHours: Math.floor(daylightMinutes / 60),
    daylightMinutes: Math.floor(daylightMinutes % 60),
    rahuKalamText: `${formatMinutes(rahuStartMin)} - ${formatMinutes(rahuEndMin)}`,
    dayOfWeek
  };
}

function initLivePanchangamEngine() {
  const clockEl = document.getElementById('ballarat-clock-seconds');
  const tithiEl = document.getElementById('ballarat-tithi');
  const sunriseEl = document.getElementById('ballarat-sunrise');
  const sunsetEl = document.getElementById('ballarat-sunset');
  const rahuEl = document.getElementById('ballarat-rahu');
  const ritualCountdownEl = document.getElementById('ritual-countdown');
  const ritualActiveTitleEl = document.getElementById('ritual-active-title');
  const ritualNextTitleEl = document.getElementById('ritual-next-title');

  function updatePanchangAndClock() {
    const nowUtc = new Date();

    // Format Ballarat Local Time using Intl.DateTimeFormat
    const melOptions = {
      timeZone: BHTCC_COORDINATES.timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const melParts = new Intl.DateTimeFormat('en-AU', melOptions).formatToParts(nowUtc);
    const partMap = {};
    melParts.forEach(p => { partMap[p.type] = p.value; });

    // Format: "Fri, 06 Nov 2026 • 07:38:14 PM AEDT"
    const isDst = (new Date().toLocaleString('en-US', { timeZone: BHTCC_COORDINATES.timeZone, timeZoneName: 'short' })).includes('AEDT');
    const tzCode = isDst ? 'AEDT' : 'AEST';

    if (clockEl) {
      clockEl.textContent = `${partMap.weekday}, ${partMap.day} ${partMap.month} ${partMap.year} • ${partMap.hour}:${partMap.minute}:${partMap.second} ${partMap.dayPeriod} ${tzCode}`;
    }

    // Solar Calculation
    const sunTimes = calculateBallaratSunTimes(nowUtc);
    if (sunTimes) {
      if (sunriseEl) sunriseEl.textContent = sunTimes.sunriseText;
      if (sunsetEl) sunsetEl.textContent = sunTimes.sunsetText;
      if (rahuEl) rahuEl.textContent = sunTimes.rahuKalamText;
    }

    // Traditional Indic Tithi (Drik Siddhanta convention reference for Kartika Shukla)
    if (tithiEl && (!tithiEl.textContent || tithiEl.textContent.includes('Kartika'))) {
      tithiEl.textContent = 'Kartika Shukla Ekadashi (Devutthana)';
    }

    // Next Aarti Live Countdown
    // Get current minutes since midnight in Melbourne
    const melHour24 = parseInt(nowUtc.toLocaleTimeString('en-US', { timeZone: BHTCC_COORDINATES.timeZone, hour12: false, hour: '2-digit' }), 10);
    const melMin = parseInt(nowUtc.toLocaleTimeString('en-US', { timeZone: BHTCC_COORDINATES.timeZone, minute: '2-digit' }), 10);
    const melSec = parseInt(nowUtc.toLocaleTimeString('en-US', { timeZone: BHTCC_COORDINATES.timeZone, second: '2-digit' }), 10);
    const currentTotalSec = (melHour24 * 3600) + (melMin * 60) + melSec;

    let targetEvent = null;
    let activeEvent = BHTCC_AARTI_SCHEDULE[BHTCC_AARTI_SCHEDULE.length - 1]; // Default previous

    for (let i = 0; i < BHTCC_AARTI_SCHEDULE.length; i++) {
      const item = BHTCC_AARTI_SCHEDULE[i];
      const eventSec = item.minutes * 60;
      if (currentTotalSec < eventSec) {
        targetEvent = item;
        activeEvent = i > 0 ? BHTCC_AARTI_SCHEDULE[i - 1] : { name: 'Morning Darshan & Japam' };
        break;
      }
    }

    let diffSec = 0;
    if (targetEvent) {
      diffSec = (targetEvent.minutes * 60) - currentTotalSec;
    } else {
      // Past last Aarti of the day -> Count down to tomorrow's Suprabhatam (08:00 AM)
      targetEvent = BHTCC_AARTI_SCHEDULE[0];
      activeEvent = { name: 'Sanctum Sayana Shanti' };
      diffSec = (24 * 3600 - currentTotalSec) + (targetEvent.minutes * 60);
    }

    const pad = (n) => String(n).padStart(2, '0');
    const ch = Math.floor(diffSec / 3600);
    const cm = Math.floor((diffSec % 3600) / 60);
    const cs = diffSec % 60;

    if (ritualCountdownEl) {
      ritualCountdownEl.textContent = `${pad(ch)}h ${pad(cm)}m ${pad(cs)}s`;
    }
    if (ritualNextTitleEl && targetEvent) {
      ritualNextTitleEl.textContent = `Next: ${targetEvent.name} (${targetEvent.time})`;
    }
    if (ritualActiveTitleEl && activeEvent) {
      ritualActiveTitleEl.textContent = activeEvent.name;
    }
  }

  updatePanchangAndClock();
  setInterval(updatePanchangAndClock, 1000);
}

// Backwards-compatible alias for existing markup
function initCountdown() {
  // Handled by initLivePanchangamEngine
}


/* ==========================================================================
   2. AUSTRALIAN DGR BRICK SPONSORSHIP MATRIX & PROGRESSIVE TAX CALCULATOR
   Statutory Reference: Subdivision 30-B, Income Tax Assessment Act 1997 (ITAA 1997)
   ABN: 13 397 829 440 | Registered Charity (DGR Item 1, $2+ Threshold)
   Tax Brackets: Revised Stage 3 Individual Resident Rates (FY 2024-25 & 2025-26)
   ========================================================================== */

const AUSTRALIAN_TAX_CONFIG = {
  jurisdiction: 'Commonwealth of Australia',
  currency: 'AUD',
  dgrStatus: 'Registered Deductible Gift Recipient (DGR Item 1)',
  years: {
    '2024-25': {
      label: 'FY 2024–25 (Revised Stage 3 Cuts)',
      brackets: [
        { min: 0,      max: 18200,   rate: 0.00, base: 0 },
        { min: 18200,  max: 45000,   rate: 0.16, base: 0 },
        { min: 45000,  max: 135000,  rate: 0.30, base: 4288 },
        { min: 135000, max: 190000,  rate: 0.37, base: 31288 },
        { min: 190000, max: Infinity, rate: 0.45, base: 51638 }
      ],
      medicareThreshold: 26000,
      medicareShadingMax: 32500,
      medicareRate: 0.02
    },
    '2025-26': {
      label: 'FY 2025–26 (Standard Stage 3)',
      brackets: [
        { min: 0,      max: 18200,   rate: 0.00, base: 0 },
        { min: 18200,  max: 45000,   rate: 0.16, base: 0 },
        { min: 45000,  max: 135000,  rate: 0.30, base: 4288 },
        { min: 135000, max: 190000,  rate: 0.37, base: 31288 },
        { min: 190000, max: Infinity, rate: 0.45, base: 51638 }
      ],
      medicareThreshold: 26000,
      medicareShadingMax: 32500,
      medicareRate: 0.02
    },
    '2023-24': {
      label: 'FY 2023–24 (Historical Comparison)',
      brackets: [
        { min: 0,      max: 18200,   rate: 0.00, base: 0 },
        { min: 18200,  max: 45000,   rate: 0.19, base: 0 },
        { min: 45000,  max: 120000,  rate: 0.325, base: 5092 },
        { min: 120000, max: 180000,  rate: 0.37, base: 29467 },
        { min: 180000, max: Infinity, rate: 0.45, base: 51667 }
      ],
      medicareThreshold: 24276,
      medicareShadingMax: 30345,
      medicareRate: 0.02
    }
  }
};

/**
 * Calculates progressive Australian tax benefit for an eligible DGR gift.
 * Saving = TaxPayable(Income) - TaxPayable(Income - Gift)
 */
function calculateAustralianTaxBenefit(taxableIncome, eligibleDonation, yearKey = '2024-25', includeMedicare = true) {
  const config = AUSTRALIAN_TAX_CONFIG.years[yearKey] || AUSTRALIAN_TAX_CONFIG.years['2024-25'];

  function computeBaseIncomeTax(income) {
    if (income <= 0) return 0;
    const brackets = config.brackets;
    for (let i = brackets.length - 1; i >= 0; i--) {
      const b = brackets[i];
      if (income > b.min) {
        return b.base + (income - b.min) * b.rate;
      }
    }
    return 0;
  }

  function computeMedicareLevy(income) {
    if (!includeMedicare || income <= config.medicareThreshold) return 0;
    if (income <= config.medicareShadingMax) {
      // Shading-in range: 10% of excess over threshold
      return Math.min(income * config.medicareRate, (income - config.medicareThreshold) * 0.10);
    }
    return income * config.medicareRate;
  }

  const incomeBefore = Math.max(0, taxableIncome);
  const donation = Math.max(0, eligibleDonation);
  const incomeAfter = Math.max(0, incomeBefore - donation);

  const baseTaxBefore = computeBaseIncomeTax(incomeBefore);
  const baseTaxAfter  = computeBaseIncomeTax(incomeAfter);
  const baseTaxSaving = baseTaxBefore - baseTaxAfter;

  const medicareBefore = computeMedicareLevy(incomeBefore);
  const medicareAfter  = computeMedicareLevy(incomeAfter);
  const medicareSaving = medicareBefore - medicareAfter;

  const totalBenefit = baseTaxSaving + medicareSaving;
  const netOutOfPocket = Math.max(0, donation - totalBenefit);
  const effectiveSavingPct = donation > 0 ? (totalBenefit / donation) * 100 : 0;

  return {
    yearKey,
    incomeBefore,
    donation,
    incomeAfter,
    baseTaxBefore,
    baseTaxAfter,
    baseTaxSaving,
    medicareSaving,
    totalBenefit,
    netOutOfPocket,
    effectiveSavingPct
  };
}

function initBrickTaxMatrix() {
  const chips = document.querySelectorAll('.brick-chip');
  const customInput = document.getElementById('brick-custom-input');
  const incomeInput = document.getElementById('brick-income-input');
  const incomeChips = document.querySelectorAll('.income-preset-chip');
  const bracketSelect = document.getElementById('brick-tax-bracket');
  const donorInput = document.getElementById('brick-donor-name');
  const medicareCheckbox = document.getElementById('brick-include-medicare');

  const grossDisplay = document.getElementById('taxGrossVal');
  const incomeAfterDisplay = document.getElementById('taxIncomeAfterVal');
  const baseTaxSavingDisplay = document.getElementById('taxBaseSavingVal');
  const medicareSavingDisplay = document.getElementById('taxMedicareSavingVal');
  const refundDisplay = document.getElementById('taxRefundVal');
  const netDisplay = document.getElementById('taxNetVal');
  const rateLabel = document.getElementById('taxRateLbl');
  const btnAmtDisplay = document.getElementById('btnSponsorAmt');

  const brickPlaqueName = document.getElementById('brickEngravedName');
  const brickTierBadge = document.getElementById('brickTierBadge');
  const sponsorBtn = document.getElementById('btnSponsorBrickNow');

  // Interactive virtual brick wall tiles
  const brickTiles = document.querySelectorAll('.virtual-brick-tile');

  let currentDonationAmount = 250;
  let currentTaxableIncome = 90000;
  let currentTierLabel = '3 FOUNDATION BRICKS (PILLAR TIER)';

  function recalculate() {
    const gross = parseFloat(customInput ? customInput.value : currentDonationAmount) || 0;
    const income = parseFloat(incomeInput ? incomeInput.value : currentTaxableIncome) || 90000;
    const year = bracketSelect ? bracketSelect.value : '2024-25';
    const includeMedicare = medicareCheckbox ? medicareCheckbox.checked : true;

    const result = calculateAustralianTaxBenefit(income, gross, year, includeMedicare);

    if (grossDisplay) {
      grossDisplay.textContent = '$' + result.donation.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    }
    if (incomeAfterDisplay) {
      incomeAfterDisplay.textContent = '$' + result.incomeAfter.toLocaleString('en-AU') + ' AUD';
    }
    if (baseTaxSavingDisplay) {
      baseTaxSavingDisplay.textContent = '-$' + result.baseTaxSaving.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    }
    if (medicareSavingDisplay) {
      medicareSavingDisplay.textContent = '-$' + result.medicareSaving.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    }
    if (refundDisplay) {
      refundDisplay.textContent = '-$' + result.totalBenefit.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    }
    if (netDisplay) {
      netDisplay.textContent = '$' + result.netOutOfPocket.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    }
    if (rateLabel) {
      rateLabel.textContent = `${Math.round(result.effectiveSavingPct)}%`;
    }
    if (btnAmtDisplay) {
      btnAmtDisplay.textContent = result.donation.toLocaleString('en-AU');
    }

    // Dynamic family name inscription
    const donorName = (donorInput && donorInput.value.trim()) || 'SHARIKRISHNA & FAMILY';
    if (brickPlaqueName) {
      brickPlaqueName.textContent = donorName.toUpperCase();
    }
    if (brickTierBadge) {
      brickTierBadge.textContent = currentTierLabel.toUpperCase();
    }
  }

  // Tier chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const amt = parseFloat(chip.getAttribute('data-amount')) || 250;
      currentDonationAmount = amt;
      currentTierLabel = chip.getAttribute('data-label') || 'FOUNDATION BRICK';

      if (customInput) customInput.value = amt;
      recalculate();
    });
  });

  // Income chips
  incomeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      incomeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const inc = parseFloat(chip.getAttribute('data-income')) || 90000;
      currentTaxableIncome = inc;
      if (incomeInput) incomeInput.value = inc;
      recalculate();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      chips.forEach(c => c.classList.remove('active'));
      currentDonationAmount = parseFloat(customInput.value) || 0;
      currentTierLabel = currentDonationAmount >= 5000 ? 'DEITY MOOLASTHANAM SHRINE FOUNDER' :
                         (currentDonationAmount >= 2500 ? 'GOLD-PLATED KALASAM PATRON' :
                         (currentDonationAmount >= 1000 ? 'HAND-CARVED GRANITE SANCTUM STONE' :
                         (currentDonationAmount >= 500 ? '5 FOUNDATION BRICKS (WALL TIER)' :
                         (currentDonationAmount >= 250 ? '3 FOUNDATION BRICKS (PILLAR TIER)' : '1 SACRED FOUNDATION BRICK'))));
      recalculate();
    });
  }

  if (incomeInput) {
    incomeInput.addEventListener('input', () => {
      incomeChips.forEach(c => c.classList.remove('active'));
      currentTaxableIncome = parseFloat(incomeInput.value) || 0;
      recalculate();
    });
  }

  if (bracketSelect) bracketSelect.addEventListener('change', recalculate);
  if (medicareCheckbox) medicareCheckbox.addEventListener('change', recalculate);
  if (donorInput) donorInput.addEventListener('input', recalculate);

  // Virtual Brick Wall Selection Interaction
  brickTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (tile.classList.contains('funded')) {
        showToast('🧱 This brick has already been consecrated by a Ballarat patron family.');
        return;
      }
      brickTiles.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');

      const donorName = (donorInput && donorInput.value.trim()) || 'SHARIKRISHNA & FAMILY';
      const tileNameEl = tile.querySelector('.tile-engraving');
      if (tileNameEl) {
        tileNameEl.textContent = donorName.toUpperCase();
      }
      showToast(`Selected Virtual Granite Brick #${tile.getAttribute('data-brick-num') || '4281'}. Preview updated!`);
    });
  });

  if (sponsorBtn) {
    sponsorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const gross = parseFloat(customInput ? customInput.value : currentDonationAmount) || 250;
      const donor = donorInput ? donorInput.value.trim() : 'Devotee Patron';

      const donationModal = document.getElementById('donation-modal');
      const customAmtInput = document.getElementById('donation-custom-amount');
      const donorNameInput = document.getElementById('donor-name');
      const causeSelect = document.getElementById('donation-cause');

      if (customAmtInput) customAmtInput.value = gross;
      if (donorNameInput) donorNameInput.value = donor;
      if (causeSelect) causeSelect.value = 'Temple Construction Phase 2 (Sanctum Masonry)';

      if (donationModal) donationModal.classList.add('active');
      playTempleBellChime();
      showToast(`🧱 Opening Consecrated Brick Sponsorship e-Hundi for $${gross} AUD...`);
    });
  }

  recalculate();
}


/* ==========================================================================
   3. DIGITAL GOTRA SANKALP GENERATOR & CERTIFICATE STUDIO (SIGNATURE ARTIFACT 1)
   Includes Vedic Gotra Autocomplete, Nakshatra, Token Engine & Single-Page A4 Print
   ========================================================================== */

const VEDIC_GOTRAS = [
  'Kashyapa', 'Bharadwaja', 'Vasishta', 'Harita', 'Atri',
  'Vishwamitra', 'Gautama', 'Jamadagni', 'Kaundinya', 'Agastya'
];

function generateSankalpToken() {
  const year = new Date().getFullYear();
  // Cryptographically collision-resistant 4-hex random string
  const array = new Uint16Array(1);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    array[0] = Math.floor(1000 + Math.random() * 9000);
  }
  const tokenSuffix = (array[0] % 9000 + 1000).toString();
  return `BHTCC-${year}-SKLP-${tokenSuffix}`;
}

function initGotraSankalpGenerator() {
  const nameInput = document.getElementById('input-sankalp-name');
  const gotraInput = document.getElementById('input-sankalp-gotra');
  const nakshatraInput = document.getElementById('input-sankalp-nakshatra');
  const deitySelect = document.getElementById('input-sankalp-deity');
  const intentionInput = document.getElementById('input-sankalp-intention');
  const updateBtn = document.getElementById('btn-update-sankalp');
  const resetBtn = document.getElementById('btn-reset-sankalp');

  const displayName = document.getElementById('cert-display-name');
  const displayGotra = document.getElementById('cert-display-gotra');
  const displayDeity = document.getElementById('cert-display-deity');
  const displayIntention = document.getElementById('cert-display-intention');
  const displayDate = document.getElementById('cert-display-date');
  const displayToken = document.getElementById('cert-token-id');

  const whatsappBtn = document.getElementById('btn-share-whatsapp');
  const printBtn = document.getElementById('btn-print-sankalp');
  const intentionChips = document.querySelectorAll('.intention-preset-chip');

  function updateCertificate(regenerateToken = false) {
    const devotee = (nameInput && nameInput.value.trim()) || 'Devotee Patron & Family';
    const gotra = (gotraInput && gotraInput.value.trim()) || 'Kashyapa';
    const nakshatra = (nakshatraInput && nakshatraInput.value) || 'Rohini';
    const deityRaw = (deitySelect && deitySelect.value) || 'Lord Sri Ganesha';
    const deityClean = deityRaw.split('—')[0].split('(')[0].trim();
    const intention = (intentionInput && intentionInput.value.trim()) || 'Family Health, Peace & Auspicious Prosperity';

    if (displayName) displayName.textContent = devotee;
    if (displayGotra) displayGotra.textContent = `Gotra: ${gotra} • Nakshatra: ${nakshatra}`;
    if (displayDeity) displayDeity.textContent = `Presiding Deity: ${deityClean}`;
    if (displayIntention) {
      displayIntention.textContent = `"May the divine auspices of Ballarat Hindu Temple bless ${devotee} with the auspicious fulfillment of prayer: ${intention}. Chanted with authentic Vedic Agamic sankalp at Ross Creek Sanctuary."`;
    }

    if (displayDate) {
      const today = new Date().toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: BHTCC_COORDINATES.timeZone
      });
      displayDate.textContent = `Consecrated: ${today}`;
    }

    if (displayToken) {
      if (regenerateToken || !displayToken.getAttribute('data-locked')) {
        const token = generateSankalpToken();
        displayToken.textContent = token;
        displayToken.setAttribute('data-locked', 'true');
      }
    }
  }

  // Reactive inputs
  [nameInput, gotraInput, nakshatraInput, deitySelect, intentionInput].forEach(el => {
    if (el) {
      el.addEventListener('input', () => updateCertificate(false));
    }
  });

  // Quick intention chips
  intentionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      intentionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (intentionInput) {
        intentionInput.value = chip.getAttribute('data-intention') || chip.textContent.trim();
        updateCertificate(false);
      }
    });
  });

  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      updateCertificate(true);
      playTempleBellChime();
      showToast('✨ Sacred Gotra Sankalp Consecrated! Certificate & Reference Token Updated.');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (nameInput) nameInput.value = '';
      if (gotraInput) gotraInput.value = 'Kashyapa';
      if (nakshatraInput) nakshatraInput.value = 'Rohini';
      if (deitySelect) deitySelect.selectedIndex = 0;
      if (intentionInput) intentionInput.value = 'Family Health, Peace & Auspicious Prosperity';
      updateCertificate(true);
      showToast('Sankalp form reset.');
    });
  }

  // Safe WhatsApp Sharing with explicit user initiation and parameter encoding
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const devotee = (nameInput && nameInput.value.trim()) || 'Devotee Patron & Family';
      const gotra = (gotraInput && gotraInput.value.trim()) || 'Kashyapa';
      const nakshatra = (nakshatraInput && nakshatraInput.value) || 'Rohini';
      const deity = (deitySelect && deitySelect.value) ? deitySelect.value.split('—')[0].split('(')[0].trim() : 'Lord Sri Ganesha';
      const intention = (intentionInput && intentionInput.value.trim()) || 'Family Health, Peace & Auspicious Prosperity';
      const token = displayToken ? displayToken.textContent : 'BHTCC-2026-SKLP';

      const msg = [
        '🕉️ *BALLARAT HINDU TEMPLE & CULTURAL CENTRE INC. (BHTCC)*',
        '*Consecrated Vedic Gotra Sankalp Record*',
        '',
        `🙏 *Devotee:* ${devotee}`,
        `🪔 *Family Gotra:* ${gotra}`,
        `⭐ *Janma Nakshatra:* ${nakshatra}`,
        `🛕 *Presiding Deity:* ${deity}`,
        `📜 *Prayer Purpose:* "${intention}"`,
        `🏷️ *Reference Token:* ${token}`,
        '📍 *Sanctuary:* 110 Vaggs Rd, Ross Creek VIC 3351',
        '🏛️ *ABN:* 13 397 829 440 (DGR $2+ Tax-Deductible Registered Charity)',
        '',
        '_May your noble prayers be fulfilled under divine auspices!_',
        'https://csharikrishna.github.io/temple_templates/'
      ].join('\n');

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp with your Consecrated Sankalp...');
    });
  }

  // Dedicated Print Action
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      playTempleBellChime();
      window.print();
    });
  }

  updateCertificate(false);
}


/* ==========================================================================
   4. 5-ACRE ROSS CREEK CAMPUS INTERACTIVE ZONE EXPLORER (SIGNATURE ARTIFACT 2)
   Masterplan visualization with 5 zones, responsive hotspots & factual verification
   ========================================================================== */

const CAMPUS_ZONE_DATA = {
  '1': {
    title: 'Main Sri Ganesha Sanctum & 350-Capacity Prayer Hall',
    badge: 'Zone 1 • 350-Capacity Sanctum',
    phase: 'Phase 1 Structural Framing & Ground Slab Active',
    img: '/assets/t4_campus_blueprint_render.jpg',
    leadImg: '/assets/t4_flagship_hero_sanctum.jpg',
    desc: 'Traditional Dravidian granite stonework sanctum designed in strict adherence to Agamic Vastu Shastra principles. Anchored by the consecrated Sri Ganesha Garbha-griha, pradakshina circumambulatory path, and acoustic resonance hall for Vedic chanting.',
    specs: [
      '350-devotee indoor sacred congregation prayer hall',
      'Solid hand-carved black granite Moolasthanam altar',
      'Consecrated shrines for Lord Shiva, Murugan & Devi Mahalakshmi',
      'Ultra-HD 4K live broadcast pan-tilt camera grid for remote darshan',
      'Victorian Shire of Golden Plains planning approval endorsed'
    ],
    statusDisclaimer: 'Structural works active on site. Foundations and framing underway.'
  },
  '2': {
    title: 'Maha Annadanam Commercial Kitchen & Dining Complex',
    badge: 'Zone 2 • Annadanam Kitchen & Dining',
    phase: 'Council Approved • Civil Earthworks Ready',
    img: '/assets/t4_campus_blueprint_render.jpg',
    leadImg: '/assets/t1_sacred_annadanam_kitchen.jpg',
    desc: 'Industrial-grade commercial kitchen facility engineered under Victorian Food Safety (Food Act 1984) standards. Designed to prepare and distribute 500+ free hot sanctified vegetarian meals (Prasadam) every weekend and during major festivals.',
    specs: [
      'Industrial steam kettles, roti conveyor stations & walk-in cold storage',
      'Seated dining hall accommodating 250 devotees per sitting',
      '100% free community sanctified vegetarian food service',
      'Energy-efficient induction cookware backed by rooftop solar array',
      'Victorian Shire Health & Environmental Services certified'
    ],
    statusDisclaimer: 'Civil drainage and plumbing conduits completed; kitchen fit-out planned in Phase 2.'
  },
  '3': {
    title: 'Vedic Cultural Academy & Scriptural Heritage Library',
    badge: 'Zone 3 • Cultural Academy & Library',
    phase: 'Architectural Blueprints Finalized',
    img: '/assets/t4_campus_blueprint_render.jpg',
    leadImg: '/assets/granite_architecture.jpg',
    desc: 'A vibrant educational pavilion dedicated to preserving Sanatana Dharma heritage for youth across Ballarat and regional Victoria. Features modern multimedia classrooms for Sanskrit, Indian regional languages, Carnatic music, and Bharatanatyam dance.',
    specs: [
      '3 multipurpose cultural classrooms equipped with interactive smart screens',
      'Curated physical and digital library of Vedic scriptures & children’s literature',
      'Strict adherence to Victorian Child Safe Standards and WWCC protocols',
      'Community meeting spaces for senior citizens and youth leadership forums',
      'Acoustically isolated practice studios for classical Indian music'
    ],
    statusDisclaimer: 'Conceptual design endorsed; building permit documentation in progress.'
  },
  '4': {
    title: 'Landscaped Peace Meditation Groves & Ethical Goshala Vision',
    badge: 'Zone 4 • 2 Acres of Sacred Flora',
    phase: 'Eco-Landscape Planting Commenced',
    img: '/assets/t4_campus_blueprint_render.jpg',
    leadImg: '/assets/lakshmi_puja.jpg',
    desc: 'Harmoniously blending native Victorian flora with sacred Indian medicinal and flowering botanical specimens, including Tulasi, Bilva, and Neem. Features a tranquil walking trail for quiet Japa meditation, reflective ponds, and an ethical cow sanctuary vision.',
    specs: [
      'Walking meditation Pradakshina trail with sheltered stone bench seating',
      'Consecrated botanical groves of Bilva, Tulasi, and sacred flowering plants',
      'Rainwater harvesting retention ponds supporting campus self-sufficiency',
      'Proposed ethical cow shelter (Goshala) for compassionate community seva',
      'Native Australian tree preservation zone respecting regional biodiversity'
    ],
    statusDisclaimer: 'Tree planting and boundary earthworks active; Goshala subject to operational licensing.'
  },
  '5': {
    title: '75 Sealed Parking Bays, Universal DDA Access & Bus Concourse',
    badge: 'Zone 5 • Transport & Accessibility',
    phase: 'Civil Infrastructure Substantially Completed',
    img: '/assets/t4_campus_blueprint_render.jpg',
    leadImg: '/assets/bhtcc_site_plan.jpg',
    desc: 'High-capacity transport infrastructure funded in part by the $900k+ Victorian State Government grant. Delivers safe, dignified, step-free access for elders, prams, and pilgrims arriving from Melbourne, Geelong, and interstate.',
    specs: [
      '75 asphalt-sealed visitor, elder, and devotee car parking bays',
      'Dedicated tour bus turn-around bay and passenger drop-off shelter concourse',
      '100% Disability Discrimination Act (DDA) compliant step-free tactile ramps',
      'Modern accessible ambulant sanitary facilities and parenting rooms',
      'EV destination charging stations and sustainable solar lighting grid'
    ],
    statusDisclaimer: 'Civil drainage and sub-base complete; final asphalt seal scheduled upon heavy vehicle completion.'
  }
};

function initCampusZoneExplorer() {
  const zoneTabs = document.querySelectorAll('.zone-tab-btn');
  const zoneImg = document.getElementById('zone-spotlight-img');
  const zoneBadge = document.getElementById('zone-spotlight-badge');
  const zonePhase = document.getElementById('zone-phase-tag');
  const zoneTitle = document.getElementById('zone-spotlight-title');
  const zoneDesc = document.getElementById('zone-spotlight-desc');
  const zoneSpecs = document.getElementById('zone-spotlight-specs');
  const zoneHotspots = document.querySelectorAll('.masterplan-hotspot');

  function selectZone(zoneId) {
    const data = CAMPUS_ZONE_DATA[zoneId];
    if (!data) return;

    zoneTabs.forEach(t => {
      const active = t.getAttribute('data-zone') === zoneId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    zoneHotspots.forEach(hs => {
      const active = hs.getAttribute('data-zone') === zoneId;
      hs.classList.toggle('active', active);
    });

    if (zoneTitle) zoneTitle.textContent = data.title;
    if (zoneBadge) zoneBadge.textContent = data.badge;
    if (zonePhase) zonePhase.textContent = data.phase;
    if (zoneDesc) zoneDesc.textContent = data.desc;

    if (zoneImg) {
      zoneImg.style.opacity = '0.35';
      setTimeout(() => {
        zoneImg.src = data.leadImg || data.img;
        zoneImg.alt = data.title;
        zoneImg.style.opacity = '1';
      }, 140);
    }

    if (zoneSpecs && data.specs) {
      zoneSpecs.innerHTML = data.specs.map(s => `<li><span class="spec-check">✓</span> ${s}</li>`).join('');
    }
  }

  zoneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const zoneId = tab.getAttribute('data-zone') || '1';
      selectZone(zoneId);
      showToast(`Viewing: ${CAMPUS_ZONE_DATA[zoneId]?.title || 'Campus Zone'}`);
    });
  });

  zoneHotspots.forEach(hs => {
    hs.addEventListener('click', () => {
      const zoneId = hs.getAttribute('data-zone') || '1';
      selectZone(zoneId);
      showToast(`Selected Hotspot: ${CAMPUS_ZONE_DATA[zoneId]?.title || 'Campus Zone'}`);
    });
  });
}


/* ==========================================================================
   5. WEB AUDIO API SYNTHESIZER & LIVING SANCTUM ALTAR (FEATURE 1)
   Physical bronze bell chime with exponential overtone decay & Diya flame physics
   ========================================================================== */

let bellAudioCtx = null;

function playTempleBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!bellAudioCtx) {
      bellAudioCtx = new AudioContext();
    }
    if (bellAudioCtx.state === 'suspended') {
      bellAudioCtx.resume();
    }

    const t = bellAudioCtx.currentTime;

    // Fundamental Frequency (approx 880 Hz / A5)
    const osc1 = bellAudioCtx.createOscillator();
    const gain1 = bellAudioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, t);
    osc1.frequency.exponentialRampToValueAtTime(876, t + 2.2);

    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

    osc1.connect(gain1);
    gain1.connect(bellAudioCtx.destination);
    osc1.start(t);
    osc1.stop(t + 2.5);

    // Harmonic Overtone (approx 1760 Hz / A6)
    const osc2 = bellAudioCtx.createOscillator();
    const gain2 = bellAudioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1760, t);
    osc2.frequency.exponentialRampToValueAtTime(1750, t + 1.8);

    gain2.gain.setValueAtTime(0.2, t);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

    osc2.connect(gain2);
    gain2.connect(bellAudioCtx.destination);
    osc2.start(t);
    osc2.stop(t + 1.8);

    // Third Sub-Harmonic Metallic Shimmer (approx 2640 Hz / E7)
    const osc3 = bellAudioCtx.createOscillator();
    const gain3 = bellAudioCtx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(2640, t);

    gain3.gain.setValueAtTime(0.08, t);
    gain3.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

    osc3.connect(gain3);
    gain3.connect(bellAudioCtx.destination);
    osc3.start(t);
    osc3.stop(t + 1.2);
  } catch (err) {
    console.warn('Web Audio Bell Synth notice:', err);
  }
}

let liveDiyaCount = 4289;

function initLivingDiyaStage() {
  const deepamBtn = document.getElementById('btn-offer-deepam');
  const interactiveDiya = document.getElementById('interactive-brass-diya');
  const diyaCounterEl = document.getElementById('diya-counter-num');
  const flameEl = document.getElementById('diya-flame-element');
  const feedBox = document.getElementById('sanctum-feed-box');
  const bellBtn = document.getElementById('btn-offer-bell');
  const flowerBtn = document.getElementById('btn-offer-flowers');
  const bellIcon = document.getElementById('sanctum-bell-icon');

  function triggerDiyaOffering() {
    liveDiyaCount++;
    if (diyaCounterEl) {
      diyaCounterEl.textContent = liveDiyaCount.toLocaleString();
    }

    if (flameEl) {
      flameEl.style.transform = 'scale(1.4)';
      flameEl.style.filter = 'drop-shadow(0 0 25px #FFD000) drop-shadow(0 0 45px #FF6A00)';
      setTimeout(() => {
        flameEl.style.transform = '';
        flameEl.style.filter = '';
      }, 1200);
    }

    if (feedBox) {
      showOfferingAnimation('🪔', feedBox);
    }

    playTempleBellChime();
    showToast('🪔 Sacred Diya Lighted! Your prayer shines before Lord Sri Ganesha at Ross Creek.');
  }

  if (interactiveDiya) {
    interactiveDiya.style.cursor = 'pointer';
    interactiveDiya.addEventListener('click', triggerDiyaOffering);
  }

  if (deepamBtn) {
    deepamBtn.addEventListener('click', triggerDiyaOffering);
  }

  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      playTempleBellChime();
      if (bellIcon) {
        bellIcon.classList.remove('bell-swinging');
        void bellIcon.offsetWidth;
        bellIcon.classList.add('bell-swinging');
      }
      if (feedBox) showOfferingAnimation('🔔', feedBox);
      showToast('🔔 Temple Bell Chimed! Vedic vibrations echo through the Sanctum.');
    });
  }

  if (flowerBtn && feedBox) {
    flowerBtn.addEventListener('click', () => {
      playTempleBellChime();
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          showOfferingAnimation('🌸', feedBox);
        }, i * 160);
      }
      showToast('🌸 Pushpanjali Offered! Fresh lotus and marigold flowers shower the Altar.');
    });
  }
}

function showOfferingAnimation(symbol, container) {
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'floating-offering-token';
  el.textContent = symbol;
  el.style.position = 'absolute';
  el.style.left = `${30 + Math.random() * 40}%`;
  el.style.bottom = '20%';
  el.style.fontSize = `${1.8 + Math.random() * 1.2}rem`;
  el.style.pointerEvents = 'none';
  el.style.zIndex = '50';
  el.style.transition = 'all 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
  el.style.opacity = '1';

  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = `translate(${(Math.random() - 0.5) * 120}px, -180px) scale(1.3) rotate(${(Math.random() - 0.5) * 40}deg)`;
    el.style.opacity = '0';
  });

  setTimeout(() => {
    el.remove();
  }, 1700);
}


/* ==========================================================================
   6. PUJA FILTERING & SEVAS CATALOG
   ========================================================================== */

function initPujaFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.puja-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


/* ==========================================================================
   7. INTERACTIVE MODALS (PUJA BOOKING & E-HUNDI DONATION)
   Includes full keyboard accessibility (Escape key, ARIA, focus trapping)
   ========================================================================== */

function initModals() {
  const pujaModal = document.getElementById('puja-modal');
  const openPujaBtns = document.querySelectorAll('.open-puja-modal');
  const closePujaBtn = document.getElementById('close-puja-modal');
  const pujaTitleInput = document.getElementById('modal-puja-name');

  openPujaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sevaName = btn.getAttribute('data-seva') || 'Maha Rudrabhishek with 108 Bilva Patra';
      if (pujaTitleInput) pujaTitleInput.textContent = sevaName;
      if (pujaModal) {
        pujaModal.classList.add('active');
        const firstInput = pujaModal.querySelector('input');
        if (firstInput) firstInput.focus();
      }
      playTempleBellChime();
    });
  });

  if (closePujaBtn && pujaModal) {
    closePujaBtn.addEventListener('click', () => pujaModal.classList.remove('active'));
  }

  const donationModal = document.getElementById('donation-modal');
  const openDonationBtns = document.querySelectorAll('.open-donation-modal');
  const closeDonationBtn = document.getElementById('close-donation-modal');

  openDonationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (donationModal) {
        donationModal.classList.add('active');
        const firstInput = donationModal.querySelector('input');
        if (firstInput) firstInput.focus();
      }
      playTempleBellChime();
    });
  });

  if (closeDonationBtn && donationModal) {
    closeDonationBtn.addEventListener('click', () => donationModal.classList.remove('active'));
  }

  // Backdrop click dismiss
  [pujaModal, donationModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Global Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pujaModal) pujaModal.classList.remove('active');
      if (donationModal) donationModal.classList.remove('active');
      const confirmModal = document.getElementById('confirmation-modal');
      if (confirmModal) confirmModal.remove();
    }
  });

  // Preset donation chips inside modal
  const presetChips = document.querySelectorAll('.preset-chip');
  const customAmountInput = document.getElementById('donation-custom-amount');

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const amt = chip.getAttribute('data-val');
      if (customAmountInput && amt) {
        customAmountInput.value = amt;
      }
    });
  });

  // Puja Form Submission
  const pujaForm = document.getElementById('puja-booking-form');
  if (pujaForm) {
    pujaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const devotee = document.getElementById('devotee-name')?.value || 'Devotee Patron';
      const gotra = document.getElementById('devotee-gotra')?.value || 'Kashyapa';
      const ref = 'SEVA-' + Math.floor(100000 + Math.random() * 900000);

      if (pujaModal) pujaModal.classList.remove('active');
      showConfirmationModal(
        '🙏 Seva Booked with Sankalp!',
        `Your personalized sacred seva has been recorded for <strong>${devotee}</strong> (Gotra: ${gotra}).<br><br>
         <strong>Booking Ref:</strong> ${ref}<br>
         A consecrated BHTCC Vedic priest will chant your sacred Sankalp before the presiding deity at Ross Creek.`
      );
      playTempleBellChime();
    });
  }

  // Donation Form Submission
  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = customAmountInput ? customAmountInput.value : '101';
      const cause = document.getElementById('donation-cause')?.value || 'General Sanctuary Development';
      const recNo = 'ATO-DGR-' + Math.floor(100000 + Math.random() * 900000);

      if (donationModal) donationModal.classList.remove('active');
      showConfirmationModal(
        '🌸 Auspicious Contribution Gratefully Received!',
        `Your noble gift of <strong>$${amount} AUD</strong> towards <em>${cause}</em> has been recorded.<br><br>
         <strong>Official DGR Receipt No:</strong> ${recNo}<br>
         Ballarat Hindu Temple & Cultural Centre Inc. (ABN 13 397 829 440) is an ATO-endorsed Deductible Gift Recipient. Your tax-deductible receipt has been dispatched.`
      );
      playTempleBellChime();
    });
  }
}

function showConfirmationModal(title, messageHtml) {
  const existing = document.getElementById('confirmation-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="confirmation-modal" class="modal-overlay active" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <div class="modal-container" style="max-width: 500px; text-align: center;">
        <div class="modal-header" style="justify-content: center;">
          <h3 id="confirm-modal-title" style="font-size: 1.15rem; color: #FAF7F2;">${title}</h3>
        </div>
        <div class="modal-body" style="padding: 2.25rem 2rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🕉️</div>
          <p style="font-size: 0.95rem; color: #D4CFC7; line-height: 1.6; margin-bottom: 1.75rem;">
            ${messageHtml}
          </p>
          <button onclick="document.getElementById('confirmation-modal').remove()" class="btn btn-gold btn-lg" style="width: 100%;">
            Blessed & Acknowledged
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function showToast(msg) {
  let toast = document.getElementById('temple-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'temple-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#161B26';
    toast.style.color = '#FAF7F2';
    toast.style.border = '1px solid #D4AF37';
    toast.style.padding = '0.75rem 1.25rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 12px 32px rgba(0,0,0,0.6)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3400);
}


/* ==========================================================================
   8. DYNAMIC CURRENCY & REGION TOGGLE (AUD $ / INR ₹)
   ========================================================================== */

function initCurrencyToggle() {
  const toggleBtn = document.getElementById('currency-toggle');
  if (!toggleBtn) return;

  let currentCurrency = 'AUD';

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentCurrency === 'AUD') {
      currentCurrency = 'INR';
      toggleBtn.textContent = '🇮🇳 INR (₹)';
      updatePrices('INR');
      showToast('Switched display currency to Indian Rupee (₹)');
    } else {
      currentCurrency = 'AUD';
      toggleBtn.textContent = '🇦🇺 AUD ($)';
      updatePrices('AUD');
      showToast('Switched display currency to Australian Dollar ($)');
    }
  });
}

function updatePrices(currency) {
  const priceElements = document.querySelectorAll('.price-val');
  priceElements.forEach(el => {
    const aud = el.getAttribute('data-aud');
    const inr = el.getAttribute('data-inr');
    if (currency === 'INR' && inr) {
      el.textContent = `₹${inr}`;
    } else if (currency === 'AUD' && aud) {
      el.textContent = `$${aud}`;
    }
  });
}

// Global window exposure for tests and inline handlers
if (typeof window !== 'undefined') {
  window.playTempleBellChime = playTempleBellChime;
  window.showToast = showToast;
  window.initLivingDiyaStage = initLivingDiyaStage;
  window.initGotraSankalpGenerator = initGotraSankalpGenerator;
  window.initCampusZoneExplorer = initCampusZoneExplorer;
  window.initBrickTaxMatrix = initBrickTaxMatrix;
  window.initLivePanchangamEngine = initLivePanchangamEngine;
  window.calculateBallaratSunTimes = calculateBallaratSunTimes;
  window.calculateAustralianTaxBenefit = calculateAustralianTaxBenefit;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateBallaratSunTimes,
    calculateAustralianTaxBenefit,
    AUSTRALIAN_TAX_CONFIG,
    BHTCC_COORDINATES,
    BHTCC_AARTI_SCHEDULE
  };
}
