/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import { FileText, Sparkles, Check } from "lucide-react";

interface ScriptEditorProps {
  value: string;
  onChange: (val: string) => void;
  onLoadSample: () => void;
  stats: {
    words: number;
    charactersWithSpaces: number;
  };
}

export default function ScriptEditor({
  value,
  onChange,
  onLoadSample,
  stats,
}: ScriptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Split lines to generate the numbers
  const linesCount = value.split("\n").length;
  const linesArray = Array.from({ length: Math.max(linesCount, 1) }, (_, i) => i + 1);

  // Sync scroll of line-numbers gutter with textarea
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Auto-focus the editor on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div
      id="script-editor-container"
      className="flex flex-col rounded-2xl shadow-xs transition-colors duration-300 glass-card"
    >
      {/* Editor Header Status Row */}
      <div className="flex items-center justify-between border-b border-slate-100/50 px-5 py-3.5 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-indigo-500" />
          <span className="font-display text-sm font-semibold text-slate-700 dark:text-slate-200">
            Script Input Workspace
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Load Sample Button */}
          <button
            id="btn-load-sample"
            onClick={onLoadSample}
            className="group flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50/50 px-2.5 py-1 text-xs font-medium text-indigo-600 transition-all hover:bg-indigo-50 dark:border-indigo-950/50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-950/60"
          >
            <Sparkles className="h-3 w-3 group-hover:animate-pulse" />
            <span>Load Sample Script</span>
          </button>

          {/* Auto Count Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50/80 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Auto Count Active
          </div>
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="relative flex flex-1 min-h-[350px] sm:min-h-[450px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          id="line-numbers-gutter"
          aria-hidden="true"
          className="flex-none select-none overflow-hidden border-r border-slate-100 bg-slate-50/50 py-4 text-right text-xs font-mono text-slate-300 dark:border-slate-800/80 dark:bg-slate-900/10 dark:text-slate-600"
          style={{ width: "3.5rem" }}
        >
          {linesArray.map((lineNum) => (
            <div key={lineNum} className="pr-3 leading-6 h-6">
              {lineNum}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          id="script-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder="Type or paste your script here to begin automatic telemetry analysis...&#10;&#10;Supports speech drafts, podcast transcripts, teleprompter texts, video copy, and scripts up to 100,000 words without any lag."
          className="w-full resize-none bg-transparent p-4 text-sm font-sans leading-6 text-slate-800 placeholder-slate-400 focus:outline-hidden dark:text-slate-100 dark:placeholder-slate-500"
          spellCheck="true"
        />
      </div>

      {/* Editor Status Footer */}
      <div className="flex items-center justify-between rounded-b-2xl border-t border-slate-100/50 bg-slate-50/30 px-5 py-2.5 text-[11px] font-medium text-slate-500 dark:border-slate-800/80 dark:bg-slate-900/20 dark:text-slate-400">
        <div>
          <span>Press <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[9px] dark:border-slate-700 dark:bg-slate-800">Ctrl</kbd> + <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[9px] dark:border-slate-700 dark:bg-slate-800">V</kbd> to Paste</span>
        </div>
        <div className="flex gap-4">
          <span>Words: <strong className="text-slate-700 dark:text-slate-300">{stats.words.toLocaleString()}</strong></span>
          <span>Chars: <strong className="text-slate-700 dark:text-slate-300">{stats.charactersWithSpaces.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
