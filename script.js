/**
 * Karla & Agustín - Invitación de Boda
 * Contador regresivo y reproductor de música
 */

// Fecha de la boda: 9 de abril de 2026
const WEDDING_DATE = new Date('2026-04-09T12:00:00');

// Elementos del contador
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

// Actualizar cada segundo (solo en index.html)
if (daysEl) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Música de fondo: se reproduce durante toda la visita (loop)
const bgMusic = document.getElementById('bg-music');
const playBtn = document.querySelector('.music-btn--play');

function updatePlayButtonState() {
  if (playBtn) playBtn.classList.toggle('is-playing', !bgMusic.paused);
}

if (bgMusic) {
  // Intentar reproducir al cargar (algunos navegadores lo bloquean hasta la primera interacción)
  bgMusic.play().catch(() => {});

  bgMusic.addEventListener('play', updatePlayButtonState);
  bgMusic.addEventListener('pause', updatePlayButtonState);

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
    });
  }
}

// Confirmación de asistencia (RSVP) – envío a Formspree
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = rsvpForm.querySelector('.btn-confirm');
    if (!btn || !rsvpSuccess) return;
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    rsvpSuccess.textContent = '';
    try {
      const formData = new FormData(rsvpForm);
      const res = await fetch(rsvpForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        rsvpSuccess.textContent = '¡Gracias! Tu confirmación se ha enviado correctamente.';
        rsvpSuccess.style.color = 'rgba(255,255,255,0.95)';
        rsvpForm.reset();
      } else {
        rsvpSuccess.textContent = 'Hubo un error. Por favor, inténtalo de nuevo o escríbenos por otro medio.';
        rsvpSuccess.style.color = 'rgba(255,200,200,0.95)';
      }
    } catch {
      rsvpSuccess.textContent = 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.';
      rsvpSuccess.style.color = 'rgba(255,200,200,0.95)';
    }
    btn.disabled = false;
    btn.textContent = 'Confirmar asistencia';
  });
}

// Carrusel de la galería (us.html)
const carousel = document.querySelector('.carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  const dotsContainer = carousel.querySelector('.carousel__dots');
  const total = slides.length;
  let index = 0;

  function goTo(i) {
    index = (i + total) % total;
    slides.forEach((s, k) => s.classList.toggle('carousel__slide--active', k === index));
    dotsContainer.querySelectorAll('.carousel__dot').forEach((d, k) => d.classList.toggle('carousel__dot--active', k === index));
  }

  if (dotsContainer && total > 1) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.setAttribute('aria-label', 'Ir a foto ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  goTo(0);
}
