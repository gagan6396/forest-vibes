import { getPublishedBlogs } from "@/lib/blogs";
import BlogGrid from "./BlogGrid";

// Re-fetch the published list at most once a minute (ISR) so a newly
// published/unpublished post shows up without a full redeploy.
export const revalidate = 60;

export default async function BlogListPage() {
  const allPosts = await getPublishedBlogs();
  return <BlogGrid allPosts={allPosts} />;
}