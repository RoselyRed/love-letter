const textEl = document.getElementById("text");
const titleEl = document.getElementById("title");
const btn = document.getElementById("nextBtn");
const hint = document.getElementById("hint");
const music = document.getElementById("music");
const card = document.getElementById("card");

// MUSIC FIX
music.volume = 0.6;
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
  hint.style.display = "none";
}, { once: true });

// STORY (Dark → Light progression)
const moments = [
  {
    t: "Before You...",
    q: "Everything felt quiet... almost colorless.",
    bg: "#050505",
    text: "#666"
  },
  {
    t: "Then You Came",
    q: "And somehow... things started to feel different.",
    bg: "#101015"
  },
  {
    t: "A Small Change",
    q: "It wasn’t loud... but it was enough to notice.",
    bg: "#151520"
  },
  {
    t: "Slowly...",
    q: "The darkness didn’t feel so heavy anymore.",
    bg: "#1f1f2a"
  },
  {
    t: "Without Realizing",
    q: "You became the light I didn’t know I needed.",
    bg: "#2b2b38"
  },
  {
    t: "Now I Know",
    q: "It was never about the world changing...",
    bg: "#3a3a4a"
  },
  {
    t: "...",
    q: "It was you.",
    bg: "#4a4a5a"
  },
  {
    t: "Because of You",
    q: "Even my darkest days feel softer.",
    bg: "#666"
  },
  {
    t: "And If I’m Honest...",
    q: "I don’t want a world where you’re not in it.",
    bg: "#ddd",
    text: "#222"
  },
  {
    t: "So here it is...",
    q: "The one thing I should have said earlier.",
    bg: "#fff",
    text: "#111"
  },
  {
    t: "",
    q: "I Love You ❤️",
    final: true,
    bg: "#fff"
  }
];

let index = 0;

// TYPEWRITER (SLOW + SMOOTH)
function typeText(text) {
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;

      let delay = 45;

      if (text[i-1] === ".") delay = 300;

      setTimeout(typing, delay);
    }
  }

  typing();
}

// BUTTON CLICK
btn.addEventListener("click", () => {
  if (index < moments.length) {
    const m = moments[index];

    document.body.style.background = m.bg;
    if (m.text) document.body.style.color = m.text;

    titleEl.innerText = m.t;
    typeText(m.q);

    card.classList.add("glow");

    if (m.final) {
      textEl.classList.add("final");
      createExplosion(window.innerWidth/2, window.innerHeight/2);
      btn.innerText = "❤️";
    }

    index++;
  }
});

// HEART PARTICLES
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x,y){
  for(let i=0;i<150;i++){
    particles.push({
      x,y,
      dx:(Math.random()-0.5)*8,
      dy:(Math.random()-0.5)*8,
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
