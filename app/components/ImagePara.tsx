import Image from "next/image";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
export function ImagePara({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
      {content.image&&<Image
        src={
          content.image
        }
        alt="GIF"
        width={400}
        height={250}
        priority
        className="rounded-lg shadow-lg mt-5 object-cover"
      />}
      <div className="max-w-5xl text-left mt-6 w-full text-base sm:text-lg text-gray-500 leading-relaxed">
      
          <ReactMarkdown>{content.paragraph}</ReactMarkdown>
     
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}