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
    paragraph: `I enjoy working on AI-powered apps, automation, and scalable web solutions."But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
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
  {
    type: "GifParagraphList",
    title: "How to Stay Calm as a Parent",
    paragraph:
      "Parenting can be overwhelming, but small changes in mindset can help you stay calm and patient. Try these simple strategies:At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    gif: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
    links: [
      {
        label: "Learn More",
        href: "https://parentingwebsite.com/calm-parenting",
      },
    ],
  },
];
