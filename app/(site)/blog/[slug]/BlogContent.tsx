import { BlogSection } from "@/types/blog";
import { resolveImage } from "@/lib/blogs";

const CALLOUT_COLORS: Record<string, string> = {
  info: "#2b6cb0",
  tip: "#2f6f4e",
  success: "#2f855a",
  warning: "#b7791f",
  danger: "#c53030",
};

function ContentBlock({ block }: { block: BlogSection }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 style={{ fontSize: "1.6rem", margin: "2rem 0 1rem", fontWeight: 600, lineHeight: 1.3 }}>
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 style={{ fontSize: "1.25rem", margin: "1.5rem 0 0.75rem", fontWeight: 600 }}>
          {block.text}
        </h3>
      );

    case "paragraph":
      // Paragraph text comes from a rich-text editor (Jodit), so it's HTML —
      // render it as such rather than as escaped plain text.
      return (
        <div
          style={{ lineHeight: 1.8, margin: "1rem 0", fontSize: "1.02rem" }}
          dangerouslySetInnerHTML={{ __html: block.text || "" }}
        />
      );

    case "list": {
      const Tag = block.listType === "ordered" ? "ol" : "ul";
      return (
        <Tag style={{ margin: "1rem 0", paddingLeft: "1.5rem", lineHeight: 1.9 }}>
          {(block.listItems ?? []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote
          style={{
            borderLeft: "3px solid currentColor",
            opacity: 0.9,
            margin: "1.75rem 0",
            padding: "0.25rem 0 0.25rem 1.25rem",
          }}
        >
          <p style={{ fontSize: "1.15rem", fontStyle: "italic", margin: 0 }}>{block.text}</p>
          {block.quoteAuthor && (
            <footer style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.7 }}>
              — {block.quoteAuthor}
            </footer>
          )}
        </blockquote>
      );

    case "code":
      return (
        <pre
          style={{
            background: "rgba(0,0,0,0.05)",
            padding: "1rem 1.25rem",
            borderRadius: 8,
            overflowX: "auto",
            margin: "1.5rem 0",
            fontSize: "0.85rem",
          }}
        >
          <code>{block.text}</code>
        </pre>
      );

    case "video": {
      if (!block.videoUrl) return null;
      const embedUrl = block.videoUrl
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("vimeo.com/", "player.vimeo.com/video/");
      return (
        <figure style={{ margin: "1.75rem 0" }}>
          <div
            style={{
              aspectRatio: "16/9",
              borderRadius: 10,
              overflow: "hidden",
              background: "#000",
            }}
          >
            <iframe
              src={embedUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              title={block.videoCaption || "video"}
            />
          </div>
          {block.videoCaption && (
            <figcaption style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7, textAlign: "center" }}>
              {block.videoCaption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "1.75rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
            <thead>
              <tr>
                {(block.tableHeaders ?? []).map((h, i) => (
                  <th
                    key={i}
                    style={{ textAlign: "left", padding: "0.55rem 0.8rem", borderBottom: "2px solid currentColor" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(block.tableRows ?? []).map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} style={{ padding: "0.55rem 0.8rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const color = CALLOUT_COLORS[block.calloutVariant ?? "info"];
      return (
        <div
          style={{
            borderLeft: `4px solid ${color}`,
            background: `${color}14`,
            padding: "1rem 1.25rem",
            margin: "1.75rem 0",
            borderRadius: 6,
          }}
        >
          {block.calloutTitle && (
            <p style={{ fontWeight: 600, marginBottom: "0.35rem", color }}>{block.calloutTitle}</p>
          )}
          <p style={{ margin: 0, lineHeight: 1.7 }}>{block.text}</p>
        </div>
      );
    }

    case "spacer":
      return <div style={{ height: block.spacerHeight ?? 40 }} />;

    case "divider":
      return <hr style={{ margin: "2.25rem 0", border: "none", borderTop: "1px solid rgba(0,0,0,0.12)" }} />;

    case "html":
      // Trusted, admin-authored content only (written from the CMS block
      // editor) — never render arbitrary user-submitted HTML this way.
      return <div dangerouslySetInnerHTML={{ __html: block.text || "" }} />;

    case "images": {
      const images = block.images ?? [];
      const cols = block.imageLayout === "two-col" ? 2 : block.imageLayout === "three-col" ? 3 : 1;
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "0.75rem",
            margin: "1.75rem 0",
          }}
        >
          {images.map((img) => (
            <figure key={img.id} style={{ margin: 0 }}>
              <img
                src={resolveImage(img.src)}
                alt={img.altText || img.caption || ""}
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
              {img.caption && (
                <figcaption style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.4rem", textAlign: "center" }}>
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

export default function BlogContent({ content }: { content: BlogSection[] }) {
  return (
    <div>
      {content.map((block) => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </div>
  );
}