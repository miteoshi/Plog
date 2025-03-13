"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { SlideContent } from "@/type";
import { getBlogs } from "@/lib/actions";

interface BlogEntry extends SlideContent {
  key: string;
}

const CreditsScroller: React.FC = () => {
  const [openers, setOpeners] = useState<BlogEntry[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs: Record<string, SlideContent[]> = await getBlogs();
        const extractedOpeners: BlogEntry[] = Object.entries(blogs).flatMap(
          ([key, items]) =>
            items
              .filter((item) => item.type === "Opener")
              .map((item) => ({ key, ...item }))
        );
        setOpeners(extractedOpeners);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-screen w-full bg-black text-white flex justify-center items-center">
      {/* Full-height Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="relative h-full w-full overflow-y-auto scrollbar-hide flex justify-center"
      >
        <div className="flex flex-col text-center space-y-8 py-20">
          {openers.map((opener, index) => (
            <div key={`${opener.key}-${index}`} className="p-4">
              <Link href={`/${opener.key}/1`}>
                <h2 className="text-2xl font-bold cursor-pointer hover:underline">
                  {opener.title}
                </h2>
              </Link>
              <p className="text-lg">{opener.paragraph}</p>
              {opener.subparagraph && (
                <p className="text-sm opacity-75">{opener.subparagraph}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsScroller;
