'use client';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Flower2 } from 'lucide-react';
import Link from 'next/link';

import Content from 'components/sidebar/components/Content';
import { IRoute } from 'types/navigation';
import { opencodeTokens } from '../../theme/opencode-tokens';

interface SidebarProps {
  routes: IRoute[];
}

function Sidebar({ routes }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      );

      const links = sidebarRef.current
        ? sidebarRef.current.querySelectorAll('[data-nav-item]')
        : [];

      gsap.fromTo(
        links,
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.2,
        },
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Box
      display={{ base: 'none', xl: 'block' }}
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      zIndex="100"
    >
      <Box
        ref={sidebarRef}
        w="300px"
        h="100vh"
        bg="var(--surface)"
        boxShadow="none"
        borderRight="1px solid var(--border)"
      >
        <Link href="/">
          <Flex
            h="80px"
            align="center"
            px="32px"
            gap="10px"
            color="var(--fg)"
            _hover={{ color: 'var(--accent)' }}
            transition="color 0.2s"
            cursor="pointer"
          >
            <Text fontSize="18px" fontWeight="700" letterSpacing="0.08em" fontFamily="var(--f-display)">
              GEEKHAVEN
            </Text>
          </Flex>
        </Link>

        <Divider borderColor="var(--border)" opacity={1} />

        <Scrollbars autoHide>
          <Box px="20px" pt="24px">
            <Content routes={routes} />
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  );
}

export default Sidebar;
