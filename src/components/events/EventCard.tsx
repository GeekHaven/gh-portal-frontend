'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, ChevronRight, Trophy } from 'lucide-react';
import EventStatusChip, { resolveEventStatus } from './EventStatusChip';
import SpotlightCard from 'components/reactbits/SpotlightCard';
import { resolveImageUrl, getEventCoverImage, getEventLogoImage } from 'utils/eventImages';
import { EventData } from './FeaturedEvent';

interface EventCardProps {
  event: EventData;
  leaderboard?: boolean;
  trackName?: string;
  className?: string;
}

function formatDates(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) return 'Seasonal Sprint';
  try {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 'Seasonal Sprint';
    const sMonth = s.toLocaleString('en-US', { month: 'short' });
    const eMonth = e.toLocaleString('en-US', { month: 'short' });
    const sYear = s.getFullYear();
    const eYear = e.getFullYear();

    if (sYear === eYear) {
      return `${sMonth} ${s.getDate()} – ${eMonth} ${e.getDate()}, ${sYear}`;
    }
    return `${sMonth} ${s.getDate()}, ${sYear} – ${eMonth} ${e.getDate()}, ${eYear}`;
  } catch {
    return 'Seasonal Sprint';
  }
}

export default function EventCard({
  event,
  leaderboard = false,
  trackName = 'Open Source Track',
  className = '',
}: EventCardProps) {
  const decodedTitle = (() => {
    try {
      return decodeURIComponent(event.name || '');
    } catch {
      return event.name || 'OpenCode Track';
    }
  })();

  const status = resolveEventStatus(event.startDate, event.endDate);
  const dateRange = formatDates(event.startDate, event.endDate);

  const coverUrl = resolveImageUrl(
    getEventCoverImage(event),
    '/images/kyoto-garden.png'
  );
  const logoUrl = resolveImageUrl(getEventLogoImage(event));
  const targetUrl = `/user/leaderboard/${encodeURIComponent(event.name || '')}`;

  const isConcluded = status.type === 'concluded';

  return (
    <SpotlightCard
      as="article"
      spotlightColor="rgba(200, 65, 43, 0.08)"
      size={320}
      className={`group relative flex flex-col justify-between rounded-[4px] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--foreground)] hover:-translate-y-1 ${
        isConcluded ? 'opacity-90 hover:opacity-100' : ''
      } ${className}`}
    >
      {/* Clickable Stretched Link */}
      <Link
        href={targetUrl}
        className="absolute inset-0 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-[4px]"
        aria-label={`${leaderboard ? 'View leaderboard for' : 'Enter arena for'} ${decodedTitle}`}
      >
        <span className="sr-only">
          {leaderboard ? 'View leaderboard for' : 'Enter arena for'} {decodedTitle}
        </span>
      </Link>

      <div>
        {/* Banner Container with Overlapping Unclipped Logo Badge */}
        <div className="relative h-44 sm:h-48 w-full bg-[var(--surface-2)] border-b border-[var(--border)] rounded-t-[3px]">
          {/* Inner Image Container (clipped to boundary) */}
          <div className="absolute inset-0 overflow-hidden rounded-t-[3px]">
            <Image
              src={coverUrl}
              alt={decodedTitle ? `${decodedTitle} cover` : 'Event track cover'}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[0.25] contrast-95 group-hover:filter-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-black/20" />
            
            {/* Paper Grain Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.02] mix-blend-multiply dark:mix-blend-screen bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />
          </div>

          {/* Top Status & Track Badges on Solid Token Background */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider bg-[var(--surface)]/95 text-[var(--foreground)] border border-[var(--border)] shadow-xs select-none backdrop-blur-xs">
              {trackName}
            </span>
            <EventStatusChip startDate={event.startDate} endDate={event.endDate} />
          </div>

          {/* Event Logo Avatar Badge (Overlapping bottom-left without clipping) */}
          <div className="absolute -bottom-4 left-5 z-20">
            <div className="w-12 h-12 rounded-[4px] bg-[var(--surface)] border-2 border-[var(--border)] shadow-sm overflow-hidden flex items-center justify-center p-1">
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
                <Trophy className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        {/* Content Body Below Banner */}
        <div className="p-5 pt-7">
          {/* Date Row with Calendar Icon */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] font-mono mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
            <span>{dateRange}</span>
          </div>

          {/* Event Title */}
          <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-snug tracking-tight mb-2">
            {decodedTitle}
          </h3>

          {/* 2-line Clamped Description in Body Font Token */}
          <p className="font-sans text-xs sm:text-sm text-[var(--muted-foreground)] leading-[1.7] line-clamp-2 mb-4">
            {event.description ||
              'Collaborate with student developers, contribute code, and build impactful open-source software.'}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="px-5 pb-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors font-semibold">
        <span>{leaderboard ? 'View Standings' : 'Enter Arena'}</span>
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </SpotlightCard>
  );
}
