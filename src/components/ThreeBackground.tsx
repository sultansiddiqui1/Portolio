'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 100;
const SPREAD = 700;
const MAX_DIST = 130;
const MAX_SEGS = PARTICLE_COUNT * 15;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 1, 2000);
    camera.position.z = 500;

    const group = new THREE.Group();
    scene.add(group);

    // --- Particles ---
    const posArr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArr[i * 3]     = (Math.random() - 0.5) * SPREAD;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x6ee7b7, size: 2.5, transparent: true, opacity: 0.75 });
    group.add(new THREE.Points(pGeo, pMat));

    // --- Velocities ---
    const vel = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 0.28,
      y: (Math.random() - 0.5) * 0.28,
    }));

    // --- Connection lines ---
    const lArr = new Float32Array(MAX_SEGS * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(lArr, 3));
    const lMat = new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.13 });
    group.add(new THREE.LineSegments(lGeo, lMat));

    // --- Mouse parallax ---
    let targetX = 0, targetY = 0;
    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 50;
      targetY = (e.clientY / window.innerHeight - 0.5) * 50;
    };

    // --- Resize ---
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);

    // --- Animation loop ---
    const tick = () => {
      animId = requestAnimationFrame(tick);

      const pa = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pa[i * 3]     += vel[i].x;
        pa[i * 3 + 1] += vel[i].y;
        if (Math.abs(pa[i * 3])     > SPREAD / 2) vel[i].x *= -1;
        if (Math.abs(pa[i * 3 + 1]) > SPREAD / 2) vel[i].y *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Rebuild connection segments
      let seg = 0;
      const la = lGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT && seg < MAX_SEGS - 1; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && seg < MAX_SEGS - 1; j++) {
          const dx = pa[i * 3] - pa[j * 3];
          const dy = pa[i * 3 + 1] - pa[j * 3 + 1];
          if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) {
            la[seg*6]   = pa[i*3];   la[seg*6+1] = pa[i*3+1]; la[seg*6+2] = pa[i*3+2];
            la[seg*6+3] = pa[j*3];   la[seg*6+4] = pa[j*3+1]; la[seg*6+5] = pa[j*3+2];
            seg++;
          }
        }
      }
      for (let k = seg * 6; k < MAX_SEGS * 6; k++) la[k] = 0;
      lGeo.attributes.position.needsUpdate = true;
      lGeo.setDrawRange(0, seg * 2);

      // Smooth mouse parallax on the whole group
      group.rotation.y += (targetX * 0.0006 - group.rotation.y) * 0.04;
      group.rotation.x += (-targetY * 0.0006 - group.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
