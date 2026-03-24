'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import gsap from 'gsap';

const KATHMANDU: [number, number] = [27.7172, 85.324];
const BERLIN: [number, number]    = [52.52,   13.405];

/** Great-circle arc points between two lat/lng coords */
function greatCircleArc(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
  steps = 100,
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
    return [
      toDeg(Math.atan2(zi, Math.sqrt(xi*xi+yi*yi))),
      toDeg(Math.atan2(yi, xi)),
    ] as [number, number];
  });
}

/** Compass bearing (degrees) from point A to point B */
function bearing([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const φ1 = toRad(lat1), φ2 = toRad(lat2), Δλ = toRad(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Pin icon — active = pulsing emerald, inactive = static grey.
 *  iconAnchor centres the 12px dot on the exact coordinate. */
function pinIcon(label: string, sublabel: string, active: boolean) {
  const dot = active
    ? `<div style="position:absolute;inset:0;border-radius:50%;background:#6ee7b7;opacity:.35;animation:kbping 1.8s ease-out infinite;"></div>
       <div style="position:absolute;inset:2px;border-radius:50%;background:#6ee7b7;box-shadow:0 0 8px #6ee7b7;"></div>`
    : `<div style="position:absolute;inset:2px;border-radius:50%;background:#9ca3af;"></div>`;
  return {
    className: '',
    html: `
      <div style="width:90px;text-align:center;pointer-events:none;">
        <div style="width:12px;height:12px;margin:0 auto;position:relative;">${dot}</div>
        <div style="margin-top:3px;font-size:9px;font-weight:700;letter-spacing:.08em;
                    color:${active ? '#111827' : '#6b7280'};white-space:nowrap;">${label}</div>
        <div style="font-size:8px;color:#9ca3af;white-space:nowrap;">${sublabel}</div>
      </div>`,
    iconSize:   [90, 40] as [number, number],
    iconAnchor: [45,  6] as [number, number], // centre of the 12px dot
  };
}

/** Plane SVG — points north (0°) so rotate(bearing) works directly */
const PLANE_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e3a5f">
    <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
  </svg>`;

export default function MapTile() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let map: any;
    let loopTween: gsap.core.Tween | null = null;

    import('leaflet').then((L) => {
      if (!containerRef.current) return;

      map = L.map(containerRef.current, {
        zoomControl: false, attributionControl: false,
        dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 20,
      }).addTo(map);

      map.fitBounds([KATHMANDU, BERLIN], { padding: [32, 32] });

      // City pins
      L.marker(KATHMANDU, { icon: L.divIcon(pinIcon('KATHMANDU', 'Originally from', false)) }).addTo(map);
      L.marker(BERLIN,    { icon: L.divIcon(pinIcon('BERLIN',    'Based in',         true))  }).addTo(map);

      // Arc polyline
      const arcPoints = greatCircleArc(KATHMANDU, BERLIN, 100);
      const polyline  = L.polyline(arcPoints, { color: '#6ee7b7', weight: 1.5, opacity: 0 }).addTo(map);

      // Plane marker — unique id so we can update its rotation directly
      const planeId = `plane-${Math.random().toString(36).slice(2)}`;
      const planeMarker = L.marker(KATHMANDU, {
        icon: L.divIcon({
          className: '',
          html: `<div id="${planeId}" style="transform-origin:center;transform:rotate(0deg);">${PLANE_SVG}</div>`,
          iconSize:   [18, 18],
          iconAnchor: [9,  9],
        }),
        zIndexOffset: 1000,
      }).addTo(map);

      const getPlaneEl = () => document.getElementById(planeId);

      // Animate plane along arc, looping indefinitely
      const animatePlane = () => {
        const progress = { t: 0 };
        planeMarker.setLatLng(arcPoints[0]);

        loopTween = gsap.to(progress, {
          t: 1,
          duration: 5,
          ease: 'power1.inOut',
          onUpdate() {
            const raw = progress.t * (arcPoints.length - 1);
            const idx     = Math.min(Math.floor(raw), arcPoints.length - 1);
            const nextIdx = Math.min(idx + 1, arcPoints.length - 1);

            planeMarker.setLatLng(arcPoints[idx]);

            const el = getPlaneEl();
            if (el && idx < arcPoints.length - 1) {
              const b = bearing(arcPoints[idx], arcPoints[nextIdx]);
              el.style.transform = `rotate(${b}deg)`;
            }
          },
          onComplete() {
            // Pause at Berlin, then loop
            gsap.delayedCall(1.2, animatePlane);
          },
        });
      };

      // Draw arc first, then launch the plane
      setTimeout(() => {
        const pathEl = (polyline as any)._path as SVGPathElement | null;
        if (!pathEl) return;

        const length = pathEl.getTotalLength();
        pathEl.style.strokeDasharray  = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;
        pathEl.style.opacity          = '1';

        // Arc draws in sync with the first plane pass
        gsap.to(pathEl, { strokeDashoffset: 0, duration: 5, ease: 'power1.inOut', delay: 0.2 });
        gsap.delayedCall(0.2, animatePlane);
      }, 150);
    });

    return () => {
      loopTween?.kill();
      map?.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes kbping {
          0%   { transform: scale(1);   opacity: .35; }
          100% { transform: scale(3.5); opacity: 0;   }
        }
        .leaflet-container { background: #f8fafc; }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </>
  );
}
