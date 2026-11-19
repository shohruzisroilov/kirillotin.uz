"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  CheckCheck,
  ChevronDown,
  X,
  Moon,
  Sun,
  Menu,
  CreditCard,
  Check,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/FileUploader";
import { SeoContent } from "@/components/SeoContent";
import { useToast } from "@/components/ToastContext";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import {
  Script,
  convertText,
  detectScript,
  cyrillicToLatin,
  latinToCyrillic,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = t("metaTitle");
    }
  }, [locale, mounted, t]);

  const [input, setInput]               = useState("");
  const [output, setOutput]             = useState("");
  const [fromScript, setFromScript]     = useState<Script>("cyrillic");
  const [toScript, setToScript]         = useState<Script>("latin-new");
  const [autoDetect, setAutoDetect]     = useState(true);
  const [fileName, setFileName]         = useState("");
  const [sourceFile, setSourceFile]     = useState<File | null>(null);
  const [sourceText, setSourceText]     = useState("");
  const [fileConverted, setFileConverted] = useState<{
    name: string;
    text: string;
    fromScript: Script;
    toScript: Script;
  } | null>(null);
  const [fileConverting, setFileConverting] = useState(false);
  const [copied, setCopied]             = useState(false);
  const [contactOpen, setContactOpen]   = useState(false);
  const [donateOpen, setDonateOpen]     = useState(false);
  const [cardCopied, setCardCopied]     = useState(false);

  const handleCopyCard = async () => {
    const ok = await copyToClipboard("9860190110799466");
    if (ok) {
      setCardCopied(true);
      addToast(t("modalDonateCopiedToast"));
      setTimeout(() => setCardCopied(false), 2200);
    }
  };

  /* ── Persist ── */
  useEffect(() => {
    const savedIn    = getFromLocalStorage("converter-input");
    const savedOut   = getFromLocalStorage("converter-output");
    const savedFrom  = getFromLocalStorage("converter-from-script") as Script | null;
    const savedTo    = getFromLocalStorage("converter-to-script") as Script | null;
    const savedAuto  = getFromLocalStorage("converter-auto-detect");
    const legacyDir  = getFromLocalStorage("converter-direction");

    if (savedIn)  setInput(savedIn);
    if (savedOut) setOutput(savedOut);

    if (savedFrom && (savedFrom === "cyrillic" || savedFrom === "latin-old" || savedFrom === "latin-new")) {
      setFromScript(savedFrom);
    } else if (legacyDir === "latin-to-cyrillic") {
      setFromScript("latin-old");
    }

    if (savedTo && (savedTo === "cyrillic" || savedTo === "latin-old" || savedTo === "latin-new")) {
      setToScript(savedTo);
    } else if (legacyDir === "latin-to-cyrillic") {
      setToScript("cyrillic");
    }

    if (savedAuto !== null) {
      setAutoDetect(savedAuto === "true");
    }
  }, []);

  useEffect(() => { saveToLocalStorage("converter-input", input); },             [input]);
  useEffect(() => { saveToLocalStorage("converter-output", output); },           [output]);
  useEffect(() => { saveToLocalStorage("converter-from-script", fromScript); },   [fromScript]);
  useEffect(() => { saveToLocalStorage("converter-to-script", toScript); },       [toScript]);
  useEffect(() => { saveToLocalStorage("converter-auto-detect", String(autoDetect)); }, [autoDetect]);

  const convert = useCallback((text: string, from: Script, to: Script): string => {
    if (!text.trim()) return "";
    return convertText(text, from, to);
  }, []);

  /* Auto-detect script when input changes */
  const handleInputChange = useCallback((text: string) => {
    setInput(text);
    if (text.trim() && autoDetect) {
      const detected = detectScript(text);
      setFromScript(detected);
      if (toScript === detected) {
        setToScript(detected === "cyrillic" ? "latin-new" : "cyrillic");
      }
    }
  }, [autoDetect, toScript]);

  const handleSelectFrom = (s: Script) => {
    setAutoDetect(false);
    setFromScript(s);
    if (toScript === s) {
      if (s === "cyrillic") setToScript("latin-new");
      else if (s === "latin-new") setToScript("cyrillic");
      else if (s === "latin-old") setToScript("latin-new");
    }
  };

  const handleSelectTo = (s: Script) => {
    setToScript(s);
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

  const getScriptTitle = (s: Script, withBadge = true) => {
    switch (s) {
      case "cyrillic":
        return t("scriptCyrillic");
      case "latin-old":
        return withBadge ? `${t("scriptLatinOld")} (${t("scriptOldBadge")})` : t("scriptLatinOld");
      case "latin-new":
        return withBadge ? `${t("scriptLatinNew")} (${t("scriptNewBadge")})` : t("scriptLatinNew");
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
    // 5 kun ichida qayta ko'rsatmaslik
    const COOLDOWN = 5 * 24 * 60 * 60 * 1000;
    if (lastPrompted && now - Number(lastPrompted) < COOLDOWN) {
      return;
    }

    // Foydalanuvchining nusxalash/yuklab olish harakati tugashi uchun 1.2 soniya kutish
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

  const handleDownload = useCallback(() => {
    if (!output.trim()) {
      addToast(t("toastNoTextToDownload"), "info");
      return;
    }
    const base = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${base}_converted.txt`);
    triggerDonatePrompt();
  }, [output, fileName, addToast, t, triggerDonatePrompt]);

  const handleClear = useCallback(() => {
    const hadContent =
      input.trim() || output.trim() || fileName || sourceText;

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
        duration: 6000,
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
    setFileConverted(null);
    if (autoDetect) {
      const detected = detectScript(text);
      setFromScript(detected);
      if (toScript === detected) {
        setToScript(detected === "cyrillic" ? "latin-new" : "cyrillic");
      }
    }
    addToast(t("toastFileLoaded").replace("{name}", file.name), "success", 1500);
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

  const handleFileDownload = async () => {
    if (!fileConverted) return;
    const base = fileConverted.name.replace(/\.[^/.]+$/, "");
    const isDocx =
      sourceFile?.name.toLowerCase().endsWith(".docx") ||
      sourceFile?.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (isDocx && sourceFile) {
      const from = fileConverted.fromScript;
      const to = fileConverted.toScript;
      setFileConverting(true);
      try {
        await downloadConvertedDocx(
          sourceFile,
          (t) => convertText(t, from, to),
          `${base}_converted.docx`,
        );
        triggerDonatePrompt();
      } catch (err) {
        addToast(
          err instanceof Error ? err.message : t("toastFileLoadError"),
          "error",
        );
      } finally {
        setFileConverting(false);
      }
    } else {
      downloadAsTextFile(fileConverted.text, `${base}_converted.txt`);
      triggerDonatePrompt();
    }
  };

  /* Keyboard shortcuts: Ctrl/⌘+K clear, Ctrl/⌘+Enter copy */
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

  const year = new Date().getFullYear();

  /* Scroll-aware header */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* FAQ open state */
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="min-h-[100dvh] flex flex-col">
      <header
        className={`sticky top-0 z-30 smooth-transition border-b ${
          scrolled
            ? "border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
            : "border-transparent bg-white dark:bg-gray-900"
        }`}
      >
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleClear();
            }}
            className="flex items-center gap-2 select-none group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg py-1"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div className="hidden sm:flex flex-col items-start leading-none">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                Kiril <span className="text-primary-600 dark:text-primary-400" aria-hidden="true">↔</span> Lotin
              </h1>
              <span className="hidden sm:inline text-[9px] sm:text-xs font-medium text-gray-400 dark:text-gray-500">
                kirillotin.uz
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Navigation Links */}
            <nav
              aria-label="Сайт навигацияси"
              className="hidden md:flex items-center gap-1 text-sm mr-2"
            >
              <a
                href="#about"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navAbout")}
              </a>
              <a
                href="#features"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navFeatures")}
              </a>
              <a
                href="#faq"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navFaq")}
              </a>
              <Link
                href="/blog"
                className="whitespace-nowrap px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t("navBlog")}
              </Link>

              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1 flex-shrink-0" />

              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={t("contactTooltip")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                {t("navContact")}
              </button>
            </nav>

            {/* Donate Button - Always visible */}
            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="inline-flex whitespace-nowrap items-center gap-1 px-2.5 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              {t("navDonate")}
            </button>

            {mounted && (
              <div className="flex items-center gap-1.5">
                {/* Language Selector Dropdown */}
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() => setLangOpen(!langOpen)}
                    className="whitespace-nowrap inline-flex items-center gap-1 px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs font-bold transition-colors focus:outline-none"
                  >
                    <span>
                      {locale === "uz-cyr"
                        ? "🇺🇿 Ўзб"
                        : locale === "uz-lat"
                        ? "🇺🇿 O'zb"
                        : locale === "ru"
                        ? "🇷🇺 RU"
                        : "🇬🇧 EN"}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`opacity-60 transition-transform duration-200 ${
                        langOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {langOpen && (
                    <>
                      {/* Backdrop for closing */}
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setLangOpen(false)}
                      />
                      
                      {/* Dropdown options */}
                      <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black/5 dark:ring-white/10 py-1 z-40 focus:outline-none">
                        <button
                          onClick={() => {
                            setLocale("uz-cyr");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "uz-cyr"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇺🇿</span>
                          <span>Ўзб (Кирил)</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("uz-lat");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "uz-lat"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇺🇿</span>
                          <span>O'zb (Lotin)</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("ru");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "ru"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇷🇺</span>
                          <span>Русский</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocale("en");
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                            locale === "en"
                              ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-xs">🇬🇧</span>
                          <span>English</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Theme Switcher Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                  title={theme === "light" ? t("themeToggleDark") : t("themeToggleLight")}
                  className="whitespace-nowrap inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                </button>
              </div>
            )}

            {/* Mobile Hamburguer Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none"
              aria-label="Menyuni ochish"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3 px-4 flex flex-col gap-1.5 animate-fade-in">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navAbout")}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navFeatures")}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navFaq")}
            </a>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navBlog")}
            </Link>
            <button
              onClick={() => {
                setContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
            >
              {t("navContact")}
            </button>
          </div>
        )}
      </header>

      <main id="main" className="flex-1 flex flex-col justify-center w-full max-w-full px-4 sm:px-8 lg:px-12 py-6 space-y-4">

        {/* File uploader — yupqa banner */}
        <FileUploader
          onFileSelected={handleFileSelected}
          onFileClear={handleFileClear}
          onDownload={handleFileDownload}
          currentFileName={fileName}
          converting={fileConverting}
          ready={!!fileConverted}
          directionLabel={
            fileConverted
              ? `${getScriptTitle(fileConverted.fromScript, false)} → ${getScriptTitle(fileConverted.toScript, false)}`
              : `${getScriptTitle(fromScript, false)} → ${getScriptTitle(toScript, false)}`
          }
        />

        {/* Script Selection Bar */}
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-2 sm:p-2.5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            
            {/* FROM SCRIPT (Left) */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1">
              <button
                type="button"
                onClick={handleToggleAuto}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  autoDetect
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                title={t("scriptAuto")}
              >
                <span>✨</span>
                <span>{t("scriptAuto")}</span>
              </button>

              <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-0.5 flex-shrink-0" />

              {/* Cyrillic */}
              <button
                type="button"
                onClick={() => handleSelectFrom("cyrillic")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  fromScript === "cyrillic"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {t("scriptCyrillic")}
              </button>

              {/* Latin Old (1995) */}
              <button
                type="button"
                onClick={() => handleSelectFrom("latin-old")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  fromScript === "latin-old"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{t("scriptLatinOld")}</span>
                <span className={`text-[10px] font-normal hidden lg:inline ${fromScript === "latin-old" ? "text-primary-100" : "text-gray-400"}`}>
                  ({t("scriptOldBadge")})
                </span>
              </button>

              {/* Latin New */}
              <button
                type="button"
                onClick={() => handleSelectFrom("latin-new")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  fromScript === "latin-new"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{t("scriptLatinNew")}</span>
                <span className={`text-[10px] font-normal hidden lg:inline ${fromScript === "latin-new" ? "text-primary-100" : "text-gray-400"}`}>
                  ({t("scriptNewBadge")})
                </span>
              </button>
            </div>

            {/* SWAP BUTTON (Center) */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleSwap}
                title={t("scriptSwap")}
                aria-label={t("scriptSwap")}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-all active:scale-95 flex items-center gap-1.5 border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
              >
                <ArrowLeftRight size={15} />
                <span className="text-xs font-bold sm:hidden">{t("scriptSwap")}</span>
              </button>
            </div>

            {/* TO SCRIPT (Right) */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1 justify-start sm:justify-end">
              {/* Cyrillic */}
              <button
                type="button"
                onClick={() => handleSelectTo("cyrillic")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  toScript === "cyrillic"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {t("scriptCyrillic")}
              </button>

              {/* Latin Old (1995) */}
              <button
                type="button"
                onClick={() => handleSelectTo("latin-old")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  toScript === "latin-old"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{t("scriptLatinOld")}</span>
                <span className={`text-[10px] font-normal hidden lg:inline ${toScript === "latin-old" ? "text-primary-100" : "text-gray-400"}`}>
                  ({t("scriptOldBadge")})
                </span>
              </button>

              {/* Latin New */}
              <button
                type="button"
                onClick={() => handleSelectTo("latin-new")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  toScript === "latin-new"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{t("scriptLatinNew")}</span>
                <span className={`text-[10px] font-normal hidden lg:inline ${toScript === "latin-new" ? "text-primary-100" : "text-gray-400"}`}>
                  ({t("scriptNewBadge")})
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Two-panel converter */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-gray-600">

          {/* LEFT — Input */}
          <div className="flex flex-col bg-white dark:bg-gray-900">
            {/* Panel header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-800 dark:text-gray-200">
                  {getScriptTitle(fromScript)}
                </span>
                {autoDetect && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {t("scriptAuto")}
                  </span>
                )}
              </div>
              <button
                onClick={handleClear}
                title={`${t("panelInputClear")} (Ctrl+K)`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">{t("panelInputClear")}</span>
              </button>
            </div>
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t("panelInputPlaceholder")}
              className="flex-1 w-full px-4 py-3 bg-transparent text-base sm:text-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2.5 border-t border-gray-300 dark:border-gray-700 flex items-center justify-end">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                {input.length > 0 ? `${input.length.toLocaleString()} ${t("panelCharCount")}` : ""}
              </span>
            </div>
          </div>

          {/* RIGHT — Output */}
          <div className="flex flex-col bg-gray-50/60 dark:bg-gray-900/60">
            {/* Panel header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-800 dark:text-gray-200">
                {getScriptTitle(toScript)}
              </span>
              <div className="flex items-center gap-1.5">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  title={`${t("panelOutputCopy")} (Ctrl+Enter)`}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                    copied
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                  <span className="hidden sm:inline">{copied ? t("panelOutputCopied") : t("panelOutputCopy")}</span>
                </button>
                {/* Download */}
                <button
                  onClick={handleDownload}
                  title={t("panelOutputDownload")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">{t("panelOutputDownload")}</span>
                </button>
              </div>
            </div>
            {/* Textarea */}
            <textarea
              value={output}
              readOnly
              placeholder={t("panelOutputPlaceholder")}
              className="flex-1 w-full px-4 py-3 bg-transparent text-base sm:text-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none cursor-default min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] leading-relaxed"
            />
            {/* Footer: char count */}
            <div className="px-4 py-2.5 border-t border-gray-300 dark:border-gray-700 flex items-center justify-end">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                {output.length > 0 ? `${output.length.toLocaleString()} ${t("panelCharCount")}` : ""}
              </span>
            </div>
          </div>

        </div>
      </main>
      </div>

      <section
        aria-labelledby="about-heading"
        className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-10 sm:space-y-14">
          {/* About */}
          <div id="about" className="max-w-3xl mx-auto text-center space-y-4 scroll-mt-20">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
              {t("aboutEyebrow")}
            </span>
            <h2 id="about-heading" className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t("aboutTitle")}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose">
              {t("aboutDesc1")}
            </p>
          </div>

          {/* Features — three unequally-weighted blocks, not a grid */}
          <div id="features" className="scroll-mt-20">
            <div className="max-w-3xl mx-auto stagger space-y-10 sm:space-y-12">
              {/* Block 1 — the privacy */}
              <article className="space-y-3">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  {t("featuresPrivacyEyebrow")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t("featuresPrivacyTitle")}
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("featuresPrivacyDesc")}
                </p>
              </article>

              {/* Block 2 — Word formats */}
              <article className="space-y-2">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  {t("featuresWordEyebrow")}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t("featuresWordTitle")}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("featuresWordDesc")}
                </p>
              </article>

              {/* Block 3 — footnote */}
              <p className="text-base font-bold text-gray-600 dark:text-gray-400">
                {t("featuresFootnote")}
              </p>
            </div>
          </div>

          {/* SEO content: alphabet table, rules, history */}
          <SeoContent />

          {/* FAQ */}
          <div id="faq" className="space-y-6 scroll-mt-20">
            <div className="text-center space-y-2">
              <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                {t("faqEyebrow")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t("faqTitle")}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2.5">
              {[
                { q: t("faqQ1"), a: t("faqA1") },
                { q: t("faqQ2"), a: t("faqA2") },
                { q: t("faqQ3"), a: t("faqA3") },
                { q: t("faqQ4"), a: t("faqA4") },
                { q: t("faqQ5"), a: t("faqA5") },
                { q: t("faqQ6"), a: t("faqA6") },
                { q: t("faqQ7"), a: t("faqA7") },
                { q: t("faqQ8"), a: t("faqA8") },
              ].map((item) => {
                const isOpen = openFaq === item.q;
                return (
                  <div
                    key={item.q}
                    data-open={isOpen}
                    className="faq-item border border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left select-none hover:bg-gray-100/60 dark:hover:bg-gray-800/60 smooth-transition"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-50">
                        {item.q}
                      </h3>
                      <ChevronDown
                        size={20}
                        className="faq-chevron flex-shrink-0 text-gray-500 dark:text-gray-400"
                      />
                    </button>
                    <div className="faq-body">
                      <div>
                        <div className="px-4 pb-4 pt-1.5 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">{t("modalContactTitle")}</h2>
              <button
                onClick={() => setContactOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {/* IT xizmatlari */}
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/40 dark:hover:bg-primary-900/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-600 dark:text-primary-400">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {t("modalContactItServices")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {t("modalContactItDesc")}
                  </p>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>

              {/* Muammo / taklif */}
              <a
                href="https://t.me/Shohruz_Isroilov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/40 dark:hover:bg-primary-900/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💬</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {t("modalContactSuggest")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {t("modalContactSuggestDesc")}
                  </p>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1.5">
                    @Shohruz_Isroilov →
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeDonateModal}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDonateModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t("modalClose")}
            >
              <X size={18} />
            </button>
            <div className="text-4xl">💛</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("modalDonateTitle")}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
                  <CreditCard className="w-4 h-4 text-gray-300 opacity-60" />
                </div>
                <span className="text-xs font-black tracking-widest text-amber-300 font-mono">HUMO</span>
              </div>

              <div className="relative z-10 mb-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">
                  {t("modalDonateCardLabel")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-widest text-white selection:bg-primary-500">
                    9860 1901 1079 9466
                  </span>
                  <span className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 text-gray-200 group-hover:text-white transition-all ml-2">
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
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                    {t("modalDonateCardHolderLabel")}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-100 uppercase">
                    Shohruz Isroilov
                  </p>
                </div>
                <span className="text-[11px] text-gray-300 group-hover:text-primary-300 transition-colors font-medium flex items-center gap-1">
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
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-[0.99] ${
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

      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-full px-4 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>
              © {year}{" "}
              <a
                href="https://kirillotin.uz"
                className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
              >
                kirillotin.uz
              </a>
            </span>
            <Link
              href="/blog"
              className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            >
              {t("navBlog")}
            </Link>
            <a
              href="#faq"
              className="font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
            >
              {t("faqEyebrow")}
            </a>
          </span>
          <span>
            Designed &amp; Developed by{" "}
            <a
              href="https://t.me/Shohruz_Isroilov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              Shohruzdev
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
