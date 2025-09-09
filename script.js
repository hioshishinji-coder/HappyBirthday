const firebaseConfig = {
  apiKey: "AIzaSyCpEAPpjj8qqXuC_yO6pW9qf5IBIdj1NU",
  authDomain: "birthday-6217c.firebaseapp.com",
  databaseURL: "https://birthday-6217c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "birthday-6217c",
  storageBucket: "birthday-6217c.appspot.com",
  messagingSenderId: "59903835087",
  appId: "1:59903835087:web:5422b871e6c891bc3e214a",
  measurementId: "G-83XJRX6LRH"
};

// เริ่มเชื่อม Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();



const timeline = gsap.timeline({
  duration: 0.3 });


timeline.fromTo('.cake-topping', {
  yPercent: -300,
  opacity: 0.5 },
{
  yPercent: 0,
  opacity: 1 });


timeline.to('.candle-container', {
  opacity: 1 });


timeline.to('.flame-wrap', {
  scale: 1,
  ease: "back.out" });


timeline.to('.greeting', {
  scale: 1,
  ease: "back.out" });


timeline.to('.star', {
  opacity: 0.5,
  stagger: 0.05,
  onComplete: function () {
    gsap.to('.star', {
      scale: 0.25,
      repeat: -1,
      stagger: 0.1,
      yoyo: true,
      yoyoEase: "power1.out" });

  } });

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




document.getElementById("addWish").addEventListener("click", () => {
  const input = document.getElementById("wishInput");
  if (input.value.trim() !== "") {
    const newRef = db.ref("wishes").push();
    newRef.set({
      name: "Guest",
      message: input.value,
      timestamp: Date.now()
    });
    input.value = "";
  }
});

// โหลดคำอวยพรจาก Firebase แบบเรียลไทม์
db.ref("wishes").on("value", (snapshot) => {
  const data = snapshot.val();
  document.getElementById("floatingWishes").innerHTML = "";
  for (let id in data) {
    showFloatingWish(data[id].message, data[id].name);
  }
});

// ฟังก์ชันโชว์คำอวยพรลอย
function showFloatingWish(message, name) {
  const bubble = document.createElement("div");
  bubble.className = "wishBubble";
  bubble.textContent = `${name}: ${message}`;

  // สุ่มตำแหน่ง
  bubble.style.left = Math.random() * 80 + "vw";
  bubble.style.top = Math.random() * 80 + "vh";

  // สีสุ่ม
  const colors = ["#ffb6c1", "#ffd1dc", "#b5ead7", "#c7ceea", "#ffdac1", "#e0bbe4"];
  bubble.style.color = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById("floatingWishes").appendChild(bubble);

    input.value = "";
  }




