export type SlideContent = {
  type:
    | "SingleParagraph"
    | "ParagraphList"
    | "ImageText"
    | "GifParagraph"
    | "GifParagraphList";
  title: string;
  paragraph: string;
  subparagraph?: string;
  list?: string[];
  image?: string;
  gif?: string;
  links?: { label: string; href: string }[];
};
