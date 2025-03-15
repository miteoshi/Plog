import fs from "fs/promises";
import path from "path";
import Slide from "@/components/Slide";
import { SlideContent } from "@/type";

const BLOGS_DIR_PATH = path.join(process.cwd(), "app", "data","blogs");

async function getBlogData(slug: string): Promise<SlideContent[]> {
  try {
    const filePath = path.join(BLOGS_DIR_PATH, `${slug}.json`);

    const fileContent = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

   
    if (!jsonData[slug] || !Array.isArray(jsonData[slug])) {
      console.error(`Invalid JSON format in ${slug}.json`);
      return [];
    }

    return jsonData[slug]; // Extracting the correct key
  } catch (error) {
    console.error(`Error reading ${slug}.json:`, error);
    return []; 
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

  const slidesData = await getBlogData(slug);

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

// Generate paths dynamically based on JSON files
export async function generateStaticParams() {
  try {
    const files = await fs.readdir(BLOGS_DIR_PATH);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const paths = await Promise.all(
      jsonFiles.map(async (file) => {
        const slug = file.replace(".json", "");
        const slidesData = await getBlogData(slug);

        return slidesData.map((_, index) => ({
          slug,
          id: (index + 1).toString(),
        }));
      })
    );

    return paths.flat();
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
