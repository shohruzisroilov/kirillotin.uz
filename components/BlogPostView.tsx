"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight, Share2, Check } from "lucide-react";
import { Post } from "@/lib/posts";
import { Script } from "@/lib/converter";
import { useLanguage } from "@/components/LanguageContext";
import { targetScriptFromLocale, transliterateReactNodes } from "@/lib/blogTransliteration";
import { convertText } from "@/lib/converter";

export type PostMetadata = Omit<Post, "content">;

interface BlogPostViewProps {
  post: PostMetadata;
  related: PostMetadata[];
  children: React.ReactNode;
}

export function BlogPostView({ post, related, children }: BlogPostViewProps) {
  const { locale, t } = useLanguage();
  const defaultScript = targetScriptFromLocale(locale);
  const [manualScript, setManualScript] = useState<Script | null>(null);
  const [copied, setCopied] = useState(false);

  // Active script: user manual selection has priority, otherwise site locale
  const activeScript: Script = manualScript ?? defaultScript;

  // Transliterate post metadata
  const currentTitle =
    activeScript === "cyrillic"
      ? post.title
      : convertText(post.title, "cyrillic", activeScript);

  const currentDesc =
    activeScript === "cyrillic"
      ? post.description
      : convertText(post.description, "cyrillic", activeScript);

  // Transliterate JSX content
  const renderedContent =
    activeScript === "cyrillic"
      ? children
      : transliterateReactNodes(children, activeScript);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              <ArrowLeft size={13} />
              <span>{t("blogBackToHome")}</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <Link
              href="/blog"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              {t("navBlog")}
            </Link>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
            title="Havoladan nusxa olish"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
            <span>{copied ? "Nusxalandi" : "Ulashish"}</span>
          </button>
        </nav>

        {/* Article Container */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-card">
          
          {/* Header */}
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
            
            {/* Script Switcher Bar (Interactive) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 px-2">
                <Sparkles size={14} className="text-primary-500" />
                <span>{t("blogScriptToggle")}</span>
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setManualScript("latin-old")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeScript === "latin-old"
                      ? "bg-primary-600 text-white shadow-subtle"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                    activeScript === "latin-old" ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
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
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                    activeScript === "cyrillic" ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
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
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                    activeScript === "latin-new" ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}>
                    A
                  </span>
                  <span>{t("scriptLatinNew")}</span>
                </button>
              </div>
            </div>

            {/* Meta (Date & Reading Time) */}
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3 font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                <span>{post.readingMinutes} {t("blogReadTime")}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
              {currentTitle}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {currentDesc}
            </p>
          </header>

          {/* Body Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:underline prose-code:text-primary-700 dark:prose-code:text-primary-300 prose-code:bg-primary-50 dark:prose-code:bg-primary-950/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-mono prose-code:before:content-none prose-code:after:content-none">
            {renderedContent}
          </div>

        </article>

        {/* CTA Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl border border-primary-200 dark:border-primary-900/60 bg-gradient-to-br from-primary-50/60 to-sky-50/40 dark:from-primary-950/30 dark:to-slate-900/40 text-center shadow-card">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
            {t("blogCtaTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
            {t("blogCtaSubtitle")}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-95 text-white text-sm font-bold shadow-subtle transition-all"
          >
            <span>{t("blogCtaButton")}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-6">
              {t("blogRelatedTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => {
                const relTitle =
                  activeScript === "cyrillic"
                    ? rel.title
                    : convertText(rel.title, "cyrillic", activeScript);
                const relDesc =
                  activeScript === "cyrillic"
                    ? rel.description
                    : convertText(rel.description, "cyrillic", activeScript);

                return (
                  <article
                    key={rel.slug}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mb-2 font-medium">
                        <Clock size={12} />
                        <span>{rel.readingMinutes} {t("blogReadTime")}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                        <Link href={`/blog/${rel.slug}`}>{relTitle}</Link>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {relDesc}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{t("blogReadMore")}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
