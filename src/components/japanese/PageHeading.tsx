'use client';

import { ReactNode } from 'react';
import { useColorMode } from '@chakra-ui/react';
import BlurText from '../reactbits/BlurText';
import ShinyText from '../reactbits/ShinyText';
import AnimatedContent from '../reactbits/AnimatedContent';

export default function PageHeading({
  eyebrow,
  title,
  description,
  badge,
  rightContent,
  asideColor,
  hideBorder = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: ReactNode;
  rightContent?: ReactNode;
  asideColor?: string;
  hideBorder?: boolean;
  children?: ReactNode;
}) {
  const { colorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const resolvedAsideColor = asideColor || (isLight ? '#0F766E' : 'var(--accent)');

  return (
    <AnimatedContent distance={20} duration={0.5}>
      <header
        className="oc-page-header w-full"
        style={{
          marginBottom: hideBorder ? '20px' : '32px',
          paddingBottom: hideBorder ? '0px' : '28px',
          borderBottom: hideBorder ? 'none' : '1px solid var(--line)',
        }}
      >
        <div className="flex items-start justify-between gap-6 w-full">
          <div className="w-full min-w-0 flex-1">
            {eyebrow && (
              <p className="oc-eyebrow" style={{ marginBottom: '14px' }}>
                <span />
                <ShinyText text={eyebrow} speed={5} />
              </p>
            )}

            {/* Title & Actions Row: Title on left, action buttons aligned on right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <h1
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 300,
                    fontSize: 'clamp(28px, 5.5vw, 54px)',
                    lineHeight: 1.15,
                    letterSpacing: '0.02em',
                    color: 'var(--fg)',
                    margin: 0,
                  }}
                >
                  <BlurText text={title} delay={45} animateBy="words" direction="top" />
                </h1>
                {badge}
              </div>

              {rightContent && (
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap shrink-0">
                  {rightContent}
                </div>
              )}
            </div>

            {/* Description spans full width beneath the title row without awkward empty gaps */}
            <p
              className="oc-description break-words"
              style={{
                maxWidth: '100%',
                width: '100%',
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {children && (
            <div
              className="oc-heading-aside hidden md:block"
              style={{
                fontFamily: 'var(--f-jp)',
                color: resolvedAsideColor,
                fontSize: '28px',
                writingMode: 'vertical-rl',
                opacity: isLight ? 1 : 0.85,
                letterSpacing: '0.4em',
                padding: '0 15px',
                flexShrink: 0,
              }}
            >
              {children}
            </div>
          )}
        </div>
      </header>
    </AnimatedContent>
  );
}

