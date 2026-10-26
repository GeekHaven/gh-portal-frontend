'use client';

import React, { useMemo } from 'react';
import EventCard from './EventCard';
import AnimatedContent from 'components/reactbits/AnimatedContent';
import { resolveEventStatus } from './EventStatusChip';
import { EventData } from './FeaturedEvent';

interface EventsGridProps {
  events: EventData[];
  leaderboard?: boolean;
  getTrackName?: (name: string, description?: string) => string;
}

export default function EventsGrid({
  events,
  leaderboard = false,
  getTrackName,
}: EventsGridProps) {
  // Sort events by status: Live first -> Upcoming second -> Concluded third (presentation only)
  const sortedEvents = useMemo(() => {
    const score = (e: EventData) => {
      const status = resolveEventStatus(e.startDate, e.endDate);
      if (status.type === 'live') return 1;
      if (status.type === 'upcoming') return 2;
      return 3;
    };

    return [...events].sort((a, b) => score(a) - score(b));
  }, [events]);

  if (!sortedEvents.length) {
    return null;
  }

  const countLabel = `${sortedEvents.length} more ${
    sortedEvents.length === 1 ? 'track' : 'tracks'
  }`;

  return (
    <section aria-labelledby="all-tracks-heading" className="mt-12 sm:mt-16">
      {/* Section Header Row with Hairline */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-8 border-b border-[var(--border)]">
        <h3
          id="all-tracks-heading"
          className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--muted-foreground)] font-semibold"
        >
          All Active &amp; Upcoming Tracks
        </h3>
        <span className="text-xs font-mono text-[var(--muted-foreground)] shrink-0">
          {countLabel}
        </span>
      </div>

      {/* Responsive Grid: 1 col mobile, 2 cols >=768px, 3 cols >=1280px */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {sortedEvents.map((event, index) => {
          const track = getTrackName ? getTrackName(event.name, event.description) : 'Open Source Track';
          return (
            <AnimatedContent
              key={event.name || index}
              delay={Math.min(index * 0.05, 0.3)}
              duration={0.5}
            >
              <EventCard
                event={event}
                leaderboard={leaderboard}
                trackName={track}
              />
            </AnimatedContent>
          );
        })}
      </div>
    </section>
  );
}
