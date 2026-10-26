'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Trophy, CalendarDays } from 'lucide-react';
import EventStatusChip, { resolveEventStatus } from './EventStatusChip';
import { resolveImageUrl, getEventCoverImage, getEventLogoImage } from 'utils/eventImages';

export interface EventData {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  logoImageURL?: string;
  logoImageUrl?: string;
  coverImageURL?: string;
  coverImageUrl?: string;
  coverImagesURL?: (string | { url?: string })[];
  [key: string]: any;
}

interface FeaturedEventProps {
  event: EventData;
  leaderboard?: boolean;
  trackName?: string;
}

function parseSerifDate(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) {
    return { numerals: '2025–26', subtext: 'SEASONAL SPRINT' };
  }
  try {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { numerals: '2025–26', subtext: 'SEASONAL SPRINT' };
    }
    const sDay = s.getDate();
    const eDay = e.getDate();
    const sMonth = s.toLocaleString('en-US', { month: 'short' });
    const eMonth = e.toLocaleString('en-US', { month: 'short' });
    const sYear = s.getFullYear();
    const eYear = e.getFullYear();

    if (sYear === eYear && sMonth === eMonth) {
      return {
        numerals: `${sDay}–${eDay}`,
        subtext: `${sMonth} ${sYear}`,
      };
    }
    if (sYear === eYear) {
      return {
        numerals: `${sDay} ${sMonth} – ${eDay} ${eMonth}`,
        subtext: `${sYear}`,
      };
    }
    return {
      numerals: `${sDay} ${sMonth}`,
      subtext: `– ${eDay} ${eMonth} ${eYear}`,
    };
  } catch {
    return { numerals: '2025–26', subtext: 'SEASONAL SPRINT' };
  }
}

export default function FeaturedEvent({
  event,
  leaderboard = false,
  trackName = 'Flagship Sprint',
}: FeaturedEventProps) {
  const decodedTitle = (() => {
    try {
      return decodeURIComponent(event.name || '');
    } catch {
      return event.name || 'OpenCode Flagship';
    }
  })();

  const status = resolveEventStatus(event.startDate, event.endDate);
  const dateInfo = parseSerifDate(event.startDate, event.endDate);

  const coverUrl = resolveImageUrl(
    getEventCoverImage(event),
    '/images/kyoto-evening.png'
  );
  const logoUrl = resolveImageUrl(getEventLogoImage(event));
  const targetUrl = `/user/leaderboard/${encodeURIComponent(event.name || '')}`;

  return (
    <div className="mb-12 sm:mb-16">
      {/* Featured Header Kicker */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
          Featured Flagship Sprint
        </span>
      </div>

      <article
        aria-label={`Featured event: ${decodedTitle}`}
        className="group relative flex flex-col rounded-[4px] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--foreground)]"
      >
        {/* Full-width Banner Container (Outer div has NO overflow-hidden so overlapping logo is NOT clipped) */}
        <div className="relative w-full h-64 sm:h-76 md:h-88 lg:h-96 bg-[var(--surface-2)] border-b border-[var(--border)] rounded-t-[3px]">
          {/* Inner Image Container (Has overflow-hidden to clip image scaling on hover) */}
          <div className="absolute inset-0 overflow-hidden rounded-t-[3px]">
            <Image
              src={coverUrl}
              alt={decodedTitle ? `${decodedTitle} banner` : 'Flagship event banner'}
              fill
              unoptimized
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-103 filter grayscale-[0.25] contrast-95 group-hover:filter-none"
            />
            {/* Soft upward gradient scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-black/30 opacity-90 pointer-events-none" />

            {/* Faint paper grain texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.02] mix-blend-multiply dark:mix-blend-screen bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />
          </div>

          {/* Badges on Solid Token Background (100% readable over any artwork) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-[2px] text-xs font-mono uppercase tracking-wider bg-[var(--surface)]/95 text-[var(--foreground)] border border-[var(--border)] shadow-xs select-none backdrop-blur-xs">
              {trackName}
            </span>
            <EventStatusChip startDate={event.startDate} endDate={event.endDate} />
          </div>

          {/* Logo Badge (Bottom-left overlapping the banner edge, UNCLIPPED) */}
          <div className="absolute -bottom-7 sm:-bottom-8 left-6 sm:left-10 z-20">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-[4px] bg-[var(--surface)] border-2 border-[var(--border)] shadow-md overflow-hidden flex items-center justify-center p-2">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Trophy className="w-8 h-8 text-[var(--accent)]" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        {/* Content Body Below Banner */}
        <div className="pt-12 sm:pt-14 px-6 sm:px-10 pb-8 sm:pb-10 flex flex-col justify-between gap-6">
          <div>
            {/* Date Display */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] mb-3">
              <CalendarDays className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span className="font-serif text-base sm:text-lg text-[var(--foreground)] font-normal">
                {dateInfo.numerals}
              </span>
              <span className="uppercase tracking-widest text-[11px]">
                {dateInfo.subtext}
              </span>
            </div>

            {/* Event Title in Serif Font */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.6rem] text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-[1.12] tracking-tight mb-3">
              {decodedTitle}
            </h2>

            {/* Description in Body Font Token */}
            <p className="font-sans text-[15px] sm:text-[16px] text-[var(--muted-foreground)] leading-[1.8] max-w-4xl">
              {event.description ||
                'Join thousands of student developers in the premier seasonal open-source sprint. Collaborate with maintainers, submit pull requests, and climb the official standings.'}
            </p>
          </div>

          {/* Action Row & Conditional Status Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <div className="text-xs font-mono text-[var(--muted-foreground)]">
              {status.type === 'live' ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-[var(--foreground)] font-medium">Active Community Sprint</span>
                </div>
              ) : status.type === 'upcoming' ? (
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                  <span>Sprint Registration Open</span>
                </div>
              ) : (
                <span>Archived Flagship Initiative</span>
              )}
            </div>

            {/* Primary Flat CTA Button */}
            <Link
              href={targetUrl}
              className="h-11 px-6 rounded-[3px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            >
              <span>{leaderboard ? 'View Arena Standings' : 'Enter Arena & Leaderboard'}</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
