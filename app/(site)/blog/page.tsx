"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Blog.module.css";
import { getAllBlogs, BlogPost } from "@/lib/blog-data";

const INITIAL_COUNT = 12;
const LOAD_STEP = 4;

const LeafMark = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 20C8 15 12 11 18 6" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ForestSilhouette = () => (
  <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g fill="#0f2117">
      <path d="M60 500 L110 380 L130 420 L160 340 L195 500Z" />
      <path d="M190 500 L245 320 L270 380 L300 300 L345 500Z" />
      <path d="M330 500 L380 400 L400 440 L430 360 L470 500Z" />
    </g>
    <g fill="#193c2c" opacity="0.8">
      <path d="M20 500 L70 410 L95 450 L120 390 L160 500Z" />
      <path d="M250 500 L300 400 L320 440 L350 380 L390 500Z" />
    </g>
  </svg>
);

const accentClass: Record<BlogPost["accent"], string> = {
  green: styles.thumbGreen,
  clay: styles.thumbClay,
  sand: styles.thumbSand,
  moss: styles.thumbMoss,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogListPage() {
  // Swap for a server-fetched prop if you move this to an API-backed page.
  const allPosts = useMemo(() => getAllBlogs(), []);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((count) => Math.min(count + LOAD_STEP, allPosts.length));
  };

  return (
    <div className={styles.page}>
      {/* Dark hero banner — lets the fixed navbar overlay it with light text,
          same as the homepage hero. */}
      <div className={styles.banner} data-navbar-theme="light">
        <div className={styles.bannerTrees}>
          <ForestSilhouette />
        </div>
        <div className={styles.bannerScrim} />
        <div className={styles.bannerContent}>
          <p className={styles.breadcrumb}>
            <Link href="/">Home</Link> <span>/</span> Blog
          </p>
          <h1>
            Stories from <em>Forrest Vibes</em>
          </h1>
        </div>
      </div>

      {/* Rest of the page sits on the cream background, so the navbar
          should switch back to dark text once this section is in view. */}
      <div data-navbar-theme="dark">
        <div className={styles.hero}>
          <p className={styles.eyebrow}>FROM THE VILLA</p>
          <p>
            Travel notes, guest stories, and the small details of life around the property —
            written by the people who run it.
          </p>
        </div>

        {visiblePosts.length === 0 ? (
          <div className={styles.emptyState}>No stories published yet. Check back soon.</div>
        ) : (
          <div className={styles.grid}>
            {visiblePosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={`${styles.thumb} ${accentClass[post.accent]}`}>
                  <LeafMark />
                  <span className={styles.category}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button type="button" className={styles.loadMoreBtn} onClick={handleLoadMore}>
              READ MORE
            </button>
            <span className={styles.countLabel}>
              Showing {visiblePosts.length} of {allPosts.length} stories
            </span>
          </div>
        )}
      </div>
    </div>
  );
}