import { getBlogs, getBlog } from "@/lib/actions";
import BeamsBackground from "@/components/BeamsBackground";
import Link from "next/link";
import { SlideContent } from "@/type"; // Ensure correct type import

interface BlogEntry {
  key: string;
  paragraph: string;
  title:string;
}

const CreditsScroller: React.FC = async () => {
  try {
    const blogKeys = await getBlogs(); // Get blog filenames
const blogs: BlogEntry[] = await Promise.all(
  blogKeys.map(async (key) => {
    const slides = await getBlog(key); // Fetch slides array
    const blogSlides = slides?.[key]; // Extract actual slide array

    if (!Array.isArray(blogSlides)) {
      console.warn(`Skipping invalid slides data for key: ${key}`);
      return { key, title: key, paragraph: "No description available" };
    }

    const opener = blogSlides.find(
      (slide: SlideContent) => slide.type === "Opener"
    );

    return {
      key,
      title: opener?.title || key, // Extract title from Opener slide
      paragraph: opener?.paragraph || "No description available",
    };
  })
);


    return (
      <BeamsBackground className="relative h-screen w-full text-white flex justify-start items-center">
        <div className="relative h-full w-full overflow-y-auto scrollbar-hide flex justify-start p-8">
          <div className="flex flex-col text-left space-y-8 py-20">
            {blogs.length > 0 ? (
              blogs.map(({ key, paragraph, title }) => (
                <div key={key} className="p-4">
                  <Link href={`/${key}/1`}>
                    <h2 className="text-2xl font-bold text-gray-300 cursor-pointer hover:underline">
                      {title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-300 opacity-75">
                    {paragraph}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-lg">No blogs available.</p>
            )}
          </div>
        </div>
      </BeamsBackground>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <p className="text-red-500 text-center">Error loading content.</p>;
  }
};

export default CreditsScroller;
