'use client';

import React, { useState, useEffect } from 'react';

import DecryptedText from 'components/reactbits/DecryptedText';

interface TerminalLine {
  type: 'command' | 'output' | 'success';
  text: string;
}

const TERMINAL_SCRIPT: TerminalLine[] = [
  { type: 'command', text: 'git clone https://github.com/opencodeiiita/CareerCraft.git' },
  { type: 'output', text: "Cloning into 'CareerCraft'..." },
  { type: 'output', text: 'remote: Enumerating objects: 412, done.' },
  { type: 'output', text: 'remote: Compressing objects: 100% (284/284), done.' },
  { type: 'command', text: 'cd CareerCraft' },
  { type: 'command', text: 'npm install' },
  { type: 'output', text: 'added 142 packages in 2.8s' },
  { type: 'command', text: 'npm run dev' },
  { type: 'success', text: '✓ ready - started server on http://localhost:3000' },
];

export default function TerminalWindow() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // When prefers-reduced-motion is true, show complete terminal immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLines(TERMINAL_SCRIPT);
      setCurrentLineIndex(TERMINAL_SCRIPT.length);
      return;
    }

    if (currentLineIndex >= TERMINAL_SCRIPT.length) return;

    const targetLine = TERMINAL_SCRIPT[currentLineIndex];

    if (targetLine.type === 'command') {
      // Type out commands character by character
      if (currentCharIndex < targetLine.text.length) {
        const typingSpeed = Math.floor(Math.random() * 25) + 22; // Natural typing rhythm
        const timer = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Line finished typing: push to displayed lines and advance
        const pauseAfterCommand = 350;
        const timer = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, targetLine]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, pauseAfterCommand);
        return () => clearTimeout(timer);
      }
    } else {
      // System output prints line by line
      const delay = targetLine.type === 'success' ? 450 : 180;
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, targetLine]);
        setCurrentLineIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, prefersReducedMotion]);

  // Current command currently being typed
  const activeTypingLine =
    currentLineIndex < TERMINAL_SCRIPT.length &&
    TERMINAL_SCRIPT[currentLineIndex].type === 'command'
      ? TERMINAL_SCRIPT[currentLineIndex].text.slice(0, currentCharIndex)
      : null;

  const isFinished = currentLineIndex >= TERMINAL_SCRIPT.length;

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-4">
      {/* Accessible screen reader text equivalent */}
      <div className="sr-only">
        <h3>OpenCode Contributor Terminal Workflow</h3>
        <p>Terminal session demonstrating repository setup:</p>
        <pre>
          {`$ git clone https://github.com/opencodeiiita/CareerCraft.git
Cloning into 'CareerCraft'...
remote: Enumerating objects: 412, done.
remote: Compressing objects: 100% (284/284), done.
$ cd CareerCraft
$ npm install
added 142 packages in 2.8s
$ npm run dev
✓ ready - started server on http://localhost:3000`}
        </pre>
      </div>

      {/* Visual Terminal Window */}
      <div
        aria-hidden="true"
        className="w-full max-w-[760px] rounded-[7px] border border-[var(--border)] bg-[var(--terminal-bg)] text-[var(--terminal-fg)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] overflow-hidden text-left"
      >
        {/* macOS-style Chrome Title Bar with desaturated dots */}
        <div className="relative px-4 py-3 bg-[#181716] border-b border-[var(--border)] flex items-center justify-between select-none">
          {/* Traffic-light dots (muted/desaturated) */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B4B48]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6B6348]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#486352]" />
          </div>

          {/* Centered Window Title */}
          <div className="absolute inset-x-0 text-center pointer-events-none">
            <DecryptedText
              text="opencode ~ bash"
              speed={35}
              maxIterations={8}
              animateOn="view"
              className="text-[12px] font-mono text-[var(--muted-foreground)] tracking-wide"
              encryptedClassName="text-[12px] font-mono text-[var(--accent)] tracking-wide opacity-80"
            />
          </div>

          {/* Right spacer for balance */}
          <div className="w-10" />
        </div>

        {/* Monospace Output Body */}
        <div className="p-4 sm:p-6 text-[13.5px] sm:text-[14px] font-mono leading-[1.75] text-[var(--terminal-fg)] min-h-[260px] sm:min-h-[290px] overflow-x-auto">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-all sm:break-normal">
              {line.type === 'command' ? (
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-semibold select-none">$</span>
                  <span className="text-[var(--terminal-fg)]">{line.text}</span>
                </div>
              ) : line.type === 'success' ? (
                <div className="text-[#6B7F5A] dark:text-[#8FA876] font-medium pl-4">{line.text}</div>
              ) : (
                <div className="text-[var(--muted-foreground)] pl-4">{line.text}</div>
              )}
            </div>
          ))}

          {/* Active Command in Progress */}
          {activeTypingLine !== null && (
            <div className="flex items-start gap-2 whitespace-pre-wrap">
              <span className="text-[var(--accent)] font-semibold select-none">$</span>
              <span className="text-[var(--terminal-fg)]">{activeTypingLine}</span>
              <span className="inline-block w-2 h-4 bg-[var(--accent)] animate-pulse ml-0.5 mt-0.5 align-middle" />
            </div>
          )}

          {/* Final Idle Block Cursor */}
          {isFinished && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[var(--accent)] font-semibold select-none">$</span>
              <span className="inline-block w-2.5 h-4 bg-[var(--terminal-fg)] animate-[terminal-blink_1s_infinite] align-middle" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes terminal-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
