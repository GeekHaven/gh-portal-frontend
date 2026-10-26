'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RotateCcw } from 'lucide-react';
import { FetchedRepos, FetchedEvents } from 'api/events/events';
import {
  RepoToolbar,
  RepoGrid,
  RepoSkeleton,
  RepoEmptyState,
  detectPrimaryLanguage,
  extractAvailableLanguages,
} from 'components/repos';
import type { SortOrder } from 'components/repos/RepoToolbar';

export default function ReposPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  // 1. Fetch current active event info
  const { data: eventData, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
  });

  const eventName =
    eventData?.data?.[0]?.name ||
    process.env.NEXT_PUBLIC_EVENT_NAME ||
    "OPENCODE'25";

  // 2. Fetch repositories for the event
  const {
    data,
    isLoading: isLoadingRepos,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['ReposInfo', eventName],
    queryFn: () => FetchedRepos(eventName),
    enabled: !!eventName && !isLoadingEvents,
  });

  const repositories = useMemo(() => data?.data || [], [data]);

  // 3. Dynamically extract unique languages from real repository data
  const availableLanguages = useMemo(
    () => extractAvailableLanguages(repositories),
    [repositories],
  );

  // 4. Precompute language frequency counts
  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: repositories.length,
    };
    for (const repo of repositories) {
      const lang = detectPrimaryLanguage(repo);
      if (lang && lang.name) {
        counts[lang.name] = (counts[lang.name] || 0) + 1;
      }
    }
    return counts;
  }, [repositories]);

  // 5. Filter and Sort
  const filteredAndSortedRepos = useMemo(() => {
    let result = [...repositories];

    // Language filter
    if (selectedLanguage !== 'all') {
      const target = selectedLanguage.toLowerCase();
      result = result.filter((repo: any) => {
        const lang = detectPrimaryLanguage(repo);
        const langMatch = lang.name.toLowerCase() === target;
        const tagMatch =
          Array.isArray(repo.tags) &&
          repo.tags.some((t: string) => t.toLowerCase() === target);
        return langMatch || tagMatch;
      });
    }

    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((repo: any) => {
        const nameMatch = repo.name && repo.name.toLowerCase().includes(q);
        const descMatch =
          repo.description && repo.description.toLowerCase().includes(q);
        const tagMatch =
          Array.isArray(repo.tags) &&
          repo.tags.some((tag: string) => tag.toLowerCase().includes(q));
        return nameMatch || descMatch || tagMatch;
      });
    }

    // Sort order (default preserves API order)
    if (sortOrder === 'asc') {
      result.sort((a: any, b: any) =>
        (a.name || '').localeCompare(b.name || ''),
      );
    } else if (sortOrder === 'desc') {
      result.sort((a: any, b: any) =>
        (b.name || '').localeCompare(a.name || ''),
      );
    }

    return result;
  }, [repositories, selectedLanguage, searchQuery, sortOrder]);

  const handleToggleSort = () => {
    setSortOrder((current) => {
      if (current === 'default') return 'asc';
      if (current === 'asc') return 'desc';
      return 'default';
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSortOrder('default');
  };

  const isLoading = isLoadingEvents || isLoadingRepos;

  return (
    <div className="w-full">
      {/* ─── EDITORIAL PAGE HEADER ─── */}
      <header className="mb-8 sm:mb-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
          [ リポジトリ · CATALOGUE ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight mb-3">
              Repositories &amp; <span className="italic">Codebases</span>.
            </h1>
            <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
              Explore active project codebases, inspect architecture and open issues, and collaborate with maintainers across the ecosystem.
            </p>
          </div>

          {!isLoading && repositories.length > 0 && (
            <div className="text-xs font-mono text-[var(--muted-foreground)] shrink-0 self-start md:self-end pb-1">
              <span
                className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] mr-2"
                aria-hidden="true"
              />
              {repositories.length}{' '}
              {repositories.length === 1 ? 'repository' : 'repositories'} across
              the OpenCode ecosystem
            </div>
          )}
        </div>
      </header>

      {/* ─── LOADING STATE: EDITORIAL SKELETON ─── */}
      {isLoading ? (
        <RepoSkeleton />
      ) : isError ? (
        /* ─── ERROR STATE WITH RETRY ─── */
        <div
          role="status"
          className="p-12 sm:p-16 text-center rounded-[3px] border border-[var(--border)] bg-[var(--surface)] max-w-xl mx-auto my-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] block mb-3 font-semibold">
            [ 一時停止 · PAUSE ]
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] mb-3">
            Unable to load repository registry
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
            The service took longer than expected to respond. Please verify your connection and retry.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[2px] bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : (
        /* ─── MAIN CONTENT: TOOLBAR + GRID / EMPTY STATE ─── */
        <>
          <RepoToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedLanguage={selectedLanguage}
            languages={availableLanguages}
            onSelectLanguage={setSelectedLanguage}
            languageCounts={languageCounts}
            sortOrder={sortOrder}
            onToggleSort={handleToggleSort}
            totalCount={repositories.length}
            filteredCount={filteredAndSortedRepos.length}
          />

          {filteredAndSortedRepos.length === 0 ? (
            <RepoEmptyState
              searchQuery={searchQuery}
              selectedLanguage={selectedLanguage}
              onClearFilters={handleResetFilters}
              onSelectSuggestion={(term) => setSearchQuery(term)}
            />
          ) : (
            <RepoGrid
              repos={filteredAndSortedRepos}
              searchQuery={searchQuery}
            />
          )}
        </>
      )}
    </div>
  );
}
