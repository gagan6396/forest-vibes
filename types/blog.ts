// ================================
// Enums / literal unions
// ================================
export type ImageLayout = "single" | "two-col" | "three-col" | "wide";
export type ListType = "unordered" | "ordered";
export type CalloutVariant = "info" | "tip" | "success" | "warning" | "danger";
export type BlogStatus = "Draft" | "Published";

export type BlockType =
  | "heading"
  | "subheading"
  | "paragraph"
  | "images"
  | "divider"
  | "list"
  | "quote"
  | "code"
  | "video"
  | "table"
  | "callout"
  | "spacer"
  | "html";

// ================================
// Image (used inside an "images" content block)
// ================================
export interface BlogImage {
  id: string;
  src: string;
  caption: string;
  altText: string;
  /** Transient — uncommitted text in the "paste URL" input, not persisted. */
  tempUrlInput?: string;
}

// ================================
// A single content block
// ================================
export interface BlogSection {
  id: string;
  type: BlockType;

  // heading / subheading / paragraph / quote / code / callout / html
  text?: string;

  // list block
  listType?: ListType;
  listItems?: string[];

  // quote block
  quoteAuthor?: string;

  // code block
  codeLanguage?: string;

  // video block
  videoUrl?: string;
  videoCaption?: string;

  // table block
  tableHeaders?: string[];
  tableRows?: string[][];

  // callout block
  calloutVariant?: CalloutVariant;
  calloutTitle?: string;

  // spacer block
  spacerHeight?: number;

  // images block
  imageLayout?: ImageLayout;
  images?: BlogImage[];
}

// ================================
// Full form values (what the add/edit form builds and sends as
// the "data" JSON field)
// ================================
export interface BlogFormValues {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  content: BlogSection[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];

  status: BlogStatus;
}

// ================================
// Validation errors shown under each field
// ================================
export interface BlogFormErrors {
  title?: string;
  slug?: string;
  excerpt?: string;
  date?: string;
  coverImage?: string;
  content?: string;
}

// ================================
// Raw document as returned by the backend (GET /api/blog, /api/blog/:id)
// ================================
export interface Blog extends Omit<BlogFormValues, "date"> {
  _id: string;
  date: string;
  schemaMarkup?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ================================
// Normalised shape used by the admin blog list page
// ================================
export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  sectionCount: number;
  status: BlogStatus;
}