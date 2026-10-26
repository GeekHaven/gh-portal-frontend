"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { faqData, FAQItem } from "../data/faqData";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import DecryptedText from "components/reactbits/DecryptedText";

const SafeAnimatePresence = AnimatePresence as React.FC<React.PropsWithChildren<any>>;

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("eligibility");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-24 sm:py-32 bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] overflow-hidden"
    >
      {/* Oversized low-contrast Japanese numeral watermark */}
      <div
        className="absolute top-6 right-8 font-serif text-[120px] sm:text-[180px] leading-none text-[var(--foreground)] opacity-[0.03] select-none pointer-events-none font-bold"
        aria-hidden="true"
      >
        六
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--accent)] block mb-3 font-semibold">
            <DecryptedText
              text="[ 06 / 六 · INQUIRIES ]"
              speed={40}
              maxIterations={6}
              animateOn="hover"
            />
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-tight">
            Frequently Asked <span className="italic">Questions</span>.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[var(--muted-foreground)] mt-3 max-w-xl mx-auto leading-relaxed">
            Essential answers regarding eligibility, repository onboarding, evaluation criteria, and pull request guidelines.
          </p>
        </div>

        {/* Accordion List with Hairline Borders */}
        <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
          {faqData.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="transition-colors duration-150">
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-6 text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] group"
                >
                  <span className="font-serif text-lg sm:text-xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors pr-6">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[var(--accent)]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <SafeAnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </SafeAnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Link to Full Dedicated FAQ Page */}
        <div className="mt-12 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
          >
            <span>Read Complete FAQ &amp; Contributor Handbook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
