// Floating hearts
const layer = document.getElementById('float-layer');
const HEARTS = 30;
function spawnHeart(){
  const h = document.createElement('div');
  h.className='float-heart';
  const x = Math.random()*100, s = 0.8 + Math.random()*0.9, d = 9 + Math.random()*10;
  const drift = (Math.random()*60 - 30) + 'px';
  h.style.left = x + 'vw';
  h.style.setProperty('--x', x + 'vw');
  h.style.setProperty('--s', s);
  h.style.setProperty('--dur', d + 's');
  h.style.setProperty('--drift', drift);
  layer.appendChild(h);
  h.addEventListener('animationend', ()=>{ h.remove(); setTimeout(spawnHeart, Math.random()*2200); });
}
for(let i=0;i<HEARTS;i++){ setTimeout(spawnHeart, i*250); }

// Flip tiles
document.querySelectorAll('.tile').forEach(tile=>{
  tile.addEventListener('click', ()=> tile.classList.toggle('flipped'));
  tile.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); tile.classList.toggle('flipped'); }});
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lightbox-img');
function openLB(src, alt=''){ lbImg.src=src; lbImg.alt=alt; lb.classList.add('show'); lb.setAttribute('aria-hidden','false'); }
function closeLB(){ lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); lbImg.src=''; }
lb.querySelector('.lightbox-backdrop').addEventListener('click', closeLB);
lb.querySelector('.lightbox-close').addEventListener('click', closeLB);
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLB(); });
document.querySelectorAll('.tile-front img').forEach(img=>{
  img.style.cursor='zoom-in';
  img.addEventListener('click', e=>{ e.stopPropagation(); openLB(img.src, img.alt || 'Photo'); });
});

// Sidebar toggling
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const containerRoot = document.querySelector('.container');
function openSidebarFn() {
  sidebar.classList.add('show');
  openSidebarBtn.setAttribute('aria-expanded','true');
  containerRoot?.classList.add('with-sidebar');
}
function closeSidebarFn() {
  sidebar.classList.remove('show');
  openSidebarBtn.setAttribute('aria-expanded','false');
  containerRoot?.classList.remove('with-sidebar');
}
openSidebarBtn.addEventListener('click', openSidebarFn);
closeSidebarBtn.addEventListener('click', closeSidebarFn);
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSidebarFn(); });

// Video playlist behavior
const videoList = document.getElementById('videoList');
const videoPlayerWrap = document.getElementById('videoPlayer');
const backToListBtn = document.getElementById('backToList');
const player = document.getElementById('player');
const playerSource = document.getElementById('playerSource');

// Preload metadata on hover to avoid heavy initial bandwidth; keeps preload=none until hover
if (player) {
  player.addEventListener('mouseenter', () => {
    if (player.getAttribute('preload') === 'none') player.setAttribute('preload', 'metadata');
  });
}

if (videoList && player && playerSource && videoPlayerWrap && backToListBtn) {
  videoList.addEventListener('click', (e) => {
    const item = e.target.closest('.video-item');
    if (!item) return;
    const src = item.getAttribute('data-src');
    if (!src) return;

    // Switch UI to player
    videoList.style.display = 'none';
    videoPlayerWrap.style.display = 'block';

    // Load and play
    player.pause();
    playerSource.src = src;
    player.load();
    player.play().catch(()=>{});
  });

  backToListBtn.addEventListener('click', ()=>{
    player.pause();
    videoPlayerWrap.style.display = 'none';
    videoList.style.display = 'block';
  });
}

// Images: native lazy-loading + visual polish
document.querySelectorAll('.tile-front img').forEach((img, i) => {
  if (i > 8 && !img.hasAttribute('loading')) {
    img.setAttribute('loading', 'lazy');
  }
  img.addEventListener('load', ()=> img.classList.add('lazy-loaded'));
});

// Fallback / advanced: IntersectionObserver swaps data-src -> src
const lazyImgs = Array.from(document.querySelectorAll('.tile-front img[data-src]'));
if ('IntersectionObserver' in window && lazyImgs.length) {
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  }, {root:null, rootMargin:'200px 0px', threshold:0});
  lazyImgs.forEach(img=> io.observe(img));
}

// Optional: feature-detect native lazy to decide if a library fallback is needed
if (!('loading' in HTMLImageElement.prototype)) {
  // Could dynamically load a polyfill/library like lazysizes here if needed
  // Example from web.dev guidance (commented out):
  // const s = document.createElement('script');
  // s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
  // document.body.appendChild(s);
}
const video = document.getElementById('player');
video.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener("DOMContentLoaded", () => {
  const explosion = document.getElementById("giftExplosion");
  const mainContent = document.getElementById("mainContent");

  const stickers = ["💖","✨","🎁","💎","🌟","❤️","🎉","💝"];
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = stickers[Math.floor(Math.random() * stickers.length)];

    // Start position randomly across the screen
    const startX = Math.random() * screenWidth;
    const startY = Math.random() * screenHeight;
    particle.style.left = startX + "px";
    particle.style.top = startY + "px";

    // Random direction and distance
    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 400;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";
    const r = Math.random() * 720 - 360 + "deg";

    particle.style.setProperty('--x', x);
    particle.style.setProperty('--y', y);
    particle.style.setProperty('--r', r);

    // Random size
    const size = 20 + Math.random() * 30;
    particle.style.fontSize = size + "px";

    explosion.appendChild(particle);
  }

  // Show main content after 3 seconds
  setTimeout(() => {
    explosion.style.display = "none";
    mainContent.style.display = "block";
  }, 3000);
});
