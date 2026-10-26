'use client';

import React, { useId, useEffect, useState } from 'react';
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo';

interface HubCity {
  name: string;
  coords: [number, number]; // [lon, lat]
  isHq?: boolean;
}

const HUBS: HubCity[] = [
  { name: 'IIIT Allahabad (HQ)', coords: [81.8661, 25.4358], isHq: true },
  { name: 'Delhi NCR', coords: [77.209, 28.6139] },
  { name: 'Bengaluru', coords: [77.5946, 12.9716] },
  { name: 'Mumbai', coords: [72.8777, 19.076] },
  { name: 'Hyderabad', coords: [78.4867, 17.385] },
  { name: 'Kolkata', coords: [88.3639, 22.5726] },
  { name: 'Pune', coords: [73.8567, 18.5204] },
];

export default function IndiaMap() {
  const id = useId().replace(/:/g, '');
  const [outline, setOutline] = useState<string>('');
  const [projectedHubs, setProjectedHubs] = useState<Array<{ name: string; x: number; y: number; isHq?: boolean }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const loadMap = async () => {
      try {
        const res = await fetch('/data/india.geo.json');
        if (!res.ok) throw new Error('Failed to load map data');
        const geometry = (await res.json()) as unknown as GeoPermissibleObjects;
        const projection = geoMercator().fitExtent([[28, 25], [492, 495]], geometry);
        
        if (mounted) {
          const pathGen = geoPath(projection);
          setOutline(pathGen(geometry) || '');

          // Project hub coordinates to SVG plane
          const hubsOnMap = HUBS.map((hub) => {
            const projected = projection(hub.coords);
            return {
              name: hub.name,
              x: projected ? projected[0] : 0,
              y: projected ? projected[1] : 0,
              isHq: hub.isHq,
            };
          }).filter((h) => h.x > 0 && h.y > 0);

          setProjectedHubs(hubsOnMap);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('IndiaMap load error:', err);
        if (mounted) setIsLoading(false);
      }
    };

    loadMap();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <figure className="relative w-full max-w-[480px] mx-auto flex flex-col items-center">
      <div className="relative w-full aspect-square flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--muted-foreground)] animate-pulse">
              Mapping India...
            </span>
          </div>
        )}

        <svg
          viewBox="0 0 520 520"
          className="w-full h-full text-[var(--foreground)] transition-opacity duration-500 overflow-visible"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          style={{ opacity: isLoading ? 0.2 : 1 }}
        >
          <title id={`${id}-title`}>India Open Source Contributor Network</title>
          <desc id={`${id}-desc`}>
            Dotted silhouette map of India showing open-source contributors and technical hubs across 28+ states.
          </desc>

          <defs>
            {/* Minimal sumi dot pattern */}
            <pattern id={`${id}-dots`} width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill="currentColor" opacity="0.32" />
            </pattern>

            {/* Gradient wash across the subcontinent */}
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {outline && (
            <>
              {/* Regional Fill & Boundary */}
              <path
                d={outline}
                fill={`url(#${id}-fill)`}
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Dotted texture */}
              <path d={outline} fill={`url(#${id}-dots)`} />

              {/* Major Contributor Hub Pins */}
              {projectedHubs.map((hub) => (
                <g key={hub.name} className="pointer-events-none">
                  {hub.isHq ? (
                    <>
                      {/* IIITA HQ Pin with Ripple Pulse */}
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r="9"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        className="animate-ping opacity-60 origin-center"
                      />
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r="4.5"
                        fill="var(--accent)"
                        className="drop-shadow-[0_0_6px_var(--accent)]"
                      />
                      <text
                        x={hub.x + 8}
                        y={hub.y + 4}
                        fill="var(--foreground)"
                        fontSize="9"
                        fontFamily="var(--f-mono)"
                        fontWeight="600"
                        letterSpacing="0.06em"
                      >
                        IIITA (HQ)
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Secondary Contributor Node */}
                      <circle cx={hub.x} cy={hub.y} r="2.8" fill="var(--foreground)" opacity="0.65" />
                    </>
                  )}
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      <figcaption className="text-center font-mono text-[11px] tracking-wider text-[var(--muted-foreground)] uppercase mt-2">
        Many perspectives. One community.
      </figcaption>
    </figure>
  );
}
