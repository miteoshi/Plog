import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function Para({ content }: { content: SlideContent }) {
  return (
    <div className="flex flex-col items-center min-h-full py-12 px-6 w-full">
      <div className="my-auto max-w-5xl w-full text-left">
        <h2 className="text-3xl sm:text-4xl font-bold my-7">{content.title}</h2>
        <div className="prose prose-invert max-w-none text-base text-gray-400 leading-relaxed">
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
                <blockquote className="text-gray-300 border-l-4 border-gray-500 pl-4 italic">{children}</blockquote>
              ),
              pre: ({ children }) => <>{children}</>,
              code: ({ children, className, node, ...rest }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isBlock = String(children).includes("\n") || match;
                
                if (isBlock) {
                  return (
                    <div
                      className="w-full shadow-lg rounded-xl my-6 border border-white/5 overflow-hidden"
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match ? match[1] : "javascript"}
                        style={vscDarkPlus}
                        customStyle={{
                          background: "rgba(0, 0, 0, 0.4)",
                          backdropFilter: "blur(12px)",
                          padding: "1.25rem",
                          margin: 0,
                          overflowX: "auto",
                          overflowY: "auto",
                          maxHeight: "70vh"
                        }}
                      />
                    </div>
                  );
                }
                
                return (
                  <code {...rest} className="bg-white/10 rounded-md px-1.5 py-0.5 text-sm !text-gray-300">
                    {children}
                  </code>
                );
              },
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
