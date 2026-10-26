"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CountUp from "./CountUp";
import DecryptedText from "components/reactbits/DecryptedText";

const stats = [
  { id: "01", label: "Active Participants", value: 1000, suffix: "+" },
  { id: "02", label: "PRs Merged", value: 3700, suffix: "+" },
  { id: "03", label: "Projects & Tracks", value: 25, suffix: "+" },
];

const ecosystemLogos = [
  { name: "GitHub", src: "/logos_github.svg", width: 100, height: 28 },
  { name: "DigitalOcean", src: "/logos_digital-ocean.svg", width: 120, height: 28 },
  { name: "Solana", src: "/logos_solana.svg", width: 100, height: 28 },
  { name: "Filecoin", src: "/logos_filecoin.svg", width: 100, height: 28 },
  { name: "Replit", src: "/logos_replit.svg", width: 100, height: 28 },
  { name: "Polygon Labs", src: "/logos_polygon.svg", width: 100, height: 28 },
  { name: "Taskade", src: "/logos_taskade.svg", width: 100, height: 28 },
  { name: "JetBrains", src: "/images/jetbrains.png", width: 100, height: 28 },
];

export default function StatsRibbon() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-label="Event statistics"
      className="relative z-10 py-16 sm:py-24 bg-[var(--surface)] text-[var(--foreground)] border-b border-[var(--border)] overflow-hidden"
    >
      {/* Faint dot pattern (<=6% opacity) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"
        aria-hidden="true"
      />

      {/* Oversized low-contrast Japanese numeral watermark */}
      <div
        className="absolute top-4 right-8 font-serif text-[120px] sm:text-[180px] leading-none text-[var(--foreground)] opacity-[0.03] select-none pointer-events-none font-bold"
        aria-hidden="true"
      >
        一
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Section kicker */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] font-semibold">
            <DecryptedText
              text="[ 01 / 一 · METRICS ]"
              speed={40}
              maxIterations={6}
              animateOn="hover"
            />
          </span>
          <span className="h-px w-8 bg-[var(--border)]" />
          <span className="text-[11px] font-mono text-[var(--muted-foreground)]">実績</span>
        </div>

        {/* Architectural 3-Column Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] bg-[var(--background)]">
          {stats.map((item) => (
            <div
              key={item.label}
              className="p-8 sm:p-10 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)] mb-6">
                <span>{item.id}</span>
                <span className="uppercase tracking-widest text-[10px]">VERIFIED METRIC</span>
              </div>

              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground)] tracking-tight">
                <CountUp
                  to={item.value}
                  duration={1.6}
                  separator=","
                  startWhen={isInView}
                  className="inline-block"
                />
                <span className="text-[var(--accent)] ml-1 font-sans font-light">
                  {item.suffix}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)] text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)] font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Supported by Developer Ecosystems Ribbon */}
        <div className="mt-14 pt-10 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Supported &amp; Trusted by Developer Ecosystems
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[var(--muted-foreground)]">
              Global Open Source Partners
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 items-center justify-items-center">
            {ecosystemLogos.map((logo) => (
              <div
                key={logo.name}
                className="h-8 flex items-center justify-center p-1"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-5 sm:max-h-6 w-auto object-contain [filter:brightness(0)] opacity-75 dark:[filter:brightness(0)_invert(1)] dark:opacity-80 hover:opacity-100 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
