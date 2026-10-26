'use client';

import React from 'react';
import Image from 'next/image';

interface Sponsor {
  name: string;
  src: string;
  url: string;
  width: number;
  height: number;
}

const SPONSORS: Sponsor[] = [
  { name: 'GitHub', src: '/logos_github.svg', url: 'https://github.com', width: 90, height: 26 },
  { name: 'DigitalOcean', src: '/logos_digital-ocean.svg', url: 'https://digitalocean.com', width: 110, height: 26 },
  { name: 'Solana', src: '/logos_solana.svg', url: 'https://solana.com', width: 90, height: 26 },
  { name: 'Filecoin', src: '/logos_filecoin.svg', url: 'https://filecoin.io', width: 90, height: 26 },
  { name: 'Replit', src: '/logos_replit.svg', url: 'https://replit.com', width: 90, height: 26 },
  { name: 'Polygon Labs', src: '/logos_polygon.svg', url: 'https://polygon.technology', width: 95, height: 26 },
  { name: 'Taskade', src: '/logos_taskade.svg', url: 'https://taskade.com', width: 90, height: 26 },
  { name: 'JetBrains', src: '/images/jetbrains.png', url: 'https://jetbrains.com', width: 90, height: 26 },
];

export default function SponsorsMarquee() {
  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      {/* Label */}
      <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-[var(--muted-foreground)] mb-3.5 text-center">
        Sponsors 2026
      </span>

      {/* Marquee Container: Center ~1/3 of viewport width, softened edge-fade via CSS mask-image */}
      <div
        className="sponsors-marquee-container relative w-[88vw] sm:w-[68vw] md:w-[48vw] lg:w-[36vw] max-w-[560px] overflow-hidden py-1.5"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
        }}
      >
        <div className="sponsors-track flex items-center gap-9 md:gap-11 whitespace-nowrap">
          {/* Primary List */}
          <div className="flex items-center gap-9 md:gap-11 shrink-0">
            {SPONSORS.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
                className="sponsor-item flex items-center justify-center p-1 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
              >
                <Image
                  src={sponsor.src}
                  alt={`${sponsor.name} logo`}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="sponsor-logo max-h-5 sm:max-h-6 w-auto object-contain"
                />
              </a>
            ))}
          </div>

          {/* Duplicated List for Continuous Infinite Loop (aria-hidden) */}
          <div className="flex items-center gap-9 md:gap-11 shrink-0" aria-hidden="true">
            {SPONSORS.map((sponsor, index) => (
              <a
                key={`${sponsor.name}-dup-${index}`}
                href={sponsor.url}
                tabIndex={-1}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item flex items-center justify-center p-1 transition-all duration-200"
              >
                <Image
                  src={sponsor.src}
                  alt=""
                  width={sponsor.width}
                  height={sponsor.height}
                  className="sponsor-logo max-h-5 sm:max-h-6 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sponsors-track {
          display: flex;
          width: max-content;
          animation: marquee-left-to-right 32s linear infinite;
        }

        .sponsors-marquee-container:hover .sponsors-track,
        .sponsors-marquee-container:focus-within .sponsors-track {
          animation-play-state: paused;
        }

        :global(.sponsor-logo) {
          filter: brightness(0);
          opacity: 0.75;
          transition: all 200ms ease;
        }

        :global(.dark .sponsor-logo) {
          filter: brightness(0) invert(1);
          opacity: 0.82;
        }

        :global(.sponsor-item:hover .sponsor-logo),
        :global(.sponsor-item:focus-visible .sponsor-logo) {
          opacity: 1;
        }

        @keyframes marquee-left-to-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sponsors-marquee-container {
            overflow-x: auto;
            mask-image: none !important;
            -webkit-mask-image: none !important;
          }
          .sponsors-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
