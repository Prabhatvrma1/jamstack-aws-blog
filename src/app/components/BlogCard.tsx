import Link from "next/link";
import type { BlogPost } from "@/lib/contentful";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Deterministic gradient per card
  const gradients = [
    "from-indigo-500/20 to-purple-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-cyan-500/20 to-blue-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-orange-500/20 to-rose-500/20",
    "from-violet-500/20 to-fuchsia-500/20",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/blog/${post.slug}`} className="block group" id={`blog-card-${post.slug}`}>
      <article className="glass card-hover rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Color header block */}
        <div
          className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">
            {["📝", "☁️", "🔗", "🗄️", "🚀", "⚛️"][index % 6]}
          </span>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-accent-light transition-colors leading-snug">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-surface-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
