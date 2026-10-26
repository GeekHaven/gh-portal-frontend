'use client';

import React from 'react';
import { FolderGit2, RotateCcw } from 'lucide-react';

interface RepoEmptyStateProps {
  searchQuery?: string;
  selectedLanguage?: string;
  onClearFilters: () => void;
  onSelectSuggestion?: (query: string) => void;
}

export default function RepoEmptyState({
  searchQuery = '',
  selectedLanguage = 'all',
  onClearFilters,
  onSelectSuggestion,
}: RepoEmptyStateProps) {
  const hasLanguage = selectedLanguage && selectedLanguage !== 'all';
  const hasSearch = searchQuery.trim().length > 0;

  const suggestions = ['Python', 'Rust', 'TypeScript', 'Go', 'Web'];

  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6 rounded-[3px] border border-[var(--border)] bg-[var(--surface)] my-8"
    >
      {/* Editorial Kicker */}
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] block mb-3 font-semibold">
        [ 該当なし · NO MATCHES ]
      </span>

      <div className="w-10 h-10 rounded-[2px] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] mb-4">
        <FolderGit2 className="w-5 h-5" />
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight mb-2">
        No repositories matched your criteria
      </h2>

      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mb-6 leading-relaxed">
        {hasSearch && hasLanguage ? (
          <>
            No repositories found for query{' '}
            <strong className="text-[var(--foreground)] font-semibold">&ldquo;{searchQuery}&rdquo;</strong>{' '}
            filtered by <strong className="text-[var(--foreground)] font-semibold">{selectedLanguage}</strong>.
          </>
        ) : hasSearch ? (
          <>
            No repositories found matching keyword{' '}
            <strong className="text-[var(--foreground)] font-semibold">&ldquo;{searchQuery}&rdquo;</strong>.
          </>
        ) : hasLanguage ? (
          <>
            No repositories currently tagged with{' '}
            <strong className="text-[var(--foreground)] font-semibold">{selectedLanguage}</strong>.
          </>
        ) : (
          'No repositories are currently published for this track.'
        )}
      </p>

      {/* Suggested Search Terms */}
      {onSelectSuggestion && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-sm">
          <span className="text-[11px] font-mono text-[var(--muted-foreground)] mr-1">
            Suggestions:
          </span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="px-2 py-1 text-[11px] font-mono rounded-[2px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Reset Action */}
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-[2px] bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear all filters</span>
      </button>
    </div>
  );
}
