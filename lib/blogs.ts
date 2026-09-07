import axios from "axios";
import { BlogFormValues, Blog, BlogStatus, BlogSection } from "@/types/blog";

// ================================
// Config
// ================================
// Set NEXT_PUBLIC_API_URL in .env.local, e.g:
//   NEXT_PUBLIC_API_URL=http://localhost:5000
// (works fine whether or not you also included a trailing /api — it's
// stripped below and re-added once, so no /api/api/... double-ups)
const RAW_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_BASE = RAW_BASE.replace(/\/api\/?$/, ""); // server root, e.g. http://localhost:5000
                                                     // (used for resolving /uploads/... image URLs)

const api = axios.create({
  baseURL: `${API_BASE}/api`, // e.g. http://localhost:5000/api
});

// ================================
// resolveImage
// ================================
// Backend stores images as relative paths, e.g. "/uploads/blogs/xxx.jpg".
// Turns that into a full URL. Leaves blob: (local preview) and
// already-absolute URLs untouched.
export function resolveImage(src?: string): string {
  if (!src) return "";
  if (src.startsWith("blob:") || /^https?:\/\//i.test(src)) return src;
  return `${API_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
}

// ================================
// File payload passed alongside form values (from the add/edit pages)
// ================================
interface BlogFilePayload {
  coverImageFile: File | null;
  contentImageFiles: Record<string, File>; // keyed by BlogImage.id
}

// ================================
// buildFormData
// ================================
// Sends everything in ONE multipart request:
//   - "data"          -> JSON.stringify(BlogFormValues)
//   - "coverImage"     -> new cover file, only if one was picked
//   - "image_<imgId>"  -> new file for a specific images-block image
function buildFormData(payload: BlogFormValues, files: BlogFilePayload): FormData {
  const fd = new FormData();

  // Strip the transient `tempUrlInput` field before sending.
  const cleaned: BlogFormValues = {
    ...payload,
    content: payload.content.map((block) => {
      if (block.type !== "images" || !block.images) return block;
      return {
        ...block,
        images: block.images.map(({ tempUrlInput, ...rest }) => rest),
      };
    }),
  };

  fd.append("data", JSON.stringify(cleaned));

  if (files.coverImageFile) {
    fd.append("coverImage", files.coverImageFile);
  }

  Object.entries(files.contentImageFiles).forEach(([imgId, file]) => {
    fd.append(`image_${imgId}`, file);
  });

  return fd;
}

// ================================
// API calls
// ================================

export async function createBlog(payload: BlogFormValues, files: BlogFilePayload) {
  const fd = buildFormData(payload, files);
  const res = await api.post("/blog", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data as Blog;
}

export async function updateBlog(
  id: string,
  payload: BlogFormValues,
  files: BlogFilePayload,
) {
  const fd = buildFormData(payload, files);
  const res = await api.put(`/blog/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data as Blog;
}

export async function getSingleBlog(id: string) {
  const res = await api.get(`/blog/${id}`);
  return res.data.data as Blog;
}

// Admin list needs every post regardless of status, so ask for a high limit.
export async function getAllBlogsAdmin(): Promise<Blog[]> {
  const res = await api.get("/blog", { params: { limit: 1000 } });
  const blogs = res.data?.data;
  return Array.isArray(blogs) ? (blogs as Blog[]) : [];
}

export async function updateBlogStatus(id: string, status: BlogStatus) {
  const res = await api.patch(`/blog/${id}/status`, { status });
  return res.data.data as Blog;
}

export async function deleteBlog(id: string) {
  const res = await api.delete(`/blog/${id}`);
  return res.data;
}

// ================================================================
// PUBLIC (published-only) helpers — used by app/blog/* storefront pages
// ================================================================

export type BlogAccent = "green" | "clay" | "sand" | "moss";
const ACCENTS: BlogAccent[] = ["green", "clay", "sand", "moss"];

// Deterministic accent so the same post always gets the same color,
// without needing an "accent" field in the database.
function accentFor(seed: string): BlogAccent {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

function estimateReadTime(content: BlogSection[] = []): string {
  const words = content.reduce((count, block) => {
    const text = [block.text, ...(block.listItems ?? []), ...(block.tableRows?.flat() ?? [])]
      .filter(Boolean)
      .join(" ");
    return count + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export interface PublicBlogCard {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  coverImage: string;
  accent: BlogAccent;
}

export interface PublicBlogDetail {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  accent: BlogAccent;
  coverImage: string;
  content: BlogSection[];
}

function toPublicCard(blog: Blog): PublicBlogCard {
  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    date: blog.date,
    readTime: estimateReadTime(blog.content),
    author: blog.author || "Forrest Vibes",
    coverImage: resolveImage(blog.coverImage),
    accent: accentFor(blog.slug),
  };
}

// All published posts, newest first (backend already sorts by date desc).
// Defensive: if the API is unreachable at build time, or returns an
// unexpected shape, this returns [] instead of throwing — so the
// static build/ISR revalidation never crashes the whole page.
export async function getPublishedBlogs(): Promise<PublicBlogCard[]> {
  try {
    const res = await api.get("/blog", { params: { status: "Published", limit: 100 } });
    const blogs = res.data?.data;
    if (!Array.isArray(blogs)) {
      console.error("getPublishedBlogs: unexpected response shape:", res.data);
      return [];
    }
    return blogs.map(toPublicCard);
  } catch (err) {
    console.error("getPublishedBlogs: request failed:", err);
    return [];
  }
}

// Single published post by slug. Returns null on 404 or if it's a draft
// (so a draft link never leaks to the public site).
export async function getPublishedBlogBySlug(slug: string): Promise<PublicBlogDetail | null> {
  try {
    const res = await api.get(`/blog/${slug}`);
    const blog = res.data?.data as Blog | undefined;
    if (!blog || blog.status !== "Published") return null;
    return {
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      date: blog.date,
      readTime: estimateReadTime(blog.content),
      author: blog.author || "Forrest Vibes",
      accent: accentFor(blog.slug),
      coverImage: resolveImage(blog.coverImage),
      content: blog.content,
    };
  } catch {
    return null;
  }
}

export async function getOtherPublishedBlogs(
  slug: string,
  count = 3,
): Promise<PublicBlogCard[]> {
  const all = await getPublishedBlogs();
  return all.filter((b) => b.slug !== slug).slice(0, count);
}