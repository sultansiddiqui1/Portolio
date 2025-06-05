import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckIcon from "@/assets/icons/check-circle.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up-right.svg";
import GrainImage from "@/assets/images/grain.jpg";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import Socially from "@/assets/images/Socially.png";
import Skate from "@/assets/images/Skate.png";
import Saas from "@/assets/images/SAAS.jpg";
import Puddle from "@/assets/images/Puddle.png";

const portfolioProjects = [
  {
    company: "PERSONAL PROJECT",
    year: "2025",
    title: "Subarbia – Interactive Skateboard Builder",
    results: [
      {
        title:
          "Developed a real-time 3D skateboard configurator using Three.js and React Three Fiber.",
      },
      {
        title:
          "Used React Three Fiber and GSAP for smooth transitions and camera animations in a skateboard design flow.",
      },
      {
        title:
          "Used Prismic CMS for modular content and Tailwind CSS for responsive design.",
      },
    ],
    link: "https://subarbia.netlify.app/",
    image: Skate,
    hosted: true,
  },
  {
    company: "PERSONAL PROJECT",
    year: "2025",
    title: "Socially – The Next-Gen Social Media App",
    results: [
      {
        title:
          "Built with Next.js App Router, Prisma, and Clerk for full-stack functionality",
      },
      {
        title:
          "Enables secure login, post creation, likes, comments & social interactions",
      },
      {
        title:
          "implements server actions, dynamic routes, and optimistic UI updates",
      },
    ],
    link: "https://socially-lovat-mu.vercel.app/",
    image: Socially,
    hosted: true,
  },
  {
    company: "PERSONAL PROJECT ",
    year: "2025",
    title: "SAAS AI Meal Plan Generator",
    results: [
      {
        title:
          "Personalized meal plans powered by AI Next.js 13, Server Components, and Prisma",
      },
      {
        title:
          "Secure Stripe payments and subscription billing with Clerk-based authentication",
      },
      {
        title:
          "Optimistic UI updates with React Query and real-time user feedback",
      },
    ],
    link: "https://github.com/sultansiddiqui1/SAAS-AI-Meal-Plan",
    image: Saas,
    hosted: false,
  },
  {
    company: "PERSONAL PROJECT",
    year: "2025",
    title: "Puddle",
    results: [
      {
        title:
          " a full-stack marketplace with user authentication, item listings, and in-app messaging",
      },
      {
        title:
          "Implemented dashboards, form validation, and a custom admin panel using Django",
      },
      {
        title:
          "Strengthened back-end development skills by building features with Django ORM and reusable views",
      },
    ],
    link: "https://github.com/sultansiddiqui1/Online-Marketplace",
    image: Puddle,
    hosted: false,
  },
];

export const ProjectsSection = ({ id }: { id?: string }) => {
  return (
    <section className="pb-16 lg:py-24" id={id}>
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="  See how i transformed concepts into engaging digital Experience"
        />

        <div className=" flex flex-col mt-10 md:mt-20 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className=" px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 pb-0 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex  gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:mt-5 md:text-4xl mt-2">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className=" flex flex-col gap-4 mt-4 md:mt-5 ">
                    {project.results.map((result) => (
                      <li
                        className="flex gap-2 text-sm md:text-base text-white/50"
                        key={result.title}
                      >
                        <CheckIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link} target="_blank">
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6  rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                      <span>
                        {project.hosted ? "Visit Live Site" : "Visit Github"}
                      </span>
                      <ArrowUpIcon className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none "
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
