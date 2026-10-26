'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import SpotlightCard from 'components/reactbits/SpotlightCard';
import { detectPrimaryLanguage, highlightSearchText } from './repoUtils';

export interface RepoItem {
  name: string;
  description?: string;
  tags?: string[];
  githubLink?: string;
  discordLink?: string;
  maintainers?: Array<string | { name?: string; username?: string; githubId?: string }>;
  [key: string]: any;
}

interface RepoCardProps {
  repo: RepoItem;
  index: number;
  searchQuery?: string;
  className?: string;
}

function getMaintainerHandle(m: any): string {
  if (typeof m === 'string') return m;
  if (!m) return '';
  return m.username || m.name || m.githubId || '';
}

function MaintainerAvatar({ handle }: { handle: string }) {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = `https://github.com/${handle}.png?size=48`;

  return (
    <a
      href={`https://github.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Maintainer: @${handle}`}
      aria-label={`Maintainer @${handle} on GitHub`}
      className="relative inline-block w-5 h-5 rounded-[2px] overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--foreground)] transition-colors shrink-0"
    >
      {!imgError ? (
        <Image
          src={avatarUrl}
          alt={`@${handle}`}
          width={20}
          height={20}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center text-[9px] font-mono text-[var(--muted-foreground)] uppercase">
          {handle.slice(0, 2)}
        </span>
      )}
    </a>
  );
}

export default function RepoCard({
  repo,
  index,
  searchQuery = '',
  className = '',
}: RepoCardProps) {
  const primaryLang = detectPrimaryLanguage(repo);
  const repoName = repo.name || 'Repository';
  const githubUrl = repo.githubLink || `https://github.com/opencodeiiita/${repoName}`;
  const discordUrl =
    repo.discordLink ||
    'https://discord.com/channels/885149696249708635/885151791329722448';

  // Catalog index numeral (e.g. 01, 02...)
  const indexNumeral = String(index + 1).padStart(2, '0');

  // Parse maintainers safely
  const rawMaintainers = Array.isArray(repo.maintainers) ? repo.maintainers : [];
  const maintainers = rawMaintainers
    .map(getMaintainerHandle)
    .filter((handle) => Boolean(handle && handle.trim().length > 0));
  const hasMaintainers = maintainers.length > 0;

  // Filter out the primary language from secondary tags if already highlighted
  const secondaryTags = (repo.tags || []).filter(
    (tag: string) => tag.toLowerCase() !== primaryLang.name.toLowerCase(),
  );
  const visibleTags = secondaryTags.slice(0, 3);
  const extraTagsCount = secondaryTags.length - visibleTags.length;

  return (
    <SpotlightCard
      as="article"
      spotlightColor="rgba(200, 65, 43, 0.08)"
      size={340}
      className={`group relative flex flex-col h-full p-5 sm:p-6 rounded-[3px] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--foreground)] hover:-translate-y-0.5 ${className}`}
    >
      {/* ─── TOP BAR: INDEX NUMERAL & GITHUB LINK ─── */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Mono Catalogue Numeral */}
        <span
          className="font-mono text-xs font-semibold text-[var(--accent)] tracking-widest select-none"
          aria-label={`Repository number ${indexNumeral}`}
        >
          {indexNumeral}
        </span>

        {/* Clean, unboxed GitHub glyph */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repoName} on GitHub`}
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1 -mr-1 rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
        >
          <FaGithub className="w-4 h-4" />
        </a>
      </div>

      {/* ─── REPO TITLE & OWNER ─── */}
      <div className="mb-3">
        <span className="text-[11px] font-mono text-[var(--muted-foreground)] tracking-wide block mb-1">
          opencodeiiita /
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] font-semibold tracking-tight leading-snug [overflow-wrap:anywhere] break-words hyphens-auto">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors focus:outline-none focus-visible:underline"
          >
            {highlightSearchText(repoName, searchQuery)}
          </a>
        </h2>
      </div>

      {/* ─── PRIMARY LANGUAGE & TECH TAGS ─── */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        {/* Restrained Primary Language Pill */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] font-medium">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: primaryLang.dot }}
            aria-hidden="true"
          />
          <span>{primaryLang.name}</span>
        </span>

        {/* Real Tech Tags */}
        {visibleTags.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted-foreground)]"
          >
            {tag}
          </span>
        ))}

        {extraTagsCount > 0 && (
          <span
            title={secondaryTags.slice(3).join(', ')}
            className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted-foreground)]"
          >
            +{extraTagsCount}
          </span>
        )}
      </div>

      {/* ─── DESCRIPTION (OMITTED IF EMPTY TO PREVENT HOLLOW DEAD GAPS) ─── */}
      {repo.description && repo.description.trim().length > 0 && (
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed mb-4 font-sans">
          {highlightSearchText(repo.description, searchQuery)}
        </p>
      )}

      {/* ─── TEAM / MAINTAINERS ROW (STRICTLY OMITTED IF NO MAINTAINERS EXIST) ─── */}
      {hasMaintainers && (
        <div className="flex items-center gap-2 mb-4 pt-2 border-t border-[var(--border)]/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] font-semibold shrink-0">
            Team:
          </span>
          <div className="flex items-center -space-x-1 overflow-hidden">
            {maintainers.slice(0, 4).map((handle) => (
              <MaintainerAvatar key={handle} handle={handle} />
            ))}
            {maintainers.length > 4 && (
              <span className="inline-flex items-center justify-center h-5 px-1.5 text-[9px] font-mono rounded-[2px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted-foreground)]">
                +{maintainers.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─── FOOTER ACTION ROW (PINNED TO BOTTOM) ─── */}
      <div className="mt-auto pt-3.5 border-t border-[var(--border)] flex items-center justify-between gap-3">
        {/* Editorial Text Link with sliding arrow */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors focus:outline-none focus-visible:underline"
        >
          <span>Browse code &amp; issues</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 text-[var(--accent)]" />
        </a>

        {/* Discord Link (Restyled to monochrome) */}
        <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join discussion on Discord"
          title="Join community discussion on Discord"
          className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors p-1 rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
        >
          <FaDiscord className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Discord</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>
    </SpotlightCard>
  );
}
