import { me } from "../../me";
import {about} from "../../about"; 
import Slide from "../../components/Slide";

const dataSources: Record<string, React.ReactNode[]> = {
  me: me,
  about:about,

};

export default async function SlidePage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;
  const slideId = parseInt(id, 10);

  const slidesData = dataSources[slug];

  if (!slidesData || slideId < 1 || slideId > slidesData.length) {
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
  const paths = [];

  for (const slug of Object.keys(dataSources)) {
    paths.push(
      ...dataSources[slug].map((_, index) => ({
        slug,
        id: (index + 1).toString(),
      }))
    );
  }

  return paths;
}
