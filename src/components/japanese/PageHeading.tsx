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
        className="oc-page-header flex flex-col sm:flex-row items-start justify-between gap-5 sm:gap-7 w-full"
        style={{
          marginBottom: hideBorder ? '20px' : '32px',
          paddingBottom: hideBorder ? '0px' : '28px',
          borderBottom: hideBorder ? 'none' : '1px solid var(--line)',
        }}
      >
        <div className="w-full min-w-0 flex-1">
          {eyebrow && (
            <p className="oc-eyebrow" style={{ marginBottom: '14px' }}>
              <span />
              <ShinyText text={eyebrow} speed={5} />
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '14px',
            }}
          >
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

          <p className="oc-description break-words" style={{ maxWidth: '720px' }}>
            {description}
          </p>
        </div>

        {rightContent && (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap w-full sm:w-auto justify-start sm:justify-end shrink-0 mt-1 sm:mt-0">
            {rightContent}
          </div>
        )}

        {children && (
          <div
            className="oc-heading-aside hidden sm:block"
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
      </header>
    </AnimatedContent>
  );
}

