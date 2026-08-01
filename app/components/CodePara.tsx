import React from "react";
import ReactMarkdown from "react-markdown";
import { SlideLinks } from "./SideLinks";
import { SlideContent } from "../type";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function CodePara({ content }: { content: SlideContent }) {
  const hasMultipleCodeBlocks =
    content.codeblock && content.codeblock.length > 1;

  return (
    <div className="flex flex-col items-center min-h-full w-full py-12 px-4">
      <div className="my-auto w-full flex flex-col items-center gap-6">
      {/* Title and Image Section */}
      <div className="text-center w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>

        {content.image && (
          <div className="flex justify-center">
            <Image
              src={content.image}
              alt="GIF"
              width={400}
              height={250}
              priority
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Code Blocks Section */}
      <div className="max-w-5xl text-left w-full ">
        <div className="prose text-base sm:text-lg text-gray-500 leading-relaxed my-4 ">
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
                  <code className="bg-white/10 rounded-md px-1.5 py-0.5 text-sm !text-gray-300">
                    {children}
                  </code>
                );
              },
            }}
          >
            {content.paragraph}
          </ReactMarkdown>
        </div>
        {content.codeblock?.map((block, index) => (
          <div key={index} className="flex flex-col gap-4">
            {/* Paragraph (Full Width) */}
            <div className="  text-base sm:text-lg text-gray-500 leading-relaxed">
              <ReactMarkdown>{block.codeparagraph}</ReactMarkdown>
            </div>

            {/* Code Block (Full Width) */}
            {block.code && (
              <div 
                className="w-full mb-4 font-mono text-sm shadow-lg rounded-xl overflow-hidden"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(block.code).replace(/\n$/, "")}
                  language={block.language || "javascript"}
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(12px)',
                    padding: '1.25rem',
                    margin: 0,
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "70vh",
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SlideLinks always at the bottom */}
      <div className="w-full flex justify-center mt-8">
        {content.links && <SlideLinks links={content.links} />}
      </div>
      </div>
    </div>
  );
}
