'use client';

import React from 'react';

export type EventStatusType = 'live' | 'upcoming' | 'concluded';

interface EventStatusChipProps {
  status?: EventStatusType;
  startDate?: string;
  endDate?: string;
  className?: string;
}

export function resolveEventStatus(startDate?: string, endDate?: string): {
  type: EventStatusType;
  label: string;
} {
  if (!startDate || !endDate) {
    return { type: 'live', label: 'Live Now' };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { type: 'live', label: 'Live Now' };
  }

  if (now > end) {
    return { type: 'concluded', label: 'Concluded' };
  }
  if (now < start) {
    return { type: 'upcoming', label: 'Upcoming' };
  }
  return { type: 'live', label: 'Live Now' };
}

export default function EventStatusChip({
  status: explicitStatus,
  startDate,
  endDate,
  className = '',
}: EventStatusChipProps) {
  const resolved = explicitStatus
    ? {
        type: explicitStatus,
        label:
          explicitStatus === 'live'
            ? 'Live Now'
            : explicitStatus === 'upcoming'
            ? 'Upcoming'
            : 'Concluded',
      }
    : resolveEventStatus(startDate, endDate);

  if (resolved.type === 'live') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-[0.14em] font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] select-none shadow-xs ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-foreground)] mr-1.5 animate-pulse" />
        {resolved.label}
      </span>
    );
  }

  if (resolved.type === 'upcoming') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-[0.14em] font-semibold border border-[var(--foreground)] text-[var(--foreground)] bg-transparent select-none ${className}`}
      >
        {resolved.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase tracking-[0.14em] font-semibold bg-[var(--surface-2)] text-[var(--muted-foreground)] border border-[var(--border)] select-none ${className}`}
    >
      {resolved.label}
    </span>
  );
}
