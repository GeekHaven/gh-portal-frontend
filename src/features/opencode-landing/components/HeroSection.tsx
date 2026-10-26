'use client';

import React from 'react';
import Link from 'next/link';
import SumiLandscapeBackground from './SumiLandscapeBackground';
import SponsorsMarquee from './SponsorsMarquee';
import TerminalWindow from './TerminalWindow';
import Magnet from 'components/reactbits/Magnet';
import ClickSpark from 'components/reactbits/ClickSpark';

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative w-full pt-32 sm:pt-36 md:pt-42 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 overflow-hidden text-center flex flex-col items-center justify-center border-b border-[var(--border)]"
    >
      {/* Background: Calm, misty ink-wash landscape with paper grain, moon, and mountain parallax */}
      <SumiLandscapeBackground />

      {/* Soft Scrim behind Hero Text for WCAG AA Contrast */}
      <div
        className="absolute inset-x-0 top-20 h-[480px] max-w-4xl mx-auto pointer-events-none z-[5]"
        style={{
          background: 'radial-gradient(ellipse at center, var(--background) 15%, transparent 75%)',
          opacity: 0.88,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* 3. CENTER OF HERO: Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.03em] leading-[1.04] text-[var(--foreground)] max-w-4xl mx-auto">
          OpenCode 2026
        </h1>

        {/* Existing Tagline - tight leading, generous negative space */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mt-5 sm:mt-6 leading-relaxed">
          A month-long open source celebration by{' '}
          <strong className="font-semibold text-[var(--foreground)]">GeekHaven, IIITA</strong>{' '}
          bringing together{' '}
          <strong className="font-semibold text-[var(--foreground)]">1,000+ student developers</strong>{' '}
          and seasoned open-source maintainers from across the globe.
        </p>

        {/* Two Buttons Centered with Tactile Magnet Pull & Click Sparks */}
        <ClickSpark
          sparkColor="var(--accent)"
          sparkCount={6}
          sparkRadius={24}
          duration={380}
          className="mt-8 sm:mt-10 w-full sm:w-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Button 1: "Explore" (Secondary: transparent with 1px sumi border) */}
            <Magnet padding={25} magnetStrength={3}>
              <a
                href="#projects"
                className="w-full sm:w-auto h-11 px-7 rounded-[3px] border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)]/5 text-[var(--foreground)] text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                Explore
              </a>
            </Magnet>

            {/* Button 2: "Start Contributing" (Primary: solid accent Vermilion, accent-foreground text) */}
            <Magnet padding={30} magnetStrength={3}>
              <Link
                href="/auth/register"
                className="w-full sm:w-auto h-11 px-7 rounded-[3px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center transition-colors duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                Start Contributing
              </Link>
            </Magnet>
          </div>
        </ClickSpark>

        {/* 4. BELOW THE BUTTONS: Sponsors Strip (Marquee, center ~1/3 width, left-to-right) */}
        <div className="w-full mt-10 sm:mt-12">
          <SponsorsMarquee />
        </div>

        {/* 5. BOTTOM OF HERO: macOS-style Monospace Terminal Window */}
        <div className="w-full mt-6 sm:mt-8">
          <TerminalWindow />
        </div>

      </div>
    </section>
  );
}
