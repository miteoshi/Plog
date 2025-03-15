export interface SlideLink {
  label: string;
  href: string;
}

export interface CodeBlock {
  codeparagraph: string;
  code: string;
}

export interface SlideContent {
  type: "Opener" | "Para" | "ParaSideImage" | "ImagePara" | "CodePara";
  title?: string;
  paragraph?: string;
  subparagraph?: string;
  image?: string;
  links?: SlideLink[];
  codeblock?: CodeBlock[];
  list?: string[];
}

export interface BlogsData {
  [key: string]: SlideContent[];
}

export interface BlogItem {
  key: string;
  data: BlogsData;
}