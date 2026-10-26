'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface EventArtworkProps {
  src?: string;
  alt: string;
  aspectRatio?: '4/3' | '16/9' | '1/1';
  priority?: boolean;
  eventInitials?: string;
  className?: string;
}

export default function EventArtwork({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  eventInitials = 'OC',
  className = '',
}: EventArtworkProps) {
  const [isLowResOrLogo, setIsLowResOrLogo] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-video'; // 16/9

  // Fallback typographic tile if no image or error loading
  if (!src || hasError) {
    return (
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-[3px] border border-[var(--border)] bg-[var(--surface-2)] flex flex-col items-center justify-center select-none ${className}`}
        aria-hidden="true"
      >
        <span className="font-serif text-3xl sm:text-5xl font-light text-[var(--muted-foreground)] opacity-30 tracking-[0.2em] uppercase">
          {eventInitials.slice(0, 3)}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-[var(--muted-foreground)] opacity-40 uppercase mt-2">
          OpenCode Track
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-[3px] border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center select-none ${className}`}
    >
      {/* Uploaded Artwork with Japanese editorial color taming */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={(img) => {
            setIsLoaded(true);
            // Low-res / logo detection: width < 800px or squarish ratio with small dimensions
            if (
              img.naturalWidth < 800 ||
              (img.naturalWidth / img.naturalHeight > 0.8 &&
                img.naturalWidth / img.naturalHeight < 1.25 &&
                img.naturalWidth < 1000)
            ) {
              setIsLowResOrLogo(true);
            }
          }}
          onError={() => setHasError(true)}
          className={`transition-all duration-300 ease-out ${
            isLowResOrLogo
              ? 'object-contain max-h-[82%] max-w-[82%] m-auto p-3'
              : 'object-cover w-full h-full'
          } ${
            isLoaded ? 'opacity-90 dark:opacity-85' : 'opacity-0'
          } filter grayscale contrast-95 mix-blend-multiply dark:mix-blend-soft-light group-hover:filter-none group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-102`}
        />
      </div>

      {/* Faint Paper Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.02] mix-blend-multiply dark:mix-blend-screen bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />
    </div>
  );
}
