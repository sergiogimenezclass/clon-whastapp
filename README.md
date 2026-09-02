# 💬 Clon de WhatsApp: de la Maquetación a la Conversación

¡Hola! En este proyecto vamos a construir una réplica de **WhatsApp Web**: una aplicación de mensajería con lista de chats, burbujas de mensajes y una ventana de conversación.

La página muestra varios contactos con sus fotos, últimos mensajes y horarios. Al abrir un chat, aparece la conversación con burbujas verdes y blancas sobre el fondo clásico de WhatsApp.

El trabajo tiene dos caminos posibles:

- **Usar la maqueta ya resuelta** y concentrarse en la funcionalidad con JavaScript.
- **Construir la maqueta desde cero** con HTML y CSS, y después agregar JavaScript.

En ambos casos, la interactividad se programa con **baby steps**: una funcionalidad pequeña por vez, probada antes de pasar a la siguiente, con ayuda de inteligencia artificial.

## 🛠️ Las tres partes del proyecto

Una página web se puede dividir en tres capas:

```text
┌──────────────────────────────────────────────────────────┐
│ 1. HTML (index.html)  ──► Estructura y contenido         │
│ 2. CSS (styles.css)   ──► Diseño y maquetación           │
│ 3. JS (app.js)        ──► Interactividad y comportamiento│
└──────────────────────────────────────────────────────────┘
```

### HTML: la estructura

El archivo `index.html` contiene los elementos de la aplicación:

- La barra lateral de iconos (estados, chats, canales…).
- La lista de chats con buscador.
- Cada chat de la lista: foto, nombre, último mensaje, hora y badge de no leídos.
- La ventana de conversación con su cabecera.
- Las burbujas de mensajes recibidos y enviados.
- La barra de escritura con el botón de enviar.
- El botón para volver a la lista, visible solo en celulares.

### CSS: el diseño

El archivo `styles.css` define cómo se presenta la página:

- La distribución general en tres columnas.
- El diseño interno de cada chat de la lista.
- Las burbujas de mensajes con sus colitas y radios.
- Los colores característicos de WhatsApp.
- La adaptación para pantallas pequeñas.

Para esta actividad usamos medidas sencillas en `px` y `%`.

Las reglas de maquetación son fijas:

- **Sin variables de CSS:** los colores se escriben directos en cada regla.
- **El layout general con Grid:** la estructura de columnas de la página.
- **Los componentes con Flexbox:** burbujas, ítems de la lista y barra de escritura.

### JavaScript: la funcionalidad

El archivo `app.js` permite:

- Escribir un mensaje y enviarlo con el botón o con la tecla Enter.
- Validar que no se envíen mensajes vacíos.
- Ver la burbuja propia alineada a la derecha, con la hora real.
- Simular que el contacto está "escribiendo…" y responde solo, con tiempos que varían como los de una persona real.
- Ver cómo los checks pasan de pendiendo a enviados y leídos.
- Recibir mensajes espontáneos de otros contactos.
- Contar los mensajes no leídos en la lista.
- Cambiar de conversación al tocar otro chat de la lista.
- Volver a la lista desde el botón ← en celulares.
- Conservar las conversaciones después de recargar la página.

## 📁 Archivos del proyecto

```text
clone-whatsapp/
├── index.html
├── styles.css
├── app.js
└── README.md
```

Los archivos están conectados desde `index.html`:

```html
<link rel="stylesheet" href="styles.css">
```

```html
<script src="app.js"></script>
```

## 🏷️ Convenciones de nombres

Para que JavaScript encuentre cada parte de la interfaz, la maqueta usa estos identificadores y clases:

| Elemento | Selector |
| --- | --- |
| Conversación visible (donde se agregan burbujas) | `#chat-messages` |
| Nombre del contacto en la cabecera | `#chat-title` |
| Estado del contacto (en línea / escribiendo…) | `#chat-status` |
| Campo de escritura | `#message-input` |
| Botón enviar | `#send-btn` |
| Botón volver a la lista (solo celulares) | `.back-btn` |
| Burbuja enviada / recibida | `.bubble.out` / `.bubble.in` |
| Ítem de la lista de chats | `.chat-item` |
| Badge de no leídos de cada chat | `.unread` |

Cada chat de la lista guarda información con atributos `data-*`:

```html
<li class="chat-item" data-id="lucas" data-name="Lucas">
  <!-- ... -->
  <span class="unread">2</span>
</li>
```

JavaScript puede leer esos datos para saber qué contacto respondió o a qué chat hay que sumarle un mensaje sin abrirlo.

## 🎯 ¿Qué tienen que hacer los alumnos?

### Camino A: usar la maqueta

Si prefieren ir directo a la funcionalidad, abran el proyecto, exploren el HTML y pasen a la sección de prompts. Antes de cada prompt, lean el HTML y ubiquen los selectores de la tabla anterior.

### Camino B: construir la maqueta

En `index.html` y `styles.css`, resuelvan los siguientes puntos:

1. Crear el layout general con Grid: barra de iconos + lista de chats + conversación.
2. Darle un ancho fijo a la barra y un porcentaje a la lista.
3. Armar cada ítem de la lista con Flexbox: foto a la izquierda, texto al medio, hora y badge a la derecha.
4. Centrar verticalmente la barra de iconos con Flexbox.
5. Construir las burbujas con Flexbox: contenido, hora y checks en fila.
6. Diferenciar burbuja enviada (`#d9fdd3`, alineada a la derecha) y recibida (`#ffffff`, alineada a la izquierda).
7. Usar el fondo `#efeae2` para la conversación y `#f0f2f5` para cabeceras y buscador.
8. Diseñar el badge de no leídos como un círculo verde `#00a884`.
9. Adaptar la página para pantallas pequeñas: en celular, primero la lista y al tocar un chat, la conversación.

### En ambos caminos: la funcionalidad

La actividad central es darle comportamiento a la interfaz con JavaScript Vanilla, sin librerías, pidiendo ayuda a la IA **de a una funcionalidad por vez**.

## 🔌 ¿Por qué baby steps?

Porque un prompt gigante del tipo *"haceme un WhatsApp entero"* devuelve código que no se puede entender ni corregir. Un prompt chico devuelve código que se puede leer, probar y arreglar.

Antes de usar cada prompt, compartan con la IA el contenido actualizado de `index.html`. Si la respuesta necesita conocer los estilos, también pueden compartir `styles.css`.

Cada prompt termina con la misma consigna: **no modificar el HTML ni el CSS existente**.

## Prompt 1: enviar mensajes

```text
Hola. Tengo maquetada con HTML y CSS una pantalla de chat de WhatsApp, pero todavía no sé programar en JavaScript.

Necesito que escribas JavaScript Vanilla, sin librerías, en un archivo independiente llamado app.js.

Cuando el usuario haga clic en #send-btn, quiero leer el texto de #message-input y crear una burbuja con la clase .bubble.out dentro de #chat-messages.

La burbuja debe mostrar el texto y la hora actual del dispositivo en formato HH:MM.

Después de enviar, limpiá el campo de escritura.

No modifiques mi HTML ni mi CSS. Antes de mostrar el código, explicame brevemente qué elementos del DOM vas a seleccionar.
```

### Qué hay que comprobar

- El botón responde al clic.
- La burbuja aparece alineada a la derecha.
- La hora es correcta.
- El campo queda vacío después de enviar.

## Prompt 2: Enter para enviar y mensajes vacíos

```text
Quiero mejorar el código anterior.

Agregá la posibilidad de enviar el mensaje presionando la tecla Enter dentro de #message-input, sin romper el envío con el botón.

Si el campo está vacío o solo tiene espacios, no debe crearse ninguna burbuja.

Además, dejá #send-btn deshabilitado mientras no haya texto escrito, y volvé a habilitarlo cuando el usuario escriba algo.

Conservá JavaScript Vanilla y no modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- Enter envía igual que el botón.
- Un mensaje vacío no genera burbuja.
- Solo espacios tampoco genera burbuja.
- El botón se deshabilita y habilita correctamente.

## Prompt 3: que la conversación siga el mensaje

```text
La conversación de #chat-messages tiene barra de scroll.

Modificá el código para que, después de agregar cada burbuja, la conversación se desplace automáticamente hasta el último mensaje.

Pista: puede servir el método scrollIntoView().

No modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- Al enviar varios mensajes, la vista queda pegada abajo.
- Si el usuario sube a leer, el siguiente mensaje lo devuelve abajo.

## Prompt 4: el contacto responde solo

```text
Quiero darle realismo al chat.

Cuando el usuario envíe un mensaje, necesito que:

1. Después de una pausa de entre 1 y 2 segundos, en #chat-status aparezca el texto "escribiendo…".
2. La respuesta llegue después de otra pausa de entre 2 y 5 segundos.
3. La respuesta se elija al azar desde un arreglo con al menos 5 frases.
4. La burbuja de respuesta muestre también la hora actual.

Una persona real no contesta siempre a la misma velocidad: los tiempos tienen que salir de Math.random() y variar en cada mensaje.

Usá setTimeout para los retrasos. Explicame qué hace setTimeout y cómo encadenaste la pausa de lectura con la de escritura.

No modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- "escribiendo…" aparece y desaparece.
- La respuesta llega unos segundos después.
- El tiempo de respuesta varía de un mensaje a otro.
- Las frases de respuesta varían entre un mensaje y otro.

## Prompt 5: los checks de estado

```text
Las burbujas enviadas (.bubble.out) deben mostrar los checks clásicos de WhatsApp.

Al enviar, la burbuja aparece con un tilde gris (✓). A los 2 segundos se convierte en doble tilde gris (✓✓), y a los 5 segundos en doble tilde azul (✓✓), simulando que el mensaje fue leído.

Modificá la creación de la burbuja para incluir el elemento de los checks y encadená los cambios de estado.

No modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- Cada mensaje propio muestra su progreso de entrega.
- Los checks cambian de color en el momento correcto.

## Prompt 6: mensajes espontáneos de otros contactos

```text
Quiero que la aplicación siga viva aunque el usuario no escriba.

Cada 15 segundos, elegí un chat de la lista (.chat-item) al azar y sumale un mensaje:

- Si es el chat abierto, agregá la burbuja en #chat-messages.
- Si es otro chat, aumentá en 1 el número de su .unread.
- Actualizá el último mensaje y la hora de ese chat en la lista.

Usá setInterval. Explicame la diferencia entre setInterval y setTimeout.

No modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- Los badges crecen solos con el tiempo.
- El chat abierto recibe el mensaje en vivo.
- La lista muestra el texto del último mensaje.

## Prompt 7: guardar las conversaciones

```text
Modificá el código para guardar los mensajes de la conversación visible en localStorage.

Cada vez que se agregue una burbuja, guardá el arreglo de mensajes con la clave whatsapp-chat.

Cuando se cargue la página, recuperá los mensajes guardados y volvé a mostrarlos en #chat-messages.

Si todavía no existen datos guardados, comenzá con un arreglo vacío.

Explicame qué hacen JSON.stringify y JSON.parse y cómo puedo borrar los datos guardados para repetir las pruebas.
```

## Prompt 8: cambiar de conversación

```text
Ahora quiero poder cambiar de conversación.

Cuando el usuario haga clic en un .chat-item de la lista:

- Ese chat queda con la clase .selected y los demás la pierden.
- El avatar y #chat-title de la cabecera muestran los datos del contacto elegido.
- #chat-status vuelve a "en línea".
- Su badge .unread desaparece, porque los mensajes ya se leyeron.
- #chat-messages muestra la conversación de ese contacto.

Los mensajes se guardan por contacto usando su data-id.
La clave whatsapp-chat pasa a guardar un objeto con una entrada por contacto.
Si un contacto no tiene mensajes guardados, su conversación arranca vacía;
las burbujas que ya estaban en el HTML son el punto de partida del chat seleccionado.

En celulares la maqueta oculta .conversation: al tocar un chat, agregá la clase chat-open a .app para que la conversación ocupe la pantalla, y hacé que el botón .back-btn la quite para volver a la lista.

Explicame cómo hiciste para que la respuesta de un contacto no termine en otro chat si el usuario cambia de conversación mientras escribe.

No modifiques el HTML ni el CSS existente.
```

### Qué hay que comprobar

- Al tocar otro chat cambian la foto y el nombre de la cabecera.
- La conversación mostrada es la del chat elegido.
- El badge de no leídos desaparece al abrir ese chat.
- Lo que se escribe queda guardado en el chat correcto.
- Cada chat conserva su propia conversación al recargar.
- En celulares, la conversación ocupa la pantalla y el botón ← vuelve a la lista.

## 🧪 Probar también es parte del trabajo

Después de recibir código de una IA, no alcanza con copiarlo y pegarlo. Hay que comprobar si realmente resuelve la consigna.

Realicen estas pruebas:

1. Enviar un mensaje corto.
2. Enviar un mensaje muy largo y ver cómo se comporta la burbuja.
3. Enviar con Enter y con el botón.
4. Intentar enviar un mensaje vacío.
5. Esperar la respuesta del contacto.
6. Observar los checks de un mensaje propio.
7. Dejar la página abierta y ver llegar mensajes espontáneos.
8. Recargar la página y comprobar que los mensajes siguen.
9. Abrir otro chat, escribirle y volver al primero.
10. Comprobar que cada conversación quedó en su chat.
11. Probar todo en una ventana chica, como un celular.

Si algo falla, describan el problema con precisión. Por ejemplo:

```text
Cuando envío dos mensajes seguidos, la primera respuesta del contacto pisa a la segunda. Revisá mi código, explicame la causa y modificá solamente la parte necesaria.
```

## 💡 Cómo pedir mejores respuestas a la IA

Un buen prompt debería indicar:

- Qué elementos existen en el HTML.
- Qué clases e identificadores se utilizaron.
- Qué debería pasar cuando el usuario interactúa.
- Qué tecnologías están permitidas.
- Qué cosas no se deben modificar.
- Qué resultado se espera ver en pantalla.

La IA puede generar código rápidamente, pero ustedes deben poder responder:

- ¿Qué problema intenta resolver?
- ¿Qué elementos del HTML selecciona?
- ¿Qué evento está escuchando?
- ¿Qué temporizador usa y con qué retraso?
- ¿Cómo puedo comprobar que funciona?

## 🚀 Desafíos opcionales

Cuando el proyecto básico esté terminado, pueden pedirle a la IA que ayude a incorporar:

- Un buscador que filtre los chats de la lista por nombre.
- Separadores de fecha entre mensajes de días distintos.
- Shift+Enter para escribir un mensaje de varias líneas.
- Borrar una burbuja propia al hacer doble clic sobre ella.
- Mostrar "en línea" con el punto verde y ocultarlo al cambiar de chat.
- Un modo oscuro con los colores reales de WhatsApp.

Agreguen las mejoras de una en una. Prueben cada cambio antes de solicitar el siguiente.

## ✅ Objetivo final

Al terminar la actividad, deberían tener una réplica de WhatsApp Web, creada con HTML y CSS, que **conversa sola**: responde, escribe, manda mensajes y recuerda la charla al recargar.

La meta no es solamente obtener código de la IA. La meta es aprender a **describir una funcionalidad, conectar el código con la estructura existente, probar el resultado y pedir correcciones claras**.

Experimenten, cambien los contactos y las respuestas, y no tengan miedo de romper algo: comparar, probar y corregir también forma parte de aprender desarrollo web.
