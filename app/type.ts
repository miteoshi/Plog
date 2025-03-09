export type SlideContent = {
  type: "Para" | "Opener" | "ParaSideImage" | "ImagePara" | "CodePara" | "Menu";
  title: string;
  paragraph: string;
  subparagraph?: string;
  list?: string[];
  codeblocks?: string[];
  image?: string;
  links?: { label: string; href: string }[];
};

// Define the type for the entire dataset
export type BlogsData = { [slug: string]: SlideContent[] };
