'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import memojiImage from '@/assets/images/memoji-computer.png';
import Image from 'next/image';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import grainImage from '@/assets/images/grain.jpg';
import HeroOrbit from '@/components/HeroOrbit';
import StarIcon from '@/assets/icons/star.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import gsap from 'gsap';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });

const HEADLINE = 'Building exceptional User Experiences and bringing ideas to life';

export const HeroSection = ({ id }: { id?: string }) => {
  const memojiRef  = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Memoji pops in
      gsap.fromTo(memojiRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Badge slides up
      gsap.fromTo(badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out' }
      );

      // Headline words cascade up
      gsap.fromTo('.hero-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.05, delay: 0.3, ease: 'power3.out' }
      );

      // Bio & CTAs fade in after headline
      gsap.fromTo(bioRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.9, ease: 'power2.out' }
      );
      gsap.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.05, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip" id={id}>

      {/* Three.js particle network — deepest layer */}
      <div className="absolute inset-0 -z-50 pointer-events-none">
        <ThreeBackground />
      </div>

      {/* Rings + orbiting elements (existing decorative layer) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
        }}
      >
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        />
        <div className="size-[620px] hero-ring" />
        <div className="size-[820px] hero-ring" />
        <div className="size-[1020px] hero-ring" />
        <div className="size-[1220px] hero-ring" />

        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
          <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-12 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={144} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={79} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
      </div>

      {/* Content */}
      <div className="container">
        <div className="flex flex-col items-center">
          <div ref={memojiRef}>
            <Image
              className="size-[100px]"
              src={memojiImage}
              alt="person peeking from behind computer"
            />
          </div>
          <div
            ref={badgeRef}
            className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg mt-4"
          >
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full" />
            </div>
            <div className="text-sm font-medium">Available for new Projects</div>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Split headline into individually-animated words */}
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide leading-tight">
            {HEADLINE.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p ref={bioRef} className="mt-4 text-center text-white/60 md:text-lg">
            My name is Sadiq Siddiqui. I specialize in transforming designs into
            functional, high-performing web applications. Let&apos;s discuss our next
            project. Connect with me on LinkedIn or send me a mail at
            sadiq.siddiqui1822@gmail.com
          </p>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4"
        >
          <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
            <span className="font-semibold">Explore My Work Below</span>
            <ArrowDown className="size-4" />
          </button>
          <button
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl"
            onClick={() =>
              window.open('https://www.linkedin.com/in/sultan-sadiq-husain-siddiqui/', '_blank')
            }
          >
            <span>👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
