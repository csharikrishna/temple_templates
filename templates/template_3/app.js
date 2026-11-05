/**
 * BHTCC DEVASTHANAMS TEMPLATE 3 - OPERATIONS COMMAND CENTER & PILGRIMAGE HUB
 * Features:
 * - 4-Language Real-Time Switcher (EN, TE, HI, TA)
 * - Live Operations Telemetry Stream (Darshan queue, parking, pilgrim counter)
 * - Interactive Statutory Pilgrim Pass Generation & Modal Management
 * - Devasthanam Treasury DGR Tax-Deductible Donation Processing
 * - Agamic Audio Chimes (Web Audio API Synthesizer)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTelemetryLoop();
  initPassModalListeners();
  initLanguageSelector();
});

/* -------------------------------------------------------------------------
   1. Multi-Lingual Government Switcher (EN, TE, HI, TA)
   ------------------------------------------------------------------------- */
const T3_TRANSLATIONS = {
  EN: {
    name: 'English',
    welcome: 'Official Victorian Devasthanams & Pilgrim Portal',
    ticker: '⚠️ Victorian Government $900k+ Grant Construction Progress Active • Ganesha Moolasthanam Granite Slabs Scheduled • Special Entry Seva Slots Open for Weekend Sanctum Darshan • ABN: 13 397 829 440'
  },
  TE: {
    name: 'తెలుగు (Telugu)',
    welcome: 'బల్లారట్ హిందూ దేవాలయం మరియు సాంస్కృతిక కేంద్రం - అధికారిక దర్శన పోర్టల్',
    ticker: '⚠️ విక్టోరియన్ ప్రభుత్వం $900k+ నిర్మాణ గ్రాంట్ పురోగతిలో ఉంది • శ్రీ గణేశ మూలస్థానం గ్రానైట్ పనులు ప్రారంభమయ్యాయి • వారాంతపు ప్రత్యేక దర్శన స్లాట్లు అందుబాటులో ఉన్నాయి • ABN: 13 397 829 440'
  },
  HI: {
    name: 'हिन्दी (Hindi)',
    welcome: 'बल्लारैट हिन्दू मंदिर एवं सांस्कृतिक केंद्र - आधिकारिक दर्शन एवं सेवा पोर्टल',
    ticker: '⚠️ विक्टोरियन सरकार $900k+ ग्रांट निर्माण कार्य प्रगति पर है • श्री गणेश मूलस्थानम ग्रेनाइट स्थापना निर्धारित • सप्ताहांत विशेष दर्शन स्लॉट उपलब्ध • ABN: 13 397 829 440'
  },
  TA: {
    name: 'தமிழ் (Tamil)',
    welcome: 'பல்லாரட் இந்து கோவில் மற்றும் கலாச்சார மையம் - அதிகாரப்பூர்வ தரிசன தளம்',
    ticker: '⚠️ விக்டோரிய அரசு $900k+ மானிய கட்டுமான பணிகள் மும்முரமாக நடைபெறுகின்றன • ஸ்ரீ கணபதி மூலஸ்தான கருங்கல் பணிகள் • சிறப்பு தரிசன முன்பதிவு ஆரம்பம் • ABN: 13 397 829 440'
  }
};

function switchLanguage(langCode, btnElement) {
  // Update button active state in all language switchers
  const allSwitchers = document.querySelectorAll('.t3-lang-switcher');
  allSwitchers.forEach(sw => {
    sw.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.trim().toUpperCase().startsWith(langCode) || 
          (langCode === 'TE' && btn.textContent.includes('తెలుగు')) ||
          (langCode === 'HI' && btn.textContent.includes('हिन्दी')) ||
          (langCode === 'TA' && btn.textContent.includes('தமிழ்')) ||
          (langCode === 'EN' && btn.textContent.includes('English'))) {
        btn.classList.add('active');
      }
    });
  });

  const langData = T3_TRANSLATIONS[langCode];
  if (langData) {
    // Update ticker text if present
    const tickerSpan = document.querySelector('.t3-marquee span');
    if (tickerSpan) {
      tickerSpan.textContent = langData.ticker;
    }

    showT3Toast(`🏛️ Portal language switched to ${langData.name}`);
  }
}

function initLanguageSelector() {
  // Attach handlers if not using inline onclick
  document.querySelectorAll('.t3-lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      let code = 'EN';
      if (text.includes('తెలుగు')) code = 'TE';
      else if (text.includes('हिन्दी')) code = 'HI';
      else if (text.includes('தமிழ்')) code = 'TA';
      else if (text.includes('English')) code = 'EN';
      switchLanguage(code, btn);
    });
  });
}

/* -------------------------------------------------------------------------
   2. Live Operations Telemetry Stream (Jitter & Real-Time Sync)
   ------------------------------------------------------------------------- */
function initTelemetryLoop() {
  const qEl = document.getElementById('teleQueue');
  const parkEl = document.getElementById('teleParking');
  const pilgrimEl = document.getElementById('telePilgrims');
  const prasadEl = document.getElementById('telePrasad');
  const stampEl = document.getElementById('teleUpdateStamp');

  if (!qEl && !parkEl && !pilgrimEl) return;

  let basePilgrims = 1240;
  let basePrasad = 680;

  // Jitter telemetry every 12 seconds
  setInterval(() => {
    const queueMins = Math.floor(Math.random() * 8) + 10; // 10 to 17 mins
    const baysFree = Math.floor(Math.random() * 16) + 18; // 18 to 33 bays free
    basePilgrims += Math.floor(Math.random() * 4);
    basePrasad += Math.floor(Math.random() * 3);

    if (qEl) qEl.textContent = `${queueMins} - ${queueMins + 5} Mins (Free Flow)`;
    if (parkEl) parkEl.textContent = `${baysFree} of 75 Bays Available`;
    if (pilgrimEl) pilgrimEl.textContent = `${basePilgrims.toLocaleString()} Devotees`;
    if (prasadEl) prasadEl.textContent = `${basePrasad.toLocaleString()} Sacred Plates`;

    if (stampEl) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      stampEl.textContent = `Telemetry refreshed at ${timeStr} (VIC AEDT)`;
    }
  }, 12000);
}

/* -------------------------------------------------------------------------
   3. Interactive Statutory Pilgrim Entry Pass Modal
   ------------------------------------------------------------------------- */
function openPassModal(title, fee, queue) {
  const modal = document.getElementById('passModal');
  if (!modal) return;

  const titleEl = document.getElementById('modalPassTitle');
  const idEl = document.getElementById('modalPassId');
  const dateEl = document.getElementById('modalPassDate');
  const queueEl = document.getElementById('modalPassQueue');
  const feeEl = document.getElementById('modalPassFee');
  const serialEl = document.getElementById('modalBarcodeSerial');

  const randomPassNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });

  if (titleEl) titleEl.textContent = title || 'Special Entry Darshan (SED)';
  if (idEl) idEl.textContent = `PASS-2026-${randomPassNum}`;
  if (dateEl) dateEl.textContent = `${dateStr} • Valid Today`;
  if (queueEl) queueEl.textContent = queue || 'Express Sanctum Queue';
  if (feeEl) feeEl.textContent = fee || '$10 AUD';
  if (serialEl) serialEl.textContent = `BHTCC-AU-${randomPassNum}-` + Math.random().toString(36).substring(2, 7).toUpperCase();

  modal.classList.add('active');
  playTemplePassChime();
}

function closePassModal() {
  const modal = document.getElementById('passModal');
  if (modal) modal.classList.remove('active');
}

function initPassModalListeners() {
  const modal = document.getElementById('passModal');
  if (!modal) return;

  // Close when clicking outside dialog container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePassModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePassModal();
    }
  });
}

/* -------------------------------------------------------------------------
   4. Audio Chime Synthesizer (Web Audio API)
   ------------------------------------------------------------------------- */
function playTemplePassChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Sacred dual-frequency acoustic chime
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz Solfeggio frequency
    osc1.frequency.exponentialRampToValueAtTime(264, ctx.currentTime + 1.2);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1056, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(528, ctx.currentTime + 0.8);

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1.2);
    osc2.stop(ctx.currentTime + 0.8);
  } catch (err) {
    // Gracefully handle browser autoplay blocks
    console.log('Web Audio notification available upon user gesture', err);
  }
}

/* -------------------------------------------------------------------------
   5. Official Statutory Toast System
   ------------------------------------------------------------------------- */
function showT3Toast(message) {
  let toast = document.getElementById('t3ToastContainer');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 't3ToastContainer';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#111816';
    toast.style.color = '#F3E5AB';
    toast.style.border = '1px solid #B87333';
    toast.style.padding = '0.9rem 1.4rem';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)';
    toast.style.zIndex = '10000';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.65rem';
    toast.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>⚖️</span> <span>${message}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 4000);
}

/* -------------------------------------------------------------------------
   6. Official DGR Donation & e-Hundi Terminal
   ------------------------------------------------------------------------- */
let t3DonationAmt = 50;

function setT3Amt(val, btn) {
  t3DonationAmt = val;
  document.querySelectorAll('.t3-table-btn').forEach(b => {
    if (b.textContent.startsWith('$')) {
      b.classList.remove('active');
    }
  });
  if (btn) btn.classList.add('active');
  const customInput = document.getElementById('t3CustomInput');
  if (customInput) customInput.value = '';
  const label = document.getElementById('t3AmtLabel');
  if (label) label.innerText = '$' + val + '.00 AUD';
}

function customT3Amt(val) {
  if (val && Number(val) > 0) {
    t3DonationAmt = Number(val);
    document.querySelectorAll('.t3-table-btn').forEach(b => {
      if (b.textContent.startsWith('$')) {
        b.classList.remove('active');
      }
    });
    const label = document.getElementById('t3AmtLabel');
    if (label) label.innerText = '$' + val + '.00 AUD';
  }
}

function handleT3Donation(e) {
  if (e && e.preventDefault) e.preventDefault();
  const nameEl = document.getElementById('t3DonorName');
  const campEl = document.querySelector('input[name="t3Camp"]:checked');
  const name = nameEl ? nameEl.value : 'Devotee Contributor';
  const camp = campEl ? campEl.value : 'Ross Creek Capital Building Fund';

  const recName = document.getElementById('t3RecName');
  const recAccount = document.getElementById('t3RecAccount');
  const recVal = document.getElementById('t3RecVal');
  const recTime = document.getElementById('t3RecTime');
  const recId = document.getElementById('t3RecId');
  const receiptBox = document.getElementById('t3ReceiptBox');

  if (recName) recName.innerText = name;
  if (recAccount) recAccount.innerText = camp;
  if (recVal) recVal.innerText = '$' + t3DonationAmt + '.00 AUD';
  if (recTime) recTime.innerText = new Date().toUTCString();
  if (recId) recId.innerText = 'BHTCC-AU-' + Math.floor(100000 + Math.random() * 900000);

  if (receiptBox) {
    receiptBox.style.display = 'block';
    receiptBox.scrollIntoView({ behavior: 'smooth' });
  }

  playTemplePassChime();
  showT3Toast('Official DGR Tax Receipt Generated & Sent to Devotee!');
}

function enrollMembershipT3(planName) {
  playTemplePassChime();
  showT3Toast(`Enrolled in ${planName} Register! Statutory dossier initiated.`);
}

/* -------------------------------------------------------------------------
   7. Official Priest Deployment & Volunteer Handling
   ------------------------------------------------------------------------- */
function handleT3Priest(e) {
  if (e && e.preventDefault) e.preventDefault();
  const successEl = document.getElementById('t3Success');
  if (successEl) successEl.style.display = 'block';
  playTemplePassChime();
  showT3Toast('Priest Requisition successfully registered in Devasthanam Registry!');
  if (e && e.target && typeof e.target.reset === 'function') {
    e.target.reset();
  }
}

function handleT3Volunteer(e) {
  if (e && e.preventDefault) e.preventDefault();
  playTemplePassChime();
  showT3Toast('Enlisted in Sevadal Register! Secretary Mrs. Priya Rajan will contact you with WWCC guidelines.');
  if (e && e.target && typeof e.target.reset === 'function') {
    e.target.reset();
  }
}

// Global exposure for inline HTML attributes
window.switchLanguage = switchLanguage;
window.openPassModal = openPassModal;
window.closePassModal = closePassModal;
window.showT3Toast = showT3Toast;
window.playTemplePassChime = playTemplePassChime;
window.setT3Amt = setT3Amt;
window.customT3Amt = customT3Amt;
window.handleT3Donation = handleT3Donation;
window.enrollMembershipT3 = enrollMembershipT3;
window.handleT3Priest = handleT3Priest;
window.handleT3Volunteer = handleT3Volunteer;
