// Confetti
confetti.create(document.getElementById('confetti'), { resize: true })({ spread: 70, particleCount: 50 });

// Countdown + voting unlock
const voteBtn = document.getElementById('voteBtn');
const countdownEl = document.getElementById('countdown');
const targetDate = new Date("July 10, 2025 12:00:00").getTime();

setInterval(() => {
  const now = Date.now(), diff = targetDate - now;
  if (diff <= 0) {
    countdownEl.textContent = "🚀 Voting is NOW open!";
    voteBtn.disabled = false;
    voteBtn.addEventListener('click', () => window.location="/voting.html");
  } else {
    const d = Math.floor(diff / (1e3*60*60*24)),
          h = Math.floor((diff/(1e3*60*60))%24),
          m = Math.floor((diff/(1e3*60))%60),
          s = Math.floor((diff/1e3)%60);
    countdownEl.textContent = `Nomination closes. Voting starts in ${d}d ${h}h ${m}m ${s}s`;
  }
}, 1000);

// Button sound
const audio = new Audio('click.mp3');
document.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => audio.play()));

// Nominate redirect
document.getElementById('nominateBtn').onclick = () => window.open('https://docs.google.com/forms/d/e/1FAIpQLScr2P3A4A4qafigkH3fALtQt84OH2lxsoEIVM8nheKh1Huzew/viewform?usp=header', '_blank');

// Dark mode toggle
const toggle = document.getElementById('darkToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

// Live count pull from sheet (via public JSON or Google Visualization API)
function updateCount() {
  fetch("https://docs.google.com/spreadsheets/d/1xNM_OMJF3KGkfPgubS4AOweYAT6fyzwAO0_2ivpdFrw/edit?resourcekey=&gid=1989926282#gid=1989926282")
    .then(r => r.text())
    .then(t => {
      const json = JSON.parse(t.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
      const count = json.table.rows[0].c[0].v;
      document.getElementById('liveCount').textContent = count;
    });
}
setInterval(updateCount, 60000);
updateCount();

// Testimonials slider
const quotes = [
  "“Best awards night ever!”",
  "“Can’t wait for MESA 2025!”",
  "“This is going to be legendary.”"
];
let idx = 0;
function showTestimonial() {
  document.getElementById('testimonialSlider').textContent = quotes[idx];
  idx = (idx +1) % quotes.length;
}
setInterval(showTestimonial, 4000);
showTestimonial();

const swiper = new Swiper('.swiper', {
    direction: 'horizontal', // default is left-right
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  