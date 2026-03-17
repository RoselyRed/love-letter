const textEl = document.getElementById("text");
const music = document.getElementById("music");

document.body.classList.add("dark");

// MUSIC
music.volume = 0.6;
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

// STORY (refined emotional script)
const scenes = [
"I didn’t realize how quiet everything felt...",
"Not peaceful... just empty.",
"Days passed... but nothing really stayed.",
"And then... you came into my life.",
"Not like a storm...",
"But like a warmth I didn’t know I needed.",
"Slowly... things began to change.",
"The darkness didn’t feel as heavy anymore.",
"And somehow...",
"You became my favorite part of everything.",
"Even now...",
"When we don’t talk anymore...",
"My heart still finds you.",
"In silence...",
"In songs...",
"In everything.",
"Maybe I’m late to say this...",
"But this feeling never left.",
"If I could choose again...",
"In every lifetime...",
"I would still choose you.",
"...",
"I love you ❤️"
];

let index = 0;

// TYPEWRITER (SMOOTH + SLOW)
function typeText(text) {
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;

      let delay = 55;

      if (text[i-1] === ".") delay = 300;

      setTimeout(typing, delay);
    }
  }

  typing();
}

// TAP EVENT
document.body.addEventListener("click", (e) => {

  if (index < scenes.length) {

    typeText(scenes[index]);

    // COLOR TRANSITION
    if (index > 5 && index < 15) {
      document.body.classList.remove("dark");
      document.body.classList.add("mid");
    }

    if (index >= 15) {
      document.body.classList.remove("mid");
      document.body.classList.add("light");
    }

    spawnIcon(e.clientX, e.clientY, index);

    if (index === scenes.length - 1) {
      setTimeout(() => {
        createExplosion(window.innerWidth/2, window.innerHeight/2);
      }, 800);
    }

    index++;
  }

});

// ICON SPAWNER (hearts, petals, ring)
function spawnIcon(x, y, step) {
  const el = document.createElement("div");

  const icons = ["❤️","🌸","💖","💍"];
  el.innerHTML = icons[Math.floor(Math.random() * icons.length)];

  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.fontSize = "20px";
  el.style.opacity = "0.9";
  el.style.animation = "floatUp 2.5s ease-out forwards";

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 2500);
}

// FLOAT ANIMATION
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8); opacity: 1; }
  100% { transform: translateY(-200px) scale(1.4); opacity: 0; }
}`;
document.head.appendChild(style);

// EXPLOSION
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x,y){
  for(let i=0;i<200;i++){
    particles.push({
      x,y,
      dx:(Math.random()-0.5)*10,
      dy:(Math.random()-0.5)*10,
      life:100
    });
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    p.x+=p.dx;
    p.y+=p.dy;
    p.life--;

    ctx.beginPath();
    ctx.fillStyle="pink";
    ctx.arc(p.x,p.y,3,0,Math.PI*2);
    ctx.fill();

    if(p.life<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();

// START FIRST TEXT
typeText(scenes[0]);
