'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CheckIcon from '@/assets/icons/check-circle.svg';
import ArrowUpIcon from '@/assets/icons/arrow-up-right.svg';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Socially from '@/assets/images/Socially.png';
import Skate from '@/assets/images/Skate.png';
import Saas from '@/assets/images/SAAS.jpg';
import Puddle from '@/assets/images/Puddle.png';

gsap.registerPlugin(ScrollTrigger);

const portfolioProjects = [
  {
    company: 'PERSONAL PROJECT',
    year: '2025',
    title: 'Subarbia – Interactive Skateboard Builder',
    results: [
      { title: 'Developed a real-time 3D skateboard configurator using Three.js and React Three Fiber.' },
      { title: 'Used React Three Fiber and GSAP for smooth transitions and camera animations in a skateboard design flow.' },
      { title: 'Used Prismic CMS for modular content and Tailwind CSS for responsive design.' },
    ],
    tech: ['Three.js', 'React Three Fiber', 'GSAP', 'Next.js', 'Prismic', 'Tailwind'],
    link: 'https://subarbia.netlify.app/',
    image: Skate,
    hosted: true,
  },
  {
    company: 'PERSONAL PROJECT',
    year: '2025',
    title: 'Socially – The Next-Gen Social Media App',
    results: [
      { title: 'Built with Next.js App Router, Prisma, and Clerk for full-stack functionality' },
      { title: 'Enables secure login, post creation, likes, comments & social interactions' },
      { title: 'Implements server actions, dynamic routes, and optimistic UI updates' },
    ],
    tech: ['Next.js', 'Prisma', 'Clerk', 'PostgreSQL', 'Tailwind'],
    link: 'https://socially-lovat-mu.vercel.app/',
    image: Socially,
    hosted: true,
  },
  {
    company: 'PERSONAL PROJECT',
    year: '2025',
    title: 'SAAS AI Meal Plan Generator',
    results: [
      { title: 'Personalized meal plans powered by AI — Next.js 13, Server Components, and Prisma' },
      { title: 'Secure Stripe payments and subscription billing with Clerk-based authentication' },
      { title: 'Optimistic UI updates with React Query and real-time user feedback' },
    ],
    tech: ['Next.js', 'OpenAI', 'Stripe', 'Prisma', 'React Query', 'Clerk'],
    link: 'https://github.com/sultansiddiqui1/SAAS-AI-Meal-Plan',
    image: Saas,
    hosted: false,
  },
  {
    company: 'PERSONAL PROJECT',
    year: '2025',
    title: 'Puddle – Full-Stack Marketplace',
    results: [
      { title: 'A full-stack marketplace with user authentication, item listings, and in-app messaging' },
      { title: 'Implemented dashboards, form validation, and a custom admin panel using Django' },
      { title: 'Strengthened back-end skills by building features with Django ORM and reusable views' },
    ],
    tech: ['Django', 'Python', 'PostgreSQL', 'Tailwind', 'HTML/CSS'],
    link: 'https://github.com/sultansiddiqui1/Online-Marketplace',
    image: Puddle,
    hosted: false,
  },
];

export const ProjectsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each card: text content animates up when card enters the viewport
      gsap.utils.toArray<HTMLElement>('[data-project-text]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Each project image: subtle parallax as you scroll through the card
      gsap.utils.toArray<HTMLElement>('[data-project-image]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('[data-project-card]') as Element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pb-16 lg:py-24" id={id} ref={sectionRef}>
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences"
        />

        <div className="flex flex-col mt-10 md:mt-20 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              data-project-card
              className="px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 pb-0 sticky"
              style={{ top: `calc(64px + ${projectIndex * 40}px)` }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                {/* Text column */}
                <div className="lg:pb-16" data-project-text>
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:mt-5 md:text-4xl mt-2">{project.title}</h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li className="flex gap-2 text-sm md:text-base text-white/50" key={result.title}>
                        <CheckIcon className="size-5 md:size-6 flex-shrink-0" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white/40 bg-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                      <span>{project.hosted ? 'Visit Live Site' : 'Visit Github'}</span>
                      <ArrowUpIcon className="size-4" />
                    </button>
                  </a>
                </div>

                {/* Image column */}
                <div className="relative overflow-hidden">
                  <Image
                    data-project-image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
