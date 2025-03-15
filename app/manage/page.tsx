"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Trash2, Eye } from "lucide-react";
import { getBlogs, getBlog, deleteBlog } from "@/lib/actions";
import type { BlogItem } from "../type";
import { restrictInProduction } from "@/lib/restrict";

export default function ManageBlogsPage() {
  restrictInProduction();

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const fetchBlogs = async () => {
  try {
    const blogKeys = await getBlogs();
    const blogDataPromises = blogKeys.map(async (key) => {
      const data = await getBlog(key);
      return data ? { key, data } : null;
    });

    const resolvedBlogs = (await Promise.all(blogDataPromises)).filter(
      Boolean
    ) as BlogItem[];
    setBlogs(resolvedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    setLoading(false);
  }
};

    fetchBlogs();
  }, []);

  const handleDelete = async (blogKey: string) => {
    if (confirm(`Are you sure you want to delete the "${blogKey}" blog?`)) {
      try {
        await deleteBlog(blogKey);
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.key !== blogKey)
        );
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Button asChild>
          <Link href="/create">Create New Blog</Link>
        </Button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No blogs found</p>
          <Button asChild>
            <Link href="/create">Create Your First Blog</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map(({ key, data }) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle>{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {Object.values(data).flat().length} slides
                </p>
                <p className="mt-2">
                  First slide:{" "}
                  {Object.values(data).flat()[0]?.title || "No title"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${key}/1`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/edit/${key}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(key)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
