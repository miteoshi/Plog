import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
export function Para({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl text-left">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
        <div className="text-base sm:text-md text-gray-500 leading-relaxed">
          <ReactMarkdown>{content.paragraph}</ReactMarkdown>
        </div>
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}
