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
function addBubble(text, from = 'out') {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${from}`;
  // Las burbujas propias incluyen el tilde de estado de entrega.
  const ticks = from === 'out' ? '<span class="ticks">✓</span>' : '';
  bubble.innerHTML = `<p>${text}</p><span class="meta"><span class="time">${currentTime()}</span>${ticks}</span>`;
  messages.appendChild(bubble);
  // La conversación siempre sigue al último mensaje, aunque tenga scroll.
  bubble.scrollIntoView({ block: 'end' });
  return bubble;
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
