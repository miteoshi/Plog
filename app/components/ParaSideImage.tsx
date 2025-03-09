import Image from "next/image";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
export function ParaSideImage({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen p-6 gap-x-12 space-y-6 md:space-y-0">
      <Image
        src={content.image || "https://via.placeholder.com/500"}
        alt="Image"
        width={400}
        height={300}
        priority
        className="rounded-lg shadow-lg"
      />
      <div className="max-w-2xl text-left text-base sm:text-lg text-gray-500 leading-relaxed">
        <ReactMarkdown>{content.paragraph}</ReactMarkdown>
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}