import { BlogsData } from "../type";

const MAIN_MENU = "Go to menu"
const MAIN_MENU_LINK = "/menu/1"

export const blogsData: BlogsData = {
  docker: [
    {
      type: "Opener",
      title: "Docker Love",
      paragraph: "Learn about isloation and depression",
      subparagraph: "Use arrow keys or tap left/right to navigate slides.",
      links: [{ label: MAIN_MENU, href: MAIN_MENU_LINK }],
    },
    {
      type: "Para",
      title: "First thing first",
      paragraph: `
  Docker is a tool which helps running programs in an isolated environment ie in a **container**.

  - Containers are isolated from each other. They can't see each other's processes or filesystem.
  - An image is build upon image layers which are commands to set container up.
  - ⁠An image can be reused and can be shared with push and can be used by pulling someone else's image.
  - An image is a blueprint on to which container will run. Like a skeleton


  You can give tage t, list with doc--- Hol up. too much info. Let's go easy on yo small ass.
`,
      // links: [{ label: "More About Me", href: "/about/1" }],
    },
    {
      type: "ParaSideImage",
      title: "But Why one will use docker in the first place",
      paragraph: `
  Cause it solves the crucial problem of :
  
  "It's is running on my machine. Why isn't it running on yours dumbass?".
`,
      image: "https://c.tenor.com/SGeVr5iFKREAAAAC/tenor.gif",
    },
    {
      type: "ImagePara",
      title: "So how do docker solves this problem?",
      paragraph: `
  When you use Docker, you're basically packing your app with everything it needs and putting it into a container. This container can then run anywhere, on any computer, without worrying about whether that computer has the right stuff installed.

  It’s like taking a portable video game console with all your games and not needing to install anything on other people's devices to play.
  
`,
      image: "https://c.tenor.com/FZqSyC5weE8AAAAC/tenor.gif",
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
          href: "https://c.tenor.com/yheo1GGu3FwAAAAd/tenor.gif",
        },
      ],
    },
    {
      type: "CodePara",
      title: "havne't you had enough? im still writing the blog",
      paragraph: `
  BLAH BLAH BALH

  - First
  - Second
  - Third
`,
      codeblocks: [
        `
    Here is an example of how to create a delay function in JavaScript using **Promises**:

    \`\`\`javascript
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function example() {
      console.log('Start');
      await delay(2000);
      console.log('After 2 seconds');
    }

    example();
    \`\`\`
  `,
      ],
      image: "https://c.tenor.com/QaDAVbWJYj0AAAAd/tenor.gif",
      links: [
        {
          label: "Learn More",
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
      ],
    },
  ],
  about: [
    {
      type: "Opener",
      title: "Plog",
      paragraph: "A minimalistic blog site.",
      subparagraph: "Use arrow keys or tap left/right to navigate slides.",
      links: [{ label: "Explore", href: MAIN_MENU_LINK }],
    },
    {
      type: "ParaSideImage",
      title: "About the Author",
      paragraph: `*Hey there!*  
I'm a _dumbass_ software engineer, who loves to learn.
You can use this platform to *post your learnings* or *share your projects*.  

Take care!  


Feel free to connect with me`,
      image: "https://c.tenor.com/JPNdFiad9C8AAAAC/tenor.gif",
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/piyush-j-oshi/",
        },
        { label: "Github", href: "https://github.com/miteoshi" },
      ],
    },
  ],
  menu: [
    {
      type: "Opener",
      title: "Docker Love",
      paragraph: "Learn about isloation and depression",
      subparagraph: "Use arrow keys or tap left/right to navigate slides.",
      links: [{ label: "Go through", href: "/docker/1" }],
    },
    {
      type: "Opener",
      title: "Plog: Minimal Blog",
      paragraph: "You're using it currently",
      subparagraph: "Use arrow keys or tap left/right to navigate slides.",
      links: [{ label: "Go through", href: "/about/1" }],
    },
  ],
};
