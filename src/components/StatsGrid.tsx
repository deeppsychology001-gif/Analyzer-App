/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Type,
  Hash,
  BookOpen,
  Mic,
  Pilcrow,
  Rows,
  Sparkles,
  CaseSensitive,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { ScriptStats } from "../types";
import { formatTime } from "../utils/analyzer";

interface StatsGridProps {
  stats: ScriptStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const cards = [
    {
      id: "stat-words",
      label: "Words",
      value: stats.words.toLocaleString(),
      icon: Type,
      colorClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
      borderLeftClass: "border-l-4 border-l-indigo-500",
    },
    {
      id: "stat-chars-with-spaces",
      label: "Characters",
      value: stats.charactersWithSpaces.toLocaleString(),
      icon: Hash,
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      borderLeftClass: "border-l-4 border-l-blue-500",
    },
    {
      id: "stat-chars-without-spaces",
      label: "Chars (Net)",
      value: stats.charactersWithoutSpaces.toLocaleString(),
      icon: CaseSensitive,
      colorClass: "text-sky-600 dark:text-sky-400",
      bgClass: "bg-sky-50 dark:bg-sky-950/40",
      borderLeftClass: "border-l-4 border-l-sky-400",
    },
    {
      id: "stat-sentences",
      label: "Sentences",
      value: stats.sentences.toLocaleString(),
      icon: Sparkles,
      colorClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-50 dark:bg-violet-950/40",
      borderLeftClass: "border-l-4 border-l-violet-500",
    },
    {
      id: "stat-paragraphs",
      label: "Paragraphs",
      value: stats.paragraphs.toLocaleString(),
      icon: Pilcrow,
      colorClass: "text-pink-600 dark:text-pink-400",
      bgClass: "bg-pink-50 dark:bg-pink-950/40",
      borderLeftClass: "border-l-4 border-l-pink-500",
    },
    {
      id: "stat-lines",
      label: "Lines",
      value: stats.lines.toLocaleString(),
      icon: Rows,
      colorClass: "text-amber-600 dark:text-amber-400",
      bgClass: "bg-amber-50 dark:bg-amber-950/40",
      borderLeftClass: "border-l-4 border-l-amber-500",
    },
    {
      id: "stat-reading-time",
      label: "Reading Time",
      value: formatTime(stats.readingTimeSeconds),
      icon: BookOpen,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
      borderLeftClass: "border-l-4 border-l-emerald-500",
    },
    {
      id: "stat-speaking-time",
      label: "Speaking Time",
      value: formatTime(stats.speakingTimeSeconds),
      icon: Mic,
      colorClass: "text-orange-600 dark:text-orange-400",
      bgClass: "bg-orange-50 dark:bg-orange-950/40",
      borderLeftClass: "border-l-4 border-l-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" id="stats-grid-container">
      {cards.map((card) => (
        <StatsCard
          key={card.id}
          id={card.id}
          label={card.label}
          value={card.value}
          icon={card.icon}
          colorClass={card.colorClass}
          bgClass={card.bgClass}
          borderLeftClass={card.borderLeftClass}
        />
      ))}
    </div>
  );
}
