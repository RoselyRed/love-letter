const textEl = document.getElementById("text");
const btn = document.getElementById("nextBtn");
const hint = document.getElementById("hint");
const music = document.getElementById("music");

// Ensure music works
music.volume = 0.6;

document.body.addEventListener("click", () => {
  music.play().catch(() => {});
  hint.style.display = "none";
}, { once: true });

// STORY (Refined emotional pacing)
const story = [
`I wasn’t planning to say anything...`,

`But silence... has been louder than words lately.`,

`And somehow... it keeps bringing me back to you.`,

`Do you remember those days?`,

`Nothing extraordinary... just simple moments.`,

`But for me... they meant everything.`,

`Because you were there.`,

`And without realizing it...`,

`You became my favorite part of life.`,

`Even now...`,

`When we don’t talk anymore...`,

`My mind still finds you... in everything.`,

`Maybe I shouldn’t say this...`,

`Maybe I’m too late...`,

`But if I don’t say it now... I never will.`,

`So just this once...`,

`Let me be honest...`,

`In every version of my life...`,

`I would still choose you.`,

`...`,

`I Love You ❤️`
];

let index = 0;

// TYPEWRITER WITH PAUSE
function typeText(text, callback) {
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;

      let delay = 35;

      if (text.charAt(i-1) === "." || text.charAt(i-1) === "...") {
        delay = 300; // pause effect
      }

      setTimeout(typing, delay);
    } else {
      btn.classList.remove("hidden");
    }
  }

  typing();
}

// NEXT BUTTON
btn.addEventListener("click", () => {
  btn.classList.add("hidden");
  index++;

  if (index < story.length) {
    typeText(story[index]);
  }

  if (index === story.length - 1) {
    textEl.classList.add("final");
    createExplosion(window.innerWidth/2, window.innerHeight/2);
  }
});

// START FIRST TEXT
typeText(story[0]);

// CANVAS (Floating + Explosion)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Ambient floating hearts
for (let i = 0; i < 40; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dy: Math.random() * 0.5 + 0.2,
    size: Math.random() * 2 + 1,
    type: "float"
  });
}

function createExplosion(x, y) {
  for (let i = 0; i < 150; i++) {
    particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      size: Math.random() * 4 + 1,
      life: 100,
      type: "burst"
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {

    if (p.type === "float") {
      p.y -= p.dy;
      if (p.y < 0) p.y = canvas.height;
    } else {
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    }

    ctx.beginPath();
    ctx.fillStyle = "rgba(255,105,180,0.6)";
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
