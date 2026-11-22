import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/lib/posts";
import { convertText } from "@/lib/converter";
import { BlogPostView } from "@/components/BlogPostView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirillotin.uz";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const latinTitle = convertText(post.title, "cyrillic", "latin-old");
  const latinDesc = convertText(post.description, "cyrillic", "latin-old");
  const dualTitle = `${latinTitle} | ${post.title}`;
  const dualDesc = `${latinDesc} — ${post.description}`;

  const latinKeywords = post.keywords.map((k) =>
    convertText(k, "cyrillic", "latin-old")
  );
  const allKeywords = Array.from(new Set([...post.keywords, ...latinKeywords]));

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: dualTitle,
    description: dualDesc,
    keywords: allKeywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: dualTitle,
      description: dualDesc,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["Shohruzdev"],
    },
    twitter: {
      card: "summary_large_image",
      title: dualTitle,
      description: dualDesc,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const latinTitle = convertText(post.title, "cyrillic", "latin-old");

  const Content = post.content;
  const postMetadata = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readingMinutes: post.readingMinutes,
    keywords: post.keywords,
  };

  // Related posts — boshqa 3 ta maqola (serializable)
  const related = posts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      readingMinutes: p.readingMinutes,
      keywords: p.keywords,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    alternativeHeadline: latinTitle,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Shohruzdev",
      url: "https://t.me/Shohruz_Isroilov",
    },
    publisher: {
      "@type": "Organization",
      name: "Kirill ↔ Lotin Konvertor",
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    inLanguage: ["uz-Latn", "uz-Cyrl"],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa / Бош саҳифа", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog / Блог", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: `${latinTitle} / ${post.title}`, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogPostView post={postMetadata} related={related}>
        <Content />
      </BlogPostView>
    </>
  );
}
