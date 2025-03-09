import { Link } from "lucide-react";
import { SlideContent } from "../type";
import { SlideLinks } from "./SideLinks";

export function Menu({ content }: { content: SlideContent }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {content.menu?.map((post: any) => (
          <a key={post.title} href={`/blogs/${post.slug}`} className="group">
            <div className="bg-[#fff8dc] border-2 border-[#8b4513] shadow-lg rounded-lg p-6 w-64 h-32 flex items-center justify-center text-center text-xl font-semibold text-[#8b4513] group-hover:bg-[#8b4513] group-hover:text-white transition-all">
              {post.title}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
