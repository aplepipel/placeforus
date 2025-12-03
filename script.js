let current = 0;

/* ============================
   SLIDER NAVIGATION
============================== */
function showSlide(index) {
  const slider = document.querySelector(".slider");
  const total = document.querySelectorAll(".slide").length;

  current = (index + total) % total;

  // FIX: make slider dynamic width
  slider.style.transform = `translateX(-${current * 100}vw)`;
}

function nextSlide() { showSlide(current + 1); }
function prevSlide() { showSlide(current - 1); }

/* ============================
   MUSIC PLAYER
============================== */
function playMusic() {
  const music = document.getElementById("music");
  music.play();
}

function pauseMusic() {
  const music = document.getElementById("music");
  music.pause();
}

/* ============================
   PARTICLE BACKGROUND (AUTO-RESIZE)
============================== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.6 + 0.2
    });
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    p.y -= p.speed;
    if (p.y < -5) p.y = canvas.height + Math.random() * 20;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

/* ============================
   POLAROID STACK (NO BUG)
============================== */
const stack = document.getElementById("photoStack");

if (stack) {
  function rotateRandom() {
    return (Math.random() * 8 - 4).toFixed(1);
  }

  stack.addEventListener("click", () => {
    const firstPhoto = stack.children[0];

    // Slide + fade animation
    firstPhoto.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    firstPhoto.style.transform = "translateY(35px) rotate(0deg) scale(0.96)";
    firstPhoto.style.opacity = "0";

    setTimeout(() => {
      stack.appendChild(firstPhoto);

      // Reset instantly
      firstPhoto.style.transition = "none";
      firstPhoto.style.transform = `rotate(${rotateRandom()}deg)`;
      firstPhoto.style.opacity = "1";

      // Reflow untuk animasi muncul lagi
      firstPhoto.offsetHeight;

      // Fade-in soft
      firstPhoto.style.transition = "opacity 0.4s ease";
      firstPhoto.style.opacity = "1";
    }, 600);
  });
}
