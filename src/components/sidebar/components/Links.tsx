/* eslint-disable */
'use client';

// chakra imports
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { opencodeTokens } from '../../../theme/opencode-tokens';

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;

  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      if (routeName.includes('leaderboard')) {
        return pathname?.includes('/leaderboard');
      }
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, index: number) => {
      const href = route.layout + route.path;
      const isCurrentAdmin = pathname?.includes('/admin');
      
      if (
        (isCurrentAdmin && route.layout === '/admin') ||
        (!isCurrentAdmin && (route.layout === '/auth' || route.layout === '/user'))
      ) {
        const isActive = activeRoute(route.path.toLowerCase());

        return (
          <Link
            key={index}
            href={href}
            onClick={(event) => {
              if (typeof window === 'undefined') return;
              if (window.__startPageTransition) {
                event.preventDefault();
                window.__startPageTransition(href);
                return;
              }
              router.push(href);
            }}
          >
            {route.icon ? (
              <Box>
                <HStack
                  spacing={isActive ? '22px' : '26px'}
                  py="10px"
                  ps="16px"
                  data-nav-item
                  borderRadius="4px"
                  mb="6px"
                  transition="all 0.15s ease"
                  bg={isActive ? 'var(--surface-subtle)' : 'transparent'}
                  _hover={{ bg: 'var(--surface-subtle)' }}
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={isActive ? 'var(--accent)' : 'var(--muted)'}
                      me="16px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={isActive ? 'var(--fg)' : 'var(--muted)'}
                      fontWeight={isActive ? '600' : '500'}
                      fontSize="14px"
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="20px"
                    w="3px"
                    bg={isActive ? 'var(--accent)' : 'transparent'}
                    borderRadius="2px"
                    boxShadow="none"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={isActive ? '22px' : '26px'}
                  py="10px"
                  ps="16px"
                  data-nav-item
                  borderRadius="4px"
                  mb="6px"
                  transition="all 0.15s ease"
                  bg={isActive ? 'var(--surface-subtle)' : 'transparent'}
                  _hover={{ bg: 'var(--surface-subtle)' }}
                >
                  <Text
                    me="auto"
                    color={isActive ? 'var(--fg)' : 'var(--muted)'}
                    fontWeight={isActive ? '600' : '500'}
                    fontSize="14px"
                  >
                    {route.name}
                  </Text>
                  <Box
                    h="20px"
                    w="3px"
                    bg={isActive ? 'var(--accent)' : 'transparent'}
                    borderRadius="2px"
                    boxShadow="none"
                  />
                </HStack>
              </Box>
            )}
          </Link>
        );
      }
    });
  };
  //  BRAND
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const links = containerRef.current
        ? containerRef.current.querySelectorAll('[data-nav-item]')
        : [];
      gsap.fromTo(
        links,
        { x: -8, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out', stagger: 0.05 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [pathname]);

  return <Box ref={containerRef}>{createLinks(routes)}</Box>;
}

export default SidebarLinks;
