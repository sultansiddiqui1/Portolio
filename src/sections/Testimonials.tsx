import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import grainImage from "@/assets/images/grain.jpg";
import Card from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Lars Hilsmann",
    position: "Senior Product Manager @ RIB IMS GmbH",
    text: "Sadiq demonstrated solid technical knowledge and consistently applied it effectively in practice. His strong analytical thinking and quick comprehension allowed him to find excellent solutions even in complex situations.",
    avatar: memojiAvatar1,
  },
  {
    name: "Volker Oldenburg",
    position: "CEO @ RIB IMS GmbH",
    text: "Sadiq was highly valued by everyone for his friendly and balanced nature. He was always helpful, respectful, and willing to put team needs ahead of personal interests when needed. His conduct toward supervisors, colleagues, and clients was consistently impeccable.",
    avatar: memojiAvatar2,
  },
  {
    name: "Savas Ziplies",
    position: "Technical Director @ NewBoxes GmbH",
    text: "Sadiq brought excellent technical knowledge to our team and consistently delivered high-quality work. He showed strong initiative, quickly grasped complex situations, and found effective solutions. His reliable, focused, and independent working style earned our full recognition.",
    avatar: memojiAvatar3,
  },
  {
    name: "Augusto Capece",
    position: "Prject Manager @ getCoding",
    text: "Sadiq supported our front-end team at getCoding, contributing to both a React-based website and an order fulfillment system built with Svelte. He worked with different UI technologies and integrated quickly into the team. We thank him for the cooperation and wish him all the best.",
    avatar: memojiAvatar4,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="A look into the past"
          title="What Employers Say About Me"
          description="Don't Just take my word for it. See what my employers have to say about me. Head over to my linkedin to read the whole reference letters."
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className=" flex flex-none gap-8 pr-8   animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[
              ...new Array(2).fill(0).map((_, index) => (
                <Fragment key={index}>
                  {testimonials.map((testimonial) => (
                    <Card
                      key={testimonial.name}
                      className="max-w-xs p-6 md:p-8 md:max-w-md hover:-rotate-3 duration-300"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-gray-700 inline-flex  items-center justify-center rounded-full flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="max-h-full"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-white/40">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-sm md:text-base md:mt-6">
                        {testimonial.text}
                      </p>
                    </Card>
                  ))}
                </Fragment>
              )),
            ]}
          </div>
        </div>
      </div>
    </div>
  );
};
