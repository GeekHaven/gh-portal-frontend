'use client';

import React, { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { useFeatures } from 'contexts/FeaturesContext';
import FeaturedEvent, { EventData } from 'components/events/FeaturedEvent';
import EventsGrid from 'components/events/EventsGrid';
import EventsSkeleton from 'components/events/EventsSkeleton';
import { resolveEventStatus } from 'components/events/EventStatusChip';

// Re-export modular components for seamless imports
export { default as EventArtwork } from 'components/events/EventArtwork';
export { default as EventStatusChip } from 'components/events/EventStatusChip';
export { default as FeaturedEvent } from 'components/events/FeaturedEvent';
export { default as EventCard } from 'components/events/EventCard';
export { default as EventsGrid } from 'components/events/EventsGrid';
export { default as EventsSkeleton } from 'components/events/EventsSkeleton';

interface EventCollectionProps {
  events: EventData[];
  loading: boolean;
  error: boolean;
  retry: () => void;
  leaderboard?: boolean;
}

export function getEventTrack(name: string, description?: string): string {
  const text = `${name || ''} ${description || ''}`.toLowerCase();
  if (text.includes('ai') || text.includes('vision') || text.includes('kuroshio')) return 'AI / ML Sprint';
  if (text.includes('hack') || text.includes('north')) return 'Hackathon';
  if (text.includes('web3') || text.includes('contract') || text.includes('solana')) return 'Web3 & Governance';
  if (text.includes('ctf') || text.includes('security') || text.includes('cybershield')) return 'Security & CTF';
  if (text.includes('mobile') || text.includes('flutter')) return 'Mobile Dev';
  if (text.includes('game') || text.includes('forge')) return 'Game Dev';
  if (text.includes('bytecamp') || text.includes('algo')) return 'Systems & Algorithms';
  if (text.includes('cloud') || text.includes('kubernetes')) return 'Cloud & DevOps';
  if (text.includes('design')) return 'Design & UI/UX';
  return 'Open Source Sprint';
}

export default function EventCollection({
  events,
  loading,
  error,
  retry,
  leaderboard = false,
}: EventCollectionProps) {
  const { features } = useFeatures();

  // Resolve flagship event from admin feature flags or fallback to first active/first event
  const flagship = useMemo(() => {
    if (!events || !events.length) return null;
    if (features?.flagshipEvent) {
      const match = events.find(
        (e) => e.name?.toLowerCase() === features.flagshipEvent?.toLowerCase(),
      );
      if (match) return match;
    }
    // Fallback: prioritize first live sprint, or first event
    const liveEvent = events.find((e) => {
      const s = resolveEventStatus(e.startDate, e.endDate);
      return s.type === 'live';
    });
    return liveEvent || events[0];
  }, [events, features?.flagshipEvent]);

  // Filter out the flagship event so it isn't duplicated in the grid
  const gridEvents = useMemo(() => {
    if (!flagship) return events || [];
    return (events || []).filter((e) => e.name !== flagship.name);
  }, [events, flagship]);

  return (
    <div className="w-full">
      {/* Editorial Page Header: single h1, correct semantic structure */}
      <header className="mb-10 sm:mb-14">
        <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
          [ カタログ · CATALOGUE ]
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight mb-3">
          Seasonal Sprints &amp; <span className="italic">Tracks</span>.
        </h1>
        <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
          Structured open-source initiatives curated by GeekHaven IIITA. Select a sprint, contribute code, and climb the seasonal arena standings.
        </p>
      </header>

      {/* Loading Skeleton */}
      {loading ? (
        <EventsSkeleton />
      ) : error ? (
        /* Error State */
        <div
          role="status"
          className="p-12 sm:p-16 text-center rounded-[3px] border border-[var(--border)] bg-[var(--surface)] max-w-xl mx-auto my-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] block mb-3 font-semibold">
            [ 一時停止 · PAUSE ]
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] mb-3">
            A brief pause in the journey.
          </h2>
          <p className="font-sans text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
            We could not load the event catalogue right now. Please verify your connection and try again.
          </p>
          <button
            type="button"
            onClick={retry}
            className="h-10 px-6 rounded-[3px] border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)]/5 text-[var(--foreground)] text-xs font-mono uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        </div>
      ) : !events || !events.length ? (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center rounded-[3px] border border-[var(--border)] bg-[var(--surface)] max-w-xl mx-auto my-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] block mb-3 font-semibold">
            [ 準備中 · UPCOMING ]
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] mb-3">
            New beginnings are on the way.
          </h2>
          <p className="font-sans text-sm text-[var(--muted-foreground)] leading-relaxed">
            Open-source tracks and competitive sprints will appear here once officially announced by GeekHaven.
          </p>
        </div>
      ) : (
        /* Dynamic Catalog: Featured Landmark + Curated Grid */
        <div>
          {flagship && (
            <FeaturedEvent
              event={flagship}
              leaderboard={leaderboard}
              trackName={getEventTrack(flagship.name, flagship.description)}
            />
          )}

          <EventsGrid
            events={gridEvents}
            leaderboard={leaderboard}
            getTrackName={getEventTrack}
          />
        </div>
      )}
    </div>
  );
}
