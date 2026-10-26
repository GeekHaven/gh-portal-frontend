'use client';

import React from 'react';

export default function RepoSkeleton() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div
      role="status"
      aria-label="Loading repositories"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      {skeletonCards.map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-[230px] p-5 sm:p-6 rounded-[3px] border border-[var(--border)] bg-[var(--surface)] animate-pulse"
        >
          {/* Top Bar: Index numeral placeholder + GitHub icon placeholder */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-6 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-4 w-4 bg-[var(--surface-2)] rounded-[2px]" />
          </div>

          {/* Repo Title placeholder */}
          <div className="space-y-2 mb-3">
            <div className="h-2.5 w-24 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-6 w-3/4 bg-[var(--surface-2)] rounded-[2px]" />
          </div>

          {/* Language & tags placeholder */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-20 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-4 w-14 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-4 w-12 bg-[var(--surface-2)] rounded-[2px]" />
          </div>

          {/* Description lines placeholder */}
          <div className="space-y-1.5 mb-4">
            <div className="h-3 w-full bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-3 w-4/5 bg-[var(--surface-2)] rounded-[2px]" />
          </div>

          {/* Footer placeholder */}
          <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <div className="h-3 w-32 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-3 w-16 bg-[var(--surface-2)] rounded-[2px]" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading repositories…</span>
    </div>
  );
}
