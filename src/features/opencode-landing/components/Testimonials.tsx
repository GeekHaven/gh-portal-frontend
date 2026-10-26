"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { testimonialsData, TestimonialItem } from "../data/testimonialsData";
import DecryptedText from "components/reactbits/DecryptedText";

const filterCategories = ["All Voices", "Winner", "Internship", "Mentor"] as const;

export function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Voices");

  const filteredStories = useMemo(() => {
    return testimonialsData.filter((item) => {
      if (selectedCategory === "All Voices") return true;
      return item.tag === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <section
      id="testimonials"
      aria-label="Community Testimonials"
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
        五
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
              <DecryptedText
                text="[ 05 / 五 · VOICES ]"
                speed={40}
                maxIterations={6}
                animateOn="hover"
              />
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight">
              Community <span className="italic">reflections</span>.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] mt-3 leading-relaxed">
              Stories and engineering outcomes from past contributors, mentors, and finalists who honed their craft at OpenCode.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
                    isActive
                      ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] font-medium"
                      : "bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[var(--border)] divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--background)]">
          {filteredStories.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--surface-2)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)] mb-6">
                  <span>{item.prsOrPoints || "Verified Contributor"}</span>
                  <span className="uppercase tracking-widest text-[10px] text-[var(--accent-text)] font-semibold">
                    {item.tag}
                  </span>
                </div>

                <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-[var(--foreground)] italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-[2px] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm text-[var(--foreground)]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-tight mt-0.5">
                    {item.company ? `${item.role} • ${item.company}` : item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
