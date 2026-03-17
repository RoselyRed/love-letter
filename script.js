const textEl = document.getElementById("text");
const bg = document.getElementById("bg");
const music = document.getElementById("music");

// MUSIC
music.volume = 0.6;
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

// STORY (Deep + K-drama style)
const scenes = [
  {
    text: "Before you... everything felt quiet.",
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    text: "Not peaceful... just empty.",
    bg: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913"
  },
  {
    text: "Days passed... but nothing really stayed.",
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  {
    text: "And then... you happened.",
    bg: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
  },
  {
    text: "Not loudly... not suddenly...",
    bg: "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2"
  },
  {
    text: "But gently... like something I didn’t know I needed.",
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    text: "Somewhere along the way...",
    bg: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    text: "You became my favorite part of everything.",
    bg: "https://images.unsplash.com/photo-1511988617509-a57c8a288659"
  },
  {
    text: "Even now...",
    bg: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
  },
  {
    text: "When we don’t talk anymore...",
    bg: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    text: "My heart still remembers you.",
    bg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
  },
  {
    text: "In silence...",
    bg: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  },
  {
    text: "In songs...",
    bg: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
  },
  {
    text: "In everything.",
    bg: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },
  {
    text: "Maybe I’m late...",
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    text: "But this feeling never left.",
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    text: "If I could choose again...",
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    text: "In every lifetime...",
    bg: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    text: "I would still choose you.",
    bg: "https://images.unsplash.com/photo-1511988617509-a57c8a288659"
  },
  {
    text: "...",
    bg: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
  },
  {
    text: "I love you.",
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    final: true
  }
];

let index = 0;

// TYPE EFFECT
function typeText(text) {
  textEl.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      textEl.innerHTML += text.charAt(i);
      i++;

      let delay = 45;
      if (text[i-1] === ".") delay = 250;

      setTimeout(typing, delay);
    }
  }

  typing();
}

// TAP TO CONTINUE
document.body.addEventListener("click", (e) => {

  if (index < scenes.length) {
    const s = scenes[index];

    bg.style.backgroundImage = `url(${s.bg})`;

    // brightness adjust
    if (index > 10) {
      bg.style.filter = "blur(6px) brightness(0.8)";
      document.body.classList.add("light");
    }

    typeText(s.text);
    createHeart(e.clientX, e.clientY);

    if (s.final) {
      setTimeout(() => {
        createExplosion(window.innerWidth/2, window.innerHeight/2);
      }, 800);
    }

    index++;
  }

});

// HEART ON TOUCH
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "absolute";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.animation = "float 2s ease-out forwards";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 2000);
}

// CANVAS EXPLOSION
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
