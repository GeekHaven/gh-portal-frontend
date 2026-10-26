'use client';

import React from 'react';
import RepoCard, { RepoItem } from './RepoCard';
import AnimatedContent from 'components/reactbits/AnimatedContent';

interface RepoGridProps {
  repos: RepoItem[];
  searchQuery?: string;
  className?: string;
}

export default function RepoGrid({
  repos,
  searchQuery = '',
  className = '',
}: RepoGridProps) {
  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 ${className}`}
    >
      {repos.map((repo, idx) => (
        <AnimatedContent
          key={repo.name || repo.id || idx}
          delay={Math.min(idx * 0.04, 0.24)}
          duration={0.4}
        >
          <RepoCard
            repo={repo}
            index={idx}
            searchQuery={searchQuery}
          />
        </AnimatedContent>
      ))}
    </div>
  );
}
