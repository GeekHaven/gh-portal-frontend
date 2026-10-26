'use client';

import React from 'react';

export default function EventsSkeleton() {
  return (
    <div className="w-full space-y-12" aria-label="Loading events catalog" aria-busy="true">
      {/* Featured Event Banner Skeleton */}
      <div className="w-full rounded-[4px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden animate-pulse">
        {/* Banner Area */}
        <div className="relative w-full h-64 sm:h-76 md:h-88 lg:h-96 bg-[var(--surface-2)] border-b border-[var(--border)]">
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="h-6 w-24 bg-[var(--surface)] rounded-[2px]" />
            <div className="h-6 w-20 bg-[var(--surface)] rounded-[2px]" />
          </div>
          {/* Overlapping Logo */}
          <div className="absolute -bottom-7 left-6 sm:left-10 w-18 h-18 sm:w-22 sm:h-22 rounded-[4px] bg-[var(--surface)] border-2 border-[var(--border)]" />
        </div>

        {/* Content Body */}
        <div className="pt-12 sm:pt-14 px-6 sm:px-10 pb-8 sm:pb-10 space-y-4">
          <div className="h-4 w-48 bg-[var(--surface-2)] rounded-[2px]" />
          <div className="h-8 sm:h-10 w-3/4 bg-[var(--surface-2)] rounded-[2px]" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-4 w-5/6 bg-[var(--surface-2)] rounded-[2px]" />
          </div>
          <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
            <div className="h-4 w-36 bg-[var(--surface-2)] rounded-[2px]" />
            <div className="h-11 w-48 bg-[var(--surface-2)] rounded-[3px]" />
          </div>
        </div>
      </div>

      {/* Grid Header Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
        <div className="h-3 w-48 bg-[var(--surface-2)] rounded-[2px]" />
        <div className="h-3 w-20 bg-[var(--surface-2)] rounded-[2px]" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-[4px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden animate-pulse"
          >
            {/* Banner with Overlapping Logo Skeleton */}
            <div className="relative h-44 sm:h-48 w-full bg-[var(--surface-2)] border-b border-[var(--border)]">
              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between">
                <div className="h-5 w-20 bg-[var(--surface)] rounded-[2px]" />
                <div className="h-5 w-16 bg-[var(--surface)] rounded-[2px]" />
              </div>
              <div className="absolute -bottom-4 left-5 w-12 h-12 rounded-[4px] bg-[var(--surface)] border-2 border-[var(--border)]" />
            </div>

            {/* Body */}
            <div className="p-5 pt-7 space-y-3">
              <div className="h-3 w-28 bg-[var(--surface-2)] rounded-[2px]" />
              <div className="h-6 w-3/4 bg-[var(--surface-2)] rounded-[2px]" />
              <div className="h-3 w-full bg-[var(--surface-2)] rounded-[2px]" />
              <div className="h-3 w-4/5 bg-[var(--surface-2)] rounded-[2px]" />
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <div className="h-3 w-24 bg-[var(--surface-2)] rounded-[2px]" />
                <div className="h-3 w-4 bg-[var(--surface-2)] rounded-[2px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
