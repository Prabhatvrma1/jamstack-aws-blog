# ⚡ JamBlog – Jamstack Site with AWS

A modern, fast, and scalable **Jamstack blog** built with **Next.js**, **Contentful CMS**, and deployed on **AWS Amplify** with **S3** and **CloudFront**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![AWS](https://img.shields.io/badge/AWS-Amplify-orange?logo=amazonaws)
![Contentful](https://img.shields.io/badge/CMS-Contentful-blue?logo=contentful)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## 🏗️ Architecture

```
Frontend (Next.js)
       ↓
AWS Amplify (CI/CD + Hosting + CDN)
       ↓
Headless CMS (Contentful)
       ↓
AWS S3 (Static Assets)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm
- (Optional) Contentful account for CMS data

### Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** Without Contentful credentials, the app runs with built-in demo data.

### Connect Contentful CMS

1. Create a free account at [contentful.com](https://www.contentful.com/)
2. Create a new **Space**
3. Create a **Content Model** called `blogPost` with these fields:
   | Field | Type |
   |-------|------|
   | `title` | Short Text |
   | `slug` | Short Text (unique) |
   | `description` | Short Text |
   | `content` | Rich Text |
   | `date` | Date |
   | `author` | Short Text |
   | `tags` | Short Text (list) |
   | `coverImage` | Media (optional) |
4. Add some sample blog posts
5. Go to **Settings → API Keys** and copy your **Space ID** and **Content Delivery API access token**
6. Update `.env.local`:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

---

## ☁️ Deploy to AWS Amplify

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "initial commit: Jamstack blog"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Connect to AWS Amplify

1. Sign in to the **AWS Management Console**
2. Navigate to **AWS Amplify**
3. Click **New App → Host Web App**
4. Select **GitHub** and authorize access
5. Choose your repo and branch (`main`)
6. Amplify auto-detects the `amplify.yml` build settings
7. Add **Environment Variables** in Amplify Console:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
8. Click **Save and Deploy**

✅ Done! Your site is live with CI/CD — every push auto-deploys.

### Step 3: (Optional) S3 Static Hosting

If you want to use S3 as an alternative:

1. Run `npm run build` locally
2. Open **AWS S3 Console** → Create a new bucket
3. Enable **Static Website Hosting** in bucket Properties
4. Upload the contents of the `out/` directory (add `output: 'export'` to `next.config.ts` first)
5. Set **Bucket Policy** to allow public read access

### Step 4: (Optional) CloudFront CDN

1. Go to **AWS CloudFront**
2. Create a new distribution pointing to your S3 bucket or Amplify URL
3. This gives you global CDN caching for fast load times

### Step 5: (Optional) Custom Domain & SSL

1. Register or transfer domain in **AWS Route 53**
2. Use **AWS Certificate Manager (ACM)** to provision a free SSL certificate
3. Attach the certificate and domain to your Amplify app or CloudFront distribution

---

## 📁 Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx      # Dynamic blog post page
│   │   └── page.tsx           # Blog listing page
│   ├── components/
│   │   ├── BlogCard.tsx       # Blog post card component
│   │   ├── Footer.tsx         # Site footer
│   │   └── Header.tsx         # Navigation header
│   ├── globals.css            # Design system & animations
│   ├── layout.tsx             # Root layout with Header/Footer
│   └── page.tsx               # Homepage
├── lib/
│   └── contentful.ts          # Contentful CMS client & helpers
├── .env.local                 # CMS credentials (not committed)
└── amplify.yml                # AWS Amplify build config
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **Contentful** | Headless CMS |
| **AWS Amplify** | CI/CD & Hosting |
| **AWS S3** | Static asset storage |
| **AWS CloudFront** | CDN for global distribution |
| **AWS Route 53** | DNS management |
| **AWS ACM** | SSL/TLS certificates |

## 📄 License

This project is built for educational purposes.
