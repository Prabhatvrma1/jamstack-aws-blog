import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold gradient-text">JamBlog</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              A modern Jamstack blog powered by Next.js, Contentful CMS, and
              deployed on AWS Amplify.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted hover:text-accent-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted hover:text-accent-light transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "AWS Amplify", "Contentful", "S3", "CloudFront", "Tailwind CSS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface-light border border-surface-border text-muted"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-surface-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} JamBlog. Built for Jamstack with AWS.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted">
            <span>Made with</span>
            <span className="text-red-400">♥</span>
            <span>using Jamstack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
