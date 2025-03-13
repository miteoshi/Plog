// app/menu/page.tsx

import { SlideContent } from "@/type";
import { getBlogs } from "@/lib/actions";
import BeamsBackground from "@/components/BeamsBackground";
import Link from "next/link";

interface BlogEntry extends SlideContent {
  key: string;
}

const CreditsScroller: React.FC = async () => {
  try {
    const blogs = await getBlogs();
    const openers: BlogEntry[] = Object.entries(blogs).flatMap(([key, items]) =>
      items
        .filter((item) => item.type === "Opener")
        .slice(0, 1) // Take only the first "Opener"
        .map((item) => ({ key, ...item }))
    );

    return (
      <BeamsBackground className="relative h-screen w-full text-white flex justify-start items-center">
        {/* Full-height Scrollable Container */}
        <div className="relative h-full w-full overflow-y-auto scrollbar-hide flex justify-start p-8">
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
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <p>Error loading content.</p>;
  }
};

export default CreditsScroller;
