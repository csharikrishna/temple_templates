/**
 * TEMPLATE 1: ROYAL KUMKUM & TEMPLE GOLD - JAVASCRIPT ARCHITECTURE
 * Classical Ceremonial Mandir (Ballarat Hindu Temple & Cultural Centre Inc.)
 * Zero External Framework Bloat - Pure ES6 & Web Audio API
 */

document.addEventListener('DOMContentLoaded', () => {
  try { if (typeof initBellSynthesizer === 'function') initBellSynthesizer(); } catch(e){}
  try { if (typeof initPushpaFlowerShower === 'function') initPushpaFlowerShower(); } catch(e){}
  try { if (typeof initDiyaOfferingT1 === 'function') initDiyaOfferingT1(); } catch(e){}
  try { if (typeof initPriestBookingT1 === 'function') initPriestBookingT1(); } catch(e){}
  try { if (typeof initJapaMalaCounter === 'function') initJapaMalaCounter(); } catch(e){}
});

/* -------------------------------------------------------------------------
   1. Authentic 432 Hz Multi-Harmonic Bronze Bell Synthesizer (Web Audio API)
   Artistic Audio Reference — User Initiated Only
   ------------------------------------------------------------------------- */
function playTempleBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Master Gain to prevent harsh clipping
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, now);
    masterGain.connect(ctx.destination);

    // Consecrated 432 Hz Sacred Bronze Fundamental & Harmonically Rich Overtone Series
    // 0. Sub-bass bronze body resonance (216 Hz)
    const osc0 = ctx.createOscillator();
    const gain0 = ctx.createGain();
    osc0.type = 'sine';
    osc0.frequency.setValueAtTime(216, now);
    osc0.frequency.exponentialRampToValueAtTime(214, now + 3.0);
    gain0.gain.setValueAtTime(0.35, now);
    gain0.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
    osc0.connect(gain0); gain0.connect(masterGain);

    // 1. Fundamental (432 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(432, now);
    osc1.frequency.exponentialRampToValueAtTime(430, now + 3.2);
    gain1.gain.setValueAtTime(0.55, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    osc1.connect(gain1); gain1.connect(masterGain);

    // 2. Tierce - Minor 3rd resonance (518.4 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(518.4, now);
    osc2.frequency.exponentialRampToValueAtTime(514, now + 2.4);
    gain2.gain.setValueAtTime(0.32, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
    osc2.connect(gain2); gain2.connect(masterGain);

    // 3. Quint - 5th overtone (648 Hz)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(648, now);
    osc3.frequency.exponentialRampToValueAtTime(642, now + 2.0);
    gain3.gain.setValueAtTime(0.24, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);
    osc3.connect(gain3); gain3.connect(masterGain);

    // 4. Nominal - Octave (864 Hz)
    const osc4 = ctx.createOscillator();
    const gain4 = ctx.createGain();
    osc4.type = 'triangle';
    osc4.frequency.setValueAtTime(864, now);
    osc4.frequency.exponentialRampToValueAtTime(858, now + 1.6);
    gain4.gain.setValueAtTime(0.18, now);
    gain4.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
    osc4.connect(gain4); gain4.connect(masterGain);

    // 5. High Shimmer Metallic Overtones (1728 Hz)
    const osc5 = ctx.createOscillator();
    const gain5 = ctx.createGain();
    osc5.type = 'sine';
    osc5.frequency.setValueAtTime(1728, now);
    osc5.frequency.exponentialRampToValueAtTime(1296, now + 1.1);
    gain5.gain.setValueAtTime(0.10, now);
    gain5.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    osc5.connect(gain5); gain5.connect(masterGain);

    // Trigger oscillations
    osc0.start(now); osc1.start(now); osc2.start(now); osc3.start(now); osc4.start(now); osc5.start(now);
    osc0.stop(now + 3.5); osc1.stop(now + 3.6); osc2.stop(now + 2.6); osc3.stop(now + 2.2); osc4.stop(now + 1.8); osc5.stop(now + 1.2);
  } catch (e) {
    console.warn("AudioContext policy or error: ", e);
  }
}

function triggerBellSwingAnimation() {
  const bellRig = document.getElementById('t1HangingBellRig');
  const waves = document.getElementById('t1BellWaves');

  if (bellRig) {
    bellRig.classList.remove('swinging');
    void bellRig.offsetWidth; // Trigger reflow
    bellRig.classList.add('swinging');
  }

  if (waves) {
    waves.classList.remove('wave-active');
    void waves.offsetWidth;
    waves.classList.add('wave-active');
  }

  playTempleBellChime();
  showToast('🔔 Consecrated Bronze Mandir Bell Chimed! (432 Hz Artistic Reference)');
}

function initBellSynthesizer() {
  const bellBtns = document.querySelectorAll('#bellBtn, .btn-ring-bell, [data-action="bell"]');
  const bellRig = document.getElementById('t1HangingBellRig');
  const bellRope = document.getElementById('t1BellRope');

  bellBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerBellSwingAnimation();
    });
  });

  if (bellRig) {
    bellRig.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerBellSwingAnimation();
    });
    bellRig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        triggerBellSwingAnimation();
      }
    });
  }

  if (bellRope) {
    bellRope.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerBellSwingAnimation();
    });
    bellRope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        triggerBellSwingAnimation();
      }
    });
  }
}

/* -------------------------------------------------------------------------
   2. Pushpanjali Blossom Shower (Sacred Lotus & Jasmine Flower Particles)
   ------------------------------------------------------------------------- */
function triggerPushpaShower() {
  const container = document.getElementById('altarVideoScreen') || document.querySelector('.t1-video-screen') || document.body;
  const sacredBlooms = ['🌸', '🪷', '🌼', '🌺', '🏵️', '✨'];
  
  for (let i = 0; i < 42; i++) {
    const petal = document.createElement('div');
    petal.className = 'pushpa-petal';
    petal.textContent = sacredBlooms[Math.floor(Math.random() * sacredBlooms.length)];
    petal.style.left = (Math.random() * 92 + 4) + '%';
    petal.style.top = '-35px';
    petal.style.fontSize = (Math.random() * 1.5 + 1.1) + 'rem';
    petal.style.animationDuration = (Math.random() * 2 + 2.4) + 's';
    petal.style.animationDelay = (Math.random() * 0.75) + 's';
    petal.style.zIndex = '60';
    petal.style.position = 'absolute';
    petal.style.pointerEvents = 'none';
    
    container.appendChild(petal);

    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, 4800);
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

/* -------------------------------------------------------------------------
   3. Akhanda Deepam (Living Sacred Brass Flame Animation)
   ------------------------------------------------------------------------- */
function triggerAkhandaDeepamOffering() {
  const deepamEl = document.getElementById('t1AkhandaDeepam');
  if (deepamEl) {
    deepamEl.classList.add('rekindled');
    setTimeout(() => deepamEl.classList.remove('rekindled'), 2200);
  }
  const glowOverlay = document.getElementById('t1SanctumGlowOverlay');
  const container = document.getElementById('altarVideoScreen') || document.body;

  if (glowOverlay) {
    glowOverlay.classList.remove('glow-boost');
    void glowOverlay.offsetWidth;
    glowOverlay.classList.add('glow-boost');
    setTimeout(() => {
      glowOverlay.classList.remove('glow-boost');
    }, 2800);
  }

  // Floating Diya Aura Animation
  const diya = document.createElement('div');
  diya.className = 't1-floating-diya';
  diya.innerHTML = '🪔';
  diya.style.position = 'absolute';
  diya.style.left = '50%';
  diya.style.bottom = '25px';
  diya.style.transform = 'translateX(-50%) scale(0.6)';
  diya.style.fontSize = '3.5rem';
  diya.style.zIndex = '50';
  diya.style.filter = 'drop-shadow(0 0 25px #FFD000) drop-shadow(0 0 50px #FF6A00)';
  diya.style.transition = 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
  diya.style.opacity = '1';
  diya.style.pointerEvents = 'none';

  container.appendChild(diya);

  requestAnimationFrame(() => {
    diya.style.transform = 'translateX(-50%) translateY(-85px) scale(1.4)';
  });

  setTimeout(() => {
    diya.style.opacity = '0';
    diya.style.transform = 'translateX(-50%) translateY(-160px) scale(0.9)';
    setTimeout(() => {
      if (diya.parentNode) diya.parentNode.removeChild(diya);
    }, 800);
  }, 1500);

  playTempleBellChime();
  showToast('🪔 Sacred Akhanda Deepam Rekindled! May divine radiance guide you.');
}

function initDiyaOfferingT1() {
  const diyaBtns = document.querySelectorAll('#diyaBtn, .btn-offer-diya, [data-action="diya"]');
  const deepamWidget = document.getElementById('t1AkhandaDeepam');

  diyaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAkhandaDeepamOffering();
    });
  });

  if (deepamWidget) {
    deepamWidget.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerAkhandaDeepamOffering();
    });
    deepamWidget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        triggerAkhandaDeepamOffering();
      }
    });
  }
}

/* -------------------------------------------------------------------------
   4. Consecrated 528 Hz Japa Mala 108 Beads Tracker & Synthesizer
   (Artistic 528 Hz Harmonic Chime)
   ------------------------------------------------------------------------- */
let t1MalaCount = 0;
let t1MalaRounds = 0;
let t1DroneCtx = null;
let t1DroneGain = null;
let t1DroneActive = false;
let lastBeadAdvanceTime = 0;

function playBeadChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now); // Artistic 528 Hz Chime
    osc.frequency.exponentialRampToValueAtTime(1056, now + 0.18);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);
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
      showToast('🪕 Tanpura Drone Paused.');
      return;
    }

    t1DroneCtx = new AudioContext();
    if (t1DroneCtx.state === 'suspended') {
      t1DroneCtx.resume();
    }
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
    showToast('🪕 Tanpura Drone Active (Artistic 432 Hz Tuning). Meditate with Sri Ganesha.');
  } catch (e) {
    console.warn("Drone error: ", e);
  }
}

function initJapaMalaCounter() {
  const japaBtn = document.getElementById('t1JapaBtn');
  const countDisplay = document.getElementById('t1MalaCount');
  const roundsDisplay = document.getElementById('t1MalaRounds');
  const progressFill = document.getElementById('t1JapaProgress');
  const progressTrack = document.getElementById('t1JapaProgressTrack');
  const slokaEl = document.getElementById('t1SanskritSloka');
  const droneBtn = document.getElementById('t1DroneBtn');
  const resetBtn = document.getElementById('t1JapaResetBtn');
  const strandEl = document.getElementById('t1MalaStrand');
  const completionCard = document.getElementById('t1MalaCompletionCard');
  const nextRoundBtn = document.getElementById('t1NextRoundBtn');

  // Populate 108 visual Rudraksha mala beads
  if (strandEl && strandEl.children.length === 0) {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= 108; i++) {
      const bead = document.createElement('div');
      bead.className = 't1-mala-bead';
      bead.id = 't1Bead_' + i;
      bead.title = 'Rudraksha Bead ' + i + ' of 108';
      bead.setAttribute('role', 'button');
      bead.setAttribute('tabindex', '0');
      bead.setAttribute('aria-label', 'Rudraksha Bead ' + i + ' of 108');
      
      bead.addEventListener('click', () => {
        advanceBead(i);
      });
      bead.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advanceBead(i);
        }
      });
      fragment.appendChild(bead);
    }
    strandEl.appendChild(fragment);
  }

  function advanceBead(targetNum) {
    const currentTime = Date.now();
    // Debounce rapid accidental double-taps
    if (typeof targetNum !== 'number' && currentTime - lastBeadAdvanceTime < 70) {
      return;
    }
    lastBeadAdvanceTime = currentTime;

    if (typeof targetNum === 'number') {
      t1MalaCount = targetNum;
    } else {
      t1MalaCount++;
    }

    if (t1MalaCount > 108) {
      t1MalaCount = 1;
      t1MalaRounds++;
      if (roundsDisplay) roundsDisplay.textContent = t1MalaRounds;
      if (completionCard) completionCard.style.display = 'none';
    }

    if (countDisplay) countDisplay.textContent = t1MalaCount;
    if (progressFill) progressFill.style.width = ((t1MalaCount / 108) * 100) + '%';
    if (progressTrack) progressTrack.setAttribute('aria-valuenow', t1MalaCount);

    // Update beads visual state
    for (let i = 1; i <= 108; i++) {
      const bead = document.getElementById('t1Bead_' + i);
      if (bead) {
        bead.classList.remove('bead-current', 'bead-chanted');
        if (i < t1MalaCount) {
          bead.classList.add('bead-chanted');
        } else if (i === t1MalaCount) {
          bead.classList.add('bead-current');
          bead.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }

    if (slokaEl) {
      slokaEl.classList.remove('glow-active');
      void slokaEl.offsetWidth;
      slokaEl.classList.add('glow-active');
    }

    playBeadChime();

    if (t1MalaCount === 108) {
      t1MalaRounds++;
      if (roundsDisplay) roundsDisplay.textContent = t1MalaRounds;
      if (completionCard) completionCard.style.display = 'block';
      triggerPushpaShower();
      playTempleBellChime();
      showToast('🙏 108 Sacred Beads Consecrated! Full Japa Mala Complete. (528 Hz Artistic Chime)');
    }
  }

  if (japaBtn) {
    japaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      advanceBead();
    });
  }

  if (nextRoundBtn) {
    nextRoundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      t1MalaCount = 0;
      if (countDisplay) countDisplay.textContent = '0';
      if (progressFill) progressFill.style.width = '0%';
      if (progressTrack) progressTrack.setAttribute('aria-valuenow', 0);
      if (completionCard) completionCard.style.display = 'none';
      for (let i = 1; i <= 108; i++) {
        const bead = document.getElementById('t1Bead_' + i);
        if (bead) bead.classList.remove('bead-current', 'bead-chanted');
      }
      showToast('📿 Auspicious! Beginning Next Mala Round with Sri Ganesha.');
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
      if (progressTrack) progressTrack.setAttribute('aria-valuenow', 0);
      if (completionCard) completionCard.style.display = 'none';
      for (let i = 1; i <= 108; i++) {
        const bead = document.getElementById('t1Bead_' + i);
        if (bead) bead.classList.remove('bead-current', 'bead-chanted');
      }
      showToast('↺ Japa Mala Count Reset to 0.');
    });
  }
}

/* -------------------------------------------------------------------------
   5. Toast Notification System
   ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('t1-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 't1-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.right = '28px';
    toast.style.background = '#3C0A11';
    toast.style.color = '#F3E5AB';
    toast.style.border = '1.5px solid #D4AF37';
    toast.style.padding = '0.85rem 1.4rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
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
   6. Priest & Seva Bookings Handlers
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

// Global exposure
window.playTempleBellChime = playTempleBellChime;
window.triggerPushpaShower = triggerPushpaShower;
window.triggerAkhandaDeepamOffering = triggerAkhandaDeepamOffering;
window.showToast = showToast;
