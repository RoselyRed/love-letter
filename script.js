const textEl = document.getElementById("text");
const music = document.getElementById("music");

music.volume = 0.6;

// Start music
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once:true });

// STORY (refined, typo-free)
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

let index = 0;

// TYPEWRITER (smooth)
function typeText(text){
  textEl.innerHTML="";
  let i=0;

  function typing(){
    if(i<text.length){
      textEl.innerHTML+=text.charAt(i);
      i++;

      let delay=60;
      if(text[i-1]===".") delay=280;

      setTimeout(typing,delay);
    }
  }

  typing();
}

// TAP FLOW
document.body.addEventListener("click", ()=>{
  if(index<scenes.length){

    typeText(scenes[index]);

    // COLOR TRANSITIONS
    if(index>4 && index<12) document.body.className="mid";
    if(index>=12) document.body.className="light";

    // gentle burst
    spawnBottomIcons(4);

    // heartbeat near end
    if(index>=12){
      textEl.classList.add("pulse");
    }

    // FINAL
    if(index===scenes.length-1){
      setTimeout(()=>{
        createExplosion();
        showOptions();
      },1200);
    }

    index++;
  }
});

// HOLD EFFECT (continuous flow)
let holdInterval;
document.body.addEventListener("mousedown",()=>{
  holdInterval=setInterval(()=>{
    spawnBottomIcons(6);
  },250);
});
document.body.addEventListener("mouseup",()=>clearInterval(holdInterval));

// ICONS FROM BOTTOM (smooth random)
function spawnBottomIcons(count){
  const icons=["❤️","🌸","💖","💍"];

  for(let i=0;i<count;i++){
    const el=document.createElement("div");
    el.innerHTML=icons[Math.floor(Math.random()*icons.length)];

    const startX=Math.random()*window.innerWidth;
    el.style.position="absolute";
    el.style.left=startX+"px";
    el.style.bottom="-20px";

    el.style.fontSize=(18+Math.random()*10)+"px";
    el.style.opacity="0.9";

    const duration=3+Math.random()*2;

    el.style.animation=`floatUp ${duration}s ease-out forwards`;

    document.body.appendChild(el);

    setTimeout(()=>el.remove(),duration*1000);
  }
}

// FLOAT ANIMATION
const style=document.createElement("style");
style.innerHTML=`
@keyframes floatUp{
  0%{transform:translateY(0) scale(0.8);opacity:1;}
  100%{transform:translateY(-100vh) scale(1.4);opacity:0;}
}`;
document.head.appendChild(style);

// EXPLOSION (longer + smoother)
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function createExplosion(){
  for(let i=0;i<350;i++){
    particles.push({
      x:window.innerWidth/2,
      y:window.innerHeight/2,
      dx:(Math.random()-0.5)*10,
      dy:(Math.random()-0.5)*10,
      life:200
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
  alert("Oh come on, seriously? If you love Me, call and tell Me, silly ❤️");
}

// START
typeText(scenes[0]);
