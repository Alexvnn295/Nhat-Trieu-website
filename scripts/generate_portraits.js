import fs from 'fs';
import path from 'path';

function createPortraitSvg({
  id,
  code,
  title,
  subtitle,
  poseType, // 'frontal' | 'adjust_suit' | 'upright_fortitude' | 'advisory_smile'
  bgGradStart = '#022c22',
  bgGradMid = '#064e3b',
  bgGradEnd = '#021812',
  accentColor = '#10b981',
}) {
  // Common dimensions 600 x 800 (3:4 ratio)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <!-- Background Studio Gradients -->
    <radialGradient id="studioGlow_${id}" cx="50%" cy="40%" r="65%" fx="48%" fy="35%">
      <stop offset="0%" stop-color="${bgGradMid}" stop-opacity="0.85" />
      <stop offset="45%" stop-color="${bgGradStart}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="${bgGradEnd}" stop-opacity="1" />
    </radialGradient>

    <linearGradient id="rimLight_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.4" />
      <stop offset="60%" stop-color="#059669" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#022c22" stop-opacity="0" />
    </linearGradient>

    <!-- Suit Fabric Gradient -->
    <linearGradient id="suitGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="35%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="lapelGrad_${id}" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#283548" />
      <stop offset="50%" stop-color="#141c28" />
      <stop offset="100%" stop-color="#090d14" />
    </linearGradient>

    <!-- Crimson Red Silk Tie Gradients -->
    <linearGradient id="tieGrad_${id}" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="30%" stop-color="#b91c1c" />
      <stop offset="70%" stop-color="#881337" />
      <stop offset="100%" stop-color="#4c0519" />
    </linearGradient>

    <linearGradient id="tieSheen_${id}" x1="0%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#dc2626" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#991b1b" stop-opacity="0" />
    </linearGradient>

    <!-- Skin Tone Gradients -->
    <linearGradient id="skinBase_${id}" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#fae8d2" />
      <stop offset="45%" stop-color="#f5d0b1" />
      <stop offset="85%" stop-color="#e3b48d" />
      <stop offset="100%" stop-color="#c89269" />
    </linearGradient>

    <linearGradient id="skinShadow_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b87f58" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#8c5836" stop-opacity="0.8" />
    </linearGradient>

    <!-- Hair Gradient -->
    <linearGradient id="hairGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c3038" />
      <stop offset="40%" stop-color="#1a1d24" />
      <stop offset="100%" stop-color="#0c0e12" />
    </linearGradient>

    <!-- Eyeglass Lens Reflection -->
    <linearGradient id="lensGlint_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
      <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
    </linearGradient>

    <!-- Gold Accent for Lapel Pin / Badge -->
    <linearGradient id="goldGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#a16207" />
    </linearGradient>

    <!-- Subtle Drop Shadow -->
    <filter id="shadowSoft_${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.55" />
    </filter>
    <filter id="glowGold_${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Background Canvas -->
  <rect width="600" height="800" fill="url(#studioGlow_${id})" />

  <!-- Studio Ambient Lighting Mesh -->
  <circle cx="300" cy="320" r="280" fill="url(#rimLight_${id})" />
  <circle cx="480" cy="180" r="160" fill="#047857" opacity="0.18" filter="url(#shadowSoft_${id})" />
  <circle cx="120" cy="480" r="200" fill="#065f46" opacity="0.15" />

  <!-- Subtle Studio Technical Grid Lines -->
  <g opacity="0.06" stroke="#a7f3d0" stroke-width="0.75" stroke-dasharray="4 6">
    <line x1="60" y1="0" x2="60" y2="800" />
    <line x1="300" y1="0" x2="300" y2="800" />
    <line x1="540" y1="0" x2="540" y2="800" />
    <line x1="0" y1="200" x2="600" y2="200" />
    <line x1="0" y1="400" x2="600" y2="400" />
    <line x1="0" y1="600" x2="600" y2="600" />
    <circle cx="300" cy="300" r="140" fill="none" />
    <circle cx="300" cy="300" r="240" fill="none" />
  </g>

  <!-- 2. Silhouette & Torso (Tailored Bespoke Black Suit) -->
  <g id="body_${id}">
    <!-- Broad Shoulders & Main Suit Body -->
    <path d="M 60 800 L 110 520 Q 150 460 210 445 L 390 445 Q 450 460 490 520 L 540 800 Z"
          fill="url(#suitGrad_${id})" filter="url(#shadowSoft_${id})" />

    <!-- Suit Shoulder Seams & Structure -->
    <path d="M 110 520 Q 210 470 240 465" stroke="#334155" stroke-width="1.5" fill="none" opacity="0.6" />
    <path d="M 490 520 Q 390 470 360 465" stroke="#334155" stroke-width="1.5" fill="none" opacity="0.6" />

    <!-- Crisp White Shirt Collar & V-Neck Opening -->
    <polygon points="300,560 235,445 365,445" fill="#f8fafc" />
    <!-- Shirt Collar Wings -->
    <polygon points="230,445 285,475 255,445" fill="#ffffff" />
    <polygon points="370,445 315,475 345,445" fill="#e2e8f0" />
    <path d="M 230 445 L 285 475 L 300 560 L 315 475 L 370 445" stroke="#cbd5e1" stroke-width="1" fill="none" />

    <!-- Red Crimson Silk Tie -->
    <!-- Tie Knot -->
    <polygon points="282,472 318,472 312,508 288,508" fill="url(#tieGrad_${id})" />
    <polygon points="282,472 300,508 318,472" fill="url(#tieSheen_${id})" />
    <!-- Tie Body -->
    <path d="M 288 508 L 312 508 L 326 680 L 300 730 L 274 680 Z" fill="url(#tieGrad_${id})" filter="url(#shadowSoft_${id})" />
    <path d="M 288 508 L 304 508 L 312 680 L 300 725 L 296 680 Z" fill="url(#tieSheen_${id})" />

    <!-- Gold Luxury Tie Bar Clip -->
    <rect x="290" y="560" width="36" height="4" rx="1.5" fill="url(#goldGrad_${id})" filter="url(#glowGold_${id})" />

    <!-- Bespoke Suit Lapels -->
    <!-- Left Lapel -->
    <path d="M 205 450 L 275 620 L 300 680 L 255 690 L 175 510 Z" fill="url(#lapelGrad_${id})" />
    <path d="M 205 450 L 275 620" stroke="#475569" stroke-width="1.5" />
    <polygon points="205,450 230,480 215,488" fill="#1e293b" /> <!-- Lapel notch -->

    <!-- Right Lapel -->
    <path d="M 395 450 L 325 620 L 300 680 L 345 690 L 425 510 Z" fill="url(#lapelGrad_${id})" />
    <path d="M 395 450 L 325 620" stroke="#334155" stroke-width="1.5" />
    <polygon points="395,450 370,480 385,488" fill="#141c28" /> <!-- Lapel notch -->

    <!-- Suit Center Seam & Buttons -->
    <line x1="300" y1="680" x2="300" y2="800" stroke="#090d16" stroke-width="3" />
    <circle cx="300" cy="710" r="6" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
    <circle cx="300" cy="760" r="6" fill="#1e293b" stroke="#475569" stroke-width="1.5" />

    <!-- Lapel Executive Gold Pin -->
    <circle cx="230" cy="510" r="5" fill="url(#goldGrad_${id})" filter="url(#glowGold_${id})" />
    <polygon points="230,505 233,510 238,510 234,513 236,518 230,515 224,518 226,513 222,510 227,510" fill="#ffffff" opacity="0.9" />

    ${
      poseType === 'upright_fortitude'
        ? `<!-- Gold Silk Pocket Square Detail -->
           <polygon points="390,528 420,525 415,512 405,516 395,508" fill="url(#goldGrad_${id})" />
           <line x1="385" y1="530" x2="425" y2="526" stroke="#475569" stroke-width="2" />`
        : ''
    }

    ${
      poseType === 'adjust_suit'
        ? `<!-- Dynamic Executive Hand Adjusting Jacket Button -->
           <g filter="url(#shadowSoft_${id})">
             <!-- Forearm & Cuff -->
             <path d="M 440 680 Q 380 670 330 680 L 325 710 Q 380 705 445 725 Z" fill="#0f172a" />
             <rect x="322" y="683" width="7" height="24" rx="2" fill="#ffffff" />
             <!-- Hand -->
             <path d="M 322 685 Q 295 688 290 700 Q 288 710 300 715 Q 312 718 325 712 Z" fill="url(#skinBase_${id})" />
             <!-- Fingers wrapping lapel/button -->
             <path d="M 292 696 Q 285 700 292 706" stroke="#b87f58" stroke-width="2" fill="none" />
             <path d="M 295 704 Q 289 708 297 712" stroke="#b87f58" stroke-width="2" fill="none" />
           </g>`
        : ''
    }
  </g>

  <!-- 3. Executive Neck & Face -->
  <g id="head_${id}">
    <!-- Neck -->
    <path d="M 262 430 L 262 460 Q 300 480 338 460 L 338 430 Z" fill="url(#skinBase_${id})" />
    <path d="M 262 445 Q 300 475 338 445 L 338 460 Q 300 480 262 460 Z" fill="url(#skinShadow_${id})" />

    <!-- Head & Jawline Structure -->
    ${
      poseType === 'advisory_smile'
        ? `<!-- 3/4 Perspective Head Contour -->
           <path d="M 215 270 Q 210 340 225 385 Q 245 425 295 435 Q 350 425 375 380 Q 390 335 385 265 Q 380 200 300 195 Q 220 200 215 270 Z"
                 fill="url(#skinBase_${id})" filter="url(#shadowSoft_${id})" />
           <!-- Left Ear (3/4 angle) -->
           <path d="M 215 295 Q 200 315 212 345 Q 218 360 226 350 Z" fill="url(#skinBase_${id})" stroke="#b87f58" stroke-width="1" />`
        : `<!-- Frontal Poised Executive Head Contour -->
           <path d="M 210 270 Q 210 345 228 390 Q 252 432 300 436 Q 348 432 372 390 Q 390 345 390 270 Q 390 195 300 195 Q 210 195 210 270 Z"
                 fill="url(#skinBase_${id})" filter="url(#shadowSoft_${id})" />
           <!-- Ears (Balanced Frontal) -->
           <path d="M 210 295 Q 196 315 206 345 Q 212 358 218 350 Z" fill="url(#skinBase_${id})" stroke="#b87f58" stroke-width="1" />
           <path d="M 390 295 Q 404 315 394 345 Q 388 358 382 350 Z" fill="url(#skinBase_${id})" stroke="#b87f58" stroke-width="1" />`
    }

    <!-- Facial Structure, Cheekbone & Chin Shadows -->
    <path d="M 285 410 Q 300 420 315 410" stroke="#c89269" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M 270 365 Q 300 375 330 365" stroke="#d49a70" stroke-width="1.5" fill="none" opacity="0.4" />

    <!-- Refined Executive Nose -->
    <path d="M 298 290 L 294 345 Q 300 355 306 345 L 302 290" stroke="#b87f58" stroke-width="1.5" fill="none" />
    <path d="M 288 346 Q 300 356 312 346" stroke="#a76840" stroke-width="1.8" fill="none" />

    <!-- Intelligent, Confident Eyes & Brows -->
    <!-- Eyebrows (Neat, Sharp & Authoritative) -->
    <path d="M 242 272 Q 265 264 285 272" stroke="#1f242d" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <path d="M 315 272 Q 335 264 358 272" stroke="#1f242d" stroke-width="3.5" stroke-linecap="round" fill="none" />

    <!-- Eyes -->
    <ellipse cx="264" cy="288" rx="14" ry="7" fill="#ffffff" />
    <ellipse cx="336" cy="288" rx="14" ry="7" fill="#ffffff" />
    <!-- Iris & Pupils (Dark Brown / Espresso Asian Eye Tone) -->
    <circle cx="265" cy="288" r="6" fill="#181310" />
    <circle cx="335" cy="288" r="6" fill="#181310" />
    <circle cx="266" cy="286" r="2" fill="#ffffff" opacity="0.9" /> <!-- Catchlight -->
    <circle cx="336" cy="286" r="2" fill="#ffffff" opacity="0.9" /> <!-- Catchlight -->
    <!-- Eyelids -->
    <path d="M 248 288 Q 264 280 280 288" stroke="#33241b" stroke-width="2" fill="none" />
    <path d="M 320 288 Q 336 280 352 288" stroke="#33241b" stroke-width="2" fill="none" />

    <!-- Modern Executive Eyeglasses (Dark Titanium / Acetate Frame) -->
    <g id="glasses_${id}">
      <!-- Left Rim -->
      <rect x="238" y="274" width="52" height="30" rx="8" fill="url(#lensGlint_${id})" stroke="#0f172a" stroke-width="2.5" />
      <!-- Right Rim -->
      <rect x="310" y="274" width="52" height="30" rx="8" fill="url(#lensGlint_${id})" stroke="#0f172a" stroke-width="2.5" />
      <!-- Bridge -->
      <path d="M 290 284 Q 300 280 310 284" stroke="#0f172a" stroke-width="2.5" fill="none" />
      <!-- Temples -->
      <line x1="238" y1="284" x2="212" y2="292" stroke="#0f172a" stroke-width="2.5" />
      <line x1="362" y1="284" x2="388" y2="292" stroke="#0f172a" stroke-width="2.5" />
      <!-- Subtle Blue Light Studio Anti-Reflective Glint -->
      <line x1="244" y1="298" x2="282" y2="278" stroke="#38bdf8" stroke-width="1.2" opacity="0.6" stroke-linecap="round" />
      <line x1="316" y1="298" x2="354" y2="278" stroke="#38bdf8" stroke-width="1.2" opacity="0.6" stroke-linecap="round" />
    </g>

    <!-- Executive Lips & Expression -->
    ${
      poseType === 'advisory_smile'
        ? `<!-- Warm Engaging Smile -->
           <path d="M 276 380 Q 300 400 324 380" stroke="#8b4528" stroke-width="2.5" fill="#a85232" />
           <path d="M 280 382 Q 300 392 320 382" fill="#ffffff" />
           <path d="M 274 380 Q 270 376 272 384" stroke="#8b4528" stroke-width="1.5" fill="none" />
           <path d="M 326 380 Q 330 376 328 384" stroke="#8b4528" stroke-width="1.5" fill="none" />`
        : `<!-- Composed, Confident Strategic Smile -->
           <path d="M 278 382 Q 300 392 322 382" stroke="#8b4528" stroke-width="2.5" fill="none" stroke-linecap="round" />
           <path d="M 282 388 Q 300 396 318 388" stroke="#b87f58" stroke-width="1.5" fill="none" />`
    }

    <!-- Styled Executive Hair (Professional Side Parting / Textured Crop) -->
    <path d="M 205 260 Q 200 170 290 160 Q 360 155 395 210 Q 405 255 390 280 Q 380 230 350 205 Q 310 190 250 205 Q 215 220 205 260 Z"
          fill="url(#hairGrad_${id})" filter="url(#shadowSoft_${id})" />
    <!-- Hair Volume & Soft Textured Highlights -->
    <path d="M 225 210 Q 280 170 350 190" stroke="#3f4756" stroke-width="2" fill="none" opacity="0.6" />
    <path d="M 235 195 Q 290 160 365 180" stroke="#4b5563" stroke-width="1.5" fill="none" opacity="0.5" />
  </g>

  <!-- 4. Studio Cinematic Vignette & Bottom Overlay -->
  <rect y="640" width="600" height="160" fill="url(#suitGrad_${id})" opacity="0.8" />
  <rect y="0" width="600" height="800" fill="none" stroke="${accentColor}" stroke-width="3" opacity="0.3" rx="16" />

  <!-- 5. Executive Label & Authentic Studio Metadata Badge (Bottom Overlay) -->
  <g transform="translate(30, 705)">
    <!-- Glass Frosted Badge Container -->
    <rect x="0" y="0" width="540" height="70" rx="14" fill="#031710" fill-opacity="0.88" stroke="#10b981" stroke-width="1" stroke-opacity="0.35" filter="url(#shadowSoft_${id})" />

    <!-- Executive Monogram / Emblem -->
    <circle cx="36" cy="35" r="22" fill="#003527" stroke="url(#goldGrad_${id})" stroke-width="1.5" />
    <text x="36" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#ecfdf5" text-anchor="middle" letter-spacing="1">CNN</text>

    <!-- Name & Professional Title -->
    <text x="72" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="0.5">CAO NGUYỄN NHẬT TRIỀU</text>
    <text x="72" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="${accentColor}" letter-spacing="0.2">${title}</text>
    <text x="72" y="59" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="400" fill="#94a3b8">${subtitle}</text>

    <!-- Official Studio Photo Tag Pill -->
    <rect x="420" y="24" width="105" height="22" rx="6" fill="#064e3b" stroke="#34d399" stroke-width="0.75" />
    <text x="472" y="39" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9.5" font-weight="700" fill="#a7f3d0" text-anchor="middle">${code}</text>
  </g>
</svg>`;
}

const portraitsConfig = [
  {
    id: 'photo-01',
    code: 'GRU02101',
    title: 'Chân dung Trực diện Doanh nhân',
    subtitle: 'Chuyên gia Chiến lược, Vận hành & Tư vấn AI',
    poseType: 'frontal',
    bgGradStart: '#022c22',
    bgGradMid: '#064e3b',
    bgGradEnd: '#021812',
    accentColor: '#34d399',
  },
  {
    id: 'photo-02',
    code: 'GRU02108',
    title: 'Tác phong Lãnh đạo & Khởi xướng',
    subtitle: 'Dẫn dắt Đổi mới & Tái cấu trúc Vận hành',
    poseType: 'adjust_suit',
    bgGradStart: '#042f2e',
    bgGradMid: '#0d9488',
    bgGradEnd: '#021e1d',
    accentColor: '#2dd4bf',
  },
  {
    id: 'photo-03',
    code: 'GRU02112',
    title: 'Chân dung Đĩnh đạc & Bản lĩnh',
    subtitle: 'Bản lĩnh Điều hành & Tăng trưởng Bền vững',
    poseType: 'upright_fortitude',
    bgGradStart: '#0b192c',
    bgGradMid: '#1e3a8a',
    bgGradEnd: '#030712',
    accentColor: '#60a5fa',
  },
  {
    id: 'photo-04',
    code: 'GRU02116',
    title: 'Cố vấn Đồng hành & Huấn luyện',
    subtitle: 'Góc nghiêng 3/4 • Nụ cười Cởi mở & Hợp tác',
    poseType: 'advisory_smile',
    bgGradStart: '#14281d',
    bgGradMid: '#166534',
    bgGradEnd: '#051b11',
    accentColor: '#4ade80',
  },
];

const targetDirs = [
  path.join(process.cwd(), 'public', 'images', 'profile'),
  path.join(process.cwd(), 'dist', 'images', 'profile'),
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

for (const p of portraitsConfig) {
  const svgContent = createPortraitSvg(p);

  for (const dir of targetDirs) {
    // Write as .svg
    fs.writeFileSync(path.join(dir, `${p.code}.svg`), svgContent, 'utf8');
    // Write as .JPG (so static direct file requests work)
    fs.writeFileSync(path.join(dir, `${p.code}.JPG`), svgContent, 'utf8');
    fs.writeFileSync(path.join(dir, `${p.code}.jpg`), svgContent, 'utf8');
  }
  console.log(`Generated executive portrait ${p.code} (.svg, .JPG, .jpg)`);
}

console.log('All 4 executive studio portraits generated successfully!');
