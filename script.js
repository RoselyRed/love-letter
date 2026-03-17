// MUSIC START (on first interaction)
const music = document.getElementById("music");
document.body.addEventListener("click", () => {
  music.play();
}, { once: true });

// THEME
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
};

// TYPING EFFECT (K-DRAMA STYLE)
const text = `I don’t know if I still have the right to say this...

But if this is the last time I can...

I need you to know one thing.

You were never just someone in my life.

You were... everything I never knew I needed.`;

let i = 0;
const typing = document.getElementById("typing");

function typeWriter() {
  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  } else {
    document.getElementById("continue").classList.remove("hidden");
  }
}

typeWriter();

// CONTINUE
document.getElementById("continue").onclick = () => {
  document.querySelector(".intro").style.display = "none";
  document.getElementById("story").classList.remove("hidden");
};

// SCROLL ANIMATION
const panels = document.querySelectorAll(".panel");

window.addEventListener("scroll", () => {
  panels.forEach(p => {
    const top = p.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      p.classList.add("show");
    }
  });
});

// HEART EXPLOSION
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x, y) {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      size: Math.random() * 4 + 1,
      life: 100
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// TRIGGER EXPLOSION
document.getElementById("loveText").onclick = (e) => {
  createExplosion(e.clientX, e.clientY);
};
