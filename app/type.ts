export type SlideContent = {
  type:
  "Para"
  | "Opener"
  |"ParaSideImage"
  |"ImagePara"
  |"CodePara"
  title: string;
  paragraph: string;
  subparagraph?: string;
  list?: string[];
  codeblocks?:string[];
  image?: string;
  links?: { label: string; href: string }[];
};
