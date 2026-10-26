'use client';

import React, { ReactNode } from 'react';

type JapaneseBackgroundVariant =
  | 'events'
  | 'leaderboard'
  | 'faq'
  | 'auth'
  | 'home'
  | 'winners'
  | 'milestones'
  | 'profile';

export default function JapaneseBackground({
  variant,
  children,
}: {
  variant: JapaneseBackgroundVariant;
  children: ReactNode;
}) {
  return (
    <div
      className={`japanese-page oc-scene-${variant} relative bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col overflow-x-hidden`}
    >
      {/* Subtle paper grain / radial dot pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="oc-scene-content relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
