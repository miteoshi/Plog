"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";

export function Opener({ content, allSlides }: { content: SlideContent, allSlides?: SlideContent[] }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname(); 
  const basePath = pathname.split("/").slice(0, -1).join("/"); 

  const topics = allSlides 
    ? allSlides.map((slide, index) => ({ ...slide, originalIndex: index + 1 }))
               .filter(slide => slide.type !== "Opener") 
    : [];

  const filteredTopics = search 
    ? topics.filter(topic => 
        topic.title?.toLowerCase().includes(search.toLowerCase()) || 
        (topic.paragraph && topic.paragraph.toLowerCase().includes(search.toLowerCase()))
      )
    : topics; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative w-full">
      
      {/* Floating Subtle Search */}
      {allSlides && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-[80%] md:w-64 max-w-sm z-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full bg-black/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:outline-none focus:ring-0 focus:border-white/10 focus:bg-white/10 transition-all backdrop-blur-md"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              onKeyDown={(e) => e.stopPropagation()}
            />
            
            {/* Dropdown Results */}
            {isFocused && (
              <div className="absolute top-full mt-2 left-0 w-full max-h-64 overflow-y-auto bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl scrollbar-hide py-2 flex flex-col z-50">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, idx) => (
                    <Link 
                      href={`${basePath}/${topic.originalIndex}`} 
                      key={idx} 
                      className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {topic.title || `Slide ${topic.originalIndex}`}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 italic">No topics found</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Opener Content */}
      <div className="max-w-xl text-center mt-12 md:mt-0">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
          {content.title}
        </h2>
        <p className="text-md sm:text-xl text-gray-400">{content.paragraph}</p>
        <p className="text-sm sm:text-sm text-gray-500 mt-5">
          {content.subparagraph}
        </p>
        {content.links && <div className="mt-8"><SlideLinks links={content.links} /></div>}
      </div>
    </div>
  );
}
