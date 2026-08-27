/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Sun,
  Moon,
  ClipboardPaste,
  Copy,
  Trash2,
  Download,
  Terminal,
} from "lucide-react";

interface ToolbarProps {
  onPaste: () => void;
  onClear: () => void;
  onCopy: () => void;
  onDownload: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  hasText: boolean;
}

export default function Toolbar({
  onPaste,
  onClear,
  onCopy,
  onDownload,
  isDark,
  onToggleTheme,
  hasText,
}: ToolbarProps) {
  return (
    <header
      id="app-header-sticky"
      className="sticky top-0 z-40 w-full border-b border-slate-100/40 backdrop-blur-md dark:border-slate-800/80 glass-card shrink-0"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Title / Logo section */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl flex items-center">
              Script Analyzer
              <span className="text-indigo-400 font-mono text-xs ml-2 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold">v2.0</span>
            </h1>
            <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
              Professional teleprompter & speech metrics editor
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Actions (Paste, Copy, Clear, Download) */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1 dark:bg-slate-900/60">
            <button
              id="btn-toolbar-paste"
              onClick={onPaste}
              title="Paste from clipboard"
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-xs transition-all dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              <ClipboardPaste className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Paste</span>
            </button>

            <button
              id="btn-toolbar-copy"
              onClick={onCopy}
              disabled={!hasText}
              title="Copy current script"
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-xs disabled:pointer-events-none disabled:opacity-40 transition-all dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </button>

            <button
              id="btn-toolbar-download"
              onClick={onDownload}
              disabled={!hasText}
              title="Download original script"
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-xs disabled:pointer-events-none disabled:opacity-40 transition-all dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 self-center" />

            <button
              id="btn-toolbar-clear"
              onClick={onClear}
              disabled={!hasText}
              title="Clear text editor"
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none disabled:opacity-40 transition-all dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="btn-toggle-theme"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
