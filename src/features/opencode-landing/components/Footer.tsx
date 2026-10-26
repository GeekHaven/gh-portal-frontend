"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="relative bg-[var(--surface-2)] text-[var(--muted-foreground)] pt-20 pb-12 border-t border-[var(--border)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[var(--border)]">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-[2px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center p-1">
                <Image
                  src="/logo_rb-min.png"
                  width={24}
                  height={24}
                  alt="OpenCode Logo"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-serif text-lg font-semibold tracking-tight text-[var(--foreground)]">
                OpenCode <span className="font-normal italic text-[var(--accent)]">2026</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              Organized by <strong className="font-medium text-[var(--foreground)]">GeekHaven</strong>, the official technical society of IIIT Allahabad. Cultivating open-source engineering excellence across India.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[var(--muted-foreground)]">
              IIIT ALLAHABAD • EST. 2026
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--foreground)] mb-4 font-semibold">
              Directory
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
              <li>
                <a href="#about" className="hover:text-[var(--accent)] transition-colors">
                  About Ethos
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[var(--accent)] transition-colors">
                  Contribution Process
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[var(--accent)] transition-colors">
                  Tracks &amp; Repositories
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[var(--accent)] transition-colors">
                  Community Reflections
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--accent)] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1LQJai-gcyf6AvzlW06aw7WJ8qZUpwN4P/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  Code of Conduct
                  <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Inquiries */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--foreground)] mb-4 font-semibold">
              Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[var(--foreground)]">Abdul Azeem</p>
                  <a href="tel:+917217492629" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    +91 721 749 2629
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[var(--foreground)]">Adith Reganti</p>
                  <a href="tel:+918618275578" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    +91 861 827 5578
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[var(--foreground)]">Anubhav Sharma</p>
                  <a href="tel:+919855488413" className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    +91 98554 88413
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 pt-2 border-t border-[var(--border)]">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <a href="mailto:geekhaven@iiita.ac.in" className="text-xs text-[var(--foreground)] hover:underline">
                  geekhaven@iiita.ac.in
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Channels & Return */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--foreground)] mb-4 font-semibold">
              Ecosystem
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
              <a
                href="https://discord.gg/SxBATvUPnC"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--accent)] transition-colors"
              >
                Discord Community
              </a>
              <a
                href="https://github.com/opencodeiiita"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--accent)] transition-colors"
              >
                GitHub Organization
              </a>
              <a
                href="https://twitter.com/geekhaveniiita"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--accent)] transition-colors"
              >
                Twitter / X
              </a>
              <a
                href="https://www.linkedin.com/company/geekhaven-iiita"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/geekhaven_iiita/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--accent)] transition-colors"
              >
                Instagram
              </a>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--muted-foreground)] gap-4">
          <p>© 2026 OpenCode • GeekHaven, Indian Institute of Information Technology Allahabad.</p>
          <p>Crafted with restraint &amp; precision.</p>
        </div>
      </div>
    </footer>
  );
}
