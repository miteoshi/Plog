import Image from "next/image";
import { SlideContent } from "../type";
import ReactMarkdown from "react-markdown";
import { SlideLinks } from "./SideLinks";

export function CodePara({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full px-4">
      {/* Left Side: Description */}
      <div className="w-full md:w-2/4 p-5 ">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
        <div className="text-base sm:text-lg text-gray-400 leading-relaxed">
          <ReactMarkdown>{content.paragraph}</ReactMarkdown>
        </div>

        {content.image && (
          <Image
            src={content.image}
            alt="GIF"
            width={200}
            height={200}
            priority
            className="rounded-lg shadow-lg mt-5 object-cover"
          />
        )}
        {content.links && <SlideLinks links={content.links} />}
      </div>

      {/* Right Side: Code Blocks */}
      <div className="w-full md:w-2/4 flex flex-col gap-4 p-4">
        {content?.codeblocks?.map((code, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white p-5 rounded-lg font-mono text-sm w-full 
            overflow-x-auto max-h-[300px] overflow-y-auto"
          >
            <pre className="whitespace-pre-wrap break-words w-full">
              <code>{code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
