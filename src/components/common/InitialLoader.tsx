'use client';

import React, { useEffect, useState } from 'react';

type InitialLoaderProps = {
  isExiting?: boolean;
  onComplete?: () => void;
  autoDismiss?: boolean;
  durationMs?: number;
};

export default function InitialLoader({
  isExiting: externalExiting,
  onComplete,
  autoDismiss = true,
  durationMs = 850,
}: InitialLoaderProps) {
  const [internalExiting, setInternalExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const isExiting = externalExiting || internalExiting;

  useEffect(() => {
    // Smooth progress line animation
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 50);

    let dismissTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    if (autoDismiss) {
      dismissTimer = setTimeout(() => {
        setInternalExiting(true);
        completeTimer = setTimeout(() => {
          onComplete?.();
        }, 350);
      }, durationMs);
    }

    return () => {
      clearTimeout(progressTimer);
      if (dismissTimer) clearTimeout(dismissTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [autoDismiss, durationMs, onComplete]);

  const handleSkip = () => {
    setInternalExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 200);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!isExiting}
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-opacity duration-350 ease-out cursor-pointer select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      <span className="sr-only">Loading OpenCode 2026</span>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-sm">
        {/* Japanese Kicker */}
        <span className="font-serif text-[13px] tracking-[0.32em] text-[var(--accent)] mb-3 uppercase">
          オープンコード
        </span>

        {/* Brand Name */}
        <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.12em] text-[var(--foreground)] mb-3">
          OPENCODE 2026
        </h1>

        {/* Minimalist Progress Hairline */}
        <div className="relative w-32 h-[1px] bg-[var(--border)] my-3 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[var(--accent)] transition-all ease-out"
            style={{
              width: `${progress}%`,
              transitionDuration: `${durationMs - 150}ms`,
            }}
          />
        </div>

        {/* Society Subtitle */}
        <span className="text-[11px] font-mono tracking-[0.18em] text-[var(--muted-foreground)] uppercase mt-1">
          GeekHaven · IIIT Allahabad
        </span>

        {/* Minimal skip hint */}
        <span className="text-[10px] font-mono text-[var(--muted-foreground)] opacity-40 mt-8 tracking-wider">
          CLICK ANYWHERE TO ENTER
        </span>
      </div>
    </div>
  );
}