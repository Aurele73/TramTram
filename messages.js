function pad(n){ return String(n).padStart(2, '0'); }
function formatTicketDate(d){
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(-2)}`;
}
function formatTime(d){
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function randomCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `0768401173${code}`;
}

const msgList = document.getElementById('msgList');
const msgInput = document.getElementById('msgInput');
const msgSend = document.getElementById('msgSend');

function scrollToBottom(){
  msgList.scrollTop = msgList.scrollHeight;
}

function buildTicketCard(dateStr, startTime, endTime, code){
  const card = document.createElement('div');
  card.className = 'msg-card';
  card.innerHTML = `
    <div class="msg-card-text">
      M&rsquo;RESO INTRA VOIRONNAIS<br>
      TICKET 1HEURE<br>
      &nbsp;CORRESPONDANCE CARS REGION<br>
      <span class="msg-u">${code}</span><br>
      Prix 1.20 Date <span class="msg-u">${dateStr} début ${startTime}</span> Fin <span class="msg-u">${endTime}</span><br><br>
      <span class="msg-u">bit.ly/2AcdfcU</span>
    </div>
    <div class="msg-card-link">
      <p>Un tarif pour chacun</p>
      <div class="msg-card-link-row">
        <span class="msg-card-logo" aria-hidden="true"></span>
        <span>www.reso-m.fr</span>
      </div>
    </div>
  `;
  return card;
}

function addDivider(text){
  const div = document.createElement('div');
  div.className = 'msg-divider';
  div.textContent = text;
  msgList.appendChild(div);
}

function addSentBubble(text){
  const row = document.createElement('div');
  row.className = 'msg-row sent';
  row.innerHTML = `<div class="msg-bubble-sent">${text}</div>`;
  msgList.appendChild(row);
}

function addReceivedCard(card, timeLabel){
  const row = document.createElement('div');
  row.className = 'msg-row received';
  row.appendChild(card);
  if (timeLabel){
    const t = document.createElement('div');
    t.className = 'msg-time';
    t.textContent = timeLabel;
    row.appendChild(t);
  }
  msgList.appendChild(row);
}

// À l'arrivée sur la page, on rejoue l'envoi d'un nouveau ticket comme dans une vraie
// conversation SMS : divider du jour, bulle envoyée, puis réponse du 93900 avec un ticket
// généré avec l'heure réelle.
scrollToBottom();
setTimeout(() => {
  const now = new Date();
  const sentText = msgInput.textContent.trim() || '1h';

  addDivider(`aujourd’hui • ${formatTime(now)}`);
  addSentBubble(sentText);
  msgInput.textContent = '';
  scrollToBottom();

  setTimeout(() => {
    msgSend.classList.add('sending');
    setTimeout(() => msgSend.classList.remove('sending'), 220);

    const end = new Date(now.getTime() + 60 * 60 * 1000);
    const card = buildTicketCard(formatTicketDate(now), formatTime(now), formatTime(end), randomCode());
    addReceivedCard(card, formatTime(now));
    scrollToBottom();
  }, 1000);
}, 900);
