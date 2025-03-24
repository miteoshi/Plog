import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Para({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl text-left">
        <h2 className="text-3xl sm:text-4xl font-bold my-7">{content.title}</h2>
        <div className="prose text-base text-gray-400 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
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
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="!text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
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
        </div>
        {content.links && <SlideLinks links={content.links} />}
      </div>
    </div>
  );
}
