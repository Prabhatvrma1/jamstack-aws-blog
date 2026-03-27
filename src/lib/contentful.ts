import { createClient } from "contentful";

// Server-side only — keys are NOT exposed to the browser
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: unknown; // Contentful Rich Text document
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Parse a Contentful entry into our BlogPost shape.
 */
function parsePost(item: any): BlogPost {
  const f = item.fields ?? {};
  const sys = item.sys ?? {};
  return {
    slug: f.slug ?? sys.id ?? "",
    title: f.title ?? "Untitled",
    description: f.description ?? "",
    content: f.content ?? null,
    date: f.date ?? sys.createdAt ?? new Date().toISOString(),
    author: f.author ?? "Admin",
    tags: f.tags ?? [],
    coverImage: f.coverImage?.fields?.file?.url
      ? `https:${f.coverImage.fields.file.url}`
      : undefined,
  };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// ----- Demo data used when Contentful is not configured -----
const DEMO_POSTS: BlogPost[] = [
  {
    slug: "getting-started-with-jamstack",
    title: "Getting Started with Jamstack",
    description:
      "Learn how Jamstack architecture decouples your frontend from the backend to create blazing-fast, secure websites.",
    content: null,
    date: "2026-03-25",
    author: "Prabh",
    tags: ["Jamstack", "Web Dev", "AWS"],
  },
  {
    slug: "aws-amplify-deep-dive",
    title: "AWS Amplify Deep Dive",
    description:
      "A comprehensive guide to deploying and scaling your web applications with AWS Amplify, CI/CD, and CloudFront.",
    content: null,
    date: "2026-03-22",
    author: "Prabh",
    tags: ["AWS", "Amplify", "CI/CD"],
  },
  {
    slug: "headless-cms-comparison",
    title: "Headless CMS Comparison: Contentful vs Sanity vs Strapi",
    description:
      "We compare the top headless CMS options to help you choose the right one for your next Jamstack project.",
    content: null,
    date: "2026-03-18",
    author: "Prabh",
    tags: ["CMS", "Contentful", "Sanity"],
  },
  {
    slug: "s3-static-hosting-guide",
    title: "S3 Static Hosting: The Complete Guide",
    description:
      "Set up AWS S3 as a static website host with custom domains, SSL, and CloudFront CDN for global performance.",
    content: null,
    date: "2026-03-15",
    author: "Prabh",
    tags: ["AWS", "S3", "Hosting"],
  },
  {
    slug: "cicd-for-frontend-devs",
    title: "CI/CD for Frontend Developers",
    description:
      "Automate your build, test, and deployment pipeline using GitHub Actions and AWS Amplify for modern web apps.",
    content: null,
    date: "2026-03-10",
    author: "Prabh",
    tags: ["DevOps", "CI/CD", "GitHub Actions"],
  },
  {
    slug: "nextjs-server-components",
    title: "Next.js Server Components Explained",
    description:
      "Understand React Server Components in Next.js — how they work, why they matter, and when to use them.",
    content: null,
    date: "2026-03-06",
    author: "Prabh",
    tags: ["Next.js", "React", "Server Components"],
  },
];

const DEMO_CONTENT = {
  nodeType: "document",
  content: [
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value:
            "This is a demo blog post. Connect your Contentful CMS to see real content here. The Jamstack architecture separates the frontend from backend services, giving you incredible performance, security, and developer experience.",
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: "heading-2",
      content: [
        { nodeType: "text", value: "Why Jamstack?", marks: [], data: {} },
      ],
      data: {},
    },
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value:
            "Jamstack stands for JavaScript, APIs, and Markup. By pre-rendering pages and serving them from a CDN, you get near-instant load times. With headless CMS integration, content editors can manage content independently while developers maintain the codebase.",
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: "heading-2",
      content: [
        { nodeType: "text", value: "How We Built This", marks: [], data: {} },
      ],
      data: {},
    },
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value:
            "This site is built with Next.js and deployed via AWS Amplify. Content is managed through Contentful, a powerful headless CMS that provides a GraphQL and REST API for fetching structured content.",
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
  ],
  data: {},
};

/**
 * Check if Contentful is configured with real credentials (not placeholders).
 */
function isConfigured(): boolean {
  const spaceId = process.env.CONTENTFUL_SPACE_ID ?? "";
  const token = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
  return Boolean(
    spaceId && token &&
    !spaceId.includes("your_") && !token.includes("your_")
  );
}

/**
 * Get all blog posts. Falls back to demo data when CMS is not configured.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isConfigured()) {
    return DEMO_POSTS;
  }

  try {
    const res = await client.getEntries({
      content_type: "blogpost",
      order: ["-sys.createdAt"],
    });
    return res.items.map((item) => parsePost(item));
  } catch (error) {
    console.error("Contentful fetch error:", error);
    return DEMO_POSTS;
  }
}

/**
 * Get a single blog post by slug. Falls back to demo data when CMS is not configured.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isConfigured()) {
    const post = DEMO_POSTS.find((p) => p.slug === slug) ?? null;
    if (post) {
      return { ...post, content: DEMO_CONTENT };
    }
    return null;
  }

  try {
    const res = await client.getEntries({
      content_type: "blogpost",
      "fields.slug": slug,
      limit: 1,
    } as Parameters<typeof client.getEntries>[0]);

    if (res.items.length === 0) return null;
    return parsePost(res.items[0]);
  } catch (error) {
    console.error("Contentful fetch error:", error);
    // Fall back to demo data on error
    const post = DEMO_POSTS.find((p) => p.slug === slug) ?? null;
    if (post) return { ...post, content: DEMO_CONTENT };
    return null;
  }
}
