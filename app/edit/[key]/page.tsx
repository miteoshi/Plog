"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { SlideEditor } from "@/components/slide-editor";
import { getBlog, updateBlog } from "@/lib/actions";
import type { BlogData, SlideContent } from "@/type";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const router = useRouter();
  const [key, setKey] = useState<string | null>(null);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setKey(resolvedParams.key);
      } catch (error) {
        console.error("Failed to resolve params:", error);
        router.push("/manage");
      }
    };

    unwrapParams();
  }, [params, router]);

  useEffect(() => {
    if (!key) return;

    const fetchBlog = async () => {
      try {
        const blogData = await getBlog(key);
        if (blogData && blogData[key]) {
          setSlides(blogData[key]);
        } else {
          alert("Blog not found");
          router.push("/manage");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [key, router]);

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        type: "Para",
        title: "",
        paragraph: "",
      },
    ]);
  };

  const removeSlide = (index: number) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
  };

  const updateSlide = (index: number, updatedSlide: SlideContent) => {
    const newSlides = [...slides];
    newSlides[index] = updatedSlide;
    setSlides(newSlides);
  };

  const validateTenorUrls = (slides: SlideContent[]): boolean => {
    for (const slide of slides) {
      if (slide.image && !slide.image.includes("tenor.com")) {
        alert("Only tenor.com image URLs are allowed");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!key) return;

    if (slides.length === 0) {
      alert("Please add at least one slide");
      return;
    }

    // Validate all image URLs
    if (!validateTenorUrls(slides)) {
      return;
    }

    const blogData: BlogData = {
      [key]: slides,
    };

    try {
      await updateBlog(key, blogData);
      router.push("/manage");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  if (loading || !key) {
    return (
      <div className="container mx-auto py-12 text-center">Loading blog...</div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Edit Blog: {key}</h1>

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Slides</h2>

        {slides.map((slide, index) => (
          <Card key={index} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Slide {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSlide(index)}
                disabled={slides.length === 1}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <SlideEditor
                slide={slide}
                onChange={(updatedSlide) => updateSlide(index, updatedSlide)}
              />
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={addSlide}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Slide
          </Button>

          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
