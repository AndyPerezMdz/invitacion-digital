# Cómo guardar y ver las confirmaciones de asistencia (RSVP)

El formulario de la web envía las respuestas a **Formspree**. No necesitas servidor ni base de datos.

## Pasos para el administrador

### 1. Crear la cuenta y el formulario en Formspree

1. Entra en **[formspree.io](https://formspree.io)** y regístrate (gratis).
2. Pulsa **"New Form"** y ponle un nombre (por ejemplo: "Boda - Confirmaciones").
3. Formspree te dará una URL como:  
   `https://formspree.io/f/xyzabcde`  
   La parte que importa es **`xyzabcde`** (tu *Form ID*).

### 2. Poner tu Form ID en la web

1. Abre el archivo **`index.html`**.
2. Busca la línea del formulario que dice:  
   `action="https://formspree.io/f/TU_FORM_ID"`
3. Sustituye **`TU_FORM_ID`** por tu Form ID real (ej.: `xyzabcde`).  
   Debe quedar algo así:  
   `action="https://formspree.io/f/xyzabcde"`

### 3. Ver las confirmaciones

- Entra en **[formspree.io](https://formspree.io)** e inicia sesión.
- Abre el formulario que creaste.
- Ahí verás todas las respuestas: nombre, correo, número de invitados y mensaje.
- También puedes recibir un email por cada nueva confirmación (se configura en Formspree).

**Plan gratuito:** hasta 50 envíos al mes. Para una boda suele ser suficiente.

---

**Otras opciones (por si quieres cambiar más adelante):**

- **Google Forms:** crear un formulario en Google, enlazarlo desde la web y ver las respuestas en una Hoja de cálculo.
- **Backend propio:** si en el futuro tienes un servidor (Node, PHP, etc.) y base de datos, se puede hacer un panel de administración a medida.

 Hace aproximadamente 18 años Dios permitió que nuestros caminos se cruzaran por primera vez, sin imaginar que aquel encuentro tendría un significado tan grande en nuestras vidas. Después de tantos años nos volvimos a reencontrar el 14 de abril del 2025, ya no siendo las mismas personas, si no dos seres más maduros y con historias vividas, lo que hemos construido desde entonces, nuestra forma de mirarnos, de apoyarnos y de cuidarnos simplemente reafirma que estamos exactamente donde debemos estar.