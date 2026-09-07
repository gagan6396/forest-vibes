import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./SingleBlog.module.css";
import { getBlogBySlug, getOtherBlogs, getAllBlogs, BlogPost } from "@/lib/blog-data";

interface PageProps {
  // Next.js 15: params is a Promise now, must be awaited.
  params: Promise<{ slug: string }>;
}

// Pre-render every known slug at build time. Remove this if your blog
// data comes from an API and you'd rather render on-demand.
export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Story not found — Forrest Vibes" };
  return {
    title: `${post.title} — Forrest Vibes`,
    description: post.excerpt,
  };
}

const heroClass: Record<BlogPost["accent"], string> = {
  green: styles.heroGreen,
  clay: styles.heroClay,
  sand: styles.heroSand,
  moss: styles.heroMoss,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function SingleBlogPage({ params }: PageProps) {
  // Swap for a fetch to your API by slug if blogs are served dynamically:
  // const post = await fetch(`${process.env.API_URL}/api/blogs/${slug}`).then(r => r.json());
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = getOtherBlogs(post.slug, 3);

  return (
    <div className={styles.page} data-navbar-theme="dark">
      <div className={styles.backBar}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to all stories
        </Link>
      </div>

      <div className={`${styles.hero} ${heroClass[post.accent]}`}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 20C8 15 12 11 18 6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <div className={styles.heroOverlay}>
          <span className={styles.category}>{post.category}</span>
          <h1>{post.title}</h1>
        </div>
      </div>

      <article className={styles.article}>
        <div className={styles.meta}>
          <span className={styles.authorAvatar}>{initials(post.author)}</span>
          <span>{post.author}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readTime}</span>
        </div>

        <div className={styles.content}>
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {otherPosts.length > 0 && (
          <>
            <div className={styles.divider} />
            <section className={styles.relatedSection}>
              <h3>More from the blog</h3>
              <div className={styles.relatedGrid}>
                {otherPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className={styles.relatedCard}>
                    <div className={`${styles.relatedThumb} ${heroClass[related.accent]}`} />
                    <h4>{related.title}</h4>
                    <span className={styles.relatedMeta}>{related.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </article>
    </div>
  );
}