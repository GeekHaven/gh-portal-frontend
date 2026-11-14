import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Hall of Fame & Winners',
  description:
    'Celebrate top open-source contributors and winners from previous OpenCode seasons.',
  alternates: {
    canonical: '/user/winners',
  },
  openGraph: {
    title: 'Hall of Fame & Winners | OpenCode 2026',
    description:
      'Celebrate top open-source contributors and winners from previous OpenCode seasons.',
    url: '/user/winners',
  },
};

export default function WinnersLayout({ children }: { children: ReactNode }) {
  return children;
}
