import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import Angular from "@/assets/icons/angular.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import Python from "@/assets/icons/python.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import MapImage from "@/assets/images/Map2.jpg";
import smileMemoji from "@/assets/images/memoji-smile.png";
import Php from "@/assets/icons/php.svg";
import Next from "@/assets/icons/next.svg";
import Vue from "@/assets/icons/Vue.svg";
import Svelte from "@/assets/icons/svelte.svg";
import Node from "@/assets/icons/nodejs.svg";
import Sql from "@/assets/icons/sql.svg";
import CardHeader from "@/components/CardHeader";
import ToolboxItems from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolBoxItems = [
  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "HTML5",
    iconType: HTMLIcon,
  },
  {
    title: "CSS3",
    iconType: CSSIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "NEXT.JS",
    iconType: Next,
  },
  {
    title: "Angular",
    iconType: Angular,
  },
  {
    title: "Chrome",
    iconType: ChromeIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },

  {
    title: "VUE",
    iconType: Vue,
  },
  {
    title: "Svelte/SvelteKit",
    iconType: Svelte,
  },

  {
    title: "Node",
    iconType: Node,
  },
  {
    title: "Django",
    iconType: Python,
  },
  {
    title: "PHP",
    iconType: Php,
  },
  {
    title: "SQL",
    iconType: Sql,
  },
];
const hobbies = [
  // emoji: control+command+space
  {
    title: "Cooking",
    emoji: "🧑🏽‍🍳",
    left: "5%",
    top: "5%",
  },
  {
    title: "Literature",
    emoji: "📚",
    left: "50%",
    top: "5%",
  },
  {
    title: "football",
    emoji: "⚽️",
    left: "10%",
    top: "35%",
  },
  {
    title: "Foodie",
    emoji: "🍽️🏙️",
    left: "37%",
    top: "40%",
  },
  {
    title: "Music",
    emoji: "🎶",
    left: "70%",
    top: "45%",
  },
  {
    title: "Conversationalist",
    emoji: "🗣️",
    left: "5%",
    top: "65%",
  },
  {
    title: "cinephile",
    emoji: "🎞️",
    left: "45%",
    top: "77%",
  },
];

export const AboutSection = ({ id }: { id?: string }) => {
  const constraintRef = useRef(null);
  return (
    <div className="py-20 lg:py-28" id={id}>
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World "
          description="Learn More About Who I Am,What I Do and what Inspires Me"
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="MySelf"
                description="Explore the books shaping my perspective"
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools used to craft exceptional
              digital experiences"
                className=""
              />
              <ToolboxItems
                items={toolBoxItems}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                items={toolBoxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-3">
            {/*  the  beyond the code section */}
            <Card className="h-[320px] p-0 flex flex-col col-span-3 lg:col-span-2">
              <CardHeader
                title=">Beyond the Code"
                description=" Explore my interests and hobbies beyond the code world"
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            {/*  the map section */}
            <Card className="h-[320px] p-0 relative col-span-2 lg:col-span-1">
              <Image
                src={MapImage}
                alt="map"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileMemoji}
                  alt="smiling emoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
