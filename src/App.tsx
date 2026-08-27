/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Toolbar from "./components/Toolbar";
import StatsGrid from "./components/StatsGrid";
import ScriptEditor from "./components/ScriptEditor";
import CleanActions from "./components/CleanActions";
import { analyzeScript, removeEmptyLines, normalizeSpacing } from "./utils/analyzer";
import { Sparkles, ArrowRight, RotateCcw, HelpCircle, Check, Info } from "lucide-react";

export default function App() {
  const [editorText, setEditorText] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // State-based Toast notification system
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Trigger toast helper
  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  }, []);

  // Dismiss toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Synchronize Theme with DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Live Statistics calculation (auto-updating on text change)
  const stats = useMemo(() => {
    return analyzeScript(editorText);
  }, [editorText]);

  // Loaded Sample Script Data
  const handleLoadSample = useCallback(() => {
    const sample = `When a man gets sleepy around the woman he loves, don't assume something is wrong.


Don't take it personally. For many men, feeling sleepy is a sign that he feels completely safe.


Let's test   spacing    normalization   !   It should remove extra spaces , and periods .
Let's make sure it handles punctuation nicely .`;
    
    // Save current state to history before replacing if it has text
    if (editorText.trim()) {
      setHistory((prev) => [...prev, editorText]);
    }
    setEditorText(sample);
    showToast("Sample script loaded successfully!", "success");
  }, [editorText, showToast]);

  // Clipboard Paste Helper with elegant iFrame Permission Fallbacks
  const handlePaste = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (editorText.trim()) {
            setHistory((prev) => [...prev, editorText]);
          }
          setEditorText((prev) => (prev ? prev + "\n" + text : text));
          showToast("Text pasted from clipboard!", "success");
        } else {
          showToast("Clipboard is empty or contains non-text content.", "info");
        }
      } else {
        throw new Error("Clipboard API not fully supported in this context");
      }
    } catch (err) {
      showToast(
        "Iframe permission blocked. Please use Ctrl+V (or Cmd+V) to paste directly.",
        "info"
      );
    }
  }, [editorText, showToast]);

  // Copy Script Utility
  const handleCopy = useCallback(() => {
    if (!editorText) return;
    navigator.clipboard.writeText(editorText)
      .then(() => {
        setCopySuccess(true);
        showToast("Original script copied to clipboard!", "success");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        showToast("Failed to copy text. Please select and copy manually.", "error");
      });
  }, [editorText, showToast]);

  // Copy Clean Script Utility
  const handleCopyClean = useCallback(() => {
    if (!editorText) return;
    // We get the fully cleaned text (both operations applied together or the current text as is)
    // For general export, we copy the current editor text which is already interactive.
    navigator.clipboard.writeText(editorText)
      .then(() => {
        setCopySuccess(true);
        showToast("Refined script copied to clipboard!", "success");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        showToast("Failed to copy text. Please select and copy manually.", "error");
      });
  }, [editorText, showToast]);

  // Download TXT helper
  const handleDownload = useCallback(() => {
    if (!editorText) return;
    try {
      const blob = new Blob([editorText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "refined_script.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Script downloaded as refined_script.txt", "success");
    } catch (e) {
      showToast("Download failed. Please copy text manually.", "error");
    }
  }, [editorText, showToast]);

  // Clear Editor
  const handleClear = useCallback(() => {
    if (!editorText) return;
    if (editorText.trim() && window.confirm("Are you sure you want to clear your current script?")) {
      setHistory((prev) => [...prev, editorText]);
      setEditorText("");
      showToast("Editor cleared. Click Undo to restore.", "info");
    }
  }, [editorText, showToast]);

  // Undo formatting or clearing
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setEditorText(previous);
    setHistory((prev) => prev.slice(0, -1));
    showToast("Reverted to previous state.", "success");
  }, [history, showToast]);

  // Apply Remove Empty Lines
  const handleRemoveEmptyLines = useCallback(() => {
    if (!editorText) return;
    const cleaned = removeEmptyLines(editorText);
    if (cleaned === editorText) {
      showToast("No empty lines to remove!", "info");
      return;
    }
    setHistory((prev) => [...prev, editorText]);
    setEditorText(cleaned);
    showToast("Successfully removed empty lines!", "success");
  }, [editorText, showToast]);

  // Apply Normalize Spacing
  const handleNormalizeSpacing = useCallback(() => {
    if (!editorText) return;
    const cleaned = normalizeSpacing(editorText);
    if (cleaned === editorText) {
      showToast("Spacing is already perfectly normalized!", "info");
      return;
    }
    setHistory((prev) => [...prev, editorText]);
    setEditorText(cleaned);
    showToast("Spacing successfully normalized!", "success");
  }, [editorText, showToast]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0f172a] dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Sticky top navigation toolbar */}
      <Toolbar
        onPaste={handlePaste}
        onClear={handleClear}
        onCopy={handleCopy}
        onDownload={handleDownload}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        hasText={!!editorText}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          
          {/* Welcome Banner */}
          <section id="welcome-banner" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 shadow-xl text-white dark:from-slate-900/60 dark:to-indigo-950/40 dark:border dark:border-slate-800">
            {/* Soft decorative glow */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute left-1/3 bottom-0 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
            
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ultra-Fast Telemetry (100k words support)
                </span>
                <h2 className="font-display text-2xl font-extrabold tracking-tight mt-3 text-white sm:text-3xl">
                  Analyze & Refine Your Script Live
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  A high-fidelity speech optimizer built specifically for actors, speechwriters, video creators, and presenters. Monitor performance stats, clean double spacing, and eliminate returns instantly.
                </p>
              </div>
              
              <div className="flex shrink-0">
                <button
                  id="btn-banner-load-sample"
                  onClick={handleLoadSample}
                  className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-xs font-semibold hover:bg-white/15 text-white active:scale-95 transition-all"
                >
                  Quick Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Dashboard Workspace */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Left Side: Editor Workspace (7 columns on large screens) */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <ScriptEditor
                value={editorText}
                onChange={setEditorText}
                onLoadSample={handleLoadSample}
                stats={stats}
              />
            </div>

            {/* Right Side: Metrics & Cleaners (5 columns on large screens) */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              
              {/* Stats Grid */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Live Telemetry Stats
                  </h3>
                  {editorText && (
                    <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                      Calculated instantly
                    </span>
                  )}
                </div>
                <StatsGrid stats={stats} />
              </div>

              {/* Cleaning & Refining toolbox */}
              <CleanActions
                onRemoveEmptyLines={handleRemoveEmptyLines}
                onNormalizeSpacing={handleNormalizeSpacing}
                onCopyClean={handleCopyClean}
                onDownloadTxt={handleDownload}
                onUndo={handleUndo}
                canUndo={history.length > 0}
                hasText={!!editorText}
                copySuccess={copySuccess}
              />

              {/* Advanced Guidelines Card */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/10 dark:text-slate-400">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Pro-tip: Read & Speech Time Calculations
                    </h4>
                    <p className="text-[11px] leading-relaxed mt-1 text-slate-500 dark:text-slate-400">
                      Reading speed is estimated at the standard global rate of <strong>200 words per minute</strong>, while speaking speed is calculated at a comfortable presentation rate of <strong>150 words per minute</strong>. Perfect for pacing your YouTube videos, presentations, or teleprompter slides.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div
          id="global-toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-xl animate-fade-in border border-slate-800/80 max-w-sm"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-medium tracking-wide">
            {toast.message}
          </span>
          {toast.message.includes("cleared") && (
            <button
              onClick={handleUndo}
              className="ml-2 flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-indigo-300 hover:bg-slate-700"
            >
              Undo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
