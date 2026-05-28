/* ── SERVICE SELECTOR ── */
const svcData = [
  {
    title: 'Réparation de fuites',
    body: 'Détection et réparation de toute fuite, visible ou dissimulée dans les murs et planchers.',
    badge: '⚡ Urgence dispo',
    items: ['Fuite sous l\'évier ou lavabo','Tuyauterie percée ou corrodée','Robinet qui goutte en permanence','Fuite dans les murs (détection caméra)'],
    num: '01',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>'
  },
  {
    title: 'Service après inondation',
    body: 'Intervention rapide suite à tout dégât des eaux, pompage, inspection et remise en état.',
    badge: '⚡ Intervention en 1h',
    items: ['Pompage et évacuation d\'eau','Inspection complète des dommages','Rapport détaillé pour assurances','Remplacement des tuyaux endommagés'],
    num: '02',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>'
  },
  {
    title: 'Débouchage de conduits',
    body: 'Débouchage professionnel avec furets motorisés et hydrojets haute pression.',
    badge: null,
    items: ['Évier, bain, douche, toilette','Colonne de chute et égout extérieur','Inspection par caméra incluse','Hydrojetting si nécessaire'],
    num: '03',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>'
  },
  {
    title: 'Chauffe-eau',
    body: 'Installation, entretien et remplacement de tous types de chauffe-eau, au gaz ou électrique.',
    badge: null,
    items: ['Remplacement chauffe-eau traditionnel','Installation tankless (sans réservoir)','Chauffe-eau au gaz naturel','Entretien et vidange annuelle'],
    num: '04',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>'
  },
  {
    title: 'Rénovation & installation',
    body: 'Refonte complète de salle de bain, cuisine, ou plomberie rough-in pour construction neuve.',
    badge: null,
    items: ['Réfection complète salle de bain','Douche italienne, bain autoportant','Rough-in pour nouvelle construction','Déplacement de tuyauterie'],
    num: '05',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>'
  },
  {
    title: 'Entretien préventif',
    body: 'Inspection annuelle complète pour prévenir les pannes et prolonger la durée de vie.',
    badge: null,
    items: ['Inspection complète des tuyaux','Test de pression du réseau','Vérification des raccords et joints','Rapport d\'état détaillé remis'],
    num: '06',
    icon: '<svg width="26" height="26" fill="none" stroke="#1565C0" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'
  }
];

function showSvc(btn, i) {
  document.querySelectorAll('.svc-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('svcPanel');
  const d = svcData[i];
  panel.classList.add('fade');
  setTimeout(() => {
    document.getElementById('spIcon').innerHTML = d.icon;
    document.getElementById('spTitle').textContent = d.title;
    document.getElementById('spBody').textContent = d.body;
    const badge = document.getElementById('spBadge');
    if (d.badge) { badge.textContent = d.badge; badge.style.display = 'inline-flex'; }
    else { badge.style.display = 'none'; }
    document.getElementById('spList').innerHTML = d.items.map(it => '<li>' + it + '</li>').join('');
    document.getElementById('spNum').textContent = d.num;
    panel.classList.remove('fade');
  }, 140);
}

/* ── SCROLL OBSERVER (fade-up + service wave-in + counters) ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    // Fade-up elements
    if (e.target.classList.contains('anim-fadeup') || e.target.classList.contains('anim-scale')) {
      e.target.style.animationPlayState = 'running';
    }

    // Service buttons wave-in
    if (e.target.classList.contains('svc-selector')) {
      const btns = e.target.querySelectorAll('.svc-btn');
      btns.forEach((btn, i) => {
        setTimeout(() => btn.classList.add('wave-in'), i * 80);
      });
    }

    // Animated counters
    if (e.target.classList.contains('hero-stats')) {
      animateCounter('stat-avis', 340, '+', '');
      animateCounter('stat-ans', 20, '', ' ans');
    }

    obs.unobserve(e.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.anim-fadeup, .anim-scale').forEach(el => {
  el.style.animationPlayState = 'paused';
  obs.observe(el);
});

const svcSelector = document.querySelector('.svc-selector');
if (svcSelector) obs.observe(svcSelector);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) obs.observe(heroStats);

/* ── COUNTER ── */
function animateCounter(id, target, prefix, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('counting');
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(ease * target) + (suffix || '');
    if (p < 1) requestAnimationFrame(step);
    else { el.textContent = prefix + target + (suffix || ''); el.classList.remove('counting'); }
  }
  requestAnimationFrame(step);
}

/* ── FORM CONFIRMATION ── */
function submitForm() {
  const form = document.getElementById('devis');
  const confirm = document.getElementById('formConfirm');
  const btn = document.getElementById('btnSubmit');

  // Hide all form fields
  form.querySelectorAll('label, input, select, textarea, .form-row, .trust-note, br').forEach(el => {
    el.style.display = 'none';
  });
  form.querySelectorAll('div:not(.hero-card-flag):not(.form-confirm):not(.confirm-faucet)').forEach(el => {
    if (!el.closest('.form-confirm')) el.style.display = 'none';
  });
  btn.style.display = 'none';
  document.querySelector('.card-title').style.display = 'none';
  document.querySelector('.card-sub').style.display = 'none';

  confirm.classList.add('visible');
}