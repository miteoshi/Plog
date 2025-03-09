
import { blogsData } from "@/app/data/blogs";
import Slide from "@/app/components/Slide";
import { SlideContent } from "@/app/type";

const dataSources: Record<string, SlideContent[]> = blogsData

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

export function generateStaticParams() {
  const paths = Object.keys(dataSources).flatMap((slug) =>
    dataSources[slug].map((_, index) => ({
      slug,
      id: (index + 1).toString(),
    }))
  );

  return paths;
}
