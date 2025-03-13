"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { SlideEditor } from "@/components/slide-editor";
import { createBlog } from "@/lib/actions";
import type { BlogData, SlideContent } from "@/type";
import { restrictInProduction } from "@/lib/restrict";

export default function CreateBlogPage() {

  restrictInProduction();

  const router = useRouter();
  const [blogKey, setBlogKey] = useState("");
  const [slides, setSlides] = useState<SlideContent[]>([
    {
      type: "Opener",
      title: "",
      paragraph: "",
      subparagraph: "",
      links: [{ label: "Go to menu", href: "/menu" }],
    },
  ]);

const addSlide = () => {
  // Check if there's already an "Opener" slide
  const hasOpener = slides.some((slide) => slide.type === "Opener");

  setSlides([
    ...slides,
    {
      type: hasOpener ? "Para" : "Opener", // Only the first slide can be an Opener
      title: "",
      paragraph: "",
      subparagraph: hasOpener ? undefined : "",
      links: hasOpener ? undefined : [{ label: "Go to menu", href: "/menu" }],
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

  if (!blogKey.trim()) {
    alert("Please enter a blog key");
    return;
  }

  if (slides.length === 0) {
    alert("Please add at least one slide");
    return;
  }

  if (!validateTenorUrls(slides)) {
    return;
  }

  // Ensure the "Opener" slide is always first
  const openerSlide = slides.find((slide) => slide.type === "Opener");
  const otherSlides = slides.filter((slide) => slide.type !== "Opener");

  if (!openerSlide) {
    alert("There must be exactly one Opener slide.");
    return;
  }

  const sortedSlides = [openerSlide, ...otherSlides];

  const blogData: BlogData = {
    [blogKey]: sortedSlides,
  };

  try {
    await createBlog(blogData);
    router.push("/manage");
  } catch (error) {
    console.error("Error saving blog:", error);
    alert("Failed to save blog. Please try again.");
  }
};



  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blog Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="blogKey">Blog Key</Label>
                <Input
                  id="blogKey"
                  placeholder="e.g., docker, react, nextjs"
                  value={blogKey}
                  onChange={(e) => setBlogKey(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This will be used as the URL path for your blog (e.g.,
                  /blogKey/1)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                hasOpener={slides.some(s => s.type === "Opener")}
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
            Save Blog
          </Button>
        </div>
      </form>
    </div>
  );
}
