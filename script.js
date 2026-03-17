const chatBox = document.getElementById("chatBox");
const btn = document.getElementById("nextBtn");
const music = document.getElementById("music");

// Start music
document.body.addEventListener("click", () => {
  music.play();
}, { once: true });

// STORY (Messenger style)
const messages = [
  { text: "Hey...", type: "sent" },
  { text: "I don’t even know if I should text this...", type: "sent" },
  { text: "But I couldn’t keep it inside anymore.", type: "sent" },

  { text: "You probably don’t expect this from me.", type: "sent" },

  { text: "But do you remember those normal days?", type: "sent" },
  { text: "Nothing special... just us existing...", type: "sent" },

  { text: "Somehow... you became my favorite part of everything.", type: "sent" },

  { text: "And I didn’t even realize when it happened.", type: "sent" },

  { text: "Now even silence reminds me of you.", type: "sent" },

  { text: "Even when we don’t talk anymore...", type: "sent" },

  { text: "You’re still the first thought I have.", type: "sent" },

  { text: "Maybe I’m late to say this...", type: "sent" },

  { text: "But if I don’t say it now… I never will.", type: "sent" },

  { text: "So here it is…", type: "sent" },

  { text: "I Love You ❤️", type: "sent", final: true }
];

let index = 0;

// Typing simulation
function addMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message", msg.type);

  if (msg.final) div.classList.add("final");

  let i = 0;
  function typing() {
    if (i < msg.text.length) {
      div.innerHTML += msg.text.charAt(i);
      i++;
      setTimeout(typing, 25);
    }
  }

  typing();

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Button click
btn.addEventListener("click", () => {
  if (index < messages.length) {
    addMessage(messages[index]);

    if (messages[index].final) {
      createExplosion(window.innerWidth/2, window.innerHeight/2);
      btn.innerText = "❤️";
    }

    index++;
  }
});

// HEART EXPLOSION
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x, y) {
  for (let i = 0; i < 200; i++) {
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
