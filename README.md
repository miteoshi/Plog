# Plog

Welcome to the Plog! This project is a minimalistic blog platform built with Next.js. It's designed to provide an engaging, slide-based experience for browsing blog posts.

## CMS

The content management system (CMS) works locally in development. Since Vercel's file system is read-only, you won't be able to edit content directly on the deployed site. However, you can manage the content locally by editing the JSON files that store the blog data.

- For blog creation: `/create`
- To manage blogs: `/manage`

## Database

The blog data is stored in a JSON format. Each blog post and content section is organized into categories. You can add, edit, or delete content by modifying the relevant JSON files on your local machine.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the project locally:
    ```bash
    npm run dev
    ```

Now, you can visit `http://localhost:3000` in your browser to view the site.

## Usage

- Navigate through slides using the arrow keys or swipe left/right.
- To edit content, modify the corresponding JSON files in the `data` folder locally.

## Todo

- [ ] No more JSON. Time to switch to supabase.
- [ ] Authentication so that everyone can post
- [ ] Add Feedback/Comment Feature
