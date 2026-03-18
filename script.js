const textEl = document.getElementById("text");
const music = document.getElementById("music");
const hintEl = document.getElementById("hint");

music.volume = 0.5;

// Gentle haptics for supported devices
function gentleVibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

// Start music on first interaction
document.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

// STORY
const scenes = [
  "I did not realize how quiet everything felt...",
  "Not peaceful... just empty.",
  "Days passed... but nothing ever stayed.",
  "And then... you came into my life.",
  "Not suddenly... not loudly...",
  "But gently... in a way I did not expect.",
  "Somewhere along the way...",
  "You became my favorite part of every day.",
  "Even now...",
  "When we do not talk anymore...",
  "My heart still finds you.",
  "In silence...",
  "In songs...",
  "In everything.",
  "Maybe I am late to say this...",
  "But this feeling never left.",
  "If I could choose again...",
  "In every lifetime...",
  "I would still choose you.",
  "...",
  "I love you ❤️"
];

let index = 1; 
let typingTimeout;

// TYPEWRITER (smooth)
function typeText(text) {
  clearTimeout(typingTimeout); 
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;
      let delay = 60;
      if (text[i - 1] === ".") delay = 250; 
      else if (text[i - 1] === ",") delay = 150;
      typingTimeout = setTimeout(typing, delay);
    }
  }
  typing();
}

// THE FIX: Listen to the entire document, but ignore the bottom 20%
document.addEventListener("click", (e) => {
  // If she clicks in the bottom 20% of the screen, ignore it (protects the buttons)
  if (e.clientY > window.innerHeight * 0.8) return;
  
  if (e.target.tagName === "BUTTON") return;

  if (index <= scenes.length) {
    gentleVibrate(20);

    if (index === 1) hintEl.style.opacity = 0; 

    if (index < scenes.length) {
      typeText(scenes[index]);

      // COLOR TRANSITIONS
      if (index > 4 && index < 12) document.body.className = "mid";
      if (index >= 12) document.body.className = "light";

      spawnBottomIcons(3);

      if (index >= 12) {
        textEl.parentElement.classList.add("pulse");
      }

      if (index === scenes.length - 1) {
        setTimeout(() => {
          createExplosion();
          showOptions();
          gentleVibrate([50, 100, 50, 100, 50]); 
        }, 1200);
      }
      index++;
    }
  }
});

// HOLD EFFECT 
let holdInterval;

function startHold(e) {
  if (e.clientY > window.innerHeight * 0.8) return;
  if (e.target.tagName === "BUTTON") return;
  
  holdInterval = setInterval(() => {
    spawnBottomIcons(2);
    gentleVibrate(10); 
  }, 250);
}

function stopHold() {
  clearInterval(holdInterval);
}

// Listen to entire document for holding
document.addEventListener("mousedown", startHold);
document.addEventListener("mouseup", stopHold);
document.addEventListener("mouseleave", stopHold);

document.addEventListener("touchstart", startHold, { passive: true });
document.addEventListener("touchend", stopHold);
document.addEventListener("touchcancel", stopHold);

// ICONS FROM BOTTOM
function spawnBottomIcons(count) {
  const icons = ["❤️", "🌸", "💖", "✨"];
  
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    const startX = Math.random() * window.innerWidth;
    el.style.position = "absolute";
    el.style.left = startX + "px";
    el.style.bottom = "-40px";
    el.style.fontSize = (18 + Math.random() * 12) + "px";
    el.style.opacity = "0.7";
    el.style.pointerEvents = "none";
    el.style.zIndex = "5";

    const duration = 3 + Math.random() * 2;
    el.style.animation = `floatUp ${duration}s ease-out forwards`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }
}

// FLOAT ANIMATION
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-110vh) scale(1.5) rotate(25deg); opacity: 0; }
}`;
document.head.appendChild(style);

// CANVAS MAGIC (Explosion & Ambient Fireflies)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];
let fireflies = [];

// Create ambient fireflies
for (let i = 0; i < 40; i++) {
  fireflies.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2,
    alpha: Math.random()
  });
}

function createExplosion() {
  const colors = ['#ff4d6d', '#ff758c', '#ffb3c1', '#ffffff'];
  for (let i = 0; i < 250; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20,
      life: 150 + Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Fireflies
  fireflies.forEach(f => {
    f.x += f.vx;
    f.y += f.vy;
    
    // Bounce off edges smoothly
    if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
    if (f.y < 0 || f.y > canvas.height) f.vy *= -1;

    // Twinkle effect
    f.alpha += (Math.random() - 0.5) * 0.05;
    if (f.alpha < 0.1) f.alpha = 0.1;
    if (f.alpha > 0.8) f.alpha = 0.8;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 200, 200, ${f.alpha})`;
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw Explosion Fireworks
  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    p.dy += 0.08; // Gravity
    p.dx *= 0.96; // Friction

    ctx.beginPath();
    // Convert hex to rgb for fading alpha
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life / 200; 
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0; // Reset alpha

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

// OPTIONS
function showOptions() {
  document.getElementById("endOptions").classList.remove("hidden");
}

function restart() {
  location.reload();
}

function lovePrompt() {
  alert("Oh come on, seriously? If you love Me, call and tell Me, silly ❤️");
}

// START
typeText(scenes[0]);
