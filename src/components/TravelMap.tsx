'use client';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const COUNTRY_COLOR: Record<string, string> = {
  Nepal:          '#6ee7b7',
  India:          '#fbbf24',
  Germany:        '#60a5fa',
  Netherlands:    '#f97316',
  France:         '#a78bfa',
  Spain:          '#f43f5e',
  'Vatican City': '#fde68a',
  Italy:          '#34d399',
  Austria:        '#fb923c',
  Denmark:        '#e879f9',
  Luxembourg:     '#818cf8',
};

const cities: {
  name: string; country: string; coords: [number, number]; home?: boolean; current?: boolean;
}[] = [
  { name: 'Kathmandu',      country: 'Nepal',        coords: [27.7172,  85.3240], home: true },
  { name: 'Pokhara',        country: 'Nepal',        coords: [28.2096,  83.9856] },
  { name: 'Chitwan',        country: 'Nepal',        coords: [27.5291,  84.3542] },
  { name: 'Lumbini',        country: 'Nepal',        coords: [27.4833,  83.2769] },
  { name: 'Nepalgunj',      country: 'Nepal',        coords: [28.0500,  81.6167] },
  { name: 'Delhi',          country: 'India',        coords: [28.6139,  77.2090] },
  { name: 'Agra',           country: 'India',        coords: [27.1767,  78.0081] },
  { name: 'Lucknow',        country: 'India',        coords: [26.8467,  80.9462] },
  { name: 'Berlin',         country: 'Germany',      coords: [52.5200,  13.4050], current: true },
  { name: 'Hamburg',        country: 'Germany',      coords: [53.5511,   9.9937] },
  { name: 'Bremen',         country: 'Germany',      coords: [53.0793,   8.8017] },
  { name: 'Hannover',       country: 'Germany',      coords: [52.3759,   9.7320] },
  { name: 'Bielefeld',      country: 'Germany',      coords: [52.0302,   8.5325] },
  { name: 'Dortmund',       country: 'Germany',      coords: [51.5136,   7.4653] },
  { name: 'Dinslaken',      country: 'Germany',      coords: [51.5660,   6.7298] },
  { name: 'Duisburg',       country: 'Germany',      coords: [51.4344,   6.7623] },
  { name: 'Düsseldorf',     country: 'Germany',      coords: [51.2217,   6.7762] },
  { name: 'Cologne',        country: 'Germany',      coords: [50.9333,   6.9500] },
  { name: 'Bonn',           country: 'Germany',      coords: [50.7374,   7.0982] },
  { name: 'Aachen',         country: 'Germany',      coords: [50.7753,   6.0839] },
  { name: 'Trier',          country: 'Germany',      coords: [49.7492,   6.6371] },
  { name: 'Potsdam',        country: 'Germany',      coords: [52.3906,  13.0645] },
  { name: 'Amsterdam',      country: 'Netherlands',  coords: [52.3676,   4.9041] },
  { name: 'Paris',          country: 'France',       coords: [48.8566,   2.3522] },
  { name: 'Bordeaux',       country: 'France',       coords: [44.8378,  -0.5792] },
  { name: 'Mallorca',       country: 'Spain',        coords: [39.6953,   3.0176] },
  { name: 'Barcelona',      country: 'Spain',        coords: [41.3851,   2.1734] },
  { name: 'Madrid',         country: 'Spain',        coords: [40.4168,  -3.7038] },
  { name: 'Vatican City',   country: 'Vatican City', coords: [41.9029,  12.4534] },
  { name: 'Rome',           country: 'Italy',        coords: [41.9028,  12.4964] },
  { name: 'Vienna',         country: 'Austria',      coords: [48.2082,  16.3738] },
  { name: 'Salzburg',       country: 'Austria',      coords: [47.8095,  13.0550] },
  { name: 'Copenhagen',     country: 'Denmark',      coords: [55.6761,  12.5683] },
  { name: 'Luxembourg City',country: 'Luxembourg',   coords: [49.6116,   6.1319] },
];

// Arcs to draw: [from coords, to coords, color]
const ARCS: [[number,number],[number,number],string][] = [
  // The big journey
  [[27.7172, 85.3240], [28.6139, 77.2090], '#fbbf24'],  // Kathmandu → Delhi
  [[28.6139, 77.2090], [52.5200, 13.4050], '#6ee7b7'],  // Delhi → Berlin
  // From Berlin outward
  [[52.5200, 13.4050], [52.3676,  4.9041], '#f97316'],  // Berlin → Amsterdam
  [[52.5200, 13.4050], [48.8566,  2.3522], '#a78bfa'],  // Berlin → Paris
  [[52.5200, 13.4050], [55.6761, 12.5683], '#e879f9'],  // Berlin → Copenhagen
  [[52.5200, 13.4050], [48.2082, 16.3738], '#fb923c'],  // Berlin → Vienna
  [[52.5200, 13.4050], [41.9028, 12.4964], '#34d399'],  // Berlin → Rome
  [[52.5200, 13.4050], [41.3851,  2.1734], '#f43f5e'],  // Berlin → Barcelona
  [[52.5200, 13.4050], [49.6116,  6.1319], '#818cf8'],  // Berlin → Luxembourg
  [[52.5200, 13.4050], [44.8378, -0.5792], '#a78bfa'],  // Berlin → Bordeaux
];

function greatCircleArc(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
  steps = 80,
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const φ1 = toRad(lat1), λ1 = toRad(lng1);
  const φ2 = toRad(lat2), λ2 = toRad(lng2);
  const x1 = Math.cos(φ1)*Math.cos(λ1), y1 = Math.cos(φ1)*Math.sin(λ1), z1 = Math.sin(φ1);
  const x2 = Math.cos(φ2)*Math.cos(λ2), y2 = Math.cos(φ2)*Math.sin(λ2), z2 = Math.sin(φ2);
  const dot = x1*x2+y1*y2+z1*z2;
  const omega = Math.acos(Math.min(1, Math.max(-1, dot)));
  const sinΩ  = Math.sin(omega);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    let xi, yi, zi;
    if (sinΩ < 0.001) {
      xi = x1+t*(x2-x1); yi = y1+t*(y2-y1); zi = z1+t*(z2-z1);
    } else {
      const a = Math.sin((1-t)*omega)/sinΩ, b = Math.sin(t*omega)/sinΩ;
      xi = a*x1+b*x2; yi = a*y1+b*y2; zi = a*z1+b*z2;
    }
    return [toDeg(Math.atan2(zi, Math.sqrt(xi*xi+yi*yi))), toDeg(Math.atan2(yi, xi))] as [number,number];
  });
}

function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(timer); }
      else setCount(n);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}</>;
}

const STATS = [
  { value: 11, label: 'Countries'  },
  { value: 34, label: 'Cities'     },
  { value: 3,  label: 'Continents' },
];

export default function TravelMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let map: any;

    import('leaflet').then((L) => {
      if (!ref.current) return;

      map = L.map(ref.current, {
        zoomControl: false, attributionControl: false,
        dragging: true, scrollWheelZoom: false, doubleClickZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 20,
      }).addTo(map);

      const bounds = L.latLngBounds(cities.map((c) => c.coords));
      map.fitBounds(bounds, { padding: [56, 56] });

      // ── Drop pins ──────────────────────────────────────────────────────────
      const ordered = [
        ...cities.filter((c) => c.home),
        ...cities.filter((c) => !c.home && !c.current),
        ...cities.filter((c) => c.current),
      ];

      ordered.forEach((city, i) => {
        setTimeout(() => {
          if (!map) return;
          const color   = COUNTRY_COLOR[city.country] ?? '#94a3b8';
          const special = city.home || city.current;
          const size    = special ? 16 : 9;
          const glow    = special ? 18 : 8;

          const pulse = special ? `
            <div style="position:absolute;inset:-6px;border-radius:50%;
              background:${color}33;animation:mapPulse 2s ease-out infinite;"></div>
            <div style="position:absolute;inset:-12px;border-radius:50%;
              background:${color}18;animation:mapPulse 2s ease-out infinite .5s;"></div>` : '';

          const icon = L.divIcon({
            className: '',
            html: `<div style="position:relative;width:${size}px;height:${size}px;">
              ${pulse}
              <div style="position:absolute;inset:0;border-radius:50%;background:${color};
                box-shadow:0 0 ${glow}px ${color},0 0 ${glow*2}px ${color}55;
                ${special ? 'border:2px solid rgba(255,255,255,.8);' : ''}
                box-sizing:border-box;"></div>
            </div>`,
            iconSize:   [size, size] as [number, number],
            iconAnchor: [size / 2, size / 2] as [number, number],
          });

          L.marker(city.coords, { icon })
            .bindTooltip(
              `<strong style="color:#f9fafb">${city.name}</strong><br/>
               <span style="color:#9ca3af;font-size:10px;text-transform:uppercase;letter-spacing:.08em">${city.country}</span>`,
              { direction: 'top', offset: [0, -(size/2+6)], className: 'dark-tip' },
            )
            .addTo(map);

          // After all pins: draw arcs then show stats
          if (i === ordered.length - 1) {
            setTimeout(() => drawArcs(L, map, () => setReady(true)), 400);
          }
        }, i * 55);
      });
    });

    return () => { map?.remove(); };
  }, []);

  function drawArcs(L: any, map: any, onDone: () => void) {
    ARCS.forEach(([from, to, color], i) => {
      setTimeout(() => {
        const arcPoints = greatCircleArc(from, to, 80);
        const line = L.polyline(arcPoints, {
          color, weight: 1.2, opacity: 0, dashArray: '4 3',
        }).addTo(map);

        const pathEl = (line as any)._path as SVGPathElement | null;
        if (!pathEl) return;
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray  = `${len}`;
        pathEl.style.strokeDashoffset = `${len}`;
        pathEl.style.opacity = '1';

        // CSS transition to draw arc
        pathEl.style.transition = 'stroke-dashoffset 1.4s ease-in-out';
        requestAnimationFrame(() => {
          pathEl.style.strokeDashoffset = '0';
        });

        if (i === ARCS.length - 1) setTimeout(onDone, 1500);
      }, i * 200);
    });
  }

  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes mapPulse {
          0%   { transform:scale(1);   opacity:1; }
          100% { transform:scale(2.8); opacity:0; }
        }
        .leaflet-container { background:#0f172a; }
        .dark-tip {
          background:#1e293b !important;
          border:1px solid rgba(255,255,255,.08) !important;
          border-radius:8px !important;
          color:#f9fafb !important;
          font-size:12px !important;
          box-shadow:0 4px 24px rgba(0,0,0,.5) !important;
          padding:6px 10px !important;
        }
        .dark-tip::before { display:none; }
      `}</style>

      <div ref={ref} className="absolute inset-0" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, transparent 50%, #030712 100%)' }} />

      {/* Stats overlay */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                       flex gap-10 md:gap-16 transition-all duration-700
                       ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="font-serif text-3xl md:text-5xl text-emerald-300 leading-none">
              {ready ? <AnimatedCount target={value} /> : 0}
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
