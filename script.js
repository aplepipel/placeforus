let current = 0;

function showSlide(index) {
  const slider = document.querySelector(".slider");
  const total = document.querySelectorAll(".slide").length;

  current = (index + total) % total;
  slider.style.transform = `translateX(-${current * 100}vw)`;
}

function nextSlide() { showSlide(current + 1); }
function prevSlide() { showSlide(current - 1); }

/* -------------------------
   MUSIC PLAYER
-------------------------- */
function playMusic() {
  const music = document.getElementById("music");
  music.play();
}

function pauseMusic() {
  const music = document.getElementById("music");
  music.pause();
}


/* -------------------------
   PARTICLE BACKGROUND
-------------------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.6 + 0.2
  });
}

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

/* -------------------------
   POLAROID STACK TAP EFFECT (SMOOTH SLIDE DOWN)
-------------------------- */

const stack = document.getElementById("photoStack");

if (stack) {
  function rotateRandom() {
    return (Math.random() * 8 - 4).toFixed(1); // random -4deg to +4deg
  }

  stack.addEventListener("click", () => {
    const firstPhoto = stack.children[0];

    // Animation: slide down + fade
    firstPhoto.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    firstPhoto.style.transform = "translateY(35px) rotate(0deg) scale(0.96)";
    firstPhoto.style.opacity = "0";

    // After animation, move to back
    setTimeout(() => {
      stack.appendChild(firstPhoto);

      // Reset style for new position
      firstPhoto.style.transition = "none";
      firstPhoto.style.transform = `rotate(${rotateRandom()}deg)`;
      firstPhoto.style.opacity = "1";

      // Force reflow (biar animasinya muncul lagi setelah reset)
      firstPhoto.offsetHeight;

      // Fade-in smooth
      firstPhoto.style.transition = "opacity 0.4s ease";
      firstPhoto.style.opacity = "1";
    }, 600);
  });
}
