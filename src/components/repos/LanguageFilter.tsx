'use client';

import React from 'react';
import { RESTRAINED_LANG_COLORS } from './repoUtils';

interface LanguageFilterProps {
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  languageCounts?: Record<string, number>;
  className?: string;
}

export default function LanguageFilter({
  languages,
  selectedLanguage,
  onSelectLanguage,
  languageCounts,
  className = '',
}: LanguageFilterProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <nav
      aria-label="Filter repositories by language"
      className={`flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none ${className}`}
    >
      {/* 'All' option */}
      <button
        type="button"
        onClick={() => onSelectLanguage('all')}
        aria-pressed={selectedLanguage === 'all'}
        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
          selectedLanguage === 'all'
            ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-semibold'
            : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
        }`}
      >
        <span>All</span>
        {languageCounts?.all !== undefined && (
          <span className="ml-1.5 opacity-70 text-[10px]">
            ({languageCounts.all})
          </span>
        )}
      </button>

      {/* Dynamic Languages */}
      {languages.map((lang) => {
        const isSelected = selectedLanguage.toLowerCase() === lang.toLowerCase();
        const dotColor = RESTRAINED_LANG_COLORS[lang]?.dot || 'var(--muted-foreground)';
        const count = languageCounts?.[lang];

        return (
          <button
            key={lang}
            type="button"
            onClick={() => onSelectLanguage(lang)}
            aria-pressed={isSelected}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
              isSelected
                ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-semibold'
                : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: isSelected ? 'currentColor' : dotColor,
              }}
              aria-hidden="true"
            />
            <span>{lang}</span>
            {count !== undefined && (
              <span className="ml-0.5 opacity-70 text-[10px]">({count})</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
