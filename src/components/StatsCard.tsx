/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  borderLeftClass: string;
  key?: React.Key;
}

export default function StatsCard({
  id,
  label,
  value,
  icon: Icon,
  colorClass,
  bgClass,
  borderLeftClass,
}: StatsCardProps) {
  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-2xl p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md glass-card ${borderLeftClass}`}
    >
      {/* Decorative background glow */}
      <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-10 blur-xl ${bgClass}`} />
      
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
          {label}
        </span>
        <div className={`rounded-xl p-2.5 ${bgClass} ${colorClass} transition-colors duration-300`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      
      <div className="mt-4 flex flex-col justify-center">
        <h3 className="font-mono text-2xl font-bold text-slate-900 tracking-tight dark:text-slate-50">
          {value}
        </h3>
      </div>
    </div>
  );
}
