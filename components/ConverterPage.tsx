"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Copy,
  Download,
  Trash2,
  Check,
  ChevronDown,
  X,
  Moon,
  Sun,
  Menu,
  CreditCard,
  ArrowLeftRight,
  Sparkles,
  Info,
  Layers,
  Zap,
  HelpCircle,
  BookOpen,
  Send,
  Heart,
  FileText,
  FileCheck2,
  Clock,
  ArrowRight,
  ClipboardPaste,
  ShieldCheck,
  Smartphone,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/FileUploader";
import { HeroIllustration } from "@/components/HeroIllustration";
import { SeoContent } from "@/components/SeoContent";
import { useToast } from "@/components/ToastContext";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import { posts } from "@/lib/posts";
import {
  Script,
  convertText,
  detectScript,
} from "@/lib/converter";
import {
  copyToClipboard,
  downloadAsTextFile,
  downloadConvertedDocx,
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/lib/utils";

export function ConverterPage() {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = t("metaTitle");
    }
  }, [locale, mounted, t]);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fromScript, setFromScript] = useState<Script>("cyrillic");
  const [toScript, setToScript] = useState<Script>("latin-new");
  const [autoDetect, setAutoDetect] = useState(true);
  const [fileName, setFileName] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState("");
  const [fileConverted, setFileConverted] = useState<{
    name: string;
    text: string;
    fromScript: Script;
    toScript: Script;
  } | null>(null);
  const [fileConverting, setFileConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);

  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Close download menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(event.target as Node)
      ) {
        setDownloadOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyCard = async () => {
    const ok = await copyToClipboard("9860190110799466");
    if (ok) {
      setCardCopied(true);
      addToast(t("modalDonateCopiedToast"), "success", 1800);
      setTimeout(() => setCardCopied(false), 2200);
    }
  };

  /* Persist settings */
  useEffect(() => {
    const savedIn = getFromLocalStorage("converter-input");
    const savedOut = getFromLocalStorage("converter-output");
    const savedFrom = getFromLocalStorage("converter-from-script") as Script | null;
    const savedTo = getFromLocalStorage("converter-to-script") as Script | null;
    const savedAuto = getFromLocalStorage("converter-auto-detect");

    if (savedIn) setInput(savedIn);
    if (savedOut) setOutput(savedOut);

    if (
      savedFrom &&
      (savedFrom === "cyrillic" ||
        savedFrom === "latin-old" ||
        savedFrom === "latin-new")
    ) {
      setFromScript(savedFrom);
    }

    if (
      savedTo &&
      (savedTo === "cyrillic" ||
        savedTo === "latin-old" ||
        savedTo === "latin-new")
    ) {
      setToScript(savedTo);
    }

    if (savedAuto !== null) {
      setAutoDetect(savedAuto === "true");
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("converter-input", input);
  }, [input]);
  useEffect(() => {
    saveToLocalStorage("converter-output", output);
  }, [output]);
  useEffect(() => {
    saveToLocalStorage("converter-from-script", fromScript);
  }, [fromScript]);
  useEffect(() => {
    saveToLocalStorage("converter-to-script", toScript);
  }, [toScript]);
  useEffect(() => {
    saveToLocalStorage("converter-auto-detect", String(autoDetect));
  }, [autoDetect]);

  const convert = useCallback((text: string, from: Script, to: Script): string => {
    if (!text.trim()) return "";
    return convertText(text, from, to);
  }, []);

  /* Auto-detect script when input changes */
  const handleInputChange = useCallback(
    (text: string) => {
      setInput(text);
      if (text.trim() && autoDetect) {
        const detected = detectScript(text);
        setFromScript(detected);
        if (toScript === detected) {
          setToScript(detected === "cyrillic" ? "latin-new" : "cyrillic");
        }
      }
    },
    [autoDetect, toScript]
  );

  const handleSelectFrom = (s: Script) => {
    setAutoDetect(false);
    setFromScript(s);
    setFromDropdownOpen(false);
    if (toScript === s) {
      if (s === "cyrillic") setToScript("latin-new");
      else if (s === "latin-new") setToScript("cyrillic");
      else if (s === "latin-old") setToScript("latin-new");
    }
  };

  const handleSelectTo = (s: Script) => {
    setToScript(s);
    setToDropdownOpen(false);
    if (fromScript === s) {
      setAutoDetect(false);
      if (s === "cyrillic") setFromScript("latin-new");
      else if (s === "latin-new") setFromScript("cyrillic");
      else if (s === "latin-old") setFromScript("latin-new");
    }
  };

  const handleToggleAuto = () => {
    const nextAuto = !autoDetect;
    setAutoDetect(nextAuto);
    if (nextAuto && input.trim()) {
      const detected = detectScript(input);
      setFromScript(detected);
      if (toScript === detected) {
        setToScript(detected === "cyrillic" ? "latin-new" : "cyrillic");
      }
    }
  };

  const handleSwap = () => {
    setAutoDetect(false);
    const prevFrom = fromScript;
    const prevTo = toScript;
    setFromScript(prevTo);
    setToScript(prevFrom);

    if (output.trim()) {
      const newIn = output;
      setInput(newIn);
      setOutput(convertText(newIn, prevTo, prevFrom));
    }
  };

  const getScriptLabel = (s: Script): string => {
    switch (s) {
      case "cyrillic":
        return t("scriptCyrillic");
      case "latin-old":
        return t("scriptLatinOld");
      case "latin-new":
        return t("scriptLatinNew");
    }
  };

  const getScriptLetterBadge = (s: Script): string => {
    switch (s) {
      case "cyrillic":
        return "К";
      case "latin-old":
        return "Oʻ";
      case "latin-new":
        return "A";
    }
  };

  /* Auto-convert whenever input, fromScript, or toScript changes */
  useEffect(() => {
    setOutput(convert(input, fromScript, toScript));
  }, [input, fromScript, toScript, convert]);

  const closeDonateModal = useCallback(() => {
    setDonateOpen(false);
    saveToLocalStorage("converter-donate-last-prompted", String(Date.now()));
  }, []);

  const triggerDonatePrompt = useCallback(() => {
    const lastPrompted = getFromLocalStorage("converter-donate-last-prompted");
    const now = Date.now();
    const COOLDOWN = 5 * 24 * 60 * 60 * 1000;
    if (lastPrompted && now - Number(lastPrompted) < COOLDOWN) {
      return;
    }
    setTimeout(() => {
      setDonateOpen(true);
      saveToLocalStorage("converter-donate-last-prompted", String(now));
    }, 1200);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output.trim()) {
      addToast(t("toastNoTextToCopy"), "info");
      return;
    }
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      addToast(t("toastCopied"), "success", 1500);
      setTimeout(() => setCopied(false), 2000);
      triggerDonatePrompt();
    } else {
      addToast(t("toastCopyError"), "error");
    }
  }, [output, addToast, t, triggerDonatePrompt]);

  const handleDownloadTxt = useCallback(() => {
    if (!output.trim()) {
      addToast(t("toastNoTextToDownload"), "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "kirillotin";
    downloadAsTextFile(output, `${base}_converted.txt`);
    setDownloadOpen(false);
    triggerDonatePrompt();
  }, [output, fileName, addToast, t, triggerDonatePrompt]);

  const handleDownloadDocx = useCallback(async () => {
    if (!output.trim() && !sourceFile) {
      addToast(t("toastNoTextToDownload"), "info");
      return;
    }

    if (sourceFile && sourceFile.name.toLowerCase().endsWith(".docx")) {
      const base = sourceFile.name.replace(/\.[^/.]+$/, "");
      setFileConverting(true);
      try {
        await downloadConvertedDocx(
          sourceFile,
          (txt) => convertText(txt, fromScript, toScript),
          `${base}_converted.docx`
        );
        triggerDonatePrompt();
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : t("toastFileLoadError"),
          "error"
        );
      } finally {
        setFileConverting(false);
        setDownloadOpen(false);
      }
    } else {
      // If user typed text and wants docx, download as txt with notice or txt file
      handleDownloadTxt();
    }
  }, [output, sourceFile, fromScript, toScript, addToast, t, triggerDonatePrompt, handleDownloadTxt]);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleInputChange(text);
          addToast(t("panelPasteAction"), "success", 1200);
        }
      }
    } catch {
      // Fallback
      addToast("Ctrl + V orqali matnni qo'yishingiz mumkin", "info", 1500);
    }
  };

  const handleClear = useCallback(() => {
    const hadContent = input.trim() || output.trim() || fileName || sourceText;
    const snapshot = {
      input,
      output,
      fromScript,
      toScript,
      autoDetect,
      fileName,
      sourceFile,
      sourceText,
      fileConverted,
    };

    setInput("");
    setOutput("");
    setFileName("");
    setSourceFile(null);
    setSourceText("");
    setFileConverted(null);
    setFileConverting(false);
    saveToLocalStorage("converter-input", "");
    saveToLocalStorage("converter-output", "");

    if (hadContent) {
      addToast(t("toastCleared"), "info", {
        duration: 5000,
        action: {
          label: t("toastUndo"),
          onClick: () => {
            setInput(snapshot.input);
            setOutput(snapshot.output);
            setFromScript(snapshot.fromScript);
            setToScript(snapshot.toScript);
            setAutoDetect(snapshot.autoDetect);
            setFileName(snapshot.fileName);
            setSourceFile(snapshot.sourceFile);
            setSourceText(snapshot.sourceText);
            setFileConverted(snapshot.fileConverted);
            saveToLocalStorage("converter-input", snapshot.input);
            saveToLocalStorage("converter-output", snapshot.output);
          },
        },
      });
    }
  }, [
    input,
    output,
    fromScript,
    toScript,
    autoDetect,
    fileName,
    sourceFile,
    sourceText,
    fileConverted,
    addToast,
    t,
  ]);

  const handleFileSelected = (text: string, file: File) => {
    setFileName(file.name);
    setSourceFile(file);
    setSourceText(text);
    setInput(text);
    setFileConverted(null);

    if (autoDetect) {
      const detected = detectScript(text);
      setFromScript(detected);
      if (toScript === detected) {
        setToScript(detected === "cyrillic" ? "latin-new" : "cyrillic");
      }
    }
    addToast(t("toastFileLoaded").replace("{name}", file.name), "success", 1800);
  };

  useEffect(() => {
    if (!sourceText) return;
    setFileConverting(true);
    const result = convert(sourceText, fromScript, toScript);
    setFileConverted({ name: fileName, text: result, fromScript, toScript });
    setFileConverting(false);
  }, [sourceText, fromScript, toScript, fileName, convert]);

  const handleFileClear = () => {
    setFileName("");
    setSourceFile(null);
    setSourceText("");
    setFileConverted(null);
    setFileConverting(false);
  };

  /* Keyboard shortcuts: Ctrl/Cmd+K clear, Ctrl/Cmd+Enter copy */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        handleClear();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleCopy();
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear, handleCopy]);

  /* Word count helper */
  const countWords = (str: string) => {
    const matches = str.trim().match(/\S+/g);
    return matches ? matches.length : 0;
  };

  /* Scroll-aware header */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* FAQ open state */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const year = new Date().getFullYear();

  // Top 3 featured blog posts
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          A. NAVIGATION / HEADER
      ───────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          scrolled
            ? "border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0B1120]/85 backdrop-blur-md shadow-card"
            : "border-transparent bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 select-none group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-xl py-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-subtle group-hover:scale-105 smooth-transition flex-shrink-0">
              <img
                src="/logo.png"
                alt="Kirilllotin.uz logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Kirill <span className="text-primary-500 font-bold" aria-hidden="true">↔</span> Lotin
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                kirillotin.uz
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Asosiy menyu"
            className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300"
          >
            <a
              href="#about"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <Info size={15} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navAbout")}</span>
            </a>
            <a
              href="#features"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <Zap size={15} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navFeatures")}</span>
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <Layers size={15} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navHowItWorks")}</span>
            </a>
            <a
              href="#faq"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <HelpCircle size={15} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navFaq")}</span>
            </a>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <BookOpen size={15} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navBlog")}</span>
            </Link>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 smooth-transition"
            >
              <Send size={14} className="text-slate-400 dark:text-slate-500" />
              <span>{t("navContact")}</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Donat Button */}
            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-subtle smooth-transition"
            >
              <Heart size={14} className="fill-white text-white" />
              <span>{t("navDonate")}</span>
            </button>

            {/* Language Selector Dropdown */}
            {mounted && (
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold smooth-transition focus:outline-none"
                  aria-label="Tilni tanlash"
                >
                  <Globe size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>
                    {locale === "uz-lat"
                      ? "uz"
                      : locale === "uz-cyr"
                      ? "ўз"
                      : locale === "ru"
                      ? "ru"
                      : "en"}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`text-slate-400 transition-transform duration-200 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setLangOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-elevated p-1.5 z-40 animate-fade-in focus:outline-none">
                      {[
                        { code: "uz-lat", label: "O'zbekcha (Lotin)", flag: "🇺🇿" },
                        { code: "uz-cyr", label: "Ўзбекча (Кирилл)", flag: "🇺🇿" },
                        { code: "ru", label: "Русский язык", flag: "🇷🇺" },
                        { code: "en", label: "English", flag: "🇬🇧" },
                      ].map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setLocale(item.code as any);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            locale === item.code
                              ? "bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.flag}</span>
                            <span>{item.label}</span>
                          </span>
                          {locale === item.code && <Check size={14} className="text-primary-500" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                title={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 smooth-transition focus:outline-none"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] px-4 py-4 space-y-1 animate-fade-in shadow-xl">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
            >
              <Info size={16} className="text-slate-400" />
              <span>{t("navAbout")}</span>
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
            >
              <Zap size={16} className="text-slate-400" />
              <span>{t("navFeatures")}</span>
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
            >
              <Layers size={16} className="text-slate-400" />
              <span>{t("navHowItWorks")}</span>
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
            >
              <HelpCircle size={16} className="text-slate-400" />
              <span>{t("navFaq")}</span>
            </a>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
            >
              <BookOpen size={16} className="text-slate-400" />
              <span>{t("navBlog")}</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold text-left"
            >
              <Send size={16} className="text-slate-400" />
              <span>{t("navContact")}</span>
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <main id="main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-y-3.5">

        {/* ─────────────────────────────────────────────────────────
            B. HERO SECTION (Compact & Focused)
        ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className="pt-0.5 pb-0.5 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left max-w-2xl">
              <h1
                id="hero-heading"
                className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight text-slate-900 dark:text-white leading-tight"
              >
                {t("heroTitlePre")}
                <span className="text-primary-500 font-extrabold relative inline-block">
                  {t("heroTitleHighlight")}
                </span>
                {t("heroTitlePost")}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Visual Cyrillic ↔ Latin Illustration (Compact & Elegant) */}
            <div className="flex-shrink-0">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            FILE UPLOADER SECTION (Compact & Elegant)
        ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="uploader-heading">
          <FileUploader
            onFileSelected={handleFileSelected}
            onFileClear={handleFileClear}
            onDownload={handleDownloadDocx}
            currentFileName={fileName}
            converting={fileConverting}
            ready={!!fileConverted}
            directionLabel={`${getScriptLabel(fromScript)} → ${getScriptLabel(toScript)}`}
          />
        </section>

        {/* ─────────────────────────────────────────────────────────
            C. WRITING-SYSTEM CONTROL BAR (Reference Screenshot Top Bar)
        ───────────────────────────────────────────────────────── */}
        <section aria-label="Yozuv tizimini tanlash" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-card">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            
            {/* Left Writing System Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none flex-1">
              
              {/* Kirill Button */}
              <button
                type="button"
                onClick={() => handleSelectFrom("cyrillic")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold smooth-transition whitespace-nowrap ${
                  fromScript === "cyrillic"
                    ? "bg-primary-600 text-white shadow-subtle"
                    : "bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  fromScript === "cyrillic" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}>
                  К
                </span>
                <span>{t("scriptCyrillic")}</span>
                {fromScript === "cyrillic" && autoDetect && (
                  <span className="text-[10px] font-semibold opacity-90 ml-0.5 hidden sm:inline">
                    (Auto)
                  </span>
                )}
              </button>

              {/* Eski Lotin Button */}
              <button
                type="button"
                onClick={() => handleSelectFrom("latin-old")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold smooth-transition whitespace-nowrap ${
                  fromScript === "latin-old"
                    ? "bg-primary-600 text-white shadow-subtle"
                    : "bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  fromScript === "latin-old" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}>
                  Oʻ
                </span>
                <span>{t("scriptLatinOld")}</span>
                {fromScript === "latin-old" && autoDetect && (
                  <span className="text-[10px] font-semibold opacity-90 ml-0.5 hidden sm:inline">
                    (Auto)
                  </span>
                )}
              </button>

              {/* Yangi Lotin Button */}
              <button
                type="button"
                onClick={() => handleSelectFrom("latin-new")}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold smooth-transition whitespace-nowrap ${
                  fromScript === "latin-new"
                    ? "bg-primary-600 text-white shadow-subtle"
                    : "bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  fromScript === "latin-new" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}>
                  A
                </span>
                <span>{t("scriptLatinNew")}</span>
                {fromScript === "latin-new" && autoDetect && (
                  <span className="text-[10px] font-semibold opacity-90 ml-0.5 hidden sm:inline">
                    (Auto)
                  </span>
                )}
              </button>
            </div>

            {/* Right Controls: Swap & Auto-detect Switch */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              
              {/* Swap Button */}
              <button
                type="button"
                onClick={handleSwap}
                title={t("scriptSwap")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 smooth-transition active:scale-95"
              >
                <ArrowLeftRight size={15} />
                <span>{t("scriptSwap")}</span>
              </button>

              <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              {/* Auto Detect Switch */}
              <label
                className="inline-flex items-center gap-2 cursor-pointer select-none"
                title={t("scriptAuto")}
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Sparkles size={14} className="text-primary-500" />
                  <span>{t("scriptAuto")}</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoDetect}
                  onClick={handleToggleAuto}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    autoDetect ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoDetect ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </label>

            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            D. MAIN TWO-PANEL TEXT CONVERTER (Centerpiece)
        ───────────────────────────────────────────────────────── */}
        <section aria-label="Asosiy konvertor" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

            {/* ───────── LEFT PANEL (KIRITISH) ───────── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-400 dark:focus-within:border-primary-600 smooth-transition overflow-hidden">
              
              {/* Left Header */}
              <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                
                {/* Script Selector Pill / Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:border-primary-400 dark:hover:border-primary-600 smooth-transition"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-black">
                      {getScriptLetterBadge(fromScript)}
                    </span>
                    <span>{getScriptLabel(fromScript)}</span>
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${fromDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {fromDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setFromDropdownOpen(false)} />
                      <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-elevated p-1 z-30 animate-fade-in">
                        {(["cyrillic", "latin-old", "latin-new"] as Script[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSelectFrom(s)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                              fromScript === s
                                ? "bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center text-[9px] font-black">
                              {getScriptLetterBadge(s)}
                            </span>
                            <span>{getScriptLabel(s)}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Counters & Trash Action */}
                <div className="flex items-center gap-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                  <span className="tabular-nums">
                    {input.length.toLocaleString()} {t("panelCharCount")}
                  </span>
                  <span>•</span>
                  <span className="tabular-nums">
                    {countWords(input).toLocaleString()} {t("panelWordCount")}
                  </span>
                  <button
                    type="button"
                    onClick={handleClear}
                    title={t("panelQuickClear")}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 smooth-transition"
                    aria-label={t("panelQuickClear")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>

              {/* Left Textarea */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={t("panelInputPlaceholder")}
                  spellCheck="false"
                  className="w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] p-4 sm:p-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg leading-relaxed resize-none outline-none"
                />
              </div>

              {/* Left Footer */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                
                {/* Paste shortcut / action */}
                <button
                  type="button"
                  onClick={handlePaste}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 smooth-transition"
                  title="Ctrl + V"
                >
                  <ClipboardPaste size={14} />
                  <span>{t("panelPasteShortcut")}</span>
                </button>

                {/* Tozalash Button */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 smooth-transition"
                >
                  <Trash2 size={14} />
                  <span>{t("panelInputClear")}</span>
                </button>

              </div>

            </div>

            {/* Center Floating Swap Button (Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <button
                type="button"
                onClick={handleSwap}
                title={t("scriptSwap")}
                aria-label={t("scriptSwap")}
                className="pointer-events-auto w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-elevated flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 hover:scale-110 active:scale-95 smooth-transition"
              >
                <ArrowLeftRight size={18} />
              </button>
            </div>

            {/* ───────── RIGHT PANEL (NATIJA) ───────── */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card flex flex-col focus-within:ring-2 focus-within:ring-primary-500/20 smooth-transition overflow-hidden">
              
              {/* Right Header */}
              <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                
                {/* Script Selector Pill / Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setToDropdownOpen(!toDropdownOpen)}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:border-primary-400 dark:hover:border-primary-600 smooth-transition"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-black">
                      {getScriptLetterBadge(toScript)}
                    </span>
                    <span>{getScriptLabel(toScript)}</span>
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${toDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {toDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setToDropdownOpen(false)} />
                      <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-elevated p-1 z-30 animate-fade-in">
                        {(["cyrillic", "latin-old", "latin-new"] as Script[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSelectTo(s)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                              toScript === s
                                ? "bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center text-[9px] font-black">
                              {getScriptLetterBadge(s)}
                            </span>
                            <span>{getScriptLabel(s)}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Counters & Copy Icon */}
                <div className="flex items-center gap-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                  <span className="tabular-nums">
                    {output.length.toLocaleString()} {t("panelCharCount")}
                  </span>
                  <span>•</span>
                  <span className="tabular-nums">
                    {countWords(output).toLocaleString()} {t("panelWordCount")}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    title={t("panelOutputCopy")}
                    className="p-1 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 smooth-transition"
                    aria-label={t("panelOutputCopy")}
                  >
                    <Copy size={16} />
                  </button>
                </div>

              </div>

              {/* Right Textarea */}
              <div className="flex-1 relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder={t("panelOutputPlaceholder")}
                  className="w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] p-4 sm:p-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg leading-relaxed resize-none outline-none cursor-default"
                />
              </div>

              {/* Right Footer: Download Options & Nusxalash */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                
                {/* Download Dropdown */}
                <div className="relative" ref={downloadMenuRef}>
                  <button
                    type="button"
                    onClick={() => setDownloadOpen(!downloadOpen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 smooth-transition"
                  >
                    <Download size={15} />
                    <span>{t("panelOutputDownload")}</span>
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${downloadOpen ? "rotate-180" : ""}`} />
                  </button>

                  {downloadOpen && (
                    <div className="absolute left-0 bottom-full mb-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-elevated p-1.5 z-30 animate-fade-in">
                      <button
                        type="button"
                        onClick={handleDownloadTxt}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <FileText size={15} className="text-primary-500" />
                        <div>
                          <p className="font-bold">{t("panelDownloadTxt")}</p>
                          <p className="text-[10px] text-slate-400 font-normal">Oddiy matn formati</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadDocx}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <FileCheck2 size={15} className="text-blue-500" />
                        <div>
                          <p className="font-bold">{t("panelDownloadDocx")}</p>
                          <p className="text-[10px] text-slate-400 font-normal">Formatlash saqlangan holda</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Primary Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-subtle active:scale-[0.98] smooth-transition ${
                    copied
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-primary-600 hover:bg-primary-700 text-white"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? t("panelOutputCopied") : t("panelOutputCopy")}</span>
                </button>

              </div>

            </div>

          </div>
        </section>




        {/* ─────────────────────────────────────────────────────────
            E. HOW IT WORKS SECTION (Qanday ishlaydi?)
        ───────────────────────────────────────────────────────── */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-12 sm:py-16 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60 inline-block">
              {t("howItWorksEyebrow")}
            </span>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t("howItWorksSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 smooth-transition border border-sky-100 dark:border-sky-800">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("step1Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("step1Desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 smooth-transition border border-sky-100 dark:border-sky-800">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("step2Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("step2Desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 smooth-transition border border-sky-100 dark:border-sky-800">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("step3Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("step3Desc")}
              </p>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            F. FEATURES SECTION (Imkoniyatlar — 6 Cards)
        ───────────────────────────────────────────────────────── */}
        <section id="features" aria-labelledby="features-heading" className="py-12 sm:py-16 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60 inline-block">
              {t("featuresEyebrow")}
            </span>
            <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("featuresTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feat 1: Uch xil yozuv */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat1Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat1Desc")}
              </p>
            </div>

            {/* Feat 2: Tezkor konvertatsiya */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat2Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat2Desc")}
              </p>
            </div>

            {/* Feat 3: Avtomatik aniqlash */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat3Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat3Desc")}
              </p>
            </div>

            {/* Feat 4: Fayllarni o'girish */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat4Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat4Desc")}
              </p>
            </div>

            {/* Feat 5: Nusxalash va yuklab olish */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5">
                <Copy className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat5Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat5Desc")}
              </p>
            </div>

            {/* Feat 6: 100% Maxfiy va bepul */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("feat6Title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("feat6Desc")}
              </p>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            G. SEO CONTENT & ALPHABET REFERENCE TABLE
        ───────────────────────────────────────────────────────── */}
        <div id="about" className="scroll-mt-20 pt-6">
          <SeoContent />
        </div>

        {/* ─────────────────────────────────────────────────────────
            H. FAQ SECTION (Accordion)
        ───────────────────────────────────────────────────────── */}
        <section id="faq" aria-labelledby="faq-heading" className="py-12 sm:py-16 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60 inline-block">
              {t("faqEyebrow")}
            </span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("faqTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t("faqSubtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: t("faqQ1"), a: t("faqA1") },
              { q: t("faqQ2"), a: t("faqA2") },
              { q: t("faqQ3"), a: t("faqA3") },
              { q: t("faqQ4"), a: t("faqA4") },
              { q: t("faqQ5"), a: t("faqA5") },
              { q: t("faqQ6"), a: t("faqA6") },
              { q: t("faqQ7"), a: t("faqA7") },
              { q: t("faqQ8"), a: t("faqA8") },
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  data-open={isOpen}
                  className="faq-item border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left select-none hover:bg-slate-50 dark:hover:bg-slate-800/60 smooth-transition"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.q}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-400">
                      <ChevronDown
                        size={18}
                        className="faq-chevron"
                      />
                    </div>
                  </button>
                  <div className="faq-body">
                    <div>
                      <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            I. BLOG SECTION (Editorial Cards)
        ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="blog-heading" className="py-12 sm:py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/60 inline-block mb-2">
                {t("blogEyebrow")}
              </span>
              <h2 id="blog-heading" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t("blogTitle")}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t("blogSubtitle")}
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 smooth-transition self-start sm:self-auto"
            >
              <span>{t("blogViewAll")}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover smooth-transition p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-3">
                    <Clock size={13} />
                    <span>{post.readingMinutes} {t("blogReadTime")}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 smooth-transition line-clamp-2 mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.description}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 smooth-transition"
                >
                  <span>Batafsil o'qish</span>
                  <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          J. FOOTER (Complete & Clean)
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] text-slate-600 dark:text-slate-400 text-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Kirill <span className="text-primary-500">↔</span> Lotin
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                {t("footerDesc")}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={16} />
                <span>{t("footerPrivacyNote")}</span>
              </div>
            </div>

            {/* Col 2: Sahifalar */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {t("footerNavTitle")}
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("navAbout")}</a></li>
                <li><a href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("navFeatures")}</a></li>
                <li><a href="#how-it-works" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("navHowItWorks")}</a></li>
                <li><a href="#faq" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("navFaq")}</a></li>
                <li><Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("navBlog")}</Link></li>
              </ul>
            </div>

            {/* Col 3: Yozuv tizimlari */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {t("footerScriptsTitle")}
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#harflar" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("scriptCyrillic")} alifbosi</a></li>
                <li><a href="#harflar" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("scriptLatinOld")} (1995)</a></li>
                <li><a href="#harflar" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t("scriptLatinNew")} (2021)</a></li>
                <li><a href="#qoidalar" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Imlo qoidalari</a></li>
              </ul>
            </div>

            {/* Col 4: Aloqa va Bog'lanish */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {t("footerContactTitle")}
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <a
                    href="https://t.me/Shohruz_Isroilov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
                  >
                    <Send size={13} className="text-primary-500" />
                    <span>Telegram: @Shohruz_Isroilov</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setDonateOpen(true)}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <Heart size={13} className="text-rose-500 fill-rose-500" />
                    <span>Loyihaga donat qilish</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            <div>
              © {year}{" "}
              <a href="https://kirillotin.uz" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400">
                kirillotin.uz
              </a>
              . {t("footerAllRights")}
            </div>
            <div>
              Designed & Developed with precision by{" "}
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Shohruzdev
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          CONTACT MODAL
      ───────────────────────────────────────────────────────────── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setContactOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t("modalContactTitle")}
              </h2>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t("modalClose")}
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/40 dark:hover:bg-primary-950/20 smooth-transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400">
                  <Send size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {t("modalContactItServices")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {t("modalContactItDesc")}
                  </p>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>

              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 smooth-transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                  <HelpCircle size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {t("modalContactSuggest")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {t("modalContactSuggestDesc")}
                  </p>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DONATE MODAL (Humo Card Component)
      ───────────────────────────────────────────────────────────── */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeDonateModal}
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200 dark:border-slate-800 p-6 sm:p-7 flex flex-col items-center text-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDonateModal}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t("modalClose")}
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center text-2xl shadow-xs">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t("modalDonateTitle")}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                {t("modalDonateDesc")}
              </p>
            </div>

            {/* Bank Card Component */}
            <div
              onClick={handleCopyCard}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyCard();
                }
              }}
              title={cardCopied ? t("modalDonateCopied") : t("modalDonateCopy")}
              className="w-full relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/20 cursor-pointer group text-left transition-all hover:border-indigo-500/40 active:scale-[0.99]"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-primary-500/30 transition-colors" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 p-[1px] shadow-sm flex items-center justify-center">
                    <div className="w-full h-full rounded-[3px] border border-amber-600/40 grid grid-cols-2 gap-0.5 p-0.5 opacity-85">
                      <div className="border border-amber-700/30 rounded-sm" />
                      <div className="border border-amber-700/30 rounded-sm" />
                      <div className="border border-amber-700/30 rounded-sm" />
                      <div className="border border-amber-700/30 rounded-sm" />
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-slate-300 opacity-60" />
                </div>
                <span className="text-xs font-black tracking-widest text-amber-300 font-mono">HUMO</span>
              </div>

              <div className="relative z-10 mb-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1">
                  {t("modalDonateCardLabel")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-widest text-white">
                    9860 1901 1079 9466
                  </span>
                  <span className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 text-slate-200 group-hover:text-white transition-all ml-2">
                    {cardCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                    {t("modalDonateCardHolderLabel")}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-100 uppercase">
                    Shohruz Isroilov
                  </p>
                </div>
                <span className="text-[11px] text-slate-300 group-hover:text-primary-300 transition-colors font-medium flex items-center gap-1">
                  {cardCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t("modalDonateCopied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t("modalDonateCopy")}</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyCard}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold shadow-subtle transition-all active:scale-[0.99] ${
                cardCopied
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              {cardCopied ? (
                <>
                  <Check size={18} />
                  <span>{t("modalDonateCopied")}</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>{t("modalDonateButton")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
