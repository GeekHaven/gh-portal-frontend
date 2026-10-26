"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { projectsData, ProjectItem } from "../data/projectsData";
import { Github, User, ArrowRight, X, ExternalLink } from "lucide-react";
import SpotlightCard from "components/reactbits/SpotlightCard";
import DecryptedText from "components/reactbits/DecryptedText";

interface TrackFilter {
  id: string;
  label: string;
  domain?: "ai" | "web" | "mobile" | "web3" | "cybersecurity";
}

const TRACK_FILTERS: TrackFilter[] = [
  { id: "all", label: "All Tracks" },
  { id: "ai", label: "AI & Intelligence", domain: "ai" },
  { id: "web", label: "Web & Fullstack", domain: "web" },
  { id: "cybersecurity", label: "Security & Systems", domain: "cybersecurity" },
  { id: "web3", label: "Web3 & Protocols", domain: "web3" },
  { id: "mobile", label: "Mobile Ecosystem", domain: "mobile" },
];

export default function Projects() {
  const [activeTrack, setActiveTrack] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeTrack === "all") return projectsData;
    const filter = TRACK_FILTERS.find((t) => t.id === activeTrack);
    if (!filter || !filter.domain) return projectsData;
    return projectsData.filter((p) => p.domain === filter.domain);
  }, [activeTrack]);

  return (
    <section
      id="projects"
      aria-label="Projects and Tracks"
      className="relative py-24 sm:py-32 bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] overflow-hidden"
    >
      {/* Oversized low-contrast Japanese numeral watermark */}
      <div
        className="absolute top-6 right-8 font-serif text-[120px] sm:text-[180px] leading-none text-[var(--foreground)] opacity-[0.03] select-none pointer-events-none font-bold"
        aria-hidden="true"
      >
        四
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
              <DecryptedText
                text="[ 04 / 四 · REPOSITORIES ]"
                speed={40}
                maxIterations={6}
                animateOn="hover"
              />
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight">
              Tracks &amp; <span className="italic">Projects</span>.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] mt-3 leading-relaxed">
              Curated production-grade initiatives across artificial intelligence, systems, web architecture, and mobile platforms.
            </p>
          </div>

          <div className="text-xs font-mono text-[var(--muted-foreground)] shrink-0">
            SHOWING {filteredProjects.length} OF {projectsData.length} REPOSITORIES
          </div>
        </div>

        {/* Minimalist Segmented Track Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[var(--border)] mb-12 overflow-x-auto">
          {TRACK_FILTERS.map((tab) => {
            const isActive = activeTrack === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTrack(tab.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] ${
                  isActive
                    ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] font-medium"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Architectural Catalog Grid with Subtle Cursor Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <SpotlightCard
              as="article"
              key={project.id}
              spotlightColor="rgba(200, 65, 43, 0.08)"
              size={320}
              className="group flex flex-col justify-between rounded-[2px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-200 hover:border-[var(--foreground)]"
            >
              {/* Optional Project Banner Image */}
              {project.image && (
                <div className="relative h-44 w-full bg-[var(--surface-2)] border-b border-[var(--border)] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-[2px] bg-[var(--surface)]/95 text-[var(--foreground)] border border-[var(--border)]">
                    {project.domainLabel}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] mb-2 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-[2px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted-foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mentor & Actions */}
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] truncate max-w-[140px]">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{project.mentor}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="p-2 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                      >
                        <Github className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-1.5 text-xs font-mono tracking-wider rounded-[2px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Accessible Specification Detail Modal */}
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-[var(--border)] flex items-start justify-between bg-[var(--surface-2)]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent)] block mb-1 font-semibold">
                    {selectedProject.domainLabel}
                  </span>
                  <h3 id="spec-title" className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {selectedProject.image && (
                  <div className="h-48 w-full rounded-[2px] overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-1 font-medium">
                    Problem &amp; Scope
                  </h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-1 font-medium">
                    Architecture &amp; Contribution Requirements
                  </h4>
                  <p>
                    Engineered during OpenCode 2026 following modular architecture, strict TypeScript and unit testing standards, and verified maintainer code reviews.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-2 font-medium">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-[2px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">
                  Lead Maintainer: <span className="text-[var(--foreground)] font-medium">{selectedProject.mentor}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--muted-foreground)]">
                  OpenCode 2026 Verified Repository
                </span>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-xs font-mono tracking-wider transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  <span>Open on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
