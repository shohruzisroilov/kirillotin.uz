"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Search, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { Post } from "@/lib/posts";
import { Script } from "@/lib/converter";
import { useLanguage } from "@/components/LanguageContext";
import { targetScriptFromLocale } from "@/lib/blogTransliteration";
import { convertText } from "@/lib/converter";

export type PostMetadata = Omit<Post, "content">;

interface BlogIndexViewProps {
  posts: PostMetadata[];
}

export function BlogIndexView({ posts }: BlogIndexViewProps) {
  const { locale, t } = useLanguage();
  const defaultScript = targetScriptFromLocale(locale);
  const [manualScript, setManualScript] = useState<Script | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeScript: Script = manualScript ?? defaultScript;

  // Filtered and transliterated posts
  const processedPosts = useMemo(() => {
    return posts.map((post) => {
      const title =
        activeScript === "cyrillic"
          ? post.title
          : convertText(post.title, "cyrillic", activeScript);
      const description =
        activeScript === "cyrillic"
          ? post.description
          : convertText(post.description, "cyrillic", activeScript);

      return {
        ...post,
        displayTitle: title,
        displayDescription: description,
      };
    });
  }, [posts, activeScript]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return processedPosts;
    const q = searchQuery.toLowerCase().trim();
    // Also transliterate query to match Cyrillic posts if user typed Latin
    const qCyr = convertText(q, "latin-old", "cyrillic").toLowerCase();

    return processedPosts.filter((post) => {
      return (
        post.displayTitle.toLowerCase().includes(q) ||
        post.displayDescription.toLowerCase().includes(q) ||
        post.title.toLowerCase().includes(qCyr) ||
        post.description.toLowerCase().includes(qCyr) ||
        post.keywords.some((k) => k.toLowerCase().includes(q) || k.toLowerCase().includes(qCyr))
      );
    });
  }, [processedPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>{t("blogBackToHome")}</span>
          </Link>
        </nav>

        {/* Page Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400 text-xs font-bold mb-3">
            <BookOpen size={13} />
            <span>{t("blogEyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t("blogTitle")}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("blogSubtitle")}
          </p>
        </header>

        {/* Controls Bar: Search & Script Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("blogSearchPlaceholder")}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 border border-transparent focus:border-primary-500 transition-all"
            />
          </div>

          {/* Script Switcher */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setManualScript("latin-old")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeScript === "latin-old"
                  ? "bg-primary-600 text-white shadow-subtle"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                activeScript === "latin-old" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}>
                Oʻ
              </span>
              <span>{t("scriptLatinOld")}</span>
            </button>

            <button
              type="button"
              onClick={() => setManualScript("cyrillic")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeScript === "cyrillic"
                  ? "bg-primary-600 text-white shadow-subtle"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                activeScript === "cyrillic" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}>
                К
              </span>
              <span>{t("scriptCyrillic")}</span>
            </button>

            <button
              type="button"
              onClick={() => setManualScript("latin-new")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeScript === "latin-new"
                  ? "bg-primary-600 text-white shadow-subtle"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                activeScript === "latin-new" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}>
                A
              </span>
              <span>{t("scriptLatinNew")}</span>
            </button>
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hech qanday maqola topilmadi.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <time dateTime={post.date}>{post.date}</time>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readingMinutes} {t("blogReadTime")}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.displayTitle}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {post.displayDescription}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>{t("blogReadMore")}</span>
                  <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
