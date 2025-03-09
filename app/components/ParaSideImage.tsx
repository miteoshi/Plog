import Image from "next/image";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";

export function ParaSideImage({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen p-6 gap-x-12 space-y-6 md:space-y-0">
      {/* Image on the right side */}
      {content.image && (
        <Image
          src={content.image}
          alt="Image"
          width={400}
          height={300}
          priority
          className="rounded-lg shadow-lg"
        />
      )}

      {/* Content on the left side */}
      <div className="max-w-2xl text-left text-base sm:text-lg text-gray-500 leading-relaxed">
        {/* Heading on top */}
        {content.title && (
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-200">
            {content.title}
          </h2>
        )}

        {/* Markdown Content */}
        <ReactMarkdown>{content.paragraph}</ReactMarkdown>

        {/* Links if available */}
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}
