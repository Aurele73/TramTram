const bookmarkBtn = document.getElementById('bookmarkBtn');
bookmarkBtn.addEventListener('click', () => {
  const pressed = bookmarkBtn.getAttribute('aria-pressed') === 'true';
  bookmarkBtn.setAttribute('aria-pressed', String(!pressed));
});

const qrBtn = document.getElementById('qrBtn');
const qrOverlay = document.getElementById('qrOverlay');
const qrClose = document.getElementById('qrClose');
qrBtn.addEventListener('click', () => qrOverlay.classList.add('open'));
qrClose.addEventListener('click', () => qrOverlay.classList.remove('open'));
qrOverlay.addEventListener('click', (e) => { if (e.target === qrOverlay) qrOverlay.classList.remove('open'); });

function pad(n){ return String(n).padStart(2, '0'); }
function formatDateTime(d){
  return {
    date: `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${String(d.getFullYear()).slice(-2)}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`
  };
}
function formatNow(){ return formatDateTime(new Date()); }

const correspondanceBtn = document.getElementById('correspondanceBtn');
const lastValidation = document.getElementById('lastValidation');
const periodValue = document.getElementById('periodValue');
const validityText = document.getElementById('validityText');
const validityFill = document.getElementById('validityFill');
let minutesLeft = 60;

// À l'arrivée sur le titre, la période de validité démarre maintenant et court 1h.
const purchasedAt = new Date();
const expiresAt = new Date(purchasedAt.getTime() + 60 * 60 * 1000);
const start = formatDateTime(purchasedAt);
const end = formatDateTime(expiresAt);
periodValue.innerHTML = `
  <span>${start.date}</span><span class="sep">${start.time}</span>
  <span class="arrow">→</span>
  <span>${end.date}</span><span class="sep">${end.time}</span>
`;
lastValidation.innerHTML = `<span>${start.date}</span><span class="sep">${start.time}</span>`;
validityText.textContent = `Correspondance autorisée encore ${minutesLeft} minutes`;
validityFill.style.width = '100%';

correspondanceBtn.addEventListener('click', () => {
  const now = formatNow();
  lastValidation.innerHTML = `<span>${now.date}</span><span class="sep">${now.time}</span>`;
  minutesLeft = 60;
  validityFill.style.width = '100%';
  validityText.textContent = `Correspondance autorisée encore ${minutesLeft} minutes`;
  correspondanceBtn.textContent = 'CORRESPONDANCE VALIDÉE';
  setTimeout(() => { correspondanceBtn.textContent = 'VALIDER UNE CORRESPONDANCE'; }, 1600);
});

const parkingBtn = document.getElementById('parkingBtn');
parkingBtn.addEventListener('click', () => {
  parkingBtn.style.boxShadow = 'inset 0 0 0 1.5px #7c4ea3';
  setTimeout(() => { parkingBtn.style.boxShadow = ''; }, 300);
});

const clockEl = document.getElementById('clock');
function tickClock(){
  clockEl.textContent = formatNow().time;
}
tickClock();
setInterval(tickClock, 15000);

setInterval(() => {
  if (minutesLeft > 0){
    minutesLeft -= 1;
    validityText.textContent = `Correspondance autorisée encore ${minutesLeft} minutes`;
    validityFill.style.width = Math.max(2, (minutesLeft/60)*100) + '%';
  }
}, 60000);

const qrDots = document.getElementById('qrGrid');
if (qrDots){
  for (let i = 0; i < 81; i++){
    qrDots.appendChild(document.createElement('i'));
  }
}

// Appui maintenu hors des boutons : les points quittent l'avatar pour tourner autour du point de contact.
const dotsOrbit = document.getElementById('dotsOrbit');
const ORBIT_DIAMETER = 150; // même diamètre que .avatar-ring

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('button, a')) return;
  dotsOrbit.classList.add('dragging');
  dotsOrbit.style.left = `${e.clientX - ORBIT_DIAMETER / 2}px`;
  dotsOrbit.style.top = `${e.clientY - ORBIT_DIAMETER / 2}px`;
  dotsOrbit.style.width = `${ORBIT_DIAMETER}px`;
  dotsOrbit.style.height = `${ORBIT_DIAMETER}px`;
});

function releaseOrbit(){
  dotsOrbit.classList.remove('dragging');
  dotsOrbit.style.left = '';
  dotsOrbit.style.top = '';
  dotsOrbit.style.width = '';
  dotsOrbit.style.height = '';
}
document.addEventListener('pointerup', releaseOrbit);
document.addEventListener('pointercancel', releaseOrbit);
