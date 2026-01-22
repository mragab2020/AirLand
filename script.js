const PHONE = "0574027673";
const WA_NUMBER = "0574027673"; 
const CITY = "الرياض";

const links = Array.from(document.querySelectorAll(".nav__link"));
const indicator = document.getElementById("navIndicator");
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");

// Hamburger menu toggle with smooth animations
if(hamburger){
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if(nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)){
    if(nav.classList.contains("active")){
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  }
});

// Close mobile menu when link is clicked
links.forEach(a => {
  a.addEventListener("click", (e) => {
    // Close menu on click
    if(hamburger) hamburger.classList.remove("active");
    if(nav) nav.classList.remove("active");
    
    e.preventDefault();
    const targetId = a.getAttribute("href");
    const target = document.querySelector(targetId);
    if(target){
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    links.forEach(x => x.classList.remove("active"));
    a.classList.add("active");
    setTimeout(() => moveIndicator(a), 50);
  });

  a.addEventListener("mouseenter", () => moveIndicator(a));
});

function moveIndicator(el){
  if(!indicator || !el) return;
  // Only move indicator on desktop (when nav is not in dropdown mode)
  if(window.innerWidth <= 768) return;
  
  const rect = el.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.right = (navRect.right - rect.right) + "px";
  indicator.style.top = (rect.top - navRect.top) + "px";
}

window.addEventListener("load", () => moveIndicator(document.querySelector(".nav__link.active") || links[0]));
window.addEventListener("resize", () => moveIndicator(document.querySelector(".nav__link.active") || links[0]));

document.getElementById("year").textContent = new Date().getFullYear();

/* WhatsApp helper */
function openWhatsApp(message){
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function quickMessage(){
  return مرحبا بكم شركة اير ماكس في خدماتكم في كل ما يخص عالم التكييف ونقل الاثاث: `;
}

/* Top / Hero / Float buttons */
const waTop = document.getElementById("waTop");
const waHero = document.getElementById("waHero");
const waQuick = document.getElementById("waQuick");
const waFloat = document.getElementById("waFloat");
const waCallout = document.getElementById("waCallout");
const waLocation = document.getElementById("waLocation");

[waTop, waHero, waQuick, waFloat, waCallout, waLocation].forEach(btn => {
  if(!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp(quickMessage());
  });
});

function initGallerySlider(){
  const slider = document.querySelector(".gallery-slider");
  if(!slider) return;

  const track = slider.querySelector(".gallery-track");
  if(!track) return;

  const items = Array.from(track.querySelectorAll(".gallery-item"));
  if(items.length <= 1) return;

  let index = 0;
  let intervalId = null;
  let stepPx = 0;

  function computeStep(){
    const first = track.querySelector(".gallery-item");
    if(!first) return;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap || "0") || 0;
    stepPx = first.getBoundingClientRect().width + gap;
  }

  function visibleCount(){
    const w = window.innerWidth;
    if(w <= 640) return 1;
    if(w <= 1200) return 2;
    return 3;
  }

  function maxIndex(){
    return Math.max(0, items.length - visibleCount());
  }

  function clampIndex(){
    const max = maxIndex();
    if(index > max) index = 0;
    if(index < 0) index = 0;
  }

  function render(){
    clampIndex();
    track.style.transform = `translate3d(${-index * stepPx}px, 0, 0)`;
  }

  function next(){
    const max = maxIndex();
    index = (index >= max) ? 0 : index + 1;
    render();
  }

  function play(){
    stop();
    intervalId = window.setInterval(next, 2800);
  }

  function stop(){
    if(intervalId){
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  computeStep();
  render();
  play();

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", play);
  slider.addEventListener("touchstart", stop, { passive: true });
  slider.addEventListener("touchend", play, { passive: true });

  window.addEventListener("resize", () => {
    computeStep();
    render();
  });
}

window.addEventListener("load", initGallerySlider);

/* Form -> WhatsApp */
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const location = document.getElementById("location").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const msg =
`مرحبًا 👋
أنا أرسل طلب خدمة إلى *اير ماكس*.

*الاسم:* ${name}
*رقم الجوال:* ${phone}
*الخدمة:* ${servic}
*الموقع داخل الرياض:* ${location || "-"}
*ملاحظات:* ${notes || "-"}

فضلاً تواصلوا معي في أقرب وقت.`;

  openWhatsApp(msg);
});
