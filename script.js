// 🎂 Birthday countdown
function nextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let d = new Date(year, 8, 25); // กันยายน = เดือน 8 (0-based)
  if (d < now) d.setFullYear(year + 1);
  return d;
}
function tick() {
  const now = new Date();
  const target = nextBirthday();
  const diff = target - now;
  const d = Math.floor(diff/1000/60/60/24);
  const h = Math.floor(diff/1000/60/60)%24;
  const m = Math.floor(diff/1000/60)%60;
  const s = Math.floor(diff/1000)%60;
  document.getElementById('days').textContent=d;
  document.getElementById('hours').textContent=h;
  document.getElementById('minutes').textContent=m;
  document.getElementById('seconds').textContent=s;
}
setInterval(tick,1000); tick();

// 🎶 Music
const music=document.getElementById('bgMusic');
document.getElementById('musicToggle').addEventListener('click',()=>{
  if(music.paused){ music.play(); } else { music.pause(); }
});

// 📋 Copy link
document.getElementById('copyLink').addEventListener('click',()=>{
  const link=document.getElementById('shareLink');
  link.select();
  document.execCommand('copy');
  alert('คัดลอกแล้ว!');
});

// 🎉 Confetti
const confettiCanvas=document.getElementById('confettiCanvas');
const ctx=confettiCanvas.getContext('2d');
function resize(){ confettiCanvas.width=window.innerWidth; confettiCanvas.height=window.innerHeight; }
resize(); window.addEventListener('resize',resize);
const pieces=[];
for(let i=0;i<100;i++){pieces.push({x:Math.random()*confettiCanvas.width,y:Math.random()*confettiCanvas.height,s:5+Math.random()*5,vy:1+Math.random()*3,color:`hsl(${Math.random()*360},100%,50%)`});}
function draw(){ ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); pieces.forEach(p=>{ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.s,p.s);p.y+=p.vy;if(p.y>confettiCanvas.height)p.y=-10;}); requestAnimationFrame(draw);} draw();

// 🍰 Cake falling
class CakePiece {
  constructor(x,y,size,speed){
    this.x=x; this.y=y; this.size=size; this.speed=speed;
    this.img=new Image();
    this.img.src='cake_piece.png'; // ใส่รูปเค้ก
  }
  update(){ this.y+=this.speed; }
  draw(ctx){ ctx.drawImage(this.img,this.x,this.y,this.size,this.size); }
}
const cakeCanvas=document.getElementById('cakeFallCanvas');
const cakeCtx=cakeCanvas.getContext('2d');
function resizeCake(){ cakeCanvas.width=window.innerWidth; cakeCanvas.height=window.innerHeight; }
resizeCake(); window.addEventListener('resize',resizeCake);
const cakePieces=[];
function spawnCakePiece(){
  const size=30+Math.random()*20;
  const x=Math.random()*cakeCanvas.width;
  const speed=1+Math.random()*2;
  cakePieces.push(new CakePiece(x,-size,size,speed));
}
setInterval(spawnCakePiece,600);
function animateCake(){
  cakeCtx.clearRect(0,0,cakeCanvas.width,cakeCanvas.height);
  for(let i=cakePieces.length-1;i>=0;i--){
    let p=cakePieces[i];
    p.update();
    p.draw(cakeCtx);
    if(p.y>cakeCanvas.height) cakePieces.splice(i,1);
  }
  requestAnimationFrame(animateCake);
}
animateCake();
