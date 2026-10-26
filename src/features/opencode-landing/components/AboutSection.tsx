"use client";

import React from "react";
import {
  GitPullRequest,
  Users,
  Trophy,
  HeartHandshake,
} from "lucide-react";
import IndiaMap from "components/opencode/IndiaMap";
import DecryptedText from "components/reactbits/DecryptedText";

const highlights = [
  {
    icon: GitPullRequest,
    number: "01",
    tag: "Version Control",
    title: "Hands-on Production Git",
    description:
      "Move beyond toy tutorials. Participants clone real-world repositories, resolve authentic maintainer issues, and learn industrial git rebase and review workflows.",
  },
  {
    icon: Users,
    number: "02",
    tag: "Mentorship",
    title: "1-on-1 Senior Mentorship",
    description:
      "Every project is led by experienced maintainers, GSoC scholars, and IIITA alumni who provide line-by-line feedback on every submitted PR.",
  },
  {
    icon: Trophy,
    number: "03",
    tag: "Competition",
    title: "Gamified Leaderboard",
    description:
      "Real-time point scoring for merged contributions encourages consistent shipping while keeping the environment collaborative, supportive, and fun.",
  },
  {
    icon: HeartHandshake,
    number: "04",
    tag: "Career Pipeline",
    title: "Career & Tech Pipeline",
    description:
      "High-velocity contributions showcase your real-world engineering skills, helping you stand out for summer internships and open source fellowships.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About OpenCode"
      className="relative py-24 sm:py-32 bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] overflow-hidden"
    >
      {/* Oversized low-contrast Japanese numeral watermark */}
      <div
        className="absolute top-6 right-8 font-serif text-[120px] sm:text-[180px] leading-none text-[var(--foreground)] opacity-[0.03] select-none pointer-events-none font-bold"
        aria-hidden="true"
      >
        二
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
              <DecryptedText
                text="[ 02 / 二 · ETHOS ]"
                speed={40}
                maxIterations={6}
                animateOn="hover"
              />
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight">
              About <span className="italic">OpenCode</span>.
            </h2>
          </div>
          <div className="lg:col-span-8 flex items-end">
            <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
              OpenCode is the annual month-long open source festival organized by{" "}
              <strong className="font-semibold text-[var(--foreground)]">
                GeekHaven, the official technical society of IIIT Allahabad
              </strong>
              . We bridge the gap between enthusiastic learners and production software engineering through structured repository contributions.
            </p>
          </div>
        </div>

        {/* 2x2 Architectural Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--surface)]">
          {/* Top Row / 2 items */}
          <div className="divide-y divide-[var(--border)]">
            {highlights.slice(0, 2).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 sm:p-10 transition-colors duration-200 hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-[2px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shrink-0">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed pl-13">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row / 2 items */}
          <div className="divide-y divide-[var(--border)]">
            {highlights.slice(2, 4).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 sm:p-10 transition-colors duration-200 hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-[2px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shrink-0">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed pl-13">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nationwide Contributor Network Panel featuring IndiaMap */}
        <div className="mt-12 sm:mt-16 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
                [ NATIONWIDE REACH · 全国の調和 ]
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[var(--foreground)] tracking-tight leading-tight mb-4">
                Connecting builders from Prayagraj across India.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-6">
                From undergraduate students taking their first steps in git to seasoned open-source fellows, OpenCode unites over 1,000 contributors from 28+ states and territories into an active, collaborative software ecosystem.
              </p>

              {/* Architectural Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] font-light">
                    28+
                  </div>
                  <div className="text-[10px] font-mono text-[var(--muted-foreground)] tracking-wider uppercase mt-1">
                    States &amp; UTs
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] font-light">
                    1,000+
                  </div>
                  <div className="text-[10px] font-mono text-[var(--muted-foreground)] tracking-wider uppercase mt-1">
                    Builders
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-[var(--accent)] font-light">
                    IIITA
                  </div>
                  <div className="text-[10px] font-mono text-[var(--muted-foreground)] tracking-wider uppercase mt-1">
                    Central Node
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center items-center">
              <IndiaMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
