'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import LanguageFilter from './LanguageFilter';

export type SortOrder = 'default' | 'asc' | 'desc';

interface RepoToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedLanguage: string;
  languages: string[];
  onSelectLanguage: (lang: string) => void;
  languageCounts?: Record<string, number>;
  sortOrder: SortOrder;
  onToggleSort: () => void;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

export default function RepoToolbar({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  languages,
  onSelectLanguage,
  languageCounts,
  sortOrder,
  onToggleSort,
  totalCount,
  filteredCount,
  className = '',
}: RepoToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: '/' to focus search, 'Esc' to clear & blur
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        (activeEl as HTMLElement)?.isContentEditable;

      if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && activeEl === inputRef.current) {
        if (searchQuery) {
          onSearchChange('');
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, onSearchChange]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedLanguage !== 'all' || sortOrder !== 'default';

  return (
    <div
      className={`sticky top-[64px] sm:top-[72px] z-20 bg-[var(--background)]/95 backdrop-blur-md pt-2 pb-4 mb-8 sm:mb-10 border-b border-[var(--border)] transition-colors ${className}`}
    >
      <div className="w-full flex flex-col gap-4">
        {/* Top Line: Search Bar + Sort Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
          {/* 12-col aligned Search Bar */}
          <div className="relative flex-1 group">
            <label htmlFor="repo-search" className="sr-only">
              Search repositories or tech stack
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted-foreground)] group-focus-within:text-[var(--accent)] transition-colors">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>

            <input
              ref={inputRef}
              id="repo-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search repository, tech stack, or description…"
              className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm font-sans rounded-[3px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />

            {/* Right Controls: Clear button and keyboard shortcut hint */}
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="p-1 rounded-[2px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Keyboard Shortcut Hint (Desktop only) */}
              <kbd
                className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted-foreground)] bg-[var(--surface-2)] border border-[var(--border)] rounded-[2px] select-none pointer-events-none"
                title="Press / to search"
              >
                /
              </kbd>
            </div>
          </div>

          {/* Sort Toggle Button */}
          <button
            type="button"
            onClick={onToggleSort}
            aria-label={`Sort repositories: current is ${
              sortOrder === 'asc' ? 'A to Z' : sortOrder === 'desc' ? 'Z to A' : 'Default order'
            }`}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
              sortOrder !== 'default'
                ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-medium'
                : 'bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            {sortOrder === 'desc' ? (
              <ArrowUpZA className="w-4 h-4 shrink-0" />
            ) : (
              <ArrowDownAZ className="w-4 h-4 shrink-0" />
            )}
            <span className="hidden sm:inline">
              {sortOrder === 'asc' ? 'A → Z' : sortOrder === 'desc' ? 'Z → A' : 'Sort A–Z'}
            </span>
          </button>
        </div>

        {/* Bottom Line: Dynamic Language Filters & Live Result Count */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Language / Topic Filter Chips */}
          <div className="flex-1 min-w-0">
            <LanguageFilter
              languages={languages}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={onSelectLanguage}
              languageCounts={languageCounts}
            />
          </div>

          {/* Result Count with aria-live="polite" */}
          <div
            aria-live="polite"
            className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] shrink-0 self-end md:self-center"
          >
            <span>
              Showing <strong className="font-semibold text-[var(--foreground)]">{filteredCount}</strong> of{' '}
              {totalCount} repositories
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  onSelectLanguage('all');
                  if (sortOrder !== 'default') onToggleSort();
                }}
                className="text-[11px] underline underline-offset-2 hover:text-[var(--accent)] transition-colors ml-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
