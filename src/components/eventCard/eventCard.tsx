'use client';

import React from 'react';
import EventCard from 'components/events/EventCard';

interface LegacyEventCardProps {
  btnStatus?: string;
  name: string;
  des: string;
  image: string;
  onLeaderboardClick?: (name: string) => void;
}

export default function SharedEventCard({
  name,
  des,
  image,
  onLeaderboardClick,
}: LegacyEventCardProps) {
  const event = {
    name,
    description: des,
    coverImageURL: image,
  };

  return (
    <div onClick={() => onLeaderboardClick?.(name)}>
      <EventCard event={event} />
    </div>
  );
}
