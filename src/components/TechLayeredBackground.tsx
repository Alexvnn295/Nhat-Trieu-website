import React, { useEffect, useRef, useState } from 'react';
import { NavTab } from '../types';

interface TechLayeredBackgroundProps {
  activeTab?: NavTab;
}

/**
 * Multi-layered Living Technology Background
 * - Layer 1 (Bottom, 0.3x parallax, 3-5% opacity): Topographic contour lines & geodetic survey grid
 * - Layer 2 (Middle, 0.6x parallax, 5-12% opacity): Regional tech ecosystems (GPS Orbit, IoT Sensor Mesh, Evolution Helix, Blueprint Spec, AI Neural Network) with 200px cross-fade
 * - Layer 3 (Top, 0.9x parallax, 2-5% opacity): Micro-particles, focal radial glows, slow scanline sweep & 2% film grain
 */
export const TechLayeredBackground: React.FC<TechLayeredBackgroundProps> = ({ activeTab = 'home' }) => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth scroll listener with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Atmospheric micro-particle physics simulation (Layer 3 - server room floating dust motes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 32 subtle micro-particles
    const particleCount = 32;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.8,
      speedY: Math.random() * 0.25 + 0.1, // Float gently upwards
      amplitude: Math.random() * 20 + 8,
      frequency: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.035 + 0.015, // 1.5% - 5% opacity
    }));

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const horizontalWobble = Math.sin(time * p.frequency + p.phase) * 0.6;
        const currentX = p.x + horizontalWobble * p.amplitude * 0.1;

        ctx.beginPath();
        ctx.arc(currentX, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 53, 39, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax translation calculations
  const layer1Transform = `translate3d(0, ${-scrollY * 0.3}px, 0)`;
  const layer2Transform = `translate3d(0, ${-scrollY * 0.6}px, 0)`;
  const layer3Transform = `translate3d(0, ${-scrollY * 0.9}px, 0)`;

  return (
    <div
      id="tech-living-background"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
      style={{ backgroundColor: '#f8f9ff' }}
    >
      {/* =========================================================================
          LỚP 1 — ĐÁY: BẢN ĐỒ ĐỊA HÌNH & TỌA ĐỘ VẬT LÝ (Opacity 3-5%, Parallax 0.3x)
          Các đường đồng mức (contour lines) đậm đặc ở hero, thưa dần khi cuộn xuống.
          ========================================================================= */}
      <div
        className="absolute inset-0 w-full will-change-transform"
        style={{
          transform: layer1Transform,
          height: '5000px',
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 5000"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Topographic line gradient to fade softly across width */}
            <linearGradient id="topo-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#003527" stopOpacity="0.02" />
              <stop offset="30%" stopColor="#003527" stopOpacity="0.045" />
              <stop offset="70%" stopColor="#003527" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#003527" stopOpacity="0.02" />
            </linearGradient>

            {/* Faint crosshair pattern for survey benchmarks */}
            <pattern id="survey-grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <path
                d="M 80 72 L 80 88 M 72 80 L 88 80"
                stroke="#003527"
                strokeWidth="0.75"
                strokeOpacity="0.035"
              />
              <circle cx="80" cy="80" r="1.5" fill="#003527" fillOpacity="0.035" />
            </pattern>
          </defs>

          {/* Survey grid layer */}
          <rect width="1440" height="5000" fill="url(#survey-grid)" />

          {/* SECTION 1 - HERO DENSE TOPOGRAPHIC CONTOURS (0px - 900px) */}
          <g stroke="url(#topo-fade)" fill="none" strokeWidth="1">
            {/* Contour 10m to 100m elevation curves */}
            <path d="M-50,60 C320,40 560,110 820,80 C1100,50 1300,120 1500,90" />
            <path d="M-50,110 C280,95 540,170 780,130 C1040,90 1280,180 1500,140" strokeWidth="1.2" />
            <path d="M-50,150 C240,140 490,210 740,170 C990,130 1250,230 1500,190" />
            <path d="M-50,190 C210,185 450,250 700,210 C940,170 1210,270 1500,230" />
            <path d="M-50,230 C180,225 410,290 660,245 C900,205 1170,310 1500,270" strokeWidth="1.2" />
            <path d="M-50,270 C150,265 370,330 620,280 C860,240 1130,350 1500,310" />
            <path d="M-50,310 C120,305 330,370 580,315 C820,275 1090,390 1500,350" />
            <path d="M-50,360 C180,360 410,410 650,365 C880,320 1120,430 1500,400" strokeWidth="1.3" />
            <path d="M-50,420 C240,430 480,460 720,420 C960,370 1180,480 1500,460" />
            <path d="M-50,490 C300,510 550,520 800,480 C1040,430 1250,540 1500,520" />
            <path d="M-50,570 C360,600 620,590 880,550 C1120,500 1320,610 1500,590" strokeWidth="1.2" />
            <path d="M-50,660 C420,690 700,670 960,630 C1200,580 1380,690 1500,670" />
            <path d="M-50,760 C480,790 780,760 1040,720 C1280,670 1420,770 1500,760" />
          </g>

          {/* Elevation markers & Survey Coordinates in Hero */}
          <g fill="#003527" fillOpacity="0.04" className="font-mono text-[9px]">
            <text x="120" y="105">ELEV: +12.4m</text>
            <text x="740" y="125">INDEX CONTOUR 20m</text>
            <text x="1240" y="175">BM-04 [NGS]</text>
            <text x="210" y="245">LAT 10°46&apos;37.2&quot;N</text>
            <text x="1100" y="305">LON 106°41&apos;43.8&quot;E</text>
            <text x="660" y="360">ELEV: +38.6m</text>
            <text x="80" y="565">DATUM WGS-84 / UTM 48N</text>
            <text x="1000" y="625">ACCURACY: ±0.008m</text>
          </g>

          {/* SECTION 2 & 3 - GRADUAL WIDENING / THINNING CONTOURS (1000px - 5000px) */}
          <g stroke="url(#topo-fade)" fill="none" strokeWidth="0.8" strokeDasharray="3 3">
            <path d="M-50,920 C400,980 750,910 1100,970 C1300,1000 1450,960 1500,970" />
            <path d="M-50,1150 C350,1220 700,1130 1050,1200 C1300,1240 1420,1180 1500,1200" />
            <path d="M-50,1420 C450,1490 820,1380 1180,1460 C1340,1500 1460,1440 1500,1460" />
            <path d="M-50,1750 C380,1830 760,1720 1140,1810 C1320,1850 1440,1790 1500,1810" />
            <path d="M-50,2120 C420,2210 800,2090 1200,2190 C1360,2230 1460,2170 1500,2190" />
            <path d="M-50,2550 C390,2650 780,2510 1180,2620 C1350,2670 1450,2600 1500,2630" />
            <path d="M-50,3050 C440,3160 830,3010 1220,3140 C1380,3190 1470,3110 1500,3140" />
            <path d="M-50,3600 C410,3730 810,3560 1210,3700 C1370,3760 1460,3680 1500,3710" />
            <path d="M-50,4200 C450,4340 850,4160 1250,4310 C1400,4370 1480,4280 1500,4320" />
            <path d="M-50,4800 C420,4950 830,4770 1230,4920 C1390,4980 1470,4890 1500,4930" />
          </g>

          {/* Survey coordinate ticks across bottom */}
          <g fill="#003527" fillOpacity="0.035" className="font-mono text-[8px]">
            <text x="80" y="1410">ELEV +48m / SECTOR-B</text>
            <text x="1260" y="2100">GEO-DATUM VIETNAM-2000</text>
            <text x="100" y="3030">TOPO-SURVEY POINT #882</text>
            <text x="1220" y="3580">CONTOUR INTERVAL: 25m</text>
            <text x="80" y="4780">PHYSICAL SPATIAL LAYER // END</text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          LỚP 2 — GIỮA: HỆ SINH THÁI CÔNG NGHỆ THEO TỪNG VÙNG (Opacity 5-12%, Parallax 0.6x)
          Mỗi section có biểu tượng và câu chuyện công nghệ riêng biệt, chuyển mượt ~200px
          ========================================================================= */}
      <div
        className="absolute inset-0 w-full will-change-transform"
        style={{
          transform: layer2Transform,
          height: '5000px',
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 5000"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Tech line gradient */}
            <linearGradient id="tech-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003527" stopOpacity="0.09" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#003527" stopOpacity="0.08" />
            </linearGradient>

            {/* Trilateration convergence pulse */}
            <radialGradient id="trilat-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#003527" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#003527" stopOpacity="0" />
            </radialGradient>

            {/* Neural flow gradient */}
            <linearGradient id="neural-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#003527" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#003527" stopOpacity="0.07" />
            </linearGradient>
          </defs>

          {/* -------------------------------------------------------------
              VÙNG 1: HERO (0px - 850px)
              Quỹ đạo vệ tinh GPS, Trilateration, Telemetry & Compass Rose
              ------------------------------------------------------------- */}
          <g id="region-hero-gps">
            {/* Satellite 1 & Orbit Arc */}
            <path
              d="M 150 180 A 700 280 -25 0 1 1250 260"
              fill="none"
              stroke="#003527"
              strokeOpacity="0.08"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            {/* Satellite 2 & Orbit Arc */}
            <path
              d="M 220 380 A 650 240 20 0 1 1350 140"
              fill="none"
              stroke="#003527"
              strokeOpacity="0.07"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            {/* Satellite 3 & Polar Orbit Arc */}
            <path
              d="M 820 -40 A 550 500 0 0 1 680 820"
              fill="none"
              stroke="#003527"
              strokeOpacity="0.06"
              strokeWidth="1"
              strokeDasharray="8 4"
            />

            {/* Satellite Glyphs (Small technical icons) */}
            {/* SV-01 (Top Left) */}
            <g transform="translate(320, 150) rotate(-20)">
              <rect x="-8" y="-4" width="16" height="8" rx="1.5" fill="#003527" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.8" />
              <line x1="-16" y1="0" x2="-8" y2="0" stroke="#003527" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="8" y1="0" x2="16" y2="0" stroke="#003527" strokeOpacity="0.15" strokeWidth="1" />
              {/* Solar array wings */}
              <rect x="-24" y="-7" width="8" height="14" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <rect x="16" y="-7" width="8" height="14" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <text x="0" y="16" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7.5px]">SV-01 [L1/L2]</text>
            </g>

            {/* SV-09 (Top Center Right) */}
            <g transform="translate(980, 200) rotate(15)">
              <rect x="-8" y="-4" width="16" height="8" rx="1.5" fill="#003527" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.8" />
              <rect x="-24" y="-7" width="8" height="14" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <rect x="16" y="-7" width="8" height="14" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <text x="0" y="16" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7.5px]">SV-09 [GALILEO]</text>
            </g>

            {/* SV-24 (Center Left) */}
            <g transform="translate(540, 360) rotate(-10)">
              <rect x="-7" y="-3.5" width="14" height="7" rx="1.5" fill="#003527" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.8" />
              <rect x="-20" y="-6" width="6" height="12" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <rect x="14" y="-6" width="6" height="12" rx="1" fill="#10b981" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.15" strokeWidth="0.6" />
              <text x="0" y="15" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7.5px]">SV-24 [QZSS]</text>
            </g>

            {/* Trilateration (Tam giác đạc) converging on target */}
            {/* Target position on ground */}
            <g transform="translate(740, 480)">
              {/* Converging Trilateration Beam 1 */}
              <line x1="-420" y1="-330" x2="0" y2="0" stroke="#10b981" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="3 3" />
              {/* Converging Trilateration Beam 2 */}
              <line x1="240" y1="-280" x2="0" y2="0" stroke="#10b981" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="3 3" />
              {/* Converging Trilateration Beam 3 */}
              <line x1="-200" y1="-120" x2="0" y2="0" stroke="#10b981" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="3 3" />

              {/* Target intersection point */}
              <circle cx="0" cy="0" r="48" fill="url(#trilat-pulse)" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#003527" strokeOpacity="0.1" strokeWidth="0.75" strokeDasharray="4 2" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#003527" strokeOpacity="0.12" strokeWidth="1" />
              <circle cx="0" cy="0" r="3.5" fill="#003527" fillOpacity="0.16" />
              {/* Target Crosshairs */}
              <line x1="-36" y1="0" x2="36" y2="0" stroke="#003527" strokeOpacity="0.12" strokeWidth="0.75" />
              <line x1="0" y1="-36" x2="0" y2="36" stroke="#003527" strokeOpacity="0.12" strokeWidth="0.75" />
              <text x="18" y="-18" fill="#003527" fillOpacity="0.12" className="font-mono text-[8px] font-semibold">FIX: RTK 0.008m</text>
            </g>

            {/* Monospace floating GPS telemetry */}
            <g fill="#003527" fillOpacity="0.08" className="font-mono text-[8.5px] tracking-wider">
              <text x="80" y="80">GNSS_CONSTELLATION: GPS + GLONASS + GALILEO + BEIDOU</text>
              <text x="80" y="96">CARRIER_FREQ: L1 1575.42 MHz | L2 1227.60 MHz | L5 1176.45 MHz</text>
              <text x="80" y="112">EPHEMERIS: VALID // DOP: PDOP 1.14 HDOP 0.72 VDOP 0.88</text>
              <text x="1080" y="90">RTK_CORRECTION: NTRIP CAO_BASE</text>
              <text x="1080" y="106">BASELINE: 4.821 km</text>
              <text x="1080" y="122">AZIMUTH: 142.36° TRUE</text>
            </g>

            {/* Compass Rose (Hoa la bàn mờ góc phải dưới hero) */}
            <g transform="translate(1320, 680)">
              {/* Outer dial */}
              <circle cx="0" cy="0" r="64" fill="none" stroke="#003527" strokeOpacity="0.08" strokeWidth="1" />
              <circle cx="0" cy="0" r="58" fill="none" stroke="#003527" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="0" cy="0" r="44" fill="none" stroke="#003527" strokeOpacity="0.07" strokeWidth="0.75" />
              {/* Compass ticks */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`compass-tick-${i}`}
                  x1="0"
                  y1="-64"
                  x2="0"
                  y2={i % 3 === 0 ? "-52" : "-58"}
                  stroke="#003527"
                  strokeOpacity={i % 3 === 0 ? 0.12 : 0.06}
                  strokeWidth={i % 3 === 0 ? 1 : 0.6}
                  transform={`rotate(${i * 30})`}
                />
              ))}
              {/* Cardinal Arrows */}
              <polygon points="0,-44 6,-10 0,0 -6,-10" fill="#003527" fillOpacity="0.14" />
              <polygon points="0,44 6,10 0,0 -6,10" fill="#003527" fillOpacity="0.07" />
              <polygon points="44,0 10,6 0,0 10,-6" fill="#003527" fillOpacity="0.07" />
              <polygon points="-44,0 -10,6 0,0 -10,-6" fill="#003527" fillOpacity="0.07" />
              {/* Cardinal Labels */}
              <text x="0" y="-48" textAnchor="middle" fill="#003527" fillOpacity="0.14" className="font-mono text-[9px] font-bold">N</text>
              <text x="0" y="55" textAnchor="middle" fill="#003527" fillOpacity="0.08" className="font-mono text-[8px]">S</text>
              <text x="52" y="3" textAnchor="middle" fill="#003527" fillOpacity="0.08" className="font-mono text-[8px]">E</text>
              <text x="-52" y="3" textAnchor="middle" fill="#003527" fillOpacity="0.08" className="font-mono text-[8px]">W</text>
              <text x="0" y="14" textAnchor="middle" fill="#003527" fillOpacity="0.08" className="font-mono text-[6.5px]">VAR 0.4°W</text>
            </g>
          </g>

          {/* -------------------------------------------------------------
              VÙNG 2: GIỚI THIỆU & CORE FOCUS (850px - 1750px)
              Mạng lưới cảm biến IoT, Node kết nối, Gói dữ liệu & Vết mạch PCB
              ------------------------------------------------------------- */}
          <g id="region-iot-sensors">
            {/* PCB Trace Pattern at Top-Left & Right Corners */}
            <g stroke="#003527" strokeOpacity="0.08" strokeWidth="1.2" fill="none">
              {/* Left corner 45-deg PCB tracks */}
              <path d="M 0 920 L 140 920 L 210 990 L 210 1140 L 260 1190 L 380 1190" />
              <path d="M 0 950 L 120 950 L 180 1010 L 180 1110 L 230 1160 L 340 1160" />
              <path d="M 0 980 L 100 980 L 150 1030 L 150 1080 L 200 1130 L 300 1130" strokeDasharray="4 2" />
              {/* PCB vias (drilled through-hole pads) */}
              <circle cx="380" cy="1190" r="3.5" fill="#10b981" fillOpacity="0.09" stroke="#003527" strokeOpacity="0.14" strokeWidth="0.8" />
              <circle cx="340" cy="1160" r="3" fill="#003527" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.12" strokeWidth="0.8" />
              <circle cx="300" cy="1130" r="3" fill="#003527" fillOpacity="0.08" stroke="#003527" strokeOpacity="0.12" strokeWidth="0.8" />

              {/* Right side PCB BUS */}
              <path d="M 1440 960 L 1320 960 L 1250 1030 L 1250 1220 L 1210 1260 L 1100 1260" />
              <path d="M 1440 990 L 1340 990 L 1280 1050 L 1280 1190 L 1240 1230 L 1140 1230" />
              <circle cx="1100" cy="1260" r="3.5" fill="#10b981" fillOpacity="0.09" stroke="#003527" strokeOpacity="0.14" strokeWidth="0.8" />
            </g>

            {/* Organic IoT Sensor Constellation Mesh */}
            <g stroke="#003527" strokeOpacity="0.07" strokeWidth="0.9" fill="none">
              {/* Connection links */}
              <line x1="280" y1="1260" x2="420" y2="1320" />
              <line x1="420" y1="1320" x2="560" y2="1240" />
              <line x1="560" y1="1240" x2="720" y2="1300" />
              <line x1="720" y1="1300" x2="880" y2="1220" />
              <line x1="880" y1="1220" x2="1040" y2="1280" />
              <line x1="1040" y1="1280" x2="1180" y2="1200" />

              <line x1="420" y1="1320" x2="480" y2="1460" />
              <line x1="560" y1="1240" x2="640" y2="1420" />
              <line x1="720" y1="1300" x2="720" y2="1490" />
              <line x1="880" y1="1220" x2="940" y2="1440" />
              <line x1="1040" y1="1280" x2="1120" y2="1460" />

              <line x1="480" y1="1460" x2="640" y2="1420" />
              <line x1="640" y1="1420" x2="720" y2="1490" />
              <line x1="720" y1="1490" x2="940" y2="1440" />
              <line x1="940" y1="1440" x2="1120" y2="1460" />

              <line x1="360" y1="1580" x2="480" y2="1460" />
              <line x1="480" y1="1460" x2="580" y2="1620" />
              <line x1="640" y1="1420" x2="780" y2="1600" />
              <line x1="720" y1="1490" x2="780" y2="1600" />
              <line x1="940" y1="1440" x2="1020" y2="1620" />
              <line x1="1120" y1="1460" x2="1240" y2="1590" />
            </g>

            {/* Traveling Data Packet Animations along links (CSS stroke-dash offset) */}
            <g stroke="#10b981" strokeOpacity="0.14" strokeWidth="1.6" fill="none">
              <line x1="420" y1="1320" x2="720" y2="1300" strokeDasharray="8 64" className="animate-[tech-dash_6s_linear_infinite]" />
              <line x1="720" y1="1300" x2="1040" y2="1280" strokeDasharray="10 72" className="animate-[tech-dash_7s_linear_infinite]" />
              <line x1="640" y1="1420" x2="720" y2="1490" strokeDasharray="6 38" className="animate-[tech-dash_4s_linear_infinite]" />
            </g>

            {/* IoT Sensor Nodes with state status (Some pulsing bright) */}
            {[
              { x: 280, y: 1260, id: 'S-01', active: false },
              { x: 420, y: 1320, id: 'GW-01', active: true, isGateway: true },
              { x: 560, y: 1240, id: 'S-03', active: false },
              { x: 720, y: 1300, id: 'HUB-CENTRAL', active: true, isGateway: true },
              { x: 880, y: 1220, id: 'S-05', active: false },
              { x: 1040, y: 1280, id: 'GW-02', active: true, isGateway: true },
              { x: 1180, y: 1200, id: 'S-07', active: false },
              { x: 480, y: 1460, id: 'S-08', active: false },
              { x: 640, y: 1420, id: 'NODE-AI', active: true },
              { x: 720, y: 1490, id: 'DATA-COLLECTOR', active: true },
              { x: 940, y: 1440, id: 'S-11', active: false },
              { x: 1120, y: 1460, id: 'S-12', active: false },
              { x: 360, y: 1580, id: 'S-13', active: false },
              { x: 580, y: 1620, id: 'EDGE-PROC', active: true },
              { x: 780, y: 1600, id: 'S-15', active: false },
              { x: 1020, y: 1620, id: 'S-16', active: false },
              { x: 1240, y: 1590, id: 'S-17', active: false },
            ].map((node) => (
              <g key={`sensor-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
                {node.active && (
                  <circle cx="0" cy="0" r="14" fill="#10b981" fillOpacity="0.04" className="animate-ping" style={{ animationDuration: '4s' }} />
                )}
                {node.isGateway && (
                  /* Radio / Wi-Fi wave arcs radiating from gateway */
                  <g stroke="#10b981" strokeOpacity="0.08" strokeWidth="0.8" fill="none">
                    <path d="M -12 -12 A 18 18 0 0 1 12 -12" />
                    <path d="M -16 -16 A 24 24 0 0 1 16 -16" strokeDasharray="3 2" />
                  </g>
                )}
                <circle
                  cx="0"
                  cy="0"
                  r={node.isGateway ? 5 : 3.5}
                  fill={node.active ? '#10b981' : '#003527'}
                  fillOpacity={node.active ? 0.22 : 0.08}
                  stroke="#003527"
                  strokeOpacity={0.15}
                  strokeWidth="0.8"
                />
                <text x="7" y="3" fill="#003527" fillOpacity="0.1" className="font-mono text-[7px]">
                  {node.id}
                </text>
              </g>
            ))}

            <g fill="#003527" fillOpacity="0.07" className="font-mono text-[8px]">
              <text x="80" y="1720">PROTOCOL: MQTT / LORAWAN / COAP MESH</text>
              <text x="80" y="1734">PACKET_LOSS: &lt;0.001% // SAMPLING: 100Hz REALTIME</text>
              <text x="1080" y="1720">EDGE_NODES_ACTIVE: 48/48 ONLINE</text>
            </g>
          </g>

          {/* -------------------------------------------------------------
              VÙNG 3: LỊCH SỬ & TIẾN HÓA (1750px - 2750px)
              Chuỗi xoắn kép tiến hóa, binary streams & Australia-Vietnam Arc
              ------------------------------------------------------------- */}
          <g id="region-evolution-helix">
            {/* Horizontal Double Helix with timeline markers (2012 -> 2026) */}
            <g transform="translate(100, 2000)">
              {/* Helix Strand A */}
              <path
                d="M 0 0 Q 75 60 150 0 T 300 0 T 450 0 T 600 0 T 750 0 T 900 0 T 1050 0 T 1200 0"
                fill="none"
                stroke="#003527"
                strokeOpacity="0.09"
                strokeWidth="1.8"
              />
              {/* Helix Strand B */}
              <path
                d="M 0 0 Q 75 -60 150 0 T 300 0 T 450 0 T 600 0 T 750 0 T 900 0 T 1050 0 T 1200 0"
                fill="none"
                stroke="#10b981"
                strokeOpacity="0.08"
                strokeWidth="1.8"
              />

              {/* Rungs connecting the strands & Milestone Years */}
              {[
                { x: 75, year: '2012', desc: 'RMIT MELBOURNE' },
                { x: 225, year: '2016', desc: 'TELECOM R&D' },
                { x: 375, year: '2018', desc: 'GLOBAL SUPPLY CHAIN' },
                { x: 525, year: '2020', desc: 'DIGITAL TRANSFORMATION' },
                { x: 675, year: '2022', desc: 'ENTERPRISE STRATEGY' },
                { x: 825, year: '2024', desc: 'AI INTEGRATION' },
                { x: 975, year: '2026', desc: 'NEXT-GEN EXECUTIVE' },
              ].map((m) => (
                <g key={`helix-node-${m.year}`} transform={`translate(${m.x}, 0)`}>
                  <line x1="0" y1="-45" x2="0" y2="45" stroke="#003527" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="0" cy="-45" r="3" fill="#003527" fillOpacity="0.12" />
                  <circle cx="0" cy="45" r="3" fill="#10b981" fillOpacity="0.12" />
                  <text x="0" y="-55" textAnchor="middle" fill="#003527" fillOpacity="0.14" className="font-mono text-[9px] font-bold">
                    {m.year}
                  </text>
                  <text x="0" y="65" textAnchor="middle" fill="#003527" fillOpacity="0.09" className="font-mono text-[7px]">
                    {m.desc}
                  </text>
                </g>
              ))}

              {/* Faint binary code stream along the strands */}
              <text x="0" y="-12" fill="#003527" fillOpacity="0.06" className="font-mono text-[7.5px] tracking-widest">
                01000011 01000001 01001111 00100000 01010100 01010010 01001001 01000101 01010101
              </text>
              <text x="600" y="16" fill="#003527" fillOpacity="0.06" className="font-mono text-[7.5px] tracking-widest">
                01010011 01010100 01010010 01000001 01010100 01000101 01000111 01011001
              </text>
            </g>

            {/* Australia to Vietnam Geodesic Connection Arc (Strategy Bridge) */}
            <g transform="translate(300, 2350)">
              {/* Simplified geographic trajectory curve */}
              <path
                d="M 120 180 C 350 40 550 50 780 120"
                fill="none"
                stroke="#003527"
                strokeOpacity="0.08"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              {/* Melbourne Anchor Point */}
              <g transform="translate(120, 180)">
                <circle cx="0" cy="0" r="5" fill="#003527" fillOpacity="0.1" stroke="#003527" strokeOpacity="0.16" strokeWidth="1" />
                <text x="-12" y="16" fill="#003527" fillOpacity="0.12" className="font-mono text-[8px] font-bold">MELBOURNE (37.8°S, 144.9°E)</text>
                <text x="-12" y="28" fill="#003527" fillOpacity="0.08" className="font-mono text-[7px]">RMIT University Alumnus</text>
              </g>

              {/* Vietnam Anchor Point */}
              <g transform="translate(780, 120)">
                <circle cx="0" cy="0" r="5" fill="#10b981" fillOpacity="0.15" stroke="#003527" strokeOpacity="0.16" strokeWidth="1" />
                <text x="12" y="4" fill="#003527" fillOpacity="0.12" className="font-mono text-[8px] font-bold">VIETNAM (10.8°N, 106.6°E)</text>
                <text x="12" y="16" fill="#003527" fillOpacity="0.08" className="font-mono text-[7px]">Leadership & Strategic Advisory</text>
              </g>

              <text x="450" y="80" textAnchor="middle" fill="#003527" fillOpacity="0.09" className="font-mono text-[8px]">
                INTERNATIONAL CORRIDOR: 6,720 KM // TECHNOLOGY & MANAGEMENT BRIDGE
              </text>
            </g>
          </g>

          {/* -------------------------------------------------------------
              VÙNG 4: VẬN HÀNH & BLUEPRINT (2750px - 3750px)
              Isometric Blueprint, Electronic Components, Measuring Calipers & ISO Seal
              ------------------------------------------------------------- */}
          <g id="region-blueprint-operations">
            {/* Isometric Perspective Grid Plane */}
            <g stroke="#003527" strokeOpacity="0.06" strokeWidth="0.8" fill="none">
              {/* Isometric grid lines 30-deg angles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`iso-left-${i}`}
                  x1={200 + i * 80}
                  y1="2850"
                  x2={500 + i * 80}
                  y2="3200"
                  strokeDasharray="4 4"
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`iso-right-${i}`}
                  x1={800 - i * 80}
                  y1="2850"
                  x2={500 - i * 80}
                  y2="3200"
                  strokeDasharray="4 4"
                />
              ))}
            </g>

            {/* Isometric Server Rack / Facility Module Wireframe */}
            <g transform="translate(680, 2980)" stroke="#003527" strokeOpacity="0.1" strokeWidth="1" fill="none">
              {/* Top face */}
              <polygon points="0,-40 70,-75 0,-110 -70,-75" fill="#003527" fillOpacity="0.02" />
              {/* Left face */}
              <polygon points="0,-40 -70,-75 -70,35 0,70" fill="#003527" fillOpacity="0.03" />
              {/* Right face */}
              <polygon points="0,-40 70,-75 70,35 0,70" fill="#10b981" fillOpacity="0.02" />
              {/* Server chassis slots */}
              <line x1="0" y1="-15" x2="70" y2="-50" strokeDasharray="3 2" />
              <line x1="0" y1="10" x2="70" y2="-25" strokeDasharray="3 2" />
              <line x1="0" y1="35" x2="70" y2="0" strokeDasharray="3 2" />
            </g>

            {/* Electronics Schematic Symbols (Resistor, Capacitor, IC Pinout, Dipole Antenna) */}
            {/* 1. IC Schematic (Center Left) */}
            <g transform="translate(220, 3280)">
              <rect x="-35" y="-25" width="70" height="50" fill="#003527" fillOpacity="0.03" stroke="#003527" strokeOpacity="0.11" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#003527" fillOpacity="0.13" className="font-mono text-[7px] font-bold">MCU_SOC_32</text>
              {/* IC Pins */}
              {[-16, -8, 0, 8, 16].map((offset, idx) => (
                <g key={`pin-${idx}`}>
                  <line x1="-45" y1={offset} x2="-35" y2={offset} stroke="#003527" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="35" y1={offset} x2="45" y2={offset} stroke="#003527" strokeOpacity="0.1" strokeWidth="1" />
                </g>
              ))}
            </g>

            {/* 2. Resistor & Capacitor Schematic Symbols (Center) */}
            <g transform="translate(480, 3380)" stroke="#003527" strokeOpacity="0.1" strokeWidth="1" fill="none">
              {/* Resistor (Zig-zag) */}
              <path d="M 0 0 L 20 0 L 25 -10 L 35 10 L 45 -10 L 55 10 L 60 0 L 80 0" />
              <text x="40" y="-14" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7px]">R1: 4.7kΩ</text>

              {/* Capacitor (Parallel plates) */}
              <line x1="120" y1="0" x2="145" y2="0" />
              <line x1="145" y1="-15" x2="145" y2="15" />
              <line x1="155" y1="-15" x2="155" y2="15" />
              <line x1="155" y1="0" x2="180" y2="0" />
              <text x="150" y="-18" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7px]">C3: 100nF</text>
            </g>

            {/* 3. Dipole Antenna Symbol */}
            <g transform="translate(860, 3350)" stroke="#003527" strokeOpacity="0.1" strokeWidth="1" fill="none">
              <line x1="0" y1="0" x2="0" y2="-30" />
              <line x1="-15" y1="-30" x2="15" y2="-30" />
              <line x1="-15" y1="-30" x2="0" y2="-18" />
              <line x1="15" y1="-30" x2="0" y2="-18" />
              <text x="0" y="14" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7px]">ANT: 868MHz</text>
            </g>

            {/* Technical Caliper Dimension Leaders */}
            <g transform="translate(1000, 3180)" stroke="#003527" strokeOpacity="0.08" strokeWidth="0.8" fill="none">
              <line x1="0" y1="0" x2="180" y2="0" />
              <line x1="0" y1="-10" x2="0" y2="10" />
              <line x1="180" y1="-10" x2="180" y2="10" />
              <text x="90" y="-6" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[8px]">
                ↔ 482.6 mm [STANDARD 19&quot; SPEC]
              </text>
            </g>

            {/* ISO Quality Approval Stamp / Seal (Faint watermark) */}
            <g transform="translate(1260, 3380)">
              <circle cx="0" cy="0" r="54" fill="none" stroke="#003527" strokeOpacity="0.08" strokeWidth="1.2" strokeDasharray="4 2" />
              <circle cx="0" cy="0" r="46" fill="none" stroke="#003527" strokeOpacity="0.07" strokeWidth="0.8" />
              <text x="0" y="-22" textAnchor="middle" fill="#003527" fillOpacity="0.1" className="font-mono text-[7px] font-bold">TECHNICAL AUDIT</text>
              <text x="0" y="0" textAnchor="middle" fill="#003527" fillOpacity="0.14" className="font-mono text-[10px] font-extrabold">ISO 9001</text>
              <text x="0" y="12" textAnchor="middle" fill="#003527" fillOpacity="0.09" className="font-mono text-[6.5px]">OPERATIONS COMPLIANT</text>
              <text x="0" y="28" textAnchor="middle" fill="#003527" fillOpacity="0.08" className="font-mono text-[6px]">VERIFIED 2026</text>
            </g>
          </g>

          {/* -------------------------------------------------------------
              VÙNG 5: LÃNH ĐẠO & TRÍ TUỆ NHÂN TẠO (3750px - 5000px)
              Mạng Neural Đa Tầng (Deep Learning MLP) & Ký Hiệu Toán Học
              ------------------------------------------------------------- */}
          <g id="region-ai-neural-net">
            {/* Horizontal Multilayer Neural Network Architecture */}
            <g transform="translate(200, 4100)">
              {/* Layer 1: Input (4 nodes) */}
              {/* Layer 2: Hidden 1 (6 nodes) */}
              {/* Layer 3: Hidden 2 (6 nodes) */}
              {/* Layer 4: Output (3 nodes) */}
              {(() => {
                const layers = [
                  { x: 0, nodes: [-90, -30, 30, 90], label: 'INPUT: X' },
                  { x: 260, nodes: [-125, -75, -25, 25, 75, 125], label: 'DENSE_H1' },
                  { x: 540, nodes: [-125, -75, -25, 25, 75, 125], label: 'DENSE_H2' },
                  { x: 800, nodes: [-60, 0, 60], label: 'STRATEGY_OUT' },
                ];

                const lines: React.ReactNode[] = [];
                for (let l = 0; l < layers.length - 1; l++) {
                  const currentLayer = layers[l];
                  const nextLayer = layers[l + 1];
                  currentLayer.nodes.forEach((y1, i) => {
                    nextLayer.nodes.forEach((y2, j) => {
                      const isHighlighted = (i + j) % 4 === 0;
                      lines.push(
                        <line
                          key={`synapse-${l}-${i}-${j}`}
                          x1={currentLayer.x}
                          y1={y1}
                          x2={nextLayer.x}
                          y2={y2}
                          stroke={isHighlighted ? 'url(#neural-flow)' : '#003527'}
                          strokeOpacity={isHighlighted ? 0.12 : 0.04}
                          strokeWidth={isHighlighted ? 1.2 : 0.6}
                        />
                      );
                    });
                  });
                }

                return (
                  <>
                    {/* Synaptic Weights */}
                    <g>{lines}</g>
                    {/* Neural Nodes */}
                    {layers.map((layer, lIdx) => (
                      <g key={`layer-${lIdx}`}>
                        <text
                          x={layer.x}
                          y={165}
                          textAnchor="middle"
                          fill="#003527"
                          fillOpacity="0.12"
                          className="font-mono text-[8px] font-bold"
                        >
                          {layer.label}
                        </text>
                        {layer.nodes.map((nodeY, nIdx) => (
                          <g key={`node-${lIdx}-${nIdx}`} transform={`translate(${layer.x}, ${nodeY})`}>
                            <circle
                              cx="0"
                              cy="0"
                              r={6}
                              fill="#003527"
                              fillOpacity={lIdx === 3 ? 0.18 : 0.08}
                              stroke="#10b981"
                              strokeOpacity={0.15}
                              strokeWidth="1"
                            />
                            <circle cx="0" cy="0" r="2.5" fill="#10b981" fillOpacity="0.18" />
                          </g>
                        ))}
                      </g>
                    ))}
                  </>
                );
              })()}
            </g>

            {/* Subtle Mathematical Notations Floating in Background */}
            <g fill="#003527" fillOpacity="0.08" className="font-mono text-[10px]">
              <text x="150" y="4420">f(x) = σ(Wᵀ · x + b)</text>
              <text x="560" y="4440">∇L_θ = E[∇ log p_θ(y|x)]</text>
              <text x="960" y="4380">Attention(Q, K, V) = softmax((Q Kᵀ) / √d_k) · V</text>
              <text x="220" y="4560">∑ᵢ₌₁ⁿ wᵢ · xᵢ + b ≥ 0</text>
              <text x="740" y="4580">∂L / ∂wᵢⱼ = δⱼ · aᵢ</text>
              <text x="1150" y="4520">[W] ∈ ℝ^(d_in × d_out)</text>
            </g>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          LỚP 3 — TRÊN CÙNG: HIỆU ỨNG KHÍ QUYỂN (Opacity 2-5%, Parallax 0.9x)
          Micro-particles trôi chậm, radial focal gradients, scan-line sweep, 2% noise film grain
          ========================================================================= */}
      {/* 3A: Floating Micro-Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* 3B: Strategic Radial Gradient Blooms (Placed behind key focal sections) */}
      <div
        className="absolute inset-0 w-full will-change-transform"
        style={{
          transform: layer3Transform,
          height: '5000px',
        }}
      >
        {/* Hero glow behind profile & headline */}
        <div
          className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full pointer-events-none blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.045) 0%, rgba(0, 53, 39, 0.02) 60%, transparent 100%)',
          }}
        />

        {/* Core focus glow */}
        <div
          className="absolute top-[1300px] left-[15%] w-[600px] h-[450px] rounded-full pointer-events-none blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 53, 39, 0.035) 0%, transparent 70%)',
          }}
        />

        {/* Operations blueprint glow */}
        <div
          className="absolute top-[3100px] right-[10%] w-[650px] h-[500px] rounded-full pointer-events-none blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.035) 0%, transparent 70%)',
          }}
        />

        {/* AI & Leadership neural glow */}
        <div
          className="absolute top-[4200px] left-[30%] w-[800px] h-[550px] rounded-full pointer-events-none blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 53, 39, 0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* 3C: Slow Scan-line Moving Beam (Sweeps vertically down the screen every 16s) */}
      <div className="absolute inset-x-0 h-[80px] pointer-events-none opacity-[0.03] animate-[tech-scanline_16s_linear_infinite] bg-gradient-to-b from-transparent via-[#10b981] to-transparent" />

      {/* 3D: 2% Analog Film Grain Noise Overlay across the entire page */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.022] mix-blend-overlay">
        <filter id="analog-film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#analog-film-grain)" />
      </svg>
    </div>
  );
};
