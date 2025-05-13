import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/sultan-sadiq-husain-siddiqui/",
  },
  {
    title: "Xing",
    href: "https://www.xing.com/profile/Sultansadiqhusain_Siddiqui/web_profiles",
  },
  {
    title: "Github",
    href: "https://github.com/sultansiddiqui1",
  },
  // {
  //   title: "Instagram",
  //   href: "#",
  // },
];

export const Footer = () => {
  return (
    <footer className="relative  overflow-x-clip">
      {/* overflow x-cilp over hiddden  as the overflow hidden doesnt allow exopanding outside the footer as we want it in this case */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:linear-gradient(to_top,_black,_transparent)] -z-10"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2025. All rights reserved</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.title}
                target="_blank"
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
