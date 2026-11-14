import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Community Canvas',
  description:
    'Real-time collaborative pixel canvas for OpenCode 2026. Place pixels, build art, and collaborate with the community.',
  alternates: {
    canonical: '/user/canvas',
  },
  openGraph: {
    title: 'Community Canvas | OpenCode 2026',
    description:
      'Real-time collaborative pixel canvas for OpenCode 2026. Place pixels, build art, and collaborate with the community.',
    url: '/user/canvas',
  },
};

export default function CanvasLayout({ children }: { children: ReactNode }) {
  return children;
}
