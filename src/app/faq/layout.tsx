import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about participating in OpenCode 2026, registration, Git workflows, mentorship, and awards.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | OpenCode 2026',
    description:
      'Answers to common questions about participating in OpenCode 2026, registration, Git workflows, mentorship, and awards.',
    url: '/faq',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OpenCode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenCode is a month-long open-source program where students collaborate on real-world projects with mentor guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can participate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenCode is open to everyone interested in development, regardless of their experience, university, or background.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a registration fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. OpenCode is completely free to participate in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need open-source experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all. Mentors and maintainers will help you get started, and beginner-friendly issues are clearly marked.',
      },
    },
    {
      '@type': 'Question',
      name: 'What prizes and rewards do contributors receive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top leaderboard finishers receive cash bounties, developer swag boxes, cloud credits, and verified certificates of achievement. All contributors with at least one merged PR receive an official certificate.',
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
