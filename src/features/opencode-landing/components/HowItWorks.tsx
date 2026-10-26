"use client";

import React from "react";
import { Search, Code, GitPullRequest, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import DecryptedText from "components/reactbits/DecryptedText";

const contributorSteps = [
  {
    number: "01",
    icon: Search,
    title: "Claim Issue",
    description:
      "Browse our curated repositories and find an issue that excites you. From starter-friendly 'good-first-issue' tags to complex architectural features, pick what challenges you most.",
  },
  {
    number: "02",
    icon: Code,
    title: "Solve & Collaborate",
    description:
      "Dive into the codebase with confidence. Maintainers and peers are actively available in dedicated Discord channels to brainstorm approaches, troubleshoot blockers, and review logic.",
  },
  {
    number: "03",
    icon: GitPullRequest,
    title: "Submit PR",
    description:
      "Push clean commits and open your Pull Request. Experience professional code review, learn automated CI/CD practices, and refine your code to meet production repository standards.",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Climb Leaderboard",
    description:
      "Watch your PR get merged! Points are automatically allocated to your profile on the live leaderboard. Compete with builders nationwide for cash prizes, swag kits, and certificates.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="relative py-24 sm:py-32 bg-[var(--surface)] text-[var(--foreground)] border-b border-[var(--border)] overflow-hidden"
    >
      {/* Faint dot pattern (<=6% opacity) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"
        aria-hidden="true"
      />

      {/* Oversized low-contrast Japanese numeral watermark */}
      <div
        className="absolute top-6 right-8 font-serif text-[120px] sm:text-[180px] leading-none text-[var(--foreground)] opacity-[0.03] select-none pointer-events-none font-bold"
        aria-hidden="true"
      >
        三
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
            <DecryptedText
              text="[ 03 / 三 · PROCESS ]"
              speed={40}
              maxIterations={6}
              animateOn="hover"
            />
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight mb-4">
            How it <span className="italic">works</span>.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            A structured path from your first open source issue to merged production code and community recognition.
          </p>
        </div>

        {/* 4-Step Linear Sequence Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[var(--border)] divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] bg-[var(--background)]">
          {contributorSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--surface-2)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-2xl font-light text-[var(--accent)]">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-[var(--foreground)] mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]">
                  Step {step.number} of 04
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Footnote CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border border-[var(--border)] bg-[var(--background)]">
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Ready to participate in OpenCode 2026? Registration takes less than two minutes.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-text)] hover:underline whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
          >
            <span>Begin Contributor Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
