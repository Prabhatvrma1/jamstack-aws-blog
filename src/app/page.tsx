import Link from "next/link";
import { getAllPosts } from "@/lib/contentful";

export const revalidate = 60;
import BlogCard from "./components/BlogCard";

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float delay-500" />

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs font-medium text-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Powered by AWS Amplify + Contentful CMS
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl font-black leading-[1.1] mb-6">
              The Modern{" "}
              <span className="gradient-text">Jamstack</span>
              <br />
              Blog Platform
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Built with Next.js, Contentful CMS, and deployed on AWS. Blazing
              fast, secure, and infinitely scalable.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap items-center justify-center gap-4">
              <Link href="/blog" className="btn-primary animate-pulse-glow">
                Explore Blog →
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ===== TECH STRIP ===== */}
      <section className="border-y border-surface-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-muted">
            {[
              { icon: "⚡", label: "Next.js" },
              { icon: "☁️", label: "AWS Amplify" },
              { icon: "📝", label: "Contentful" },
              { icon: "🗄️", label: "S3" },
              { icon: "🌐", label: "CloudFront" },
              { icon: "🔒", label: "HTTPS/SSL" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors"
              >
                <span className="text-lg">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED POSTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">
              Latest Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex btn-outline !py-2 !px-5 text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, i) => (
            <div
              key={post.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <BlogCard post={post} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="btn-outline text-sm">
            View All Posts →
          </Link>
        </div>
      </section>

      {/* ===== ARCHITECTURE SECTION ===== */}
      <section className="border-t border-surface-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">
              Architecture
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              A modern Jamstack architecture that separates content, code, and
              deployment for maximum performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚛️",
                title: "Next.js Frontend",
                desc: "Server-rendered React pages with static generation for blazing fast load times. Built with TypeScript and Tailwind CSS.",
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: "📡",
                title: "Contentful CMS",
                desc: "Headless CMS for structured content management. Editors can publish content via a visual interface — no code changes needed.",
                color: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: "☁️",
                title: "AWS Infrastructure",
                desc: "Amplify for CI/CD, S3 for storage, CloudFront CDN for global distribution, and ACM for SSL certificates.",
                color: "from-amber-500/20 to-orange-500/20",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="glass card-hover rounded-2xl p-8 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-5`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="relative rounded-3xl overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />

          <div className="relative z-10 text-center px-8 py-16 md:py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Jamstack Site?
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Clone this repo, connect your Contentful space, and deploy to AWS
              Amplify in minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blog"
                className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors"
              >
                Read the Blog
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white font-medium px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
