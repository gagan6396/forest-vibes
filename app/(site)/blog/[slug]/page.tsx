import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./SingleBlog.module.css";
import { getPublishedBlogBySlug, getOtherPublishedBlogs, BlogAccent } from "@/lib/blogs";
import BlogContent from "./BlogContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) return { title: "Story not found — Forrest Vibes" };

  const description = post.excerpt ?? post.title;

  return {
    title: `${post.title} — Forrest Vibes`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

const heroClass: Record<BlogAccent, string> = {
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
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = await getOtherPublishedBlogs(post.slug, 3);

  return (
    <div className={styles.page} data-navbar-theme="dark">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <div className={`${styles.hero} ${heroClass[post.accent]}`}>
        <div className={styles.heroOverlay} />
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className={styles.heroBg}
          />
        )}
        <div className={styles.heroInner}>
          <Link href="/blog" className={styles.backLink}>
            <span className={styles.backArrow}>←</span> Back to Blog
          </Link>

          <div className={styles.heroContent}>
            <h1>{post.title}</h1>
            {post.excerpt && <p className={styles.heroExcerpt}>{post.excerpt}</p>}

            <div className={styles.heroFooter}>
              <div className={styles.author}>
                <div className={styles.avatar}>{initials(post.author)}</div>
                <div>
                  <span className={styles.authorName}>{post.author}</span>
                  <span className={styles.authorRole}>Writer</span>
                </div>
              </div>
              <div className={styles.heroMeta}>
                <span>{formatDate(post.date)}</span>
                <span className={styles.dot}>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Article — full width, no floating card ────────── */}
      <article className={styles.article}>
        <div className={styles.content}>
          <BlogContent content={post.content} />
        </div>

        {/* ─── Related Posts ────────────────────────────── */}
        {otherPosts.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHeader}>
              <h3>You might also like</h3>
              <Link href="/blog" className={styles.viewAll}>
                View all →
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {otherPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={`${styles.relatedThumb} ${heroClass[related.accent]}`}>
                    {related.coverImage && (
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className={styles.relatedImg}
                      />
                    )}
                  </div>
                  <div className={styles.relatedInfo}>
                    <h4>{related.title}</h4>
                    <p>{related.excerpt}</p>
                    <span className={styles.relatedDate}>
                      {formatDate(related.date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}