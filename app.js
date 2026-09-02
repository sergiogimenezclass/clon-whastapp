// Seleccionamos los elementos que permiten escribir y enviar mensajes.
const messages = document.querySelector('#chat-messages');
const input = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-btn');

// Devolvemos la hora actual del dispositivo en formato HH:MM.
function currentTime() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

// Creamos una burbuja propia con el texto indicado y la agregamos a la conversación.
function addBubble(text) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble out';
  bubble.innerHTML = `<p>${text}</p><span class="meta"><span class="time">${currentTime()}</span></span>`;
  messages.appendChild(bubble);
}

// Escuchamos el clic del botón enviar.
sendButton.addEventListener('click', () => {
  addBubble(input.value);
  // Después de enviar, el campo queda vacío para el próximo mensaje.
  input.value = '';
});
