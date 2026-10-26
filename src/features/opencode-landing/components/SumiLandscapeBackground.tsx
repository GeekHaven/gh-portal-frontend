'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Pixel Snow / Drifting Ink Specks Canvas
 * Low-intensity drifting ink specks matching the Japanese sumi-e atmosphere.
 * Adapts to resolvedTheme (dark mode washi fibers vs light mode sumi specks).
 */
function InkPixelSnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 28 subtle drifting ink/washi particles
    const particleCount = 28;
    const isDark = resolvedTheme === 'dark';
    const particleColor = isDark
      ? 'rgba(237, 234, 227, ' // Light washi specks on dark
      : 'rgba(28, 27, 26, ';     // Sumi ink specks on light

    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      baseOpacity: number;
      phase: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.8,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      baseOpacity: Math.random() * 0.18 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!isReducedMotion) {
          p.y += p.speedY;
          p.phase += 0.015;
          p.x += Math.sin(p.phase) * 0.25 + p.speedX;

          if (p.y > height) {
            p.y = -5;
            p.x = Math.random() * width;
          }
          if (p.x > width) p.x = 0;
          if (p.x < 0) p.x = width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${p.baseOpacity})`;
        ctx.fill();
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

export default function SumiLandscapeBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle parallax transform values
  const farParallax = scrollY * 0.08;
  const midParallax = scrollY * 0.14;
  const nearParallax = scrollY * 0.2;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Base Canvas Background (Reads Semantic Token --background) */}
      <div className="absolute inset-0 bg-[var(--background)] transition-colors duration-300" />

      {/* 2. Layered Ink Mountains & Drifting Mist */}
      <svg
        className="absolute inset-0 w-full h-full object-cover z-[3]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Paper Grain Filter (feTurbulence) */}
          <filter id="washi-paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.11
                      0 0 0 0 0.11
                      0 0 0 0 0.10
                      0 0 0 0 0.04 0"
            />
          </filter>

          {/* Atmospheric Mist Gradient */}
          <linearGradient id="mist-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--background)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>

          {/* Mountain Fade Gradient */}
          <linearGradient id="ridge-gradient-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.10" />
            <stop offset="60%" stopColor="var(--foreground)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ridge-gradient-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.18" />
            <stop offset="70%" stopColor="var(--foreground)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Layer 1: Far Distant Mountain Ridge with gentle parallax */}
        <g style={{ transform: `translateY(${farParallax}px)` }}>
          <path
            d="M0,380 Q180,280 360,330 T720,290 T1080,320 T1440,270 L1440,900 L0,900 Z"
            fill="url(#ridge-gradient-far)"
          />
        </g>

        {/* Slow Drifting Mist Layer between ridges */}
        <g className="animate-[mist-drift_28s_ease-in-out_infinite]">
          <ellipse cx="720" cy="460" rx="900" ry="110" fill="url(#mist-gradient)" />
        </g>

        {/* Layer 2: Midground Mountain Ridge with moderate parallax */}
        <g style={{ transform: `translateY(${midParallax}px)` }}>
          <path
            d="M0,450 Q240,360 480,410 T960,370 T1440,390 L1440,900 L0,900 Z"
            fill="url(#ridge-gradient-mid)"
          />
        </g>

        {/* Layer 3: Foreground Mountain Foot */}
        <g style={{ transform: `translateY(${nearParallax}px)` }}>
          <path
            d="M0,530 Q320,460 640,510 T1280,470 T1440,490 L1440,900 L0,900 Z"
            fill="var(--foreground)"
            fillOpacity="0.08"
          />
        </g>

        {/* Paper Grain Overlay: Mix-blend multiply in light, screen at low opacity in dark */}
        <rect
          width="1440"
          height="900"
          filter="url(#washi-paper-grain)"
          className="mix-blend-multiply dark:mix-blend-screen opacity-[0.035] dark:opacity-[0.02]"
        />
      </svg>

      {/* 5. Pixel Snow / Drifting Sumi Ink Specks */}
      <InkPixelSnowCanvas />

      {/* 6. Vertical Atmospheric Fade blending into the page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-64 pointer-events-none z-[12]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--background) 75%, var(--background) 100%)',
        }}
      />

      <style jsx>{`
        @keyframes mist-drift {
          0% {
            transform: translateX(-40px);
          }
          50% {
            transform: translateX(40px);
          }
          100% {
            transform: translateX(-40px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[mist-drift_28s_ease-in-out_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
