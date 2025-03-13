"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { SlideEditor } from "@/components/slide-editor";
import { getBlog, updateBlog } from "@/lib/actions";
import { notFound } from "next/navigation";
import type { BlogData, SlideContent } from "@/type";
import { restrictInProduction } from "@/lib/restrict";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  //restrictInProduction();

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
    if (slides.length === 1) {
      alert("You must have at least one slide.");
      return;
    }

    const newSlides = slides.filter((_, i) => i !== index);
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

    const openerSlide = slides.find((slide) => slide.type === "Opener");
    const otherSlides = slides.filter((slide) => slide.type !== "Opener");

    if (!openerSlide) {
      alert("There must be exactly one Opener slide.");
      return;
    }

    if (slides.length === 0) {
      alert("Please add at least one slide");
      return;
    }

    if (!validateTenorUrls(slides)) {
      return;
    }

    // Ensure Opener is always first
    const sortedSlides = [openerSlide, ...otherSlides];

    const blogData: BlogData = {
      [key]: sortedSlides,
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
                hasOpener={slides.some((s) => s.type === "Opener")}
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
