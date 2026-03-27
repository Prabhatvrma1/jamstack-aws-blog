import type { Metadata } from "next";
import { getAllPosts } from "@/lib/contentful";
import BlogCard from "../components/BlogCard";

export const metadata: Metadata = {
  title: "Blog – JamBlog",
  description:
    "Read articles about Jamstack architecture, AWS services, headless CMS, and modern web development.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-2xl mb-14">
        <p className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All Articles
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          Insights on Jamstack, AWS cloud services, headless CMS integration,
          and modern web development best practices.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-xl font-semibold mb-2">No posts yet</p>
          <p className="text-muted">
            Connect your Contentful CMS to start publishing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <BlogCard post={post} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
