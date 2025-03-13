import fs from "fs/promises";
import path from "path";
import Slide from "@/components/Slide";
import { SlideContent } from "@/type";

const BLOGS_JSON_PATH = path.join(process.cwd(), "app", "data", "blogs.json");

// Function to fetch blog data dynamically
async function getBlogsData(): Promise<Record<string, SlideContent[]>> {
  try {
    const fileContent = await fs.readFile(BLOGS_JSON_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blogs.json:", error);
    return {}; // Return empty object if file read fails
  }
}

interface Params {
  slug: string;
  id: string;
}

export default async function SlidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, id } = await params;
  const slideId = parseInt(id, 10);

  const dataSources = await getBlogsData();
  const slidesData = dataSources[slug] ?? [];

  if (slideId < 1 || slideId > slidesData.length) {
    return <div>Page not found</div>;
  }

  return (
    <Slide
      content={slidesData[slideId - 1]}
      id={slideId}
      totalSlides={slidesData.length}
    />
  );
}

export async function generateStaticParams() {
  const dataSources = await getBlogsData();

  const paths = Object.keys(dataSources).flatMap((slug) =>
    dataSources[slug].map((_, index) => ({
      slug,
      id: (index + 1).toString(),
    }))
  );

  return paths;
}
