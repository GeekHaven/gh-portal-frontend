import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Leaderboard',
  description:
    'Real-time OpenCode 2026 contributor leaderboard. Track live points, merged pull requests, and rankings.',
  alternates: {
    canonical: '/user/leaderboard',
  },
  openGraph: {
    title: 'Leaderboard | OpenCode 2026',
    description:
      'Real-time OpenCode 2026 contributor leaderboard. Track live points, merged pull requests, and rankings.',
    url: '/user/leaderboard',
  },
};

export default function LeaderboardLayout({ children }: { children: ReactNode }) {
  return children;
}
