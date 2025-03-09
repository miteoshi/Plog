import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";

export function Opener({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-xl text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
          {content.title}
        </h2>
        <p className="text-md sm:text-xl text-gray-400">{content.paragraph}</p>
        <p className="text-sm sm:text-sm text-gray-500 mt-5">
          {content.subparagraph}
        </p>
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}
