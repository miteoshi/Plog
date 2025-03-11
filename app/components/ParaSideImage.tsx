import Image from "next/image";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";

export function ParaSideImage({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row-reverse items-center justify-center min-h-screen p-6 gap-6">
      {/* Image on top for mobile & medium screens; right side for large screens */}
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

      {/* Content below image for mobile/medium screens, left for large screens */}
      <div className="max-w-2xl text-left text-base sm:text-lg text-gray-500 leading-relaxed">
        {content.title && (
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-200">
            {content.title}
          </h2>
        )}
        <ReactMarkdown>{content.paragraph}</ReactMarkdown>
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}

