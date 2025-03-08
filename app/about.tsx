import { SlideContent } from "./type";

export const about: SlideContent[] = [
  {
    type: "SingleParagraph",
    title: "About This Blog",
    paragraph:
      "This blog is a space where I share my learnings, projects, and technical insights.",
    
    links: [{ label: "Explore More", href: "/me/1" }],
  },
  {
    type: "GifParagraph",
    title: "Let's Connect!",
    paragraph: "Feel free to reach out if you want to collaborate!",
    gif: "/connect.gif",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
      { label: "Twitter", href: "https://twitter.com/yourhandle" },
    ],
  },
];
