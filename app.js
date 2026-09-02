// Seleccionamos los elementos que vamos a consultar o modificar.
const app = document.querySelector('.app');
const messages = document.querySelector('#chat-messages');
const input = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-btn');
const chatTitle = document.querySelector('#chat-title');
const chatStatus = document.querySelector('#chat-status');
const chatAvatar = document.querySelector('.chat-head .avatar');
const chatList = document.querySelector('#chat-list');
const backButton = document.querySelector('.back-btn');

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

// localStorage solo guarda texto:
// - JSON.stringify convierte el objeto a texto para poder guardarlo.
// - JSON.parse convierte ese texto de vuelta a objeto para poder usarlo.
// Guardamos una conversación por contacto, identificada por su data-id.
// Para borrar los datos y repetir las pruebas: localStorage.removeItem('whatsapp-chat') en la consola.
let conversations = JSON.parse(localStorage.getItem('whatsapp-chat') || '{}');

// Las versiones anteriores guardaban una sola conversación (un arreglo).
// Si aparece ese formato, arrancamos de nuevo con el objeto por contacto.
if (Array.isArray(conversations)) conversations = {};

// El chat que viene seleccionado en el HTML es el que abre al cargar la página.
let currentChat = document.querySelector('.chat-item.selected').dataset.id;

// Guardamos todas las conversaciones para encontrarlas en la próxima visita.
function persist() {
  localStorage.setItem('whatsapp-chat', JSON.stringify(conversations));
}

// Creamos la burbuja en pantalla y la agregamos a la conversación visible.
// El campo from recibe 'out' (propia) o 'in' (recibida).
// isNew distingue un mensaje recién enviado de uno restaurado del historial.
function renderBubble(m, isNew) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${m.from}`;
  // Las burbujas propias muestran el tilde de entrega:
  // las nuevas arrancan con un solo tilde; las restauradas ya fueron leídas.
  let ticks = '';
  if (m.from === 'out') {
    ticks = isNew ? '<span class="ticks">✓</span>' : '<span class="ticks read">✓✓</span>';
  }
  bubble.innerHTML = `<p>${m.text}</p><span class="meta"><span class="time">${m.time}</span>${ticks}</span>`;
  messages.appendChild(bubble);
  // La conversación siempre sigue al último mensaje, aunque tenga scroll.
  bubble.scrollIntoView({ block: 'end' });
  return bubble;
}

// Agregamos un mensaje a la conversación de un contacto y lo guardamos.
function saveMessage(chat, text, from, time) {
  if (!conversations[chat]) conversations[chat] = [];
  conversations[chat].push({ text, from, time });
  persist();
}

// Guardamos el mensaje y lo mostramos, pero solo si ese chat está abierto.
function addBubble(text, from, chat = currentChat) {
  const time = currentTime();
  saveMessage(chat, text, from, time);
  if (chat !== currentChat) return null;
  return renderBubble({ text, from, time }, true);
}

// Mostramos en pantalla la conversación completa de un contacto.
function renderConversation(id) {
  messages.innerHTML = '<span class="day-divider">HOY</span>';
  (conversations[id] || []).forEach(m => renderBubble(m, false));
  // Bajamos hasta el último mensaje.
  const last = messages.lastElementChild;
  if (last) last.scrollIntoView({ block: 'end' });
}

// Al cargar la página: si el chat abierto tiene conversación guardada,
// reemplaza a las burbujas del HTML. Si no, esas burbujas son su punto de partida.
if (conversations[currentChat]) {
  renderConversation(currentChat);
} else {
  conversations[currentChat] = [...messages.querySelectorAll('.bubble')].map(bubble => ({
    text: bubble.querySelector('p').textContent,
    from: bubble.classList.contains('out') ? 'out' : 'in',
    time: bubble.querySelector('.time').textContent
  }));
}

// Los tildes avanzan como en WhatsApp real: enviado, entregado y leído.
// Cada setTimeout cambia una parte de la burbuja recién creada.
function trackDelivery(bubble) {
  const ticks = bubble.querySelector('.ticks');
  setTimeout(() => { ticks.textContent = '✓✓'; }, 2000);
  setTimeout(() => { ticks.classList.add('read'); }, 5000);
}

// Simulamos que el contacto lee, piensa y contesta como una persona real:
// nadie responde siempre a la misma velocidad, así que los tiempos son al azar.
// setTimeout retrasa la ejecución: el código de adentro corre después del tiempo indicado.
function simulateReply() {
  const chat = currentChat;
  // Pausa de lectura: entre 1 y 2 segundos antes de ponerse a escribir.
  const reading = Math.round(1000 + Math.random() * 1000);
  // Pausa de escritura: entre 2 y 5 segundos hasta que llega la respuesta.
  const typing = Math.round(2000 + Math.random() * 3000);
  // Primero esperamos la lectura; recién después avisa que está escribiendo.
  setTimeout(() => {
    if (chat === currentChat) chatStatus.textContent = 'escribiendo…';
    // La respuesta va al chat que la originó, aunque el usuario cambie de conversación.
    setTimeout(() => {
      addBubble(replies[Math.floor(Math.random() * replies.length)], 'in', chat);
      if (chat === currentChat) chatStatus.textContent = 'en línea';
    }, typing);
  }, reading);
}

// Un mensaje vacío o con solo espacios nunca se envía.
// trim() elimina los espacios sobrantes antes de decidir.
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  trackDelivery(addBubble(text, 'out'));
  // Después de enviar, el campo queda vacío para el próximo mensaje.
  input.value = '';
  updateSendButton();
  simulateReply();
}

// El botón permanece deshabilitado mientras no haya texto para enviar.
function updateSendButton() {
  sendButton.disabled = input.value.trim() === '';
}

// Abrimos la conversación de un contacto de la lista.
function openChat(item) {
  // Solo el chat elegido queda marcado como seleccionado.
  document.querySelector('.chat-item.selected').classList.remove('selected');
  item.classList.add('selected');
  currentChat = item.dataset.id;
  // La cabecera copia la foto, el nombre y el estado del nuevo contacto.
  const listAvatar = item.querySelector('.avatar');
  chatAvatar.className = listAvatar.className;
  // innerHTML copia tanto la inicial de texto como la etiqueta <img> de las fotos.
  chatAvatar.innerHTML = listAvatar.innerHTML;
  chatTitle.textContent = item.dataset.name;
  chatStatus.textContent = 'en línea';
  // Al abrir un chat, sus mensajes dejan de ser no leídos.
  const badge = item.querySelector('.unread');
  if (badge) badge.remove();
  renderConversation(currentChat);
  // En celulares, tocar un chat hace que la conversación ocupe la pantalla.
  app.classList.add('chat-open');
}

sendButton.addEventListener('click', sendMessage);

// Enter dentro del campo envía, sin romper el funcionamiento del botón.
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') sendMessage();
});

input.addEventListener('input', updateSendButton);

// Un solo evento en la lista detecta clics en cualquier chat,
// incluidos los que JavaScript cree más adelante.
chatList.addEventListener('click', event => {
  const item = event.target.closest('.chat-item');
  if (item) openChat(item);
});

// El botón volver, visible solo en celulares, regresa a la lista de chats.
backButton.addEventListener('click', () => app.classList.remove('chat-open'));

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

// setInterval repite un bloque de código cada cierto tiempo,
// mientras que setTimeout lo ejecuta una única vez y termina.
// Cada 15 segundos, un contacto al azar escribe un mensaje nuevo.
setInterval(() => {
  const items = [...document.querySelectorAll('.chat-item')];
  const item = items[Math.floor(Math.random() * items.length)];
  const text = spontaneous[Math.floor(Math.random() * spontaneous.length)];

  // La lista siempre muestra el último mensaje y su hora.
  item.querySelector('.preview').textContent = text;
  item.querySelector('.time').textContent = currentTime();

  // El mensaje queda guardado en la conversación de ese contacto
  // y se ve en pantalla solo si ese chat está abierto.
  addBubble(text, 'in', item.dataset.id);

  // Si es un chat cerrado, crece su contador de no leídos.
  if (item.dataset.id !== currentChat) {
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
