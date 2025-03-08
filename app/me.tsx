import { SlideContent } from "./type";

export const me: SlideContent[] = [
  {
    type: "SingleParagraph",
    title: "Welcome to My Blog",
    paragraph: "Explore my thoughts, insights, and projects.",
    subparagraph: "Use arrow keys or tap left/right to navigate slides.",
  },
  {
    type: "ParagraphList",
    title: "About Me",
    paragraph:
      "Hi! I'm a passionate developer who loves building things with JavaScript, Next.js, and AI.",
    list: [
      "🔹 Experienced in React, Next.js, and LangChain",
      "🔹 Previously worked in SAP ABAP, now exploring AI & web dev",
      "🔹 Building apps that solve real-world problems",
    ],
    links: [{ label: "More About Me", href: "/about/1" }],
  },
  {
    type: "ImageText",
    title: "More About Me",
    paragraph:
      "I enjoy working on AI-powered apps, automation, and scalable web solutions.",
    image: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
    links: [
      { label: "Visit My GitHub", href: "https://github.com/yourusername" },
    ],
  },
  {
    type: "GifParagraphList",
    title: "How to Stay Calm as a Parent",
    paragraph:
      "Parenting can be overwhelming, but small changes in mindset can help you stay calm and patient. Try these simple strategies:",
    gif: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
    list: [
      "Take deep breaths before reacting.",
      "Pause and count to five before responding.",
      "Use positive self-talk (e.g., 'I can handle this').",
      "Step away for a moment if needed.",
      "Remember: It’s okay to make mistakes.",
    ],
    links: [
      {
        label: "Learn More",
        href: "https://parentingwebsite.com/calm-parenting",
      },
    ],
  },
];
