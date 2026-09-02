// Seleccionamos los elementos que permiten escribir y enviar mensajes.
const messages = document.querySelector('#chat-messages');
const input = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-btn');
const chatStatus = document.querySelector('#chat-status');

// Frases posibles con las que responde el contacto.
const replies = [
  'Jaja, buenísimo 😄',
  'Dale, avisame cualquier cosa',
  'Lo miro en un rato',
  '¿En serio? Contame más',
  'Copiado, gracias!'
];

// Devolvemos la hora actual del dispositivo en formato HH:MM.
function currentTime() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

// Creamos una burbuja y la agregamos a la conversación.
// El parámetro from recibe 'out' (propia) o 'in' (recibida).
// time llega al restaurar el historial; save indica si conviene guardarla.
function addBubble(text, from = 'out', time = currentTime(), save = true) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${from}`;
  // Las burbujas propias incluyen el tilde de estado de entrega.
  const ticks = from === 'out' ? '<span class="ticks">✓</span>' : '';
  bubble.innerHTML = `<p>${text}</p><span class="meta"><span class="time">${time}</span>${ticks}</span>`;
  messages.appendChild(bubble);
  // La conversación siempre sigue al último mensaje, aunque tenga scroll.
  bubble.scrollIntoView({ block: 'end' });
  // Cada mensaje nuevo se agrega al historial y se guarda en el navegador.
  if (save) {
    history.push({ text, from, time });
    persist();
  }
  return bubble;
}

// localStorage solo guarda texto: JSON convierte el arreglo ida y vuelta.
let history = JSON.parse(localStorage.getItem('whatsapp-chat') || 'null');

if (!history) {
  // Si no hay nada guardado, usamos las burbujas del HTML como punto de partida.
  history = [...messages.querySelectorAll('.bubble')].map(bubble => ({
    text: bubble.querySelector('p').textContent,
    from: bubble.classList.contains('out') ? 'out' : 'in',
    time: bubble.querySelector('.time').textContent
  }));
} else {
  // Si existe una conversación guardada, reemplaza a las burbujas del HTML.
  messages.innerHTML = '<span class="day-divider">HOY</span>';
  history.forEach(m => addBubble(m.text, m.from, m.time, false));
}

// Guardamos el historial completo para encontrarlo en la próxima visita.
function persist() {
  localStorage.setItem('whatsapp-chat', JSON.stringify(history));
}

// Los tildes avanzan como en WhatsApp real: enviado, entregado y leído.
// Cada setTimeout cambia una parte de la burbuja recién creada.
function trackDelivery(bubble) {
  const ticks = bubble.querySelector('.ticks');
  setTimeout(() => { ticks.textContent = '✓✓'; }, 2000);
  setTimeout(() => { ticks.classList.add('read'); }, 5000);
}

// Simulamos que el contacto está escribiendo y luego responde una frase al azar.
// setTimeout retrasa la ejecución: el código de adentro corre 2 segundos después.
function simulateReply() {
  chatStatus.textContent = 'escribiendo…';
  setTimeout(() => {
    addBubble(replies[Math.floor(Math.random() * replies.length)], 'in');
    chatStatus.textContent = 'en línea';
  }, 2000);
}

// Un mensaje vacío o con solo espacios nunca se envía.
// trim() elimina los espacios sobrantes antes de decidir.
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  trackDelivery(addBubble(text));
  // Después de enviar, el campo queda vacío para el próximo mensaje.
  input.value = '';
  updateSendButton();
  simulateReply();
}

// El botón permanece deshabilitado mientras no haya texto para enviar.
function updateSendButton() {
  sendButton.disabled = input.value.trim() === '';
}

sendButton.addEventListener('click', sendMessage);

// Enter dentro del campo envía, sin romper el funcionamiento del botón.
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') sendMessage();
});

input.addEventListener('input', updateSendButton);

// Al cargar la página el campo está vacío, así que el botón arranca deshabilitado.
updateSendButton();

// Frases que los distintos contactos van enviando con el tiempo.
const spontaneous = [
  '¿Estás? 👀',
  'Te mando una foto enseguida',
  'Nos vemos mañana, ¿no?',
  'Terminé el ejercicio de Grid',
  '¿Cenamos algo el viernes?'
];

// setInterval repite un bloque de código cada cierto tiempo.
// Cada 15 segundos, un contacto al azar escribe un mensaje nuevo.
setInterval(() => {
  const items = [...document.querySelectorAll('.chat-item')];
  const item = items[Math.floor(Math.random() * items.length)];
  const text = spontaneous[Math.floor(Math.random() * spontaneous.length)];

  // La lista siempre muestra el último mensaje y su hora.
  item.querySelector('.preview').textContent = text;
  item.querySelector('.time').textContent = currentTime();

  if (item.classList.contains('selected')) {
    // Si es el chat abierto, la burbuja aparece en la conversación.
    addBubble(text, 'in');
  } else {
    // Si es un chat cerrado, crece su contador de no leídos.
    let badge = item.querySelector('.unread');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'unread';
      badge.textContent = '0';
      item.querySelector('.chat-bottom').appendChild(badge);
    }
    badge.textContent = Number(badge.textContent) + 1;
  }
}, 15000);
