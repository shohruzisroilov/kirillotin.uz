import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import { BlogIndexView } from "@/components/BlogIndexView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirillotin.uz";

export const metadata: Metadata = {
  title:
    "Blog — O'zbek tili, kirill va lotin qoidalari, maqolalar | Блог — Кирил Лотин қоидалари",
  description:
    "O'zbek tilidagi kirill va lotin yozuvi haqida foydali maqolalar: tarix, qoidalar, apostrof ishlatish, X/H farqi, Word fayllarni o'girish. Ўзбек тилидаги кирил ва лотин ёзуви бўйича қўлланмалар.",
  alternates: { canonical: "/blog" },
  keywords: [
    "kiril lotin blog",
    "o'zbek tili qoidalari",
    "lotin alifbosi maqolalar",
    "кирил лотин блог",
    "ўзбек тили қоидалари",
    "лотин алифбоси тарихи",
    "word kiril lotin",
  ],
  openGraph: {
    title:
      "Blog — O'zbek tili, kirill va lotin qoidalari | Блог — Кирил Лотин",
    description:
      "O'zbek tilidagi kirill va lotin yozuvi haqida foydali maqolalar va yo'riqnomalar.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const serializablePosts = sorted.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    readingMinutes: p.readingMinutes,
    keywords: p.keywords,
  }));

  return <BlogIndexView posts={serializablePosts} />;
}
