/**
 * TEMPLE PLATFORM - CORE JAVASCRIPT LOGIC
 * Features: Audio Chime Synth, Virtual Offerings, Dynamic Countdown,
 * Interactive Modals (Sankalp Puja & e-Hundi), and Reactive Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initOfferings();
  initPujaFilters();
  initModals();
  initCurrencyToggle();
});

/* -------------------------------------------------------------------------
   1. Live Countdown Timer for Next Ritual (Shirdi Inspired)
   ------------------------------------------------------------------------- */
function initCountdown() {
  const countdownEl = document.getElementById('ritual-countdown');
  if (!countdownEl) return;

  // Set target 3 hours, 42 minutes, 15 seconds from now
  let remainingSeconds = (3 * 3600) + (42 * 60) + 15;

  setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      const pad = (n) => String(n).padStart(2, '0');
      countdownEl.textContent = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    } else {
      countdownEl.textContent = "Aarti Live Now!";
    }
  }, 1000);
}

/* -------------------------------------------------------------------------
   2. Web Audio API Synthesizer & Virtual Offerings (Sri Mandir Inspired)
   ------------------------------------------------------------------------- */
function playTempleBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Primary bell tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5);

    // Harmonic overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 2.0);
    osc2.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.log("Audio not supported or blocked by autoplay policy", e);
  }
}

function initOfferings() {
  const bellBtn = document.getElementById('btn-offer-bell');
  const deepamBtn = document.getElementById('btn-offer-deepam');
  const flowerBtn = document.getElementById('btn-offer-flowers');
  const feedBox = document.getElementById('sanctum-feed-box');

  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      playTempleBellChime();
      showOfferingAnimation('🔔', feedBox);
      showToast('Sanctum Bell Chimed! May your prayers be heard.');
    });
  }

  if (deepamBtn) {
    deepamBtn.addEventListener('click', () => {
      showOfferingAnimation('🪔', feedBox);
      showToast('Sacred Deepam Offered with devotion.');
    });
  }

  if (flowerBtn) {
    flowerBtn.addEventListener('click', () => {
      showOfferingAnimation('🌸', feedBox);
      showToast('Sacred Pushpam (Flower Petals) showered.');
    });
  }
}

function showOfferingAnimation(symbol, container) {
  if (!container) return;
  const el = document.createElement('div');
  el.textContent = symbol;
  el.style.position = 'absolute';
  el.style.left = `${Math.random() * 80 + 10}%`;
  el.style.bottom = '20px';
  el.style.fontSize = '2.5rem';
  el.style.zIndex = '10';
  el.style.pointerEvents = 'none';
  el.style.transition = 'all 1.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
  el.style.opacity = '1';
  el.style.transform = 'scale(0.5)';

  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translateY(-180px) scale(1.4)';
    el.style.opacity = '0';
  });

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 1600);
}

/* -------------------------------------------------------------------------
   3. Puja Category Filter System (Sri Mandir Inspired)
   ------------------------------------------------------------------------- */
function initPujaFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.puja-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   4. Modals Management (Sankalp Seva & e-Hundi Donation)
   ------------------------------------------------------------------------- */
function initModals() {
  // Puja Modal
  const pujaModal = document.getElementById('puja-modal');
  const openPujaBtns = document.querySelectorAll('.open-puja-modal');
  const closePujaBtn = document.getElementById('close-puja-modal');
  const pujaTitleInput = document.getElementById('modal-puja-name');

  openPujaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sevaName = btn.getAttribute('data-seva') || 'Maha Rudrabhishek with 108 Bilva Patra';
      if (pujaTitleInput) pujaTitleInput.textContent = sevaName;
      if (pujaModal) pujaModal.classList.add('active');
    });
  });

  if (closePujaBtn && pujaModal) {
    closePujaBtn.addEventListener('click', () => pujaModal.classList.remove('active'));
  }

  // e-Hundi Donation Modal
  const donationModal = document.getElementById('donation-modal');
  const openDonationBtns = document.querySelectorAll('.open-donation-modal');
  const closeDonationBtn = document.getElementById('close-donation-modal');

  openDonationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (donationModal) donationModal.classList.add('active');
    });
  });

  if (closeDonationBtn && donationModal) {
    closeDonationBtn.addEventListener('click', () => donationModal.classList.remove('active'));
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === pujaModal) pujaModal.classList.remove('active');
    if (e.target === donationModal) donationModal.classList.remove('active');
  });

  // Handle Preset Donation Chips
  const presetChips = document.querySelectorAll('.preset-chip');
  const customAmountInput = document.getElementById('donation-custom-amount');

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (customAmountInput) {
        customAmountInput.value = chip.getAttribute('data-amount');
      }
    });
  });

  // Handle Form Submissions
  const pujaForm = document.getElementById('puja-booking-form');
  if (pujaForm) {
    pujaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const devotee = document.getElementById('devotee-name').value;
      const gotra = document.getElementById('devotee-gotra').value;
      const ref = 'SEVA-' + Math.floor(100000 + Math.random() * 900000);
      
      pujaModal.classList.remove('active');
      showConfirmationModal(
        '🙏 Seva Booked with Sankalp!',
        `Your personalized puja has been confirmed for <strong>${devotee}</strong> (Gotra: ${gotra}).<br><br>
         <strong>Booking Ref:</strong> ${ref}<br>
         A priest will chant your sacred sankalp. Video proof & Prasad tracking will be delivered.`
      );
    });
  }

  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = customAmountInput ? customAmountInput.value : '101';
      const cause = document.getElementById('donation-cause').value;
      const recNo = 'TX-' + Math.floor(100000 + Math.random() * 900000);

      donationModal.classList.remove('active');
      showConfirmationModal(
        '🌸 Thank You for Your Auspicious Offering!',
        `Your noble contribution of <strong>$${amount}</strong> towards <em>${cause}</em> has been gratefully received.<br><br>
         <strong>Receipt No:</strong> ${recNo}<br>
         Your official tax-deductible receipt (DGR / 80G compliant) has been generated and sent to your email.`
      );
    });
  }
}

/* -------------------------------------------------------------------------
   5. Dynamic Currency & Region Toggle (AUD $ / INR ₹)
   ------------------------------------------------------------------------- */
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
      showToast('Switched currency to Indian Rupee (₹)');
    } else {
      currentCurrency = 'AUD';
      toggleBtn.textContent = '🇦🇺 AUD ($)';
      updatePrices('AUD');
      showToast('Switched currency to Australian Dollar ($)');
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

/* -------------------------------------------------------------------------
   6. Custom UI Confirmation Modal & Toasts
   ------------------------------------------------------------------------- */
function showConfirmationModal(title, messageHtml) {
  const existing = document.getElementById('confirmation-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="confirmation-modal" class="modal-overlay active">
      <div class="modal-container" style="max-width: 480px; text-align: center;">
        <div class="modal-header" style="justify-content: center;">
          <h3 style="font-size: 1.15rem;">${title}</h3>
        </div>
        <div class="modal-body" style="padding: 2.25rem 2rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🕉️</div>
          <p style="font-size: 0.95rem; color: #4A3E3D; line-height: 1.6; margin-bottom: 1.75rem;">
            ${messageHtml}
          </p>
          <button onclick="document.getElementById('confirmation-modal').remove()" class="btn btn-primary btn-lg" style="width: 100%;">
            Blessed & Understood
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
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#3C0A11';
    toast.style.color = '#F9D976';
    toast.style.border = '1px solid #D4AF37';
    toast.style.padding = '0.75rem 1.25rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}
