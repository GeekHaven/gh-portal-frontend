'use client';

import React from 'react';

export interface LanguageMeta {
  name: string;
  dot: string;
  bg: string;
}

// Harmonized, restrained Japanese color palette (quiet washi/sumi-friendly tones)
export const RESTRAINED_LANG_COLORS: Record<string, { dot: string; bg: string }> = {
  TypeScript: { dot: '#4A6B82', bg: 'rgba(74, 107, 130, 0.12)' },
  JavaScript: { dot: '#B59A4C', bg: 'rgba(181, 154, 76, 0.12)' },
  Python:     { dot: '#486B5A', bg: 'rgba(72, 107, 90, 0.12)' },
  Rust:       { dot: '#A65D44', bg: 'rgba(166, 93, 68, 0.12)' },
  Go:         { dot: '#3D7885', bg: 'rgba(61, 120, 133, 0.12)' },
  Kotlin:     { dot: '#73568C', bg: 'rgba(115, 86, 140, 0.12)' },
  Dart:       { dot: '#3B6C7D', bg: 'rgba(59, 108, 125, 0.12)' },
  Flutter:    { dot: '#3B6C7D', bg: 'rgba(59, 108, 125, 0.12)' },
  'C++':      { dot: '#94495C', bg: 'rgba(148, 73, 92, 0.12)' },
  'C#':       { dot: '#547250', bg: 'rgba(84, 114, 80, 0.12)' },
  Java:       { dot: '#9A683E', bg: 'rgba(154, 104, 62, 0.12)' },
  Solidity:   { dot: '#6F5882', bg: 'rgba(111, 88, 130, 0.12)' },
  Design:     { dot: '#A05064', bg: 'rgba(160, 80, 100, 0.12)' },
  Security:   { dot: '#A84032', bg: 'rgba(168, 64, 50, 0.12)' },
};

const DEFAULT_LANG_META: { dot: string; bg: string } = {
  dot: 'var(--muted-foreground)',
  bg: 'rgba(95, 91, 84, 0.12)',
};

/**
 * Detect primary language from repo tags or repo name with clean precedence
 */
export function detectPrimaryLanguage(repo: any): LanguageMeta {
  const tags: string[] = repo.tags || [];
  for (const tag of tags) {
    if (RESTRAINED_LANG_COLORS[tag]) {
      return { name: tag, ...RESTRAINED_LANG_COLORS[tag] };
    }
  }

  const name = (repo.name || '').toLowerCase();
  if (name.includes('rust') || name.includes('ding')) {
    return { name: 'Rust', ...RESTRAINED_LANG_COLORS.Rust };
  }
  if (name.includes('go')) {
    return { name: 'Go', ...RESTRAINED_LANG_COLORS.Go };
  }
  if (name.includes('python') || name.includes('vision') || name.includes('planet')) {
    return { name: 'Python', ...RESTRAINED_LANG_COLORS.Python };
  }
  if (name.includes('compose') || (name.includes('frontend') && name.includes('alum'))) {
    return { name: 'Kotlin', ...RESTRAINED_LANG_COLORS.Kotlin };
  }
  if (name.includes('cp') || name.includes('chronicles')) {
    return { name: 'C++', ...RESTRAINED_LANG_COLORS['C++'] };
  }
  if (name.includes('nommetric')) {
    return { name: 'Dart', ...RESTRAINED_LANG_COLORS.Dart };
  }
  if (name.includes('loktantra') || name.includes('eventchain')) {
    return { name: 'Solidity', ...RESTRAINED_LANG_COLORS.Solidity };
  }

  // Default to TypeScript
  return { name: 'TypeScript', ...RESTRAINED_LANG_COLORS.TypeScript };
}

/**
 * Extract all unique primary languages present in the current dataset
 */
export function extractAvailableLanguages(repos: any[]): string[] {
  const langSet = new Set<string>();
  for (const repo of repos) {
    const lang = detectPrimaryLanguage(repo);
    if (lang && lang.name) {
      langSet.add(lang.name);
    }
  }
  return Array.from(langSet).sort();
}

/**
 * Safely highlight search terms in text with accessible <mark>
 */
export function highlightSearchText(text: string, query: string): React.ReactNode {
  if (!query || !query.trim() || !text) return text;

  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-[var(--accent)]/15 text-[var(--foreground)] px-0.5 rounded-[1px] font-medium"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
