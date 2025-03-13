"use server";

import fs from "fs/promises";
import path from "path";
import type { BlogsData, BlogData } from "@/type";

const BLOG_JSON_PATH = "./app/data/blogs.json";

// Read blogs data from JSON file
export async function getBlogs(): Promise<BlogsData> {
  try {
    const fileContent = await fs.readFile(BLOG_JSON_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blogs.json:", error);
    return {};
  }
}

// Get a specific blog by key
export async function getBlog(key: string): Promise<BlogData> {
  try {
    const blogs = await getBlogs();
    if (!blogs[key]) {
      return {};
    }
    return { [key]: blogs[key] };
  } catch (error) {
    console.error(`Error getting blog ${key}:`, error);
    throw new Error(`Failed to get blog ${key}`);
  }
}

// Create a new blog
export async function createBlog(blogData: BlogData): Promise<void> {
  try {
    const blogs = await getBlogs();
    const blogKey = Object.keys(blogData)[0];

    if (blogs[blogKey]) {
      throw new Error(`Blog with key "${blogKey}" already exists`);
    }

    const updatedBlogs = {
      ...blogs,
      ...blogData,
    };

    await updateBlogsFile(updatedBlogs);
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
}

// Update an existing blog
export async function updateBlog(
  key: string,
  blogData: BlogData
): Promise<void> {
  try {
    if(key === "about" || key === "menu"){
      throw new Error(`The "about" page cannot be modified`);
    }
    const blogs = await getBlogs();

    if (!blogs[key]) {
      throw new Error(`Blog with key "${key}" not found`);
    }

    const updatedBlogs = {
      ...blogs,
      [key]: blogData[key], // Ensure only updating the specific blog
    };

    await updateBlogsFile(updatedBlogs);
  } catch (error) {
    console.error(`Error updating blog ${key}:`, error);
    throw new Error(`Failed to update blog ${key}`);
  }
}

// Delete a blog
export async function deleteBlog(key: string): Promise<void> {
  try {
    if(key === "about" || key === "menu"){
      throw new Error(`How dare you (in mysterious voice). It's about Plog`);
    }
    const blogs = await getBlogs();


    if (!blogs[key]) {
      throw new Error(`Blog with key "${key}" not found`);
    }

    delete blogs[key];

    await updateBlogsFile(blogs);
  } catch (error) {
    console.error(`Error deleting blog ${key}:`, error);
    throw new Error(`Failed to delete blog ${key}`);
  }
}

// Helper function to update the blogs.json file
async function updateBlogsFile(blogsData: BlogsData): Promise<void> {
  try {
    const formattedBlogsData = JSON.stringify(blogsData, null, 2);
    await fs.writeFile(BLOG_JSON_PATH, formattedBlogsData, "utf-8");
  } catch (error) {
    console.error("Error updating blogs.json file:", error);
    throw new Error("Failed to update blogs.json file");
  }
}
