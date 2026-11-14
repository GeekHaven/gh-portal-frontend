import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Events & Repositories',
  description:
    'Discover open-source repositories, projects, and tracks participating in OpenCode 2026.',
  alternates: {
    canonical: '/user/events',
  },
  openGraph: {
    title: 'Events & Repositories | OpenCode 2026',
    description:
      'Discover open-source repositories, projects, and tracks participating in OpenCode 2026.',
    url: '/user/events',
  },
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
