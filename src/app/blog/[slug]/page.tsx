import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Refresh data every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} – JamBlog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent-light transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Blog
      </Link>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent-light"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 animate-fade-in-up">
        {post.title}
      </h1>

      {post.description && (
        <p className="text-xl text-muted mb-8 leading-relaxed animate-fade-in-up delay-75">
          {post.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted mb-10 pb-8 border-b border-surface-border animate-fade-in-up delay-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {post.author.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{post.author}</span>
        </div>
        <span>·</span>
        <time dateTime={post.date}>{formattedDate}</time>
      </div>

      {/* Content */}
      <div className="prose-custom animate-fade-in-up delay-200">
        {post.content ? (
          documentToReactComponents(post.content as Document)
        ) : (
          <p className="text-muted italic">
            Content will appear here once connected to Contentful CMS.
          </p>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 pt-8 border-t border-surface-border">
        <Link
          href="/blog"
          className="btn-primary text-sm inline-flex items-center gap-2"
        >
          ← More Articles
        </Link>
      </div>
    </article>
  );
}
