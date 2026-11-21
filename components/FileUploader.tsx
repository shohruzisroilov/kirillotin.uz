"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, FileText, X, Download, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import {
  isValidFileType,
  isValidFileSize,
  extractTextFromTxt,
  extractTextFromDocx,
} from "@/lib/utils";

interface FileUploaderProps {
  onFileSelected: (text: string, file: File) => void;
  onFileClear?: () => void;
  onDownload?: () => void;
  loading?: boolean;
  currentFileName?: string;
  converting?: boolean;
  ready?: boolean;
  directionLabel?: string;
}

export function FileUploader({
  onFileSelected,
  onFileClear,
  onDownload,
  loading = false,
  currentFileName,
  converting = false,
  ready = false,
  directionLabel,
}: FileUploaderProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setIsProcessing(true);

    try {
      if (!isValidFileType(file)) {
        setError(t("uploaderErrFormat"));
        return;
      }

      if (!isValidFileSize(file)) {
        setError(t("uploaderErrSize"));
        return;
      }

      let text: string;
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        text = await extractTextFromTxt(file);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
      ) {
        text = await extractTextFromDocx(file);
      } else {
        setError(t("uploaderErrUnknown"));
        return;
      }

      if (!text.trim()) {
        setError(t("uploaderErrEmpty"));
        return;
      }

      onFileSelected(text, file);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("uploaderErrRead"));
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(fakeEvent);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.docx"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading || isProcessing}
      />

      {currentFileName ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 rounded-xl sm:rounded-2xl shadow-subtle animate-fade-in min-w-0 w-full">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {currentFileName}
                </p>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-900/40 text-primary-700 dark:text-primary-300 uppercase tracking-wider flex-shrink-0">
                  {currentFileName.endsWith(".docx") ? "DOCX" : "TXT"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {converting ? (
                  <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                    <Loader2 size={11} className="animate-spin" />
                    {t("uploaderConverting")} {directionLabel ? `(${directionLabel})` : ""}
                  </span>
                ) : ready ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 size={12} />
                    {t("uploaderReady")} {directionLabel ? `• ${directionLabel}` : ""}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {ready && !converting && onDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white text-[11px] sm:text-xs font-semibold shadow-xs smooth-transition"
              >
                <Download size={13} />
                <span>{t("uploaderDownload")}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onFileClear?.();
                setError("");
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              title={t("uploaderRemove")}
              aria-label={t("uploaderRemove")}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-dashed py-2 px-3 sm:py-2.5 sm:px-4 text-center cursor-pointer transition-all duration-200 min-w-0 w-full ${
            isDragging
              ? "border-primary-500 bg-primary-50/60 dark:bg-primary-950/30 scale-[1.005]"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-primary-400/80 dark:hover:border-primary-600 hover:bg-slate-50/80 dark:hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950/50 flex items-center justify-center transition-colors">
              {isProcessing ? (
                <Loader2 size={13} className="animate-spin text-primary-500" />
              ) : (
                <UploadCloud size={14} />
              )}
            </div>
            <div className="text-left flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {isProcessing ? t("uploaderProcessing") : t("uploaderDropzone")}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium text-slate-400 dark:text-slate-500">
                · {t("uploaderBadge")}
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 animate-fade-in">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
