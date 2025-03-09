import { SlideContent } from "./type";

export const me: SlideContent[] = [
  {
    type: "Opener",
    title: "Welcome to My Blog",
    paragraph: "Explore my thoughts, insights, and projects.",
    subparagraph: "Use arrow keys or tap left/right to navigate slides.",
  },
  {
    type: "Para",
    title: "About Me",
    paragraph:
      "Hi! I'm a passionate developer who loves building things with JavaScript, Next.js, and AI.",
    links: [{ label: "More About Me", href: "/about/1" }],
  },
  {
    type: "ParaSideImage",
    title: "More About Me",
    paragraph: `I enjoy working on AI-powered apps, automation, and scalable web solutions."But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
    image: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
    links: [
      { label: "Visit My GitHub", href: "https://github.com/yourusername" },
    ],
  },
  {
    type: "ImagePara",
    title: "How to Stay Calm as a Parent",
    paragraph:
      "Parenting can be overwhelming, but small changes in mindset can help you stay calm and patient. Try these simple strategies:",
    image: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
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
  {
    type: "CodePara",
    title: "How to Write a Simple JavaScript",
    paragraph: "### ke men eBut in ceAt vero eosAt vero eos et accusamuset iusto odio dignissimos ```ducimus qui blanditiis praesentium voluptatum delen  hereeeee iti atque ```corrupti quos dolores et quas mo              .ma pains.",
    codeblocks: [
      `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
import { SlideContent } from "../type";

export function CodeParagraph({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full px-4">
      {/* Left Side: Description */}
      <div className="w-full md:w-3/5 p-4 text-lg font-medium text-center md:text-left">
        {content.paragraph}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/5 flex flex-col gap-4 p-4">
        {con
        * Left Side: Description */}
      <div className="w-full md:w-3/5 p-4 text-lg font-medium text-center md:text-left">
        {content.paragraph}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/5 flex flex-col gap-4 p-4">
        {con
        * Left Side: Description */}
      <div className="w-full md:w-3/5 p-4 text-lg font-medium text-center md:text-left">
        {content.paragraph}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/5 flex flex-col gap-4 p-4">
        {con
        * Left Side: Description */}
      <div className="w-full md:w-3/5 p-4 text-lg font-medium text-center md:text-left">
        {content.paragraph}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/5 flex flex-col gap-4 p-4">
        {con
        * Left Side: Description */}
      <div className="w-full md:w-3/5 p-4 text-lg font-medium text-center md:text-left">
        {content.paragraph}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/5 flex flex-col gap-4 p-4">
        {con
      </div>
    </div>
  );
}
      
      example();`,
    ],
    image: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
    links: [
      {
        label: "Learn More",
        href: "https://parentingwebsite.com/calm-parenting",
      },
    ],
  },
];
