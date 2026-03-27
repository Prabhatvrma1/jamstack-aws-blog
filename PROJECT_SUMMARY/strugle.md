# Project Summary: Jamstack Site with AWS (JamBlog ⚡)

## 🎯 Project Objective
To build a modern, high-performance, and scalable Jamstack blog using **AWS Services**, decoupled from the content layer via a **Headless CMS**.

---

## 🏗️ Technical Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion (Animations).
- **CMS:** Contentful (Headless CMS) – Management of Blog Posts via API.
- **Hosting:** 
  1.  **AWS Amplify:** Managed Next.js SSR/ISR hosting with CI/CD + Route 53.
  2.  **AWS S3:** Alternative static hosting for the `/out` build directory.
- **DNS:** Hostinger Custom Domain (`prabhatvrma.in`) connected via AWS Nameservers.
- **Auth/SSL:** AWS Amplify Managed SSL (HTTPS) certificate.

---

## ✅ Completed Implementation Steps

### Step 1: Frontend Development
- Developed a **Dark-Themed** UI with glassmorphism and gradient effects.
- Created dynamic routes at `/blog/[slug]` to render articles from Contentful.
- Integrated **Markdown/Rich Text** rendering using `@contentful/rich-text-react-renderer`.

### Step 2: Contentful CMS Integration
- Defined the `blogpost` content model with fields: `title`, `slug`, `description`, `content`, `date`, `author`.
- Created a robust client in `src/lib/contentful.ts` with local demo fallback logic.
- Implemented **ISR (Incremental Static Regeneration)** using `export const revalidate = 60;`. This ensures new blog posts appear automatically without a code rebuild.

### Step 3: Deployment to AWS Amplify (Primary)
- Connected the GitHub repository `jamstack-aws-blog`.
- Configured Environment Variables in Amplify for `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`.
- Enabled CI/CD: The site automatically rebuilds every time you `git push`.

### Step 4: S3 Static Hosting (Alternative)
- Ran `npm run build` to generate the static `/out` folder.
- Created an S3 Bucket `amstack-blog-prabhat-2026`.
- Configured **Static Website Hosting** and a Public Read Bucket Policy.
- Successfully uploaded the site to the bucket root.

### Step 5: Custom Domain Configuration
- Used **AWS Amplify Domain Management** to add `prabhatvrma.in`.
- Generated 4 AWS Name Servers (`ns-....awsdns...`).
- Updated the **Hostinger Nameservers** to point to AWS.
- Configured the `www` to root redirect.

---

## 🔗 Key Links
- **GitHub:** `https://github.com/Prabhatvrma1/jamstack-aws-blog`
- **Amplify (Pro Mode):** `https://main.d20uwhdu8hm9im.amplifyapp.com`
- **S3 (Static Mode):** `http://amstack-blog-prabhat-2026.s3-website.eu-north-1.amazonaws.com`
- **Custom Domain:** `https://prabhatvrma.in` (Propagating...)

---

## 🛠️ Commands for Future Reference
- `npm run dev` — Start local development server.
- `npm run build` — Create the static export in the `out/` folder.
- `git add . && git commit -m "update" && git push` — Deploy changes to AWS Amplify.

---

### Congratulations!
You have successfully built a production-ready Jamstack platform. Your portfolio is now technically complete and ready for show! 🏜️🏆🚀
