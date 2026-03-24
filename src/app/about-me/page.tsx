"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { Header } from "@/sections/Header";

gsap.registerPlugin(ScrollTrigger);

const TravelMap = dynamic(() => import("@/components/TravelMap"), {
  ssr: false,
});

const PHOTOS = [
  { src: "/collage/IMG_1463.jpeg",  caption: "My people ❤️",        rotate: -3   },
  { src: "/collage/IMG_7253.jpeg",  caption: "Rome",                 rotate: 2    },
  { src: "/collage/IMG_7261.jpeg",  caption: "Trevi Fountain",       rotate: -1.5 },
  { src: "/collage/IMG_4611.jpeg",  caption: "The pilgrimage 👑",    rotate: 3    },
  { src: "/collage/IMG_7804.jpeg",  caption: "Salzburg",             rotate: -2.5 },
  { src: "/collage/IMG_6097.jpeg",  caption: "Amsterdam",            rotate: 1.5  },
  { src: "/collage/IMG_4218.jpeg",  caption: "Bhaktapur, Nepal",     rotate: -4   },
  { src: "/collage/IMG_5304.jpeg",  caption: "Berlin, always",       rotate: 2.5  },
  { src: "/collage/IMG_6522.jpeg",  caption: "Paris at night",       rotate: -2   },
  { src: "/collage/IMG_0343.jpeg",  caption: "Copenhagen",           rotate: 3.5  },
  { src: "/collage/IMG_0382.jpeg",  caption: "First Berlin snow",    rotate: -1   },
  { src: "/collage/IMG_6672.jpeg",  caption: "Sagrada Família",      rotate: 2    },
];

const TOPICS = [
  { label: "Real Madrid", thought: "I will debate this with you for hours." },
  { label: "Bollywood", thought: "The cinema of feelings, not logic." },
  { label: "Sufi music", thought: "For when code isn't enough." },
  { label: "Kathmandu", thought: "Where I learned what matters." },
  { label: "Berlin", thought: "Where I'm figuring out what's next." },
  {
    label: "The Lincoln Lawyer",
    thought: "The best show nobody talks about enough.",
  },
  { label: "Hosting dinners", thought: "My love language, honestly." },
  { label: "Nepali music", thought: "Sounds exactly like home." },
  { label: "Books", thought: "Recommend me something that made you feel." },
  { label: "Travel", thought: "I judge a city by its street food." },
  {
    label: "Thrillers",
    thought: "I love watching people think under pressure.",
  },
  { label: "Cooking", thought: "I cook to feed. There's a difference." },
];

export default function AboutMePage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main ref={mainRef} className="bg-gray-950 text-white">
        {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

          {/* Profile + polaroids scattered behind */}
          <div data-reveal className="relative flex items-center justify-center mb-12"
               style={{ width: "clamp(280px, 52vw, 420px)", height: "clamp(280px, 52vw, 420px)" }}>

            {/* 12 polaroids evenly on a circle behind the photo */}
            {[
              { ...PHOTOS[0],  top: "2%",   left: "50%"  },
              { ...PHOTOS[1],  top: "9%",   left: "74%"  },
              { ...PHOTOS[2],  top: "26%",  left: "92%"  },
              { ...PHOTOS[3],  top: "50%",  left: "98%"  },
              { ...PHOTOS[4],  top: "74%",  left: "92%"  },
              { ...PHOTOS[5],  top: "91%",  left: "74%"  },
              { ...PHOTOS[6],  top: "98%",  left: "50%"  },
              { ...PHOTOS[7],  top: "91%",  left: "26%"  },
              { ...PHOTOS[8],  top: "74%",  left: "8%"   },
              { ...PHOTOS[9],  top: "50%",  left: "2%"   },
              { ...PHOTOS[10], top: "26%",  left: "8%"   },
              { ...PHOTOS[11], top: "9%",   left: "26%"  },
            ].map((item) => (
              <motion.div
                key={item.src}
                className="absolute bg-white shadow-2xl cursor-default z-0"
                style={{
                  top: item.top,
                  left: item.left,
                  x: "-50%",
                  y: "-50%",
                  rotate: item.rotate,
                  width: "clamp(72px, 13vw, 106px)",
                  padding: "clamp(5px, 0.8vw, 8px)",
                }}
                whileHover={{ rotate: 0, scale: 1.18, zIndex: 5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="overflow-hidden w-full" style={{ height: "clamp(62px, 11vw, 90px)" }}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    width={106}
                    height={90}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}

            {/* Profile photo — on top */}
            <div className="relative z-10 w-[28%] aspect-square rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-4 ring-offset-gray-950 shadow-2xl flex-shrink-0">
              <Image
                src="/myself.jpeg"
                alt="Sadiq"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <p
            data-reveal
            className="text-emerald-300 font-semibold tracking-widest uppercase text-sm mb-6"
          >
            When I close VS Code
          </p>
          <h1
            data-reveal
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8"
          >
            Below is
            <br />
            the rest of me.
          </h1>
          <p data-reveal className="text-white/40 text-lg max-w-xs">
            Scroll. Find out who I am outside VSCode.
          </p>
        </section>

        {/* ── 2. TRAVEL ───────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col border-t border-white/5">
          <div className="h-screen w-full">
            <TravelMap />
          </div>

          {/* Legend */}
          <div className="px-6 pt-6 pb-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { color: "#6ee7b7", label: "Nepal" },
              { color: "#fbbf24", label: "India" },
              { color: "#60a5fa", label: "Germany" },
              { color: "#f97316", label: "Netherlands" },
              { color: "#a78bfa", label: "France" },
              { color: "#f43f5e", label: "Spain" },
              { color: "#34d399", label: "Italy" },
              { color: "#fb923c", label: "Austria" },
              { color: "#e879f9", label: "Denmark" },
              { color: "#818cf8", label: "Luxembourg" },
              { color: "#fde68a", label: "Vatican City" },
            ].map(({ color, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-white/40"
              >
                <span
                  style={{ background: color }}
                  className="inline-block size-2 rounded-full flex-shrink-0"
                />
                {label}
              </span>
            ))}
          </div>

          {/* Quote */}
          <div className="flex flex-col items-center text-center px-6 py-14">
            <blockquote
              data-reveal
              className="font-serif text-3xl md:text-5xl max-w-2xl leading-snug"
            >
              &ldquo;Every city I&apos;ve lived in has left something in me.{" "}
              <span className="text-emerald-300">Kathmandu left the most.</span>
              &rdquo;
            </blockquote>
          </div>
        </section>

        {/* ── 3. SPORTS ────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 py-24 overflow-hidden">
          <p data-reveal className="text-white/25 uppercase tracking-widest text-xs mb-16">
            Sports
          </p>

          {/* Mixed marquee — before the cards */}
          <div data-reveal className="w-full overflow-hidden mb-16">
            <div className="flex gap-10 animate-marquee whitespace-nowrap">
              {[
                "Hala Madrid", "5am sessions", "Ramos 93rd Minute", "It was clearly out",
                "Vinícius Jr.", "One more rep", "La Undécima 🏆", "Badminton (undefeated*)",
                "Bernabéu Nights", "Deadlifts", "Remontada Kings", "I was robbed",
              ].flatMap((m, i) => [
                <span key={i} className="text-white/20 text-xs uppercase tracking-widest font-semibold flex-shrink-0">{m}</span>,
                <span key={`d-${i}`} className="text-emerald-300/30 flex-shrink-0">·</span>,
              ])}
              {[
                "Hala Madrid", "5am sessions", "Ramos 93rd Minute", "It was clearly out",
                "Vinícius Jr.", "One more rep", "La Undécima 🏆", "Badminton (undefeated*)",
                "Bernabéu Nights", "Deadlifts", "Remontada Kings", "I was robbed",
              ].flatMap((m, i) => [
                <span key={`b-${i}`} className="text-white/20 text-xs uppercase tracking-widest font-semibold flex-shrink-0">{m}</span>,
                <span key={`bd-${i}`} className="text-emerald-300/30 flex-shrink-0">·</span>,
              ])}
            </div>
          </div>

          {/* Three pillars */}
          <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl w-full mb-16">
            {/* Real Madrid */}
            <div className="flex flex-col items-center px-8 py-10 border border-white/5 rounded-2xl md:rounded-r-none">
              <span className="text-white/20 uppercase tracking-widest text-xs mb-4">I watch</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-4">Real Madrid.</h2>
              <p className="text-white/40 text-base leading-relaxed max-w-xs">
                Not a phase. Not casual. I&apos;ve debated this club for hours with
                strangers. I will again.
              </p>
            </div>

            {/* Gym */}
            <div className="flex flex-col items-center px-8 py-10 border border-white/5 md:-ml-px">
              <span className="text-white/20 uppercase tracking-widest text-xs mb-4">I do</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-4">The gym.</h2>
              <p className="text-white/40 text-base leading-relaxed max-w-xs">
                Somewhere I go to not think about stuff — but always end up
                thinking about the most.
              </p>
            </div>

            {/* Badminton */}
            <div className="flex flex-col items-center px-8 py-10 border border-white/5 rounded-2xl md:rounded-l-none md:-ml-px">
              <span className="text-white/20 uppercase tracking-widest text-xs mb-4">I think I&apos;m better at than I am</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-4">Badminton.</h2>
              <p className="text-white/40 text-base leading-relaxed max-w-xs">
                Every loss is a fluke. Every win is proof. The delusion is part
                of the fun.
              </p>
            </div>
          </div>

          {/* Closing line */}
          <blockquote data-reveal className="font-serif text-2xl md:text-4xl max-w-xl leading-snug text-white/80">
            Two things that taught me what{" "}
            <span className="text-emerald-300">showing up</span>{" "}
            really means.
          </blockquote>
        </section>

        {/* ── 4. MUSIC ────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 py-24 overflow-hidden">
          <style>{`
            @keyframes vinylSpin { to { transform: rotate(360deg); } }
            @keyframes eqBounce {
              0%, 100% { transform: scaleY(0.15); }
              50%       { transform: scaleY(1); }
            }
            @keyframes moodDrift {
              0%, 100% { left: 18%; }
              50%       { left: 74%; }
            }
          `}</style>

          <p data-reveal className="text-white/25 uppercase tracking-widest text-xs mb-10">
            Music
          </p>

          {/* Vinyl + EQ bars */}
          <div data-reveal className="flex items-center justify-center gap-6 md:gap-10 mb-12 w-full max-w-2xl">

            {/* Left EQ bars */}
            <div className="flex items-end gap-[3px] h-24 flex-shrink-0">
              {[0.6,1,0.4,0.8,0.3,0.9,0.5,0.7,0.2,0.85].map((delay, i) => (
                <div key={i}
                  className="w-1 rounded-full origin-bottom"
                  style={{
                    background: `rgba(110,231,183,${0.3 + i * 0.05})`,
                    height: '100%',
                    animation: `eqBounce ${0.6 + delay * 0.6}s ease-in-out infinite`,
                    animationDelay: `${delay * 0.4}s`,
                  }}
                />
              ))}
            </div>

            {/* Vinyl record */}
            <div className="relative flex-shrink-0 w-44 h-44 md:w-56 md:h-56 rounded-full"
                 style={{ animation: 'vinylSpin 10s linear infinite' }}>
              {/* Grooves */}
              <div className="absolute inset-0 rounded-full" style={{
                background: `repeating-radial-gradient(circle at center,
                  #0d0d0d 0px, #1a1a1a 1.5px, #0d0d0d 3px)`
              }} />
              {/* Center label */}
              <div className="absolute inset-[28%] rounded-full flex items-center justify-center"
                   style={{ background: 'radial-gradient(circle, #065f46, #022c22)' }}>
                <div className="w-3 h-3 rounded-full bg-gray-950" />
              </div>
              {/* Shine */}
              <div className="absolute inset-0 rounded-full"
                   style={{ background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
            </div>

            {/* Right EQ bars */}
            <div className="flex items-end gap-[3px] h-24 flex-shrink-0">
              {[0.3,0.7,1,0.5,0.85,0.2,0.9,0.45,0.65,0.1].map((delay, i) => (
                <div key={i}
                  className="w-1 rounded-full origin-bottom"
                  style={{
                    background: `rgba(110,231,183,${0.3 + i * 0.05})`,
                    height: '100%',
                    animation: `eqBounce ${0.6 + delay * 0.6}s ease-in-out infinite`,
                    animationDelay: `${delay * 0.4}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Genre pills */}
          <div data-reveal className="flex flex-wrap justify-center gap-3 mb-12">
            {["Bollywood", "Sufi", "Nepali"].map((g) => (
              <span key={g}
                className="border border-emerald-300/30 text-emerald-300 px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase">
                {g}
              </span>
            ))}
            <span className="border border-white/10 text-white/40 px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase hover:border-white/25 hover:text-white/60 transition-colors duration-200 cursor-default">
              Dua Lipa
            </span>
          </div>

          {/* Headline */}
          <p data-reveal className="font-serif text-3xl md:text-5xl max-w-2xl leading-snug mb-14">
            People always think I&apos;m heartbroken{" "}
            <span className="text-white/35">when they hear my music.</span>
            <br />
            And in love{" "}
            <span className="text-white/35">when the next song plays.</span>
          </p>

          {/* Mood spectrum */}
          <div data-reveal className="w-full max-w-sm">
            <div className="relative h-1 rounded-full mb-3"
                 style={{ background: 'linear-gradient(to right, #818cf8, #ec4899)' }}>
              {/* Drifting dot */}
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/30"
                   style={{ animation: 'moodDrift 5s ease-in-out infinite' }} />
            </div>
            <div className="flex justify-between text-white/30 text-xs uppercase tracking-widest">
              <span>Heartbroken</span>
              <span>In love</span>
            </div>
          </div>
        </section>

        {/* ── 5. CINEMA ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 overflow-hidden">

          {/* Film grain */}
          <style>{`
            @keyframes grainShift {
              0%   { transform: translate(0%,0%); }
              10%  { transform: translate(-2%,-3%); }
              20%  { transform: translate(3%,1%); }
              30%  { transform: translate(-1%,4%); }
              40%  { transform: translate(4%,-2%); }
              50%  { transform: translate(-3%,2%); }
              60%  { transform: translate(2%,-3%); }
              70%  { transform: translate(-4%,1%); }
              80%  { transform: translate(3%,-1%); }
              90%  { transform: translate(-1%,3%); }
              100% { transform: translate(0%,0%); }
            }
          `}</style>
          <svg style={{ display: 'none' }}>
            <filter id="cinema-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>
          <div style={{
            position: 'absolute', inset: '-50%',
            width: '200%', height: '200%',
            filter: 'url(#cinema-grain)',
            opacity: 0.055,
            animation: 'grainShift 0.35s steps(1) infinite',
            pointerEvents: 'none',
          }} />

          <div className="relative z-10 flex flex-col items-center">
            <p data-reveal className="text-white/25 uppercase tracking-widest text-xs mb-8">
              Cinema
            </p>

            <h2 data-reveal className="font-serif text-4xl md:text-6xl leading-snug mb-14 max-w-2xl">
              Long days. Long weeks.
              <br />
              <span className="text-white/35">Sometimes all you need is the couch</span>
              <br />
              and something that keeps you on the edge of it.
            </h2>

            {/* Fake streaming card */}
            <motion.div
              data-reveal
              className="w-full max-w-xs text-left bg-gray-900/70 border border-white/8 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              {/* Thumbnail */}
              <div className="relative h-36 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="absolute inset-0 opacity-20"
                     style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)' }} />
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 ml-1"
                       style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '11px solid rgba(255,255,255,0.85)' }} />
                </div>
                <span className="absolute top-3 left-3 text-white/30 text-[9px] uppercase tracking-widest">Season 2</span>
                <span className="absolute top-3 right-3 text-emerald-300 text-[9px] uppercase tracking-widest">✓ In list</span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-white font-semibold text-sm mb-0.5">The Lincoln Lawyer</p>
                <p className="text-white/35 text-xs mb-3">S2 E8 · &ldquo;Cui Bono&rdquo;</p>

                {/* Progress */}
                <div className="h-px bg-white/10 rounded-full mb-1 relative">
                  <div className="absolute inset-y-0 left-0 w-[73%] bg-white rounded-full" />
                </div>
                <div className="flex justify-between text-white/25 text-[10px] mb-4">
                  <span>Last watched · Tuesday, 11:14 PM</span>
                  <span>27% left</span>
                </div>

                <div className="w-full bg-white text-gray-950 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  ▶ Resume
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 6. COOKING ──────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5 py-24">
          <style>{`
            @keyframes steamUp {
              0%   { transform: translateY(0px) scaleX(1); opacity: 0; }
              15%  { opacity: 0.3; }
              85%  { opacity: 0.08; }
              100% { transform: translateY(-64px) scaleX(1.6); opacity: 0; }
            }
          `}</style>

          <p data-reveal className="text-white/25 uppercase tracking-widest text-xs mb-10">
            Cooking
          </p>

          {/* Steam wisps — in normal flow above headline */}
          <div data-reveal className="flex items-end justify-center gap-3 mb-3 pointer-events-none" style={{ height: 56 }}>
            {[
              { delay: '0s',   dur: '2.2s', w: 7,  h: 40 },
              { delay: '0.5s', dur: '2.6s', w: 10, h: 52 },
              { delay: '0.9s', dur: '2s',   w: 6,  h: 34 },
              { delay: '0.2s', dur: '2.8s', w: 9,  h: 48 },
              { delay: '0.7s', dur: '2.4s', w: 6,  h: 36 },
            ].map((s, i) => (
              <div key={i} style={{
                width: s.w, height: s.h,
                borderRadius: '40%',
                background: 'rgba(255,255,255,0.45)',
                filter: 'blur(5px)',
                animation: `steamUp ${s.dur} ease-out infinite`,
                animationDelay: s.delay,
              }} />
            ))}
          </div>

          <h2 data-reveal className="font-serif text-5xl md:text-7xl leading-tight max-w-2xl mb-4">
            Worth every dish
            <br />
            <span className="text-white/35">I have to clean the next morning.</span>
          </h2>

          <p data-reveal className="text-white/50 text-lg max-w-md leading-relaxed mb-16">
            Cooking for people is the one thing I do where the output isn&apos;t
            for me at all. The mess stays. The feeling doesn&apos;t.
          </p>

          {/* Menu card + Seating chart */}
          <div data-reveal className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-3xl">

            {/* Restaurant menu card — fine dining */}
            <div className="relative w-full max-w-xs flex-shrink-0 rounded-2xl overflow-hidden"
                 style={{ background: 'linear-gradient(160deg, #0f2318 0%, #091a10 100%)',
                          border: '1px solid rgba(212,175,55,0.25)' }}>

              {/* Ornamental corner pieces */}
              {[
                'top-2 left-2 border-t border-l',
                'top-2 right-2 border-t border-r',
                'bottom-2 left-2 border-b border-l',
                'bottom-2 right-2 border-b border-r',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 ${cls}`}
                     style={{ borderColor: 'rgba(212,175,55,0.4)' }} />
              ))}

              <div className="px-8 py-8">
                {/* Header */}
                <div className="text-center mb-5">
                  {/* Gold ornament */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
                    <span style={{ color: 'rgba(212,175,55,0.7)', fontSize: 14 }}>✦</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
                  </div>
                  <p className="uppercase tracking-[.25em] text-[9px] mb-0.5"
                     style={{ color: 'rgba(212,175,55,0.6)' }}>Chef&apos;s Table</p>
                  <p className="text-[10px] italic" style={{ color: 'rgba(212,175,55,0.3)' }}>
                    Berlin · Est. whenever he has guests
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
                    <span style={{ color: 'rgba(212,175,55,0.7)', fontSize: 14 }}>✦</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.3)' }} />
                  </div>
                </div>

                {/* Dishes */}
                <div className="space-y-4">
                  {[
                    { name: 'Chicken Curry',  note: 'slow cooked, always too much — intentionally' },
                    { name: 'Paneer Masala',  note: 'for the ones who don\'t eat meat' },
                    { name: 'Dal',            note: 'the one that tastes like home' },
                    { name: 'Mutton',         note: 'only on special occasions. worth the wait' },
                    { name: 'Lentil Soup',    note: 'when it\'s cold and people need something warm' },
                  ].map((dish, i, arr) => (
                    <div key={dish.name}
                         className={`pb-4 ${i < arr.length - 1 ? 'border-b' : ''}`}
                         style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm" style={{ color: 'rgba(255,245,220,0.85)' }}>
                          {dish.name}
                        </span>
                        <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: 10 }}>✦</span>
                      </div>
                      <p className="text-[10px] italic mt-0.5" style={{ color: 'rgba(212,175,55,0.35)' }}>
                        {dish.note}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer ornament */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.2)' }} />
                  <span style={{ color: 'rgba(212,175,55,0.4)', fontSize: 10 }}>✦ ✦ ✦</span>
                  <div className="h-px flex-1" style={{ background: 'rgba(212,175,55,0.2)' }} />
                </div>
              </div>
            </div>

            {/* Dinner table seating chart */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <p className="text-white/20 text-[10px] uppercase tracking-widest">A usual Friday</p>
              <div className="relative" style={{ width: 300, height: 280 }}>
                {/* Table — centered, inset from the seat ellipse */}
                <div className="absolute rounded-full border border-white/10"
                     style={{ top: '22%', left: '22%', width: '56%', height: '56%',
                              background: 'rgba(255,255,255,0.02)' }} />

                {/* Seats */}
                {[
                  { label: 'Mum',      top: '4%',  left: '50%', color: '#6ee7b7' },
                  { label: 'Sister',   top: '12%', left: '78%', color: '#f43f5e' },
                  { label: 'Dad',      top: '35%', left: '94%', color: '#60a5fa' },
                  { label: 'Friend',   top: '65%', left: '90%', color: '#a78bfa' },
                  { label: 'Roommate', top: '88%', left: '70%', color: '#fbbf24' },
                  { label: 'You ✦',   top: '92%', left: '50%', color: '#6ee7b7' },
                  { label: 'Roommate', top: '88%', left: '30%', color: '#fbbf24' },
                  { label: 'Cousin',   top: '65%', left: '10%', color: '#f97316' },
                  { label: 'Friend',   top: '35%', left: '6%',  color: '#a78bfa' },
                  { label: 'Cousin',   top: '12%', left: '22%', color: '#f97316' },
                ].map((seat, i) => (
                  <div key={i} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                       style={{ top: seat.top, left: seat.left }}>
                    <div className="w-8 h-8 rounded-full border flex items-center justify-center mb-1"
                         style={{ borderColor: `${seat.color}40`, background: `${seat.color}10` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: seat.color }} />
                    </div>
                    <span className="text-white/30 text-[9px] whitespace-nowrap">{seat.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/15 text-[10px] italic">+cleaning up till 2am</p>
            </div>

          </div>
        </section>

        {/* ── 8. CONVERSATIONALIST ────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
          <p
            data-reveal
            className="text-white/25 uppercase tracking-widest text-xs mb-5"
          >
            Conversationalist
          </p>
          <h2
            data-reveal
            className="font-serif text-6xl md:text-8xl leading-tight mb-14"
          >
            I&apos;ll talk about
            <br />
            anything.
          </h2>

          <div
            data-reveal
            className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl"
          >
            {TOPICS.map((topic) => (
              <motion.div
                key={topic.label}
                className="relative group cursor-default"
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div
                  className="bg-white/5 hover:bg-emerald-300/10 border border-white/10
                                hover:border-emerald-300/40 px-4 py-2 rounded-full text-sm
                                text-white/50 hover:text-emerald-300 transition-all duration-200"
                >
                  {topic.label}
                </div>
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                                px-3 py-1.5 bg-gray-800 border border-white/10 rounded-lg
                                text-white text-xs whitespace-nowrap pointer-events-none
                                opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-xl"
                >
                  {topic.thought}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                </div>
              </motion.div>
            ))}
          </div>

          <p
            data-reveal
            className="text-white/35 text-lg mb-8 max-w-sm leading-relaxed"
          >
            Seriously — find me. I promise it&apos;ll be a good conversation.
          </p>
          <div data-reveal>
            <a
              href="https://www.linkedin.com/in/sultan-sadiq-husain-siddiqui/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4
                         rounded-xl font-semibold hover:bg-emerald-300 transition-colors duration-200"
            >
              Let&apos;s talk →
            </a>
          </div>
        </section>

        {/* ── footer ───────────────────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 px-8 py-8 text-white/20 text-sm flex justify-between">
          <span>Sadiq Siddiqui</span>
          <span>Kathmandu → Berlin</span>
        </footer>
      </main>
    </>
  );
}
