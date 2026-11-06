/**
 * TEMPLE PLATFORM - CORE JAVASCRIPT LOGIC
 * Features: Audio Chime Synth, Virtual Offerings, Dynamic Countdown,
 * Interactive Modals (Sankalp Puja & e-Hundi), and Reactive Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLivePanchangamEngine();
  initBrickTaxMatrix();
  initCountdown();
  initOfferings();
  initLivingDiyaStage();
  initGotraSankalpGenerator();
  initCampusZoneExplorer();
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

/* -------------------------------------------------------------------------
   7. Living Sanctum Altar & Interactive Diya Physics (Feature 1)
   ------------------------------------------------------------------------- */
let diyaCount = 4289;

function initLivingDiyaStage() {
  const deepamBtn = document.getElementById('btn-offer-deepam');
  const interactiveDiya = document.getElementById('interactive-brass-diya');
  const diyaCounterEl = document.getElementById('diya-counter-num');
  const flameEl = document.getElementById('diya-flame-element');
  const feedBox = document.getElementById('sanctum-feed-box');
  const bellBtn = document.getElementById('btn-offer-bell');
  const bellIcon = document.getElementById('sanctum-bell-icon');

  function triggerDiyaOffering() {
    diyaCount++;
    if (diyaCounterEl) {
      diyaCounterEl.textContent = diyaCount.toLocaleString();
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
    showToast('🪔 Sacred Diya Lighted! Your prayer shines before Lord Sri Ganesha.');
  }

  if (interactiveDiya) {
    interactiveDiya.style.cursor = 'pointer';
    interactiveDiya.addEventListener('click', triggerDiyaOffering);
  }

  if (deepamBtn) {
    // Override/augment click handler
    deepamBtn.addEventListener('click', (e) => {
      triggerDiyaOffering();
    });
  }

  if (bellBtn && bellIcon) {
    bellBtn.addEventListener('click', () => {
      bellIcon.classList.remove('bell-swinging');
      void bellIcon.offsetWidth;
      bellIcon.classList.add('bell-swinging');
    });
  }
}

/* -------------------------------------------------------------------------
   8. Digital Gotra Sankalp Generator & Certificate (Feature 2)
   ------------------------------------------------------------------------- */
function initGotraSankalpGenerator() {
  const nameInput = document.getElementById('input-sankalp-name');
  const gotraInput = document.getElementById('input-sankalp-gotra');
  const nakshatraInput = document.getElementById('input-sankalp-nakshatra');
  const deitySelect = document.getElementById('input-sankalp-deity');
  const intentionInput = document.getElementById('input-sankalp-intention');
  const updateBtn = document.getElementById('btn-update-sankalp');

  const displayName = document.getElementById('cert-display-name');
  const displayGotra = document.getElementById('cert-display-gotra');
  const displayDeity = document.getElementById('cert-display-deity');
  const displayIntention = document.getElementById('cert-display-intention');
  const displayDate = document.getElementById('cert-display-date');
  const displayToken = document.getElementById('cert-token-id');

  const whatsappBtn = document.getElementById('btn-share-whatsapp');
  const printBtn = document.getElementById('btn-print-sankalp');

  function updateCertificate() {
    const devotee = (nameInput && nameInput.value.trim()) || 'Devotee Patron & Family';
    const gotra = (gotraInput && gotraInput.value.trim()) || 'Kashyapa';
    const nakshatra = (nakshatraInput && nakshatraInput.value) || 'Rohini';
    const deity = (deitySelect && deitySelect.value) || 'Lord Sri Ganesha';
    const intention = (intentionInput && intentionInput.value.trim()) || 'Family Health, Peace & Auspicious Prosperity';

    if (displayName) displayName.textContent = devotee;
    if (displayGotra) displayGotra.textContent = `Gotra: ${gotra} | Nakshatra: ${nakshatra}`;
    if (displayDeity) displayDeity.textContent = `Presiding Deity: ${deity.split('(')[0].trim()}`;
    if (displayIntention) {
      displayIntention.textContent = `"May the divine auspices of Ballarat Hindu Temple bless ${devotee} with fulfillment of prayer: ${intention}. Chanted with authentic Vedic Agamic sankalp."`;
    }

    if (displayDate) {
      const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
      displayDate.textContent = `Consecrated: ${today}`;
    }

    if (displayToken && !displayToken.getAttribute('data-locked')) {
      const randToken = 'BHTCC-2026-SKLP-' + Math.floor(1000 + Math.random() * 9000);
      displayToken.textContent = randToken;
      displayToken.setAttribute('data-locked', 'true');
    }
  }

  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      if (displayToken) displayToken.removeAttribute('data-locked');
      updateCertificate();
      playTempleBellChime();
      showToast('✨ Sacred Gotra Sankalp Consecrated! Certificate Updated.');
    });
  }

  [nameInput, gotraInput, nakshatraInput, deitySelect, intentionInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updateCertificate);
    }
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const devotee = (nameInput && nameInput.value.trim()) || 'Devotee Patron & Family';
      const gotra = (gotraInput && gotraInput.value.trim()) || 'Kashyapa';
      const deity = (deitySelect && deitySelect.value) ? deitySelect.value.split('(')[0].trim() : 'Lord Sri Ganesha';
      const token = displayToken ? displayToken.textContent : 'BHTCC-2026-SKLP';
      
      const msg = `🕉️ *Ballarat Hindu Temple & Cultural Centre Inc. (BHTCC)*\n*Consecrated Vedic Sankalp Record*\n\n🙏 *Devotee:* ${devotee}\n🪔 *Gotra:* ${gotra}\n🛕 *Presiding Deity:* ${deity}\n📜 *Token ID:* ${token}\n📍 *Sanctuary:* 110 Vaggs Rd, Ross Creek VIC 3351 (ABN 13 397 829 440)\n\n_May your sacred prayers be fulfilled!_\nhttps://csharikrishna.github.io/temple_templates/`;
      
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
      showToast('Opening WhatsApp with your Consecrated Sankalp...');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  updateCertificate();
}

/* -------------------------------------------------------------------------
   9. 5-Acre Ross Creek Campus Interactive Zone Explorer (Feature 3)
   ------------------------------------------------------------------------- */
function initCampusZoneExplorer() {
  const zoneTabs = document.querySelectorAll('.zone-tab-btn');
  const zoneImg = document.getElementById('zone-spotlight-img');
  const zoneBadge = document.getElementById('zone-spotlight-badge');
  const zonePhase = document.getElementById('zone-phase-tag');
  const zoneTitle = document.getElementById('zone-spotlight-title');
  const zoneDesc = document.getElementById('zone-spotlight-desc');
  const zoneSpecs = document.getElementById('zone-spotlight-specs');

  if (!zoneTabs.length) return;

  const zoneData = {
    '1': {
      title: 'Main Sri Ganesha Shrine & 350-Capacity Prayer Hall',
      badge: 'Zone 1 • 350-Capacity Sanctum',
      phase: 'Phase 1 Structural Framing Active',
      img: '/assets/bhtcc_interior.jpg',
      desc: 'Traditional granite stonework sanctum designed according to Agamic Vastu Shastra principles. Serving as the primary spiritual anchor with sacred garbha-griha, pradakshina path, and acoustic resonance chamber for Vedic chanting.',
      specs: [
        '350-devotee indoor congregation hall',
        'Solid hand-carved black granite moolasthanam',
        'Dedicated altar spaces for Shiva, Murugan & Ambal',
        'Integrated 4K live broadcast pan-tilt camera grid'
      ]
    },
    '2': {
      title: 'Maha Annadanam Commercial Kitchen & Dining Complex',
      badge: 'Zone 2 • Annadanam Kitchen',
      phase: 'Council Approved & Earthworks Ready',
      img: '/assets/vedic_homa.jpg',
      desc: 'Industrial-grade commercial kitchen facility compliant with Victorian Food Safety and Shire regulations, capable of serving 500+ free hot consecrated sanctum meals (Prasadam) every weekend and during major festivals.',
      specs: [
        'Commercial steam kettles, roti stations & cold storage',
        'Seated dining hall for 250 devotees simultaneously',
        '100% free sanctified vegetarian food distribution',
        'Victorian Health & Council Food Act 1984 certified'
      ]
    },
    '3': {
      title: 'Vedic Cultural Learning Centre & Scriptural Library',
      badge: 'Zone 3 • Cultural Pavilion',
      phase: 'Architecture Blueprints Finalized',
      img: '/assets/granite_architecture.jpg',
      desc: 'A vibrant educational pavilion dedicated to preserving Sanatana Dharma heritage for youth in Ballarat and regional Victoria. Featuring classrooms for Sanskrit, Hindi, Tamil, classical Carnatic music, and Bharatanatyam dance.',
      specs: [
        '3 multipurpose cultural classrooms with smart screens',
        'Curated library of Vedic scriptures & children’s literature',
        'Victorian Child Safe Standards and WWCC compliance',
        'Community workshops and senior citizen social spaces'
      ]
    },
    '4': {
      title: 'Landscaped Peace Gardens, Meditation Walk & Sacred Goshala',
      badge: 'Zone 4 • 2 Acres of Sacred Flora',
      phase: 'Eco-Landscape Design Commenced',
      img: '/assets/lakshmi_puja.jpg',
      desc: 'Integrating Australian native flora with sacred Indian medicinal and flowering plants including Tulasi, Bilva, Neem, and fragrant jasmine. A tranquil walking trail for quiet japa meditation and family contemplation.',
      specs: [
        'Walking meditation pradakshina trail with seating',
        'Sacred Bilva and Tulasi consecrated gardens',
        'Rainwater harvesting ponds and sustainable solar grid',
        'Planned ethical cow shelter (Goshala) for seva'
      ]
    },
    '5': {
      title: '75 Sealed Parking Bays, Universal DDA Access & Bus Dropoff',
      badge: 'Zone 5 • Civil Infrastructure',
      phase: 'Asphalt Paving & Drainage 70% Done',
      img: '/assets/bhtcc_site_plan.jpg',
      desc: 'High-capacity civil engineering and transport infrastructure funded in part by the $900k+ Victorian Government grant. Ensuring safe, dignified, step-free access for elders, prams, and pilgrims arriving from Melbourne and Geelong.',
      specs: [
        '75 asphalt-sealed visitor and devotee parking bays',
        'Dedicated tour bus turn-around and dropoff concourse',
        '100% DDA-compliant step-free tactile ramps & accessible toilets',
        'Electric Vehicle (EV) destination chargers on site'
      ]
    }
  };

  zoneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      zoneTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const zoneId = tab.getAttribute('data-zone') || '1';
      const data = zoneData[zoneId];
      if (!data) return;

      if (zoneTitle) zoneTitle.textContent = data.title;
      if (zoneBadge) zoneBadge.textContent = data.badge;
      if (zonePhase) zonePhase.textContent = data.phase;
      if (zoneDesc) zoneDesc.textContent = data.desc;
      if (zoneImg) {
        zoneImg.style.opacity = '0.3';
        setTimeout(() => {
          zoneImg.src = data.img;
          zoneImg.alt = data.title;
          zoneImg.style.opacity = '1';
        }, 120);
      }

      if (zoneSpecs && data.specs) {
        zoneSpecs.innerHTML = data.specs.map(s => `<li><span>✓</span> ${s}</li>`).join('');
      }

      showToast(`Viewing: ${data.title}`);
    });
  });
}

// Global window exposure
window.playTempleBellChime = playTempleBellChime;
window.showToast = showToast;
window.initLivingDiyaStage = initLivingDiyaStage;
window.initGotraSankalpGenerator = initGotraSankalpGenerator;
window.initCampusZoneExplorer = initCampusZoneExplorer;


/* -------------------------------------------------------------------------
   10. Dynamic Australian DGR Brick Sponsorship & Tax Benefit Matrix
   ------------------------------------------------------------------------- */
function initBrickTaxMatrix() {
  const chips = document.querySelectorAll('.brick-chip');
  const customInput = document.getElementById('brick-custom-input');
  const bracketSelect = document.getElementById('brick-tax-bracket');
  const donorInput = document.getElementById('brick-donor-name');

  const grossDisplay = document.getElementById('taxGrossVal');
  const refundDisplay = document.getElementById('taxRefundVal');
  const netDisplay = document.getElementById('taxNetVal');
  const rateLabel = document.getElementById('taxRateLbl');
  const btnAmtDisplay = document.getElementById('btnSponsorAmt');

  const brickPlaqueName = document.getElementById('brickEngravedName');
  const brickTierBadge = document.getElementById('brickTierBadge');
  const sponsorBtn = document.getElementById('btnSponsorBrickNow');

  let currentAmount = 250;
  let currentTierLabel = '3 FOUNDATION BRICKS';

  function recalculateTax() {
    const gross = parseFloat(customInput ? customInput.value : currentAmount) || 0;
    const rate = parseFloat(bracketSelect ? bracketSelect.value : 0.30);
    const refund = gross * rate;
    const net = Math.max(0, gross - refund);

    if (grossDisplay) grossDisplay.textContent = '$' + gross.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    if (refundDisplay) refundDisplay.textContent = '-$' + refund.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    if (netDisplay) netDisplay.textContent = '$' + net.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' AUD';
    if (rateLabel) rateLabel.textContent = Math.round(rate * 100) + '%';
    if (btnAmtDisplay) btnAmtDisplay.textContent = gross.toLocaleString('en-AU');

    // Update Granite Brick Plaque Inscription
    const donorName = (donorInput && donorInput.value.trim()) || 'SHARIKRISHNA & FAMILY';
    if (brickPlaqueName) brickPlaqueName.textContent = donorName.toUpperCase();
    if (brickTierBadge) brickTierBadge.textContent = currentTierLabel.toUpperCase();
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const amt = parseFloat(chip.getAttribute('data-amount')) || 250;
      currentAmount = amt;
      currentTierLabel = chip.getAttribute('data-label') || 'FOUNDATION BRICK';

      if (customInput) customInput.value = amt;
      recalculateTax();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      chips.forEach(c => c.classList.remove('active'));
      currentAmount = parseFloat(customInput.value) || 0;
      currentTierLabel = currentAmount >= 5000 ? 'DEITY MOOLASTHANAM FOUNDER' : (currentAmount >= 1000 ? 'GRANITE SANCTUM STONE' : 'COMMUNITY PATRON BRICK');
      recalculateTax();
    });
  }

  if (bracketSelect) {
    bracketSelect.addEventListener('change', recalculateTax);
  }

  if (donorInput) {
    donorInput.addEventListener('input', recalculateTax);
  }

  if (sponsorBtn) {
    sponsorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const gross = parseFloat(customInput ? customInput.value : currentAmount) || 250;
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
      showToast('🧱 Opening Consecrated Brick Sponsorship e-Hundi for $' + gross + ' AUD...');
    });
  }

  recalculateTax();
}

/* -------------------------------------------------------------------------
   11. Astronomical Ballarat Panchang Live Engine & Aarti Countdown
   ------------------------------------------------------------------------- */
function initLivePanchangamEngine() {
  const tithiEl = document.getElementById('ballarat-tithi');
  const sunriseEl = document.getElementById('ballarat-sunrise');
  const sunsetEl = document.getElementById('ballarat-sunset');
  const rahuEl = document.getElementById('ballarat-rahu');

  // Ballarat VIC coordinates (lat: -37.5622, long: 143.8503, UTC+11 AEDT)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const rahuWindows = [
    '04:30 PM - 06:00 PM', // Sun
    '07:30 AM - 09:00 AM', // Mon
    '03:00 PM - 04:30 PM', // Tue
    '12:00 PM - 01:30 PM', // Wed
    '01:30 PM - 03:00 PM', // Thu
    '10:30 AM - 12:00 PM', // Fri
    '09:00 AM - 10:30 AM'  // Sat
  ];

  const now = new Date();
  const dayIdx = now.getDay();

  if (rahuEl) rahuEl.textContent = rahuWindows[dayIdx];
  if (tithiEl) tithiEl.textContent = 'Kartika Shukla Ekadashi (Devutthana)';
  if (sunriseEl) sunriseEl.textContent = '06:04 AM';
  if (sunsetEl) sunsetEl.textContent = '08:14 PM';
}

// Global exposure
window.initBrickTaxMatrix = initBrickTaxMatrix;
window.initLivePanchangamEngine = initLivePanchangamEngine;
