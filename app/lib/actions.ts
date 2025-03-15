"use server";

import fs from "fs/promises";
import path from "path";
import type { BlogData } from "@/type";

const BLOGS_DIR = "./app/data/blogs"; // Directory to store individual JSON files

// Ensure the blogs directory exists
async function ensureBlogDirExists() {
  try {
    await fs.mkdir(BLOGS_DIR, { recursive: true });
  } catch (error) {
    console.error("Error ensuring blogs directory exists:", error);
  }
}

// Get all blogs (returns a list of blog filenames)
export async function getBlogs(): Promise<string[]> {
  try {
    await ensureBlogDirExists();
    const files = await fs.readdir(BLOGS_DIR);
    return files.map((file) => file.replace(".json", "")); // Remove ".json" extension
  } catch (error) {
    console.error("Error reading blogs directory:", error);
    return [];
  }
}

// Get a specific blog by key
export async function getBlog(key: string): Promise<BlogData | null> {
  try {
    const filePath = path.join(BLOGS_DIR, `${key}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading blog ${key}:`, error);
    return null;
  }
}

// Create a new blog
export async function createBlog(
  key: string,
  blogData: BlogData
): Promise<void> {
  try {
    await ensureBlogDirExists();
    const filePath = path.join(BLOGS_DIR, `${key}.json`);

    // Check if the blog already exists
    try {
      await fs.access(filePath);
      throw new Error(`Blog with key "${key}" already exists`);
    } catch {}

    const formattedData = JSON.stringify(blogData, null, 2);
    await fs.writeFile(filePath, formattedData, "utf-8");
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
    const filePath = path.join(BLOGS_DIR, `${key}.json`);

    // Ensure the blog exists before updating
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`Blog with key "${key}" not found`);
    }

    const formattedData = JSON.stringify(blogData, null, 2);
    await fs.writeFile(filePath, formattedData, "utf-8");
  } catch (error) {
    console.error(`Error updating blog ${key}:`, error);
    throw new Error(`Failed to update blog ${key}`);
  }
}

// Delete a blog
export async function deleteBlog(key: string): Promise<void> {
  try {
    if (key === "about" || key === "menu") {
      throw new Error(`Cannot delete "${key}" blog`);
    }

    const filePath = path.join(BLOGS_DIR, `${key}.json`);

    // Ensure the blog exists before deleting
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`Blog with key "${key}" not found`);
    }

    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting blog ${key}:`, error);
    throw new Error(`Failed to delete blog ${key}`);
  }
}
