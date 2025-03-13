"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { SlideContent } from "@/type";
import { getBlogs } from "@/lib/actions";
import BeamsBackground from "@/components/BeamsBackground";

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
            .slice(0, 1) // Take only the first "Opener"
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
    <BeamsBackground className="relative h-screen w-full text-white flex justify-start items-center">
      {/* Full-height Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="relative h-full w-full overflow-y-auto scrollbar-hide flex justify-start p-8"
      >
        <div className="flex flex-col text-left space-y-8 py-20">
          {openers.map((opener, index) => (
            <div key={`${opener.key}-${index}`} className="p-4">
              <Link href={`/${opener.key}/1`}>
                <h2 className="text-2xl font-bold cursor-pointer hover:underline">
                  {opener.title}
                </h2>
              </Link>
              <p className="text-sm opacity-75">{opener.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </BeamsBackground>
  );
};

export default CreditsScroller;
