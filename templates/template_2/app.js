/**
 * TEMPLATE 2: VEDIC SAFFRON & MARIGOLD - DEVTECH JAVASCRIPT ARCHITECTURE
 * Mobile-First Consumer Devotional Portal (Sri Mandir Style)
 * Ballarat Hindu Temple & Cultural Centre Inc. (BHTCC)
 * Pure ES6 - Zero External Runtime Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initLivePrayerStreamT2();
  initUrgencyCountdownT2();
  initQuickSankalpT2();
  initHeaderSearchT2();
  initDevTechCheckoutT2();
});

/* -------------------------------------------------------------------------
   1. Live Stream Audio Synthesizer (Chime for Bell & Diya)
   ------------------------------------------------------------------------- */
function playDevTechBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(493.88, now + 1.8);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1975.53, now);
    osc2.frequency.exponentialRampToValueAtTime(987.77, now + 1.0);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    gain2.gain.setValueAtTime(0.2, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

    osc.connect(gain); gain.connect(ctx.destination);
    osc2.connect(gain2); gain2.connect(ctx.destination);

    osc.start(now); osc2.start(now);
    osc.stop(now + 2.0); osc2.stop(now + 1.0);
  } catch (e) {
    console.warn("Audio Context blocked: ", e);
  }
}

/* -------------------------------------------------------------------------
   2. Real-Time Upward Floating Prayer Comments Ticker (Sri Mandir Style)
   ------------------------------------------------------------------------- */
const simulatedPrayers = [
  { user: "🌸 Naveen (Melbourne)", text: "Offered Pushpanjali for family peace & health" },
  { user: "🪔 Priya S. (Ballarat)", text: "Lighted a Diya for Sri Ganesha's blessings" },
  { user: "🙏 Dr. Harish Kumar", text: "Om Gam Ganapataye Namaha! Bless Ross Creek" },
  { user: "🌺 S. Ramanathan (Geelong)", text: "Prayed for obstacle removal and prosperity" },
  { user: "🔔 Anita & Family (Wendouree)", text: "Rang temple bell with heartfelt devotion" },
  { user: "✨ Ramesh Patel (Buninyong)", text: "Offered prayer for temple construction progress" },
  { user: "🪔 Rajesh V. (Ballarat East)", text: "Sankalp for son's graduation & career" },
  { user: "🌸 Meenakshi (Alfredton)", text: "Devi Sahasranama archana offering for peace" }
];

let prayerIndex = 0;

function initLivePrayerStreamT2() {
  const streamContainer = document.querySelector('.t2-ticker-stream, .t2-live-comments-stream');
  if (!streamContainer) return;

  // Append new prayer every 3.8 seconds
  setInterval(() => {
    const item = simulatedPrayers[prayerIndex % simulatedPrayers.length];
    prayerIndex++;

    const msgEl = document.createElement('div');
    msgEl.className = 't2-ticker-msg';
    msgEl.innerHTML = `<span class="t2-msg-user">${item.user}:</span> <span>${item.text}</span>`;

    streamContainer.appendChild(msgEl);

    // Keep max 4 visible
    while (streamContainer.children.length > 4) {
      streamContainer.removeChild(streamContainer.firstChild);
    }
  }, 3800);
}

// User-initiated instant prayer
window.sendPrayer = function(type) {
  playDevTechBellChime();
  const streamContainer = document.querySelector('.t2-ticker-stream, .t2-live-comments-stream');
  if (streamContainer) {
    const msgEl = document.createElement('div');
    msgEl.className = 't2-ticker-msg';
    msgEl.style.borderColor = '#D9480F';
    msgEl.style.background = 'rgba(217, 72, 15, 0.88)';
    msgEl.innerHTML = `<span class="t2-msg-user">✨ You (Ballarat):</span> <span>Offered ${type} live to Ross Creek Altar</span>`;
    streamContainer.appendChild(msgEl);

    while (streamContainer.children.length > 4) {
      streamContainer.removeChild(streamContainer.firstChild);
    }
  }

  showDevTechToast(`🙏 Your sacred offering of ${type} was transmitted live to BHTCC Ross Creek!`);
};

/* -------------------------------------------------------------------------
   3. Urgency Countdown Timer (High-Conversion D2C Badges)
   ------------------------------------------------------------------------- */
function initUrgencyCountdownT2() {
  const badges = document.querySelectorAll('.t2-urgency-badge');
  if (!badges.length) return;

  let totalSecs = (3 * 3600) + (14 * 60) + 42;

  setInterval(() => {
    if (totalSecs > 0) {
      totalSecs--;
      const hrs = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;
      const pad = n => String(n).padStart(2, '0');
      const timeStr = `🔥 ${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s Left`;

      badges.forEach((b, idx) => {
        if (idx === 0) b.textContent = timeStr;
      });
    }
  }, 1000);
}

/* -------------------------------------------------------------------------
   4. 1-Click Fast Remote Sankalp Booking Form
   ------------------------------------------------------------------------- */
function initQuickSankalpT2() {
  const form = document.getElementById('heroSankalpForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successMsg = document.getElementById('quickSuccessMsg');
    if (successMsg) {
      successMsg.style.display = 'block';
    }
    playDevTechBellChime();
    showDevTechToast('⚡ Instant Remote Sankalp booked! 4K WhatsApp video proof will be dispatched.');
    form.reset();
  });
}

window.handleQuickSankalp = function(e) {
  if (e) e.preventDefault();
  const successMsg = document.getElementById('quickSuccessMsg');
  if (successMsg) successMsg.style.display = 'block';
  playDevTechBellChime();
  showDevTechToast('⚡ Remote Sankalp registered! Priest coordinator will confirm timing.');
};

/* -------------------------------------------------------------------------
   5. In-Header Live Search Bar Filter
   ------------------------------------------------------------------------- */
function initHeaderSearchT2() {
  const searchInput = document.querySelector('.t2-header-search input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.t2-product-card, .t2-deity-app-card, .t2-comm-card');

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* -------------------------------------------------------------------------
   6. DevTech e-Hundi Checkout & Instant ATO DGR Receipt Generator (Donate Page)
   ------------------------------------------------------------------------- */
let currentT2Amt = 50;

window.setT2Amt = function(amt, btn) {
  currentT2Amt = amt;
  document.querySelectorAll('.t2-amt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const custom = document.getElementById('t2CustomAmt');
  if (custom) custom.value = '';
  const display = document.getElementById('t2DisplayAmt') || document.getElementById('t2SubmitBtn');
  if (display) {
    const strong = display.querySelector('strong') || display;
    strong.innerText = `$${amt} AUD`;
  }
};

window.customT2Amt = function(val) {
  if (val && Number(val) > 0) {
    currentT2Amt = Number(val);
    document.querySelectorAll('.t2-amt-btn').forEach(b => b.classList.remove('active'));
    const display = document.getElementById('t2DisplayAmt') || document.getElementById('t2SubmitBtn');
    if (display) {
      const strong = display.querySelector('strong') || display;
      strong.innerText = `$${val} AUD`;
    }
  }
};

window.handleDevTechDonation = function(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('t2Name') || document.getElementById('t2DonorName');
  const name = nameInput && nameInput.value ? nameInput.value : 'Devotee Patron';
  const campEl = document.querySelector('input[name="camp"]:checked');
  const camp = campEl ? campEl.value : 'Ross Creek Temple Building Fund';

  const receiptBox = document.getElementById('t2Receipt') || document.getElementById('t2ReceiptResult');
  const rName = document.getElementById('t2RecDonor') || document.getElementById('t2rName');
  const rCamp = document.getElementById('t2RecFund') || document.getElementById('t2rCamp');
  const rAmt = document.getElementById('t2RecVal') || document.getElementById('t2rAmt');
  const rDate = document.getElementById('t2RecTime') || document.getElementById('t2rDate');
  const rNum = document.getElementById('t2RecId') || document.getElementById('t2rNum');

  if (rName) rName.innerText = name;
  if (rCamp) rCamp.innerText = camp;
  if (rAmt) rAmt.innerText = `$${currentT2Amt}.00 AUD`;
  if (rDate) rDate.innerText = new Date().toLocaleString('en-AU', { dateStyle: 'long', timeStyle: 'short' });
  if (rNum) rNum.innerText = `BHTCC-APP-${Math.floor(100000 + Math.random() * 900000)}`;

  if (receiptBox) {
    receiptBox.style.display = 'block';
    receiptBox.scrollIntoView({ behavior: 'smooth' });
  }

  playDevTechBellChime();
  showDevTechToast('🙏 Auspicious Offering Successful! Official ATO DGR Receipt Generated.');
};

window.handleWorshipCart = function(e) {
  if (e) e.preventDefault();
  const successBox = document.getElementById('wSuccess');
  if (successBox) {
    successBox.style.display = 'block';
    successBox.scrollIntoView({ behavior: 'smooth' });
  }
  playDevTechBellChime();
  showDevTechToast('🙏 Devotee Pooja Confirmed! Consecrated Prasadam dispatch scheduled.');
  if (e && e.target && typeof e.target.reset === 'function') e.target.reset();
};

window.handleVolunteerT2 = function(e) {
  if (e) e.preventDefault();
  playDevTechBellChime();
  showDevTechToast('🙏 Thank you for registering! Secretary Mrs. Priya Rajan will contact you.');
  if (e && e.target && typeof e.target.reset === 'function') e.target.reset();
};

window.joinMembershipT2 = function(tierName) {
  playDevTechBellChime();
  showDevTechToast(`✨ Joining ${tierName} Membership! Proceeding to devotee onboarding.`);
  const form = document.querySelector('form');
  if (form) form.scrollIntoView({ behavior: 'smooth' });
};

function initDevTechCheckoutT2() {
  const checkoutForm = document.getElementById('t2CheckoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', window.handleDevTechDonation);
  }
}

/* -------------------------------------------------------------------------
   7. DevTech Toast Notification
   ------------------------------------------------------------------------- */
function showDevTechToast(msg) {
  let toast = document.getElementById('t2-app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 't2-app-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#9A3412';
    toast.style.color = '#FFF';
    toast.style.border = '1.5px solid #F59F00';
    toast.style.padding = '0.85rem 1.4rem';
    toast.style.borderRadius = '9999px';
    toast.style.boxShadow = '0 10px 30px rgba(154, 52, 18, 0.4)';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '0.885rem';
    toast.style.fontWeight = '700';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
  }, 4000);
}
