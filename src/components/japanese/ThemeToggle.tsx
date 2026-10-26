'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-8 h-8 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] opacity-50"
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getLabel = () => {
    if (theme === 'system') return `Theme: System (${resolvedTheme})`;
    return `Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`;
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex items-center justify-center w-8 h-8 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
      aria-label={`${getLabel()}. Click to change.`}
      title={`${getLabel()} (click to cycle: Light → Dark → System)`}
      aria-pressed={resolvedTheme === 'dark'}
    >
      {theme === 'system' ? (
        <Monitor size={15} />
      ) : resolvedTheme === 'dark' ? (
        <Sun size={15} />
      ) : (
        <Moon size={15} />
      )}
    </button>
  );
}
