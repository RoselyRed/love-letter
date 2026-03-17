const textEl = document.getElementById("text");
const music = document.getElementById("music");

music.volume = 0.6;

// MUSIC START
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once:true });

// STORY
const scenes = [
"I did not realize how quiet everything felt...",
"Not peaceful... just empty.",
"And then... you came into my life.",
"Slowly... everything began to change.",
"You became my favorite part of every day.",
"Even now... when we do not talk anymore...",
"My heart still finds you.",
"In silence... in songs... in everything.",
"Maybe I am late...",
"But this feeling never left.",
"If I could choose again...",
"In every lifetime...",
"I would still choose you.",
"...",
"I love you ❤️"
];

let index = 0;

// TYPE EFFECT
function typeText(text){
  textEl.innerHTML="";
  let i=0;
  function typing(){
    if(i<text.length){
      textEl.innerHTML+=text.charAt(i);
      i++;
      let delay=60;
      if(text[i-1]===".") delay=300;
      setTimeout(typing,delay);
    }
  }
  typing();
}

// TAP FLOW
document.body.addEventListener("click", (e)=>{
  if(index<scenes.length){

    typeText(scenes[index]);

    // COLOR SHIFT
    if(index>3 && index<10) document.body.className="mid";
    if(index>=10) document.body.className="light";

    spawnBurst(e.clientX,e.clientY,5);

    // HEARTBEAT NEAR END
    if(index>=10){
      textEl.classList.add("pulse");
    }

    // FINAL
    if(index===scenes.length-1){
      setTimeout(()=>{
        createExplosion(window.innerWidth/2,window.innerHeight/2);
        showOptions();
      },1000);
    }

    index++;
  }
});

// HOLD EFFECT
let holdInterval;
document.body.addEventListener("mousedown",(e)=>{
  holdInterval=setInterval(()=>{
    spawnBurst(e.clientX,e.clientY,10);
  },200);
});
document.body.addEventListener("mouseup",()=>clearInterval(holdInterval));

// ICON BURST
function spawnBurst(x,y,count){
  const icons=["❤️","🌸","💖","💍"];
  for(let i=0;i<count;i++){
    const el=document.createElement("div");
    el.innerHTML=icons[Math.floor(Math.random()*icons.length)];
    el.style.position="absolute";
    el.style.left=x+"px";
    el.style.top=y+"px";
    el.style.fontSize="20px";
    el.style.animation=`floatUp ${2+Math.random()*2}s ease-out forwards`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),4000);
  }
}

// FLOAT
const style=document.createElement("style");
style.innerHTML=`
@keyframes floatUp{
  0%{transform:translateY(0) scale(0.8);opacity:1;}
  100%{transform:translateY(-300px) scale(1.5);opacity:0;}
}`;
document.head.appendChild(style);

// EXPLOSION
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function createExplosion(x,y){
  for(let i=0;i<300;i++){
    particles.push({
      x,y,
      dx:(Math.random()-0.5)*12,
      dy:(Math.random()-0.5)*12,
      life:150
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

// OPTIONS
function showOptions(){
  document.getElementById("endOptions").classList.remove("hidden");
}

function restart(){
  location.reload();
}

function lovePrompt(){
  alert("Oh come on, seriously? If you love me, call and tell me, silly ❤️");
}

// START
typeText(scenes[0]);
