export type SlideContent = {
  type: "Para" | "Opener" | "ParaSideImage" | "ImagePara" | "CodePara";
  title: string;
  paragraph: string;
  subparagraph?: string;
  list?: string[];
  codeblock?: { codeparagraph: string; code: string }[];
  image?: string;
  links?: { label: string; href: string }[];
};

// Define the type for the entire dataset
export type BlogsData = { [slug: string]: SlideContent[] };
