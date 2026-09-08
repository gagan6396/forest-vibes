"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Blog } from "@/types/blog";
import { getAllBlogsAdmin } from "@/lib/blogs";

const RECENT_POSTS_LIMIT = 8;

function formatRelativeDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const diffMs = Date.now() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 30) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllBlogsAdmin();
        if (!cancelled) setBlogs(data);
      } catch (err) {
        console.error("Dashboard: fetch blogs error:", err);
        if (!cancelled) setError("Couldn't load blog data");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalBlogs = blogs.length;
  const publishedCount = useMemo(
    () => blogs.filter((b) => b.status === "Published").length,
    [blogs]
  );
  const draftCount = totalBlogs - publishedCount;

  const recentPosts = useMemo(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RECENT_POSTS_LIMIT);
  }, [blogs]);

  const stats = [
    {
      key: "total",
      label: "Total Posts",
      value: totalBlogs,
      sub: "All blog posts",
      icon: "doc" as const,
    },
    {
      key: "published",
      label: "Published",
      value: publishedCount,
      sub: "Live on site",
      icon: "check" as const,
    },
    {
      key: "drafts",
      label: "Drafts",
      value: draftCount,
      sub: "Not yet published",
      icon: "edit" as const,
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>Dashboard</h1>
          <p>Overview of your blog activity</p>
        </div>
        <Link href="/admin/blog/add-new" className={styles.newPostBtn}>
          <span className={styles.newPostPlus}>+</span> New Blog Post
        </Link>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.key} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statIcon}>
                <StatIcon name={stat.icon} />
              </span>
            </div>
            <span className={styles.statValue}>{isLoading ? "—" : stat.value}</span>
            <span className={styles.statSub}>{isLoading ? "Loading…" : stat.sub}</span>
          </div>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Recent Blog Posts</h2>
          <a href="/admin/blogs">View all</a>
        </div>
        <div className={styles.panelBody}>
          {isLoading && <p className={styles.emptyState}>Loading…</p>}

          {!isLoading && error && <p className={styles.emptyState}>{error}</p>}

          {!isLoading && !error && recentPosts.length === 0 && (
            <p className={styles.emptyState}>
              No blog posts yet. <Link href="/admin/blog/add-new">Write your first post</Link>.
            </p>
          )}

          {!isLoading &&
            !error &&
            recentPosts.map((post) => (
              <Link
                key={post._id}
                href={`/admin/blog/${post._id}`}
                className={styles.postRow}
              >
                <div className={styles.postTop}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postDate}>{formatRelativeDate(post.date)}</span>
                </div>
                <span
                  className={`${styles.postStatus} ${
                    post.status === "Published" ? styles.statusPublished : styles.statusDraft
                  }`}
                >
                  <span className={styles.statusDot} />
                  {post.status}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function StatIcon({ name }: { name: "doc" | "check" | "edit" }) {
  const common = { width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  switch (name) {
    case "doc":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
          <path d="M14 3.5V8h4M8 12h8M8 16h8" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "edit":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 20l.9-4.2L15.3 5.4a1.5 1.5 0 0 1 2.1 0l1.2 1.2a1.5 1.5 0 0 1 0 2.1L8.2 19.1 4 20Z" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M13.6 7.1l3.3 3.3" strokeLinecap="round" />
        </svg>
      );
  }
}