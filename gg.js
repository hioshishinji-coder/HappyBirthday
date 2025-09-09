// 🎉 Confetti
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const pieces = [];
function spawnConfetti() {
  pieces.push({
    x: Math.random() * confettiCanvas.width,
    y: -10,
    size: 6 + Math.random() * 8,
    vy: 2 + Math.random() * 4,
    vx: -2 + Math.random() * 4,
    color: `hsl(${Math.random() * 360}, 90%, 60%)`,
    rot: Math.random() * 360,
    rSpeed: -3 + Math.random() * 6
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  pieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.rSpeed;
  });

  // ลบ confetti ที่หล่นออกนอกจอ
  for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].y > confettiCanvas.height + 20) {
      pieces.splice(i, 1);
    }
  }
}

function startConfetti() {
  setInterval(spawnConfetti, 150); // spawn ใหม่ทุก 0.15 วินาที
  function animate() {
    drawConfetti();
    requestAnimationFrame(animate);
  }
  animate();
}
startConfetti();

// 🎂 Guestbook
document.getElementById("addWish").addEventListener("click", () => {
  const input = document.getElementById("wishInput");
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    document.getElementById("wishList").appendChild(li);
    input.value = "";
  }
});


document.getElementById("addWish").addEventListener("click", () => {
  const input = document.getElementById("wishInput");
  if (input.value.trim() !== "") {
    const bubble = document.createElement("div");
    bubble.className = "wishBubble";
    bubble.textContent = input.value;

    // สีพาสเทลสุ่ม
    const colors = ["#ff9ff3", "#feca57", "#1dd1a1", "#48dbfb", "#ff6b6b", "#5f27cd"];
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

    // ตำแหน่งสุ่มด้านซ้ายถึงขวา
    bubble.style.left = Math.random() * 80 + "vw";
    bubble.style.top = "100vh";

    document.getElementById("floatingWishes").appendChild(bubble);

    // ลบหลังจาก animation จบ
    setTimeout(() => bubble.remove(), 10000);

    input.value = "";
  }
});
