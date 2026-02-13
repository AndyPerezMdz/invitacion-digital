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

// Actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

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

// Confirmar asistencia - puedes conectar con un formulario o backend
const confirmBtn = document.querySelector('.btn-confirm');
if (confirmBtn) {
  confirmBtn.addEventListener('click', () => {
    alert('¡Gracias! Pronto recibirás un enlace para confirmar tu asistencia.');
    // Aquí podrías abrir un modal con formulario o redirigir a otra página
  });
}
