/**
 * TEMPLATE 1: ROYAL KUMKUM & TEMPLE GOLD - JAVASCRIPT ARCHITECTURE
 * Classical Ashram & Ceremonial Mandir (BHTCC)
 * Zero External Runtime Dependencies - Pure ES6 & Web Audio API
 */

document.addEventListener('DOMContentLoaded', () => {
  try { if (typeof initBellSynthesizer === 'function') initBellSynthesizer(); } catch(e){}
  try { if (typeof initPushpaFlowerShower === 'function') initPushpaFlowerShower(); } catch(e){}
  try { if (typeof initDiyaOfferingT1 === 'function') initDiyaOfferingT1(); } catch(e){}
  try { if (typeof initPriestBookingT1 === 'function') initPriestBookingT1(); } catch(e){}
  try { if (typeof initJapaMalaCounter === 'function') initJapaMalaCounter(); } catch(e){}
});

function initDonationFormT1() {}

/* -------------------------------------------------------------------------
   1. Web Audio API Temple Bell Synthesizer (Harmonic Bell Synth)
   ------------------------------------------------------------------------- */
function playTempleBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;

    // Fundamental strike frequency (A4 / 440 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(440, now + 2.2);

    // Harmonic metallic resonance (Triangle / 1320 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 1.4);

    // High shimmer overtone (Sine / 2640 Hz)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(2640, now);
    osc3.frequency.exponentialRampToValueAtTime(1320, now + 0.8);

    // Volume envelopes
    gain1.gain.setValueAtTime(0.45, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    gain2.gain.setValueAtTime(0.25, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    gain3.gain.setValueAtTime(0.15, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc3.connect(gain3); gain3.connect(ctx.destination);

    osc1.start(now); osc2.start(now); osc3.start(now);
    osc1.stop(now + 2.5); osc2.stop(now + 1.5); osc3.stop(now + 0.9);
  } catch (e) {
    console.warn("AudioContext error or policy blocked: ", e);
  }
}

function initBellSynthesizer() {
  const bellBtns = document.querySelectorAll('#bellBtn, .btn-ring-bell, [data-action="bell"]');
  bellBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playTempleBellChime();
      showToast('🔔 Consecrated Mandir Bell Chimed! May your prayers reach the Sanctum.');
    });
  });
}

/* -------------------------------------------------------------------------
   2. Pushpa Flower Shower (Falling Blossom Petals Animation)
   ------------------------------------------------------------------------- */
function triggerPushpaShower() {
  const container = document.getElementById('altarVideoScreen') || document.querySelector('.t1-video-screen') || document.body;
  const flowers = ['🌸', '🌺', '🌼', '🪷', '🏵️', '✨'];
  
  for (let i = 0; i < 35; i++) {
    const petal = document.createElement('div');
    petal.className = 'pushpa-petal';
    petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = (Math.random() * 92 + 4) + '%';
    petal.style.top = '-40px';
    petal.style.fontSize = (Math.random() * 1.5 + 1.1) + 'rem';
    petal.style.animationDuration = (Math.random() * 2 + 2.2) + 's';
    petal.style.animationDelay = (Math.random() * 0.7) + 's';
    
    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 4500);
  }
}

function initPushpaFlowerShower() {
  const flowerBtns = document.querySelectorAll('#flowerBtn, .btn-offer-flowers, [data-action="flower"]');
  flowerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerPushpaShower();
      showToast('🌸 Sacred Pushpanjali Offered to Lord Sri Ganesha!');
    });
  });
}

function triggerDiyaAnimationT1() {
  const container = document.getElementById('altarVideoScreen') || document.querySelector('.t1-video-screen') || document.body;
  const diya = document.createElement('div');
  diya.className = 't1-floating-diya';
  diya.innerHTML = '🪔';
  diya.style.position = 'absolute';
  diya.style.left = '50%';
  diya.style.bottom = '20px';
  diya.style.transform = 'translateX(-50%) scale(0.6)';
  diya.style.fontSize = '3.5rem';
  diya.style.zIndex = '25';
  diya.style.filter = 'drop-shadow(0 0 25px #FFD000) drop-shadow(0 0 45px #FF6A00)';
  diya.style.transition = 'all 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
  diya.style.opacity = '1';
  diya.style.pointerEvents = 'none';

  container.appendChild(diya);

  requestAnimationFrame(() => {
    diya.style.transform = 'translateX(-50%) translateY(-70px) scale(1.35)';
  });

  setTimeout(() => {
    diya.style.opacity = '0';
    diya.style.transform = 'translateX(-50%) translateY(-140px) scale(0.9)';
    setTimeout(() => diya.remove(), 800);
  }, 1400);
}

function initDiyaOfferingT1() {
  const diyaBtns = document.querySelectorAll('#diyaBtn, .btn-offer-diya, [data-action="diya"]');
  diyaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerDiyaAnimationT1();
      playTempleBellChime();
      showToast('🪔 Sacred Deepam Lighted! May the divine radiance of Sri Ganesha guide you.');
    });
  });
}


/* -------------------------------------------------------------------------
   3. Toast Notification Component
   ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('t1-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 't1-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.right = '28px';
    toast.style.background = '#3C0A11';
    toast.style.color = '#F3E5AB';
    toast.style.border = '1.5px solid #D4AF37';
    toast.style.padding = '0.85rem 1.4rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '700';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
  }, 3800);
}

/* -------------------------------------------------------------------------
   4. Priest Booking Form Handler (Worship Page)
   ------------------------------------------------------------------------- */
function initPriestBookingT1() {
  const form = document.getElementById('priestBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successBox = document.getElementById('priestSuccessBox');
    if (successBox) {
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('🙏 Priest Service Request Submitted! Mrs. Priya Rajan will contact you.');
    form.reset();
  });
}

/* -------------------------------------------------------------------------
   5. Donation Form & Instant ATO Tax Receipt Generator (Donate Page)
   ------------------------------------------------------------------------- */
let currentT1Amount = 50;

function selectAmt(val, btn) {
  currentT1Amount = val;
  document.querySelectorAll('.t1-amt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const custom = document.getElementById('customAmt');
  if (custom) custom.value = '';
  const display = document.getElementById('btnAmtDisplay');
  if (display) display.innerText = '$' + val + ' AUD';
}

function clearAmtBtns(val) {
  if (val && Number(val) > 0) {
    currentT1Amount = Number(val);
    document.querySelectorAll('.t1-amt-btn').forEach(b => b.classList.remove('active'));
    const display = document.getElementById('btnAmtDisplay');
    if (display) display.innerText = '$' + val + ' AUD';
  }
}

function processDonation(e) {
  if (e) e.preventDefault();
  const nameEl = document.getElementById('donorName');
  const fundEl = document.querySelector('input[name="fund"]:checked');
  const name = nameEl ? nameEl.value : 'Devotee Patron';
  const fund = fundEl ? fundEl.value : 'Ross Creek Capital Building Fund';

  const recDonor = document.getElementById('recDonor');
  const recFund = document.getElementById('recFund');
  const recAmt = document.getElementById('recAmt');
  const recDate = document.getElementById('recDate');
  const recNum = document.getElementById('recNum');
  const receiptResult = document.getElementById('receiptResult');

  if (recDonor) recDonor.innerText = name;
  if (recFund) recFund.innerText = fund;
  if (recAmt) recAmt.innerText = '$' + currentT1Amount + '.00 AUD';
  if (recDate) recDate.innerText = new Date().toLocaleString('en-AU', { dateStyle: 'long', timeStyle: 'short' });
  if (recNum) recNum.innerText = 'BHTCC-DGR-' + Math.floor(100000 + Math.random() * 900000);

  if (receiptResult) {
    receiptResult.style.display = 'block';
    receiptResult.scrollIntoView({ behavior: 'smooth' });
  }

  playTempleBellChime();
  showToast('🕉️ Sacred Offering Processed! Official ATO Tax Receipt Generated.');
}

function handleVolSubmit(e) {
  if (e) e.preventDefault();
  const successBox = document.getElementById('volSuccess');
  if (successBox) {
    successBox.style.display = 'block';
    successBox.scrollIntoView({ behavior: 'smooth' });
  }
  showToast('🙏 Thank you for volunteering! Mrs. Priya Rajan will contact you.');
  if (e && e.target && typeof e.target.reset === 'function') e.target.reset();
}

function handlePriestSubmit(e) {
  if (e) e.preventDefault();
  const successBox = document.getElementById('priestSuccessBox');
  if (successBox) {
    successBox.style.display = 'block';
    successBox.scrollIntoView({ behavior: 'smooth' });
  }
  playTempleBellChime();
  showToast('🙏 Priest Service Request Submitted! Mrs. Priya Rajan will contact you.');
  if (e && e.target && typeof e.target.reset === 'function') e.target.reset();
}

// Global exposure
window.playTempleBellChime = playTempleBellChime;
window.triggerPushpaShower = triggerPushpaShower;
window.showToast = showToast;
window.selectAmt = selectAmt;
window.clearAmtBtns = clearAmtBtns;
window.processDonation = processDonation;
window.handleVolSubmit = handleVolSubmit;
window.handlePriestSubmit = handlePriestSubmit;

/* -------------------------------------------------------------------------
   6. Vedic Japa Mala Counter & Sacred Drone Synthesizer (Feature)
   ------------------------------------------------------------------------- */
let t1MalaCount = 0;
let t1DroneCtx = null;
let t1DroneGain = null;
let t1DroneActive = false;

function playBeadChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now); // Solfeggio 528 Hz transformational frequency
    osc.frequency.exponentialRampToValueAtTime(1056, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {
    console.warn("AudioContext error: ", e);
  }
}

function toggleTanpuraDrone(btn) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (t1DroneActive) {
      if (t1DroneGain && t1DroneCtx) {
        t1DroneGain.gain.exponentialRampToValueAtTime(0.0001, t1DroneCtx.currentTime + 0.5);
        setTimeout(() => {
          if (t1DroneCtx && t1DroneCtx.state !== 'closed') t1DroneCtx.close();
          t1DroneActive = false;
        }, 550);
      }
      t1DroneActive = false;
      if (btn) btn.classList.remove('drone-active');
      showToast('🪕 Sacred Drone Paused.');
      return;
    }

    t1DroneCtx = new AudioContext();
    const now = t1DroneCtx.currentTime;

    const osc1 = t1DroneCtx.createOscillator(); // Root Sa (D3 146.83 Hz)
    const osc2 = t1DroneCtx.createOscillator(); // Fifth Pa (A3 220.00 Hz)
    const filter = t1DroneCtx.createBiquadFilter();
    t1DroneGain = t1DroneCtx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(146.83, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(220.00, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    t1DroneGain.gain.setValueAtTime(0.001, now);
    t1DroneGain.gain.exponentialRampToValueAtTime(0.12, now + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(t1DroneGain);
    t1DroneGain.connect(t1DroneCtx.destination);

    osc1.start(now);
    osc2.start(now);

    t1DroneActive = true;
    if (btn) btn.classList.add('drone-active');
    showToast('🪕 Sacred 432 Hz Tanpura Drone Active. Meditate with Sri Ganesha.');
  } catch (e) {
    console.warn("Drone error: ", e);
  }
}

function initJapaMalaCounter() {
  const japaBtn = document.getElementById('t1JapaBtn');
  const countDisplay = document.getElementById('t1MalaCount');
  const progressFill = document.getElementById('t1JapaProgress');
  const slokaEl = document.getElementById('t1SanskritSloka');
  const droneBtn = document.getElementById('t1DroneBtn');
  const resetBtn = document.getElementById('t1JapaResetBtn');

  if (japaBtn) {
    japaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      t1MalaCount++;
      if (t1MalaCount > 108) t1MalaCount = 1;

      if (countDisplay) countDisplay.textContent = t1MalaCount;
      if (progressFill) progressFill.style.width = ((t1MalaCount / 108) * 100) + '%';

      if (slokaEl) {
        slokaEl.classList.remove('glow-active');
        void slokaEl.offsetWidth;
        slokaEl.classList.add('glow-active');
      }

      playBeadChime();

      if (t1MalaCount === 108) {
        triggerPushpaShower();
        playTempleBellChime();
        showToast('🙏 108 Sacred Beads Consecrated! Full Ganesha Moola Mantra Mala Complete.');
      }
    });
  }

  if (droneBtn) {
    droneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTanpuraDrone(droneBtn);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      t1MalaCount = 0;
      if (countDisplay) countDisplay.textContent = '0';
      if (progressFill) progressFill.style.width = '0%';
      showToast('↺ Japa Mala Reset to 0.');
    });
  }
}
