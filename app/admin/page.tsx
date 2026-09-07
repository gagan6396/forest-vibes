import styles from "./page.module.css";

// Replace these with real data fetches once your Express/MongoDB API is ready.
const stats = [
  { label: "Unread Messages", value: 2, sub: "4 total", icon: "mail" as const },
  { label: "Open Positions", value: 2, sub: "2 total roles", icon: "briefcase" as const },
  { label: "Blog Posts", value: 2, sub: "0 drafts", icon: "doc" as const },
  { label: "Portfolio Projects", value: 1, sub: "1 categories", icon: "image" as const },
  { label: "Brands", value: 32, sub: "32 active", icon: "plus" as const },
];

const recentMessages = [
  { name: "Hashim Woodward", preview: "Obcaecati tenetur de", time: "25d ago" },
  { name: "Odette Duffy", preview: "Voluptate consequat", time: "30d ago" },
  { name: "Calista Cooke", preview: "Odit in quis sunt cu", time: "32d ago" },
  { name: "Arun Negi", preview: "testing data", time: "32d ago" },
];

const recentPosts = [
  { title: "Delectus aliquip harum sed architecto est ea officia exercitation", status: "Published" as const, date: "Jun 5" },
  { title: "Et omnis ipsum qui velit in nisi", status: "Published" as const, date: "May 8" },
];

export default function AdminDashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Overview of your website activity</p>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statIcon}>
                <StatIcon name={stat.icon} />
              </span>
            </div>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statSub}>{stat.sub}</span>
          </div>
        ))}
      </section>

      <section className={styles.panelsGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Recent Messages</h2>
            <a href="/admin/messages">View all</a>
          </div>
          <div className={styles.panelBody}>
            {recentMessages.map((msg, i) => (
              <div key={i} className={styles.messageRow}>
                <span className={styles.unreadDot} />
                <div className={styles.messageText}>
                  <span className={styles.messageName}>{msg.name}</span>
                  <span className={styles.messagePreview}>{msg.preview}</span>
                </div>
                <span className={styles.messageTime}>{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Recent Blog Posts</h2>
            <a href="/admin/blogs">View all</a>
          </div>
          <div className={styles.panelBody}>
            {recentPosts.map((post, i) => (
              <div key={i} className={styles.postRow}>
                <div className={styles.postTop}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
                <span className={styles.postStatus}>
                  <span className={styles.statusDot} />
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatIcon({ name }: { name: "mail" | "briefcase" | "doc" | "image" | "plus" }) {
  const common = { width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3.5" y="7" width="17" height="12" rx="2" />
          <path d="M8 7V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
          <path d="M14 3.5V8h4M8 12h8M8 16h8" strokeLinecap="round" />
        </svg>
      );
    case "image":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M4 17l5-5 3 3 4-4.5 4 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v8M8 12h8" strokeLinecap="round" />
        </svg>
      );
  }
}