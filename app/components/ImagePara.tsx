import Image from "next/image";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
export function ImagePara({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
      {content.image && (
        <Image
          src={content.image}
          alt="GIF"
          width={400}
          height={250}
          priority
          className="rounded-lg shadow-lg mt-5 object-cover"
        />
      )}
      <div className="prose max-w-5xl text-left mt-6 w-full text-base sm:text-lg text-gray-500 leading-relaxed">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="!text-gray-300">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="!text-gray-300">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="!text-gray-300 ">{children}</h3>
            ),
            h4: ({ children }) => (
              <h3 className="!text-gray-300 ">{children}</h3>
            ),
            h5: ({ children }) => (
              <h3 className="!text-gray-300 ">{children}</h3>
            ),
            h6: ({ children }) => (
              <h3 className="!text-gray-300 ">{children}</h3>
            ),
            thead: ({ children }) => (
              <thead className="!text-gray-300">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="!text-gray-300">{children}</th>
            ),
            a: ({ children }) => <a className="!text-blue-300">{children}</a>,
            strong: ({ children }) => (
              <strong className="!text-gray-300">{children}</strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="text-gray-300">{children}</blockquote>
            ),
            code: ({ children }) => (
              <code className="!text-gray-300">{children}</code>
            ),
          }}
        >
          {content.paragraph}
        </ReactMarkdown>

        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}