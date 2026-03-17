// Envelope Open
const envelope = document.getElementById("envelope");
const letterSection = document.getElementById("letterSection");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    document.querySelector(".envelope-section").style.display = "none";
    letterSection.classList.remove("hidden");
  }, 800);
});

// Scroll Animation
const panels = document.querySelectorAll(".panel");

window.addEventListener("scroll", () => {
  panels.forEach(panel => {
    const top = panel.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      panel.classList.add("show");
    }
  });
});

// Theme Toggle
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Floating Hearts
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

for (let i = 0; i < 50; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 1 + 0.5
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach(h => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 105, 180, 0.6)";
    ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
    ctx.fill();

    h.y -= h.speed;
    if (h.y < 0) {
      h.y = canvas.height;
      h.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawHearts);
}

drawHearts();