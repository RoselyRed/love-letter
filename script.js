const textEl = document.getElementById("text");
const btn = document.getElementById("nextBtn");
const music = document.getElementById("music");

// Start music on first click
document.body.addEventListener("click", () => {
  music.play();
}, { once: true });

// STORY FLOW (K-Drama style pacing)
const story = [
`I wasn't planning to say anything...`,

`But silence has a way of saying too much...`,

`And lately... it has been saying your name.`,

`Do you remember... those normal days?`,

`Nothing special... nothing dramatic...`,

`But somehow... you became my favorite part of them.`,

`I didn’t notice when it happened...`,

`But I started looking for you in everything.`,

`In songs... in silence... in small moments.`,

`Even now... when we don’t talk anymore...`,

`My world still pauses... when I think of you.`,

`And maybe I shouldn't say this...`,

`But if I lose this chance... I’ll regret it forever.`,

`So just this once... let me be honest...`,

`You were never just someone to me.`,

`You were... everything.`,

`And if I could choose again...`,

`In every lifetime...`,

`I would still choose you.`,

`...`,

`I Love You ❤️`
];

let index = 0;

// TYPE EFFECT
function typeText(text, callback) {
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 35);
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

  // FINAL EFFECT
  if (index === story.length - 1) {
    textEl.classList.add("glow");
    createExplosion(window.innerWidth/2, window.innerHeight/2);
  }
});

// START
typeText(story[0]);

// HEART EXPLOSION
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x, y) {
  for (let i = 0; i < 150; i++) {
    particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      size: Math.random() * 5,
      life: 100
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
