/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Sparkles,
  Scissors,
  Copy,
  Download,
  RotateCcw,
  Check,
  Flame,
} from "lucide-react";

interface CleanActionsProps {
  onRemoveEmptyLines: () => void;
  onNormalizeSpacing: () => void;
  onCopyClean: () => void;
  onDownloadTxt: () => void;
  onUndo: () => void;
  canUndo: boolean;
  hasText: boolean;
  copySuccess: boolean;
}

export default function CleanActions({
  onRemoveEmptyLines,
  onNormalizeSpacing,
  onCopyClean,
  onDownloadTxt,
  onUndo,
  canUndo,
  hasText,
  copySuccess,
}: CleanActionsProps) {
  return (
    <div
      id="clean-actions-panel"
      className="flex flex-col gap-5 rounded-2xl p-6 shadow-xs transition-colors duration-300 glass-card"
    >
      {/* Panel Header */}
      <div>
        <h2 className="font-display text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
          Script Refining & Formatting
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Apply advanced lexical formatting rules to clean, compress, and optimize scripts instantly.
        </p>
      </div>

      {/* Formatting Algorithms */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1" id="format-rules-container">
        {/* Remove Empty Lines Card */}
        <button
          id="btn-remove-empty-lines"
          onClick={onRemoveEmptyLines}
          disabled={!hasText}
          className="group flex flex-col items-start gap-1 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-indigo-100 hover:bg-indigo-50/20 disabled:pointer-events-none disabled:opacity-45 dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:border-indigo-950 dark:hover:bg-indigo-950/20"
        >
          <div className="flex w-full items-center justify-between">
            <span className="font-display text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Remove Empty Lines
            </span>
            <div className="rounded-lg bg-indigo-50 p-1.5 text-indigo-600 transition-colors dark:bg-indigo-950/60 dark:text-indigo-400">
              <Scissors className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
            Deletes completely blank lines and collapses consecutive returns. Keeps original paragraphs, casing, and punctuation exactly.
          </p>
        </button>

        {/* Normalize Spacing Card */}
        <button
          id="btn-normalize-spacing"
          onClick={onNormalizeSpacing}
          disabled={!hasText}
          className="group flex flex-col items-start gap-1 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-purple-100 hover:bg-purple-50/20 disabled:pointer-events-none disabled:opacity-45 dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:border-purple-950 dark:hover:bg-purple-950/20"
        >
          <div className="flex w-full items-center justify-between">
            <span className="font-display text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Normalize Spacing
            </span>
            <div className="rounded-lg bg-purple-50 p-1.5 text-purple-600 transition-colors dark:bg-purple-950/60 dark:text-purple-400">
              <Flame className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
            Removes duplicate word spaces, spacing before dots and commas, trims trailing spaces, and enforces a single space after characters.
          </p>
        </button>
      </div>

      {/* Undo Panel (Conditional) */}
      {canUndo && (
        <div className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-950/40 dark:bg-amber-950/15 dark:text-amber-400">
          <span className="font-medium">Formatting applied! Want to undo?</span>
          <button
            id="btn-undo-formatting"
            onClick={onUndo}
            className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold shadow-xs hover:bg-slate-50 transition-all dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3 w-3" />
            Undo
          </button>
        </div>
      )}

      <div className="h-[1px] bg-slate-100/50 dark:bg-slate-800/80 my-1" />

      {/* Primary Export & Export Utilities */}
      <div className="flex flex-col gap-2">
        {/* Copy Clean Script Button */}
        <button
          id="btn-copy-clean-script"
          onClick={onCopyClean}
          disabled={!hasText}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all duration-300 ${
            copySuccess
              ? "bg-emerald-600 text-white shadow-emerald-100 dark:shadow-none"
              : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-100 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:shadow-none"
          } disabled:pointer-events-none disabled:opacity-40`}
        >
          {copySuccess ? (
            <>
              <Check className="h-4 w-4" />
              <span>Clean Script Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Clean Script</span>
            </>
          )}
        </button>

        {/* Download TXT Button */}
        <button
          id="btn-download-txt-file"
          onClick={onDownloadTxt}
          disabled={!hasText}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <Download className="h-4 w-4" />
          <span>Download Clean TXT</span>
        </button>
      </div>
    </div>
  );
}
