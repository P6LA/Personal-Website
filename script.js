document.documentElement.classList.add('js');
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : '#';
const empty = '<span class="ph">ยังไม่ได้เพิ่มข้อมูล</span>';

/* ---------- แสดงข้อมูลจาก data.js ---------- */
document.title = SITE.title;
$('#siteTitle').textContent = SITE.title;
const wel = $('#welcome'), welWords = [SITE.welcome, ...(SITE.welcomeWords || [])];
wel.setAttribute('aria-label', SITE.welcome);
wel.textContent = SITE.welcome;
$('#fullName').textContent = SITE.fullName;
$('#nickname').textContent = SITE.nickname;
$('#intro').textContent = SITE.intro || 'ยินดีต้อนรับสู่เว็บไซต์แนะนำตัวของฉัน';
$('#footName').textContent = SITE.fullName;
$('#year').textContent = new Date().getFullYear();

const av = $('#avatar');
if (SITE.photo) {
  const img = new Image();
  img.alt = 'รูปโปรไฟล์'; img.src = SITE.photo;
  img.onload = () => { av.textContent = ''; av.appendChild(img); };
}
if (!av.firstChild) av.textContent = '🐟';

const about = [['ชื่อ–นามสกุล','fullName'],['ชื่อเล่น','nickname'],['สีที่ชอบ','color'],['อาหารที่ชอบ','food'],
  ['งานอดิเรก / สิ่งที่สนใจ','interests'],['คติประจำใจ','motto'],['ความสามารถพิเศษ','talent'],
  ['เกม / เทคโนโลยีที่ชอบ','tech'],['เป้าหมายในอนาคต','goal'],['สิ่งที่น่าสนใจเกี่ยวกับตัวเอง','fun']];
$('#aboutGrid').innerHTML = about.map(([l,k]) =>
  `<div class="card reveal"><small>${l}</small><b>${SITE[k] ? esc(SITE[k]) : empty}</b></div>`).join('');

/* ---------- ไอคอน/โลโก้แอป (ใช้ทั้งทักษะและช่องทางติดต่อ) ----------
   ใน data.js ใส่ logo: "figma" (ชื่อที่รองรับ) หรือ logo: "images/xxx.png" ก็ได้
   ถ้าไม่รู้จักชื่อ ระบบจะสร้างป้ายตัวอักษรย่อสีประจำตัวให้เอง */
const svg = (inner, vb = '0 0 24 24') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
const ICONS = {
  figma: svg(`<path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>`, '0 0 38 57'),
  email: svg(`<rect x="2" y="4" width="20" height="16" rx="3" fill="#ea4335"/><path d="M3 7l9 6.5L21 7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  instagram: svg(`<defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".3" stop-color="#fa7e1e"/><stop offset=".55" stop-color="#d62976"/><stop offset=".8" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="1" y="1" width="22" height="22" rx="6" fill="url(#ig)"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.4" cy="7.6" r="1.1" fill="#fff"/>`),
  facebook: svg(`<circle cx="12" cy="12" r="11" fill="#1877f2"/><path d="M13.4 22v-7.6h2.5l.4-3h-2.9V9.5c0-.9.3-1.4 1.5-1.4h1.5V5.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.5V22z" fill="#fff"/>`),
  youtube: svg(`<rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ff0000"/><path d="M10 9l5.5 3L10 15z" fill="#fff"/>`),
  github: svg(`<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>`, '0 0 16 16'),
  discord: svg(`<path fill="#5865f2" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>`),
  tiktok: svg(`<rect width="24" height="24" rx="6" fill="#000"/><defs><path id="tk" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></defs><g transform="translate(3.9 3.9) scale(.68)"><use href="#tk" x="-.9" y="-.7" fill="#25f4ee"/><use href="#tk" x=".9" y=".7" fill="#fe2c55"/><use href="#tk" fill="#fff"/></g>`),
  html: svg(`<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z" fill="#e34f26"/><path fill="#fff" d="M8.531 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>`),
  css: svg(`<path d="M1.5 0h21l-1.91 21.563L11.939 24l-8.545-2.438L1.5 0z" fill="#1572b6"/><path fill="#fff" d="M18.59 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>`),
  python: svg(`<path fill="#3776ab" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z"/><path fill="#ffd43b" d="M21.04 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01z"/><circle cx="8.69" cy="2.9" r="1.05" fill="#fff"/><circle cx="15.31" cy="21.1" r="1.05" fill="#fff"/>`),
  canva: svg(`<defs><radialGradient id="cv" cx=".25" cy=".2" r="1.05"><stop offset="0" stop-color="#00c4cc"/><stop offset=".5" stop-color="#5b4be0"/><stop offset="1" stop-color="#7d2ae8"/></radialGradient></defs><circle cx="12" cy="12" r="11.5" fill="url(#cv)"/><path d="M15.83 8.79A5 5 0 1 0 15.83 15.21" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round"/>`)
};
// ป้ายตัวอักษรแบบไอคอนแอป: [ข้อความ, สีพื้น, สีตัวอักษร/ขอบ]
const BADGES = {
  photoshop:['Ps','#001e36','#31a8ff'], illustrator:['Ai','#330000','#ff9a00'], premierepro:['Pr','#00005b','#9999ff'],
  aftereffects:['Ae','#00005b','#9999ff'], lightroom:['Lr','#001e36','#31a8ff'], indesign:['Id','#49021f','#ff3366'], xd:['Xd','#470137','#ff61f6'],
  javascript:['JS','#f7df1e','#222'], typescript:['TS','#3178c6','#fff'], java:['Jv','#e76f00','#fff'], c:['C','#00599c','#fff'], cpp:['C++','#00599c','#fff'],
  csharp:['C#','#68217a','#fff'], php:['php','#777bb4','#fff'], sql:['SQL','#336791','#fff'], mysql:['My','#00758f','#fff'],
  react:['Re','#20232a','#61dafb'], nodejs:['No','#339933','#fff'], git:['Git','#f05032','#fff'], vscode:['VS','#007acc','#fff'],
  excel:['X','#107c41','#fff'], word:['W','#185abd','#fff'], powerpoint:['P','#c43e1c','#fff'], capcut:['CC','#111','#fff'],
  blender:['Bl','#ea7600','#fff'], unity:['U','#222','#fff'],
  line:['LINE','#06c755','#fff'], linkedin:['in','#0a66c2','#fff'], x:['X','#000','#fff'], twitter:['X','#000','#fff'],
  telegram:['TG','#229ed9','#fff'], whatsapp:['WA','#25d366','#fff'], twitch:['Tw','#9146ff','#fff'], spotify:['Sp','#1db954','#000'], steam:['St','#171a21','#fff']
};
const ALIAS = { html5:'html', css3:'css', js:'javascript', ts:'typescript', ig:'instagram', fb:'facebook', yt:'youtube', mail:'email', gmail:'email',
  ps:'photoshop', ai:'illustrator', pr:'premierepro', premiere:'premierepro', ae:'aftereffects', node:'nodejs', 'c++':'cpp', 'c#':'csharp', csharp:'csharp' };
const norm = v => String(v ?? '').toLowerCase().replace(/[^a-z0-9+#]/g, '');
const findKey = v => { let k = norm(v); k = ALIAS[k] || k; return (ICONS[k] || BADGES[k]) ? k : null; };
const badge = (t, bg, fg, extra = '') => `<span class="badge l${Math.min(Array.from(t).length, 4)}" style="background:${bg};color:${fg};border-color:${fg}${extra}">${esc(t)}</span>`;
// cls = 'sk-logo' | 'ct-logo'; v = ค่า logo; name = ชื่อสำรองไว้เดา; emoji = icon สำรอง
const logoHTML = (cls, v, name, emoji) => {
  v = String(v || '');
  if (/\.(png|jpe?g|svg|webp|gif|ico)(\?.*)?$/i.test(v) || /^https?:\/\//i.test(v)) return `<span class="${cls}"><img src="${esc(v)}" alt="" loading="lazy"></span>`;
  const k = findKey(v) || findKey(name);
  if (k && ICONS[k]) return `<span class="${cls}">${ICONS[k]}</span>`;
  if (k) { const [t, bg, fg] = BADGES[k]; return `<span class="${cls}">${badge(t, bg, fg)}</span>`; }
  if (emoji) return `<span class="${cls} emo">${esc(emoji)}</span>`;
  const t = Array.from(String(name || '?').trim()).slice(0, 2).join('') || '?';
  const hue = Array.from(String(name)).reduce((a, c) => a + c.charCodeAt(0), 0) * 47 % 360;
  return `<span class="${cls}">${badge(t, `hsl(${hue} 55% 38%)`, '#fff')}</span>`;
};

/* ---------- ทักษะ ---------- */
$('#skillList').innerHTML = SITE.skills.length
  ? SITE.skills.map(k => `<div class="skill reveal"><div class="sk-h"><span class="sk-n">${logoHTML('sk-logo', k.logo, k.name, k.icon)}<span>${esc(k.name)}</span></span><b class="pct">0%</b></div><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.max(0, Math.min(100, +k.level || 0))}"><i data-l="${Math.max(0, Math.min(100, +k.level || 0))}"></i></div></div>`).join('')
  : '<p class="ph">ยังไม่ได้เพิ่มทักษะ (ไปเพิ่มที่ data.js)</p>';

/* ---------- งานอดิเรก / ผลงาน: หลายรูป + ดูเพิ่มเติม ---------- */
const LIMIT = 5; // แสดงกี่รายการก่อนกด "ดูเพิ่มเติม"
const imgsOf = o => [...new Set([o.img, ...[].concat(o.imgs || [])].map(s => String(s || '').trim()).filter(Boolean))];
const gCard = (kind, o, i, name, icon, extra = '') => {
  const imgs = imgsOf(o), more = i >= LIMIT;
  return `<div class="card gcard reveal${more ? ' extra' : ''}"${more ? ' hidden' : ''}>
    <button type="button" class="gimg" ${imgs.length ? `data-g="${kind}" data-i="${i}" aria-label="ดูรูป: ${esc(name)}"` : 'disabled tabindex="-1" aria-hidden="true"'}>${
      imgs.length ? `<img src="${esc(imgs[0])}" alt="${esc(name)}" loading="lazy">` : `<span class="gico">${esc(icon)}</span>`
    }${imgs.length > 1 ? `<span class="gcount">🖼 ${imgs.length}</span>` : ''}${imgs.length ? '<span class="gview">🔍 กดดูรูป</span>' : ''}</button>
    <div class="gbody"><h3>${esc(name)}</h3>${o.desc ? `<p>${esc(o.desc)}</p>` : ''}${extra}</div></div>`;
};
const renderGallery = (sel, items, build, emptyMsg) => {
  const box = $(sel);
  if (!items.length) { box.innerHTML = emptyMsg; return; }
  box.innerHTML = items.map(build).join('');
  const extra = items.length - LIMIT;
  if (extra <= 0) return;
  const label = `ดูเพิ่มเติม (${extra}) ⌄`;
  box.insertAdjacentHTML('afterend', `<div class="more-wrap"><button type="button" class="btn more" aria-expanded="false" aria-controls="${box.id}">${label}</button></div>`);
  const btn = box.nextElementSibling.firstElementChild;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    box.querySelectorAll('.extra').forEach(c => { c.hidden = !open; if (open) c.classList.add('in', 'pop'); });
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'ย่อกลับ ⌃' : label;
    if (!open) { const s = box.closest('section'); if (s.getBoundingClientRect().top < 0) s.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }
  });
};
renderGallery('#hobbyGrid', SITE.hobbies, (h, i) => gCard('hobbies', h, i, h.name, h.icon || '⭐'),
  '<p class="ph">เจ้าของเว็บไซต์ยังไม่ได้เพิ่มงานอดิเรก (ไปเพิ่มที่ data.js)</p>');
renderGallery('#projectGrid', SITE.projects, (p, i) => gCard('projects', p, i, p.title, p.icon || '💻',
  p.url ? `<div class="gact"><a class="btn" target="_blank" rel="noopener" href="${esc(safeUrl(p.url))}">ดูผลงาน ↗</a></div>` : ''),
  '<p class="ph">ยังไม่ได้เพิ่มผลงาน (ไปเพิ่มที่ data.js)</p>');
// รูปปกที่โหลดไม่ได้ → แสดงไอคอนแทน
document.querySelectorAll('.gimg img').forEach(im => im.addEventListener('error', () => {
  const b = im.closest('.gimg'), o = SITE[b.dataset.g][+b.dataset.i];
  im.replaceWith(Object.assign(document.createElement('span'), {className: 'gico', textContent: o.icon || (b.dataset.g === 'hobbies' ? '⭐' : '💻')}));
}));

/* ---------- ดูรูปแบบเลื่อนซ้าย-ขวา (Lightbox) ---------- */
(function lightbox() {
  const lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'ดูรูปภาพ');
  lb.innerHTML = `<button type="button" class="lb-x" aria-label="ปิด">✕</button>
    <button type="button" class="lb-a lb-p" aria-label="รูปก่อนหน้า">‹</button>
    <figure class="lb-f"><img alt=""><figcaption></figcaption></figure>
    <button type="button" class="lb-a lb-n" aria-label="รูปถัดไป">›</button>
    <div class="lb-th"></div>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('img'), cap = lb.querySelector('figcaption'), th = lb.querySelector('.lb-th');
  let list = [], idx = 0, title = '', opener = null, sx = null;
  img.addEventListener('load', () => img.classList.remove('ld'));
  img.addEventListener('error', () => { img.classList.remove('ld'); img.classList.add('bad'); });
  const go = n => {
    idx = (n + list.length) % list.length;
    img.classList.remove('bad'); img.classList.add('ld');
    img.alt = `${title} (${idx + 1}/${list.length})`; img.src = list[idx];
    cap.innerHTML = `<b>${esc(title)}</b>${list.length > 1 ? `<span>${idx + 1} / ${list.length}</span>` : ''}`;
    [...th.children].forEach((b, j) => { b.classList.toggle('on', j === idx); if (j === idx) b.scrollIntoView({block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth'}); });
    if (list.length > 1) [1, -1].forEach(d => { new Image().src = list[(idx + d + list.length) % list.length]; });
  };
  const open = (imgs, i, t, from) => {
    list = imgs; title = t; opener = from;
    lb.classList.toggle('single', list.length < 2);
    th.innerHTML = list.length > 1 ? list.map((s, j) => `<button type="button" aria-label="รูปที่ ${j + 1}"><img src="${esc(s)}" alt=""></button>`).join('') : '';
    lb.classList.add('open'); document.body.classList.add('lb-open');
    go(i); lb.querySelector('.lb-x').focus({preventScroll: true});
  };
  const close = () => { lb.classList.remove('open'); document.body.classList.remove('lb-open'); if (opener) opener.focus({preventScroll: true}); };
  document.addEventListener('click', e => {
    const b = e.target.closest('.gimg[data-g]'); if (!b) return;
    const o = SITE[b.dataset.g][+b.dataset.i], imgs = imgsOf(o);
    if (imgs.length) open(imgs, 0, o.title || o.name || '', b);
  });
  lb.addEventListener('click', e => {
    if (e.target.closest('.lb-x') || e.target === lb || e.target.matches('.lb-f')) return close();
    if (e.target.closest('.lb-p')) return go(idx - 1);
    if (e.target.closest('.lb-n') || (e.target === img && list.length > 1)) return go(idx + 1);
    const t = e.target.closest('.lb-th button'); if (t) go([...th.children].indexOf(t));
  });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && list.length > 1) go(idx - 1);
    else if (e.key === 'ArrowRight' && list.length > 1) go(idx + 1);
    else if (e.key === 'Tab') {
      const f = [...lb.querySelectorAll('button')].filter(b => b.getClientRects().length);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  lb.addEventListener('touchstart', e => { sx = e.touches.length === 1 ? e.touches[0].clientX : null; }, {passive: true});
  lb.addEventListener('touchend', e => {
    if (sx == null || list.length < 2) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
  });
})();

/* ---------- ช่องทางติดต่อ: โลโก้แอป + ชื่อ/อีเมลที่อ่านได้ชัดเจน ---------- */
const handleOf = s => {
  if (s.handle) return s.handle;
  try { const u = new URL(s.url), seg = u.pathname.split('/').filter(Boolean).pop(); return seg ? '@' + seg.replace(/^@/, '') : u.hostname.replace(/^www\./, ''); }
  catch { return s.url; }
};
const btns = [];
const emails = [].concat(SITE.email || []).map(e => String(e).trim()).filter(Boolean);
emails.forEach((e, i) => btns.push(`<a class="ct" href="mailto:${esc(e)}">${logoHTML('ct-logo', 'email')}<span class="ct-t"><small>Email${emails.length > 1 ? ' ' + (i + 1) : ''}</small><b>${esc(e)}</b></span></a>`));
SITE.socials.filter(s => s.url).forEach(s => btns.push(
  `<a class="ct" target="_blank" rel="noopener" href="${esc(safeUrl(s.url))}">${logoHTML('ct-logo', s.logo, s.label, s.icon)}<span class="ct-t"><small>${esc(s.label || 'Link')}</small><b>${esc(handleOf(s))}</b></span></a>`));
$('#contactBtns').innerHTML = btns.length ? btns.join('') : '<p class="ph">ยังไม่ได้เพิ่มช่องทางติดต่อ</p>';

/* ---------- เมนู ---------- */
const menu = $('#menu'), burger = $('#burger');
burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

/* โหมดมืด/สว่าง */
const themeBtn = $('#theme');
const setTheme = t => { document.documentElement.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀️' : '🌙'; };
setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
themeBtn.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- เลื่อนหน้า: เมนูที่กำลังอยู่, ปุ่มกลับขึ้นบน, แอนิเมชันตามการเลื่อน ---------- */
const links = [...menu.querySelectorAll('a')];
const secs = ['home','about','skills','hobbies','projects','contact'].map(id => document.getElementById(id));
function onScroll() {
  const h = document.documentElement;
  document.querySelector('.top').classList.toggle('scrolled', h.scrollTop > 10);
  $('#toTop').classList.toggle('show', h.scrollTop > 500);
  let cur = secs[0];
  secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* พารัลแลกซ์: ตอนเลื่อนลง เนื้อหาหน้าแรกเลื่อนช้ากว่าและค่อย ๆ จาง, ฟองอากาศเลื่อนช้ากว่าอีกชั้น */
if (!reduce) {
  const heroIn = document.querySelector('.hero-in'), cvs = $('#bubbles'), heroEl = $('#home'), titles = [...document.querySelectorAll('h2')];
  let ticking = false;
  function parallax() {
    ticking = false;
    const y = scrollY, hh = heroEl.offsetHeight;
    if (y < hh) {
      const p = y / hh;
      heroIn.style.transform = `translateY(${y * .35}px) scale(${1 - p * .08})`;
      heroIn.style.opacity = 1 - p * 1.1;
      cvs.style.transform = `translateY(${y * .15}px)`;
    }
    titles.forEach(t => {
      const r = t.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) t.style.transform = `translateX(${(r.top / innerHeight - .5) * 40}px)`;
    });
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, {passive:true});
  parallax();
}
$('#toTop').onclick = () => scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'});

/* ---------- เลื่อนแล้วค่อยปรากฏ ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: .15});
document.querySelectorAll('.card.reveal').forEach((el, i) => el.classList.add(i % 2 ? 'from-r' : 'from-l'));
document.querySelectorAll('.reveal, h2').forEach((el, i) => { el.style.transitionDelay = (el.matches('.card') ? (i % 3) * 90 : 0) + 'ms'; io.observe(el); });

/* ---------- ปุ่มมีริ้วคลื่นเมื่อกด ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('.btn'); if (!b || reduce) return;
  const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span');
  s.className = 'rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d/2}px;top:${e.clientY - r.top - d/2}px`;
  b.appendChild(s); setTimeout(() => s.remove(), 600);
});

/* ---------- ข้อความพิมพ์ทีละตัว ---------- */
(function typing() {
  const el = $('#typing'), words = SITE.typingWords || [];
  if (!words.length) { el.remove(); return; }
  if (reduce) { el.textContent = words.join(' • '); return; }
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 90);
  })();
})();

/* ---------- การ์ดเอียงตามเมาส์ ---------- */
if (!reduce && matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    const c = e.target.closest && e.target.closest('.card'); if (!c) return;
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  document.addEventListener('mouseout', e => { const c = e.target.closest && e.target.closest('.card'); if (c) c.style.transform = ''; });
}

/* ---------- ฟองอากาศในหน้าแรก (คลิก/แตะเพื่อเป่าฟองเพิ่ม) ---------- */
if (!reduce) (function bubbles() {
  const cv = $('#bubbles'), ctx = cv.getContext('2d'), hero = $('#home'); let W, H, bs = [], running = true;
  const fit = () => { const dpr = devicePixelRatio || 1; W = hero.clientWidth; H = hero.clientHeight; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  fit(); addEventListener('resize', fit);
  const make = (x, y) => ({x: x ?? Math.random()*W, y: y ?? H + 20, r: 4 + Math.random()*14, v: .4 + Math.random()*1.1, p: Math.random()*6});
  for (let i = 0; i < 28; i++) bs.push(make(undefined, Math.random()*H));
  hero.addEventListener('pointerdown', e => {
    if (e.target.closest('a,button')) return;
    const r = hero.getBoundingClientRect();
    for (let i = 0; i < 6; i++) bs.push(make(e.clientX - r.left + (Math.random()-.5)*40, e.clientY - r.top));
  });
  new IntersectionObserver(es => { running = es[0].isIntersecting; if (running) loop(); }).observe(hero);
  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    bs.forEach(b => {
      b.y -= b.v; b.p += .03; b.x += Math.sin(b.p) * .4;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7);
      ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fill();
      ctx.beginPath(); ctx.arc(b.x - b.r*.3, b.y - b.r*.3, b.r*.18, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill();
    });
    bs = bs.filter(b => b.y > -30).concat(bs.length < 28 ? [make()] : []);
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---------- ปลาว่ายตามเมาส์ / ว่ายเองบนมือถือ ---------- */
if (!reduce) (function fish() {
  const f = $('#fish'); let x = innerWidth/2, y = 120, tx = x, ty = y, dir = 1, auto = !matchMedia('(hover:hover)').matches, t = 0;
  addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { auto = false; tx = e.clientX + 18; ty = e.clientY + 18; } });
  addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { tx = e.clientX; ty = e.clientY; auto = false; setTimeout(() => auto = true, 4000); } });
  (function loop() {
    t += .016;
    if (auto) { tx = innerWidth/2 + Math.sin(t*.5) * innerWidth*.4; ty = innerHeight*.6 + Math.sin(t*1.1) * 60; }
    const dx = tx - x; if (Math.abs(dx) > 3) dir = dx > 0 ? -1 : 1;
    x += dx * .06; y += (ty - y) * .06;
    f.style.transform = `translate(${x}px,${y + Math.sin(t*6)*3}px) scaleX(${dir})`;
    requestAnimationFrame(loop);
  })();
})();


/* ---------- Skill progress: แถบวิ่งเมื่อเลื่อนมาถึง + ตัวเลขนับขึ้น ---------- */
(function skills() {
  const items = document.querySelectorAll('.skill');
  const run = el => {
    const bar = el.querySelector('i'), pct = el.querySelector('.pct'), to = +bar.dataset.l;
    bar.style.width = to + '%';
    if (reduce) { pct.textContent = to + '%'; return; }
    const t0 = performance.now();
    (function step(t) { const p = Math.min(1, (t - t0) / 1400); pct.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + '%'; if (p < 1) requestAnimationFrame(step); })(t0);
  };
  const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }), {threshold: .4});
  items.forEach(i => o.observe(i));
})();

/* ---------- Custom cursor ---------- */
(function cursor() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const c = $('#cursor'); let x = -100, y = -100, cx = x, cy = y;
  document.documentElement.classList.add('has-cursor');
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY; c.classList.add('show');
    c.classList.toggle('big', !!e.target.closest('a,button,.card,[tabindex],input,textarea'));
  });
  document.addEventListener('mouseleave', () => c.classList.remove('show'));
  (function loop() { cx += (x - cx) * .25; cy += (y - cy) * .25; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
})();

/* ---------- Loading screen: ปลาว่ายผ่านหน้าจอ แล้วค่อยเข้าเว็บ ---------- */
(function loader() {
  const L = $('#loader'), t0 = performance.now(), MIN = reduce ? 0 : 2200;
  let closed = false;
  const close = () => {
    if (closed) return; closed = true;
    L.classList.add('done'); document.body.classList.remove('loading');
    setTimeout(() => L.remove(), 700);
  };
  const ready = () => setTimeout(close, Math.max(0, MIN - (performance.now() - t0)));
  if (document.readyState === 'complete') ready(); else addEventListener('load', ready);
  setTimeout(close, 5000); // กันค้าง
})();


/* ---------- ข้อความต้อนรับ: พิมพ์ → ค้าง → ลบ → พิมพ์ข้อความถัดไป ---------- */
(function welcomeTyping() {
  if (reduce || welWords.length < 2) return;
  // แยกเป็นตัวอักษรไทยที่ถูกต้อง (สระ/วรรณยุกต์ไม่หลุด)
  const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('th', {granularity: 'grapheme'}) : null;
  const split = t => seg ? [...seg.segment(t)].map(x => x.segment) : Array.from(t);
  const words = welWords.map(split);
  let w = 0, c = words[0].length, del = false;
  wel.setAttribute('aria-live', 'off');
  setTimeout(function tick() {
    const cur = words[w];
    wel.textContent = cur.slice(0, c).join('');
    if (!del && c >= cur.length) { del = true; return setTimeout(tick, 2200); }       // พิมพ์ครบแล้วค้างไว้
    if (del && c <= 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 38 : 85);
  }, 3200); // รอให้โหลดเสร็จและข้อความแรกอ่านจบก่อนเริ่มลบ
})();
