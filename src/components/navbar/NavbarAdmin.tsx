'use client';

import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useAuth } from 'contexts/AuthContext';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { opencodeTokens } from '../../theme/opencode-tokens';
import SakuraToggle from 'components/common/SakuraToggle';

interface AdminNavbarProps {
  brandText: string;
  logoText: string;
  secondary: boolean;
  message: string | boolean;
  fixed: boolean;
  routes: any[];
  [x: string]: any;
}

export default function AdminNavbar(props: AdminNavbarProps) {
  const auth = useAuth();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('Guest');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;

    try {
      const parsed = JSON.parse(user);
      setName(parsed?.name ?? 'Guest');
      setAvatarUrl(parsed?.avatarUrl);
    } catch {
      setName('Guest');
    }
  }, []);

  const handleLogout = async () => {
    await auth.logout();
    router.push('/auth/sign-in');
  };

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={navRef}
      position="fixed"
      top="0"
      left={{ base: '0', xl: '300px' }}
      right="0"
      px={{ base: '16px', md: '40px' }}
      pt={{ base: '14px', md: '22px' }}
      pb={{base:"16px", md:"20px"}}
      zIndex="20"
      bg="var(--nav-bg)"
      backdropFilter="blur(16px)"
      borderBottom="1px solid var(--border)"
    >
      <Flex justify="space-between" align="center">
        <Text
          fontSize={{ base: '20px', md: '24px' }}
          fontWeight="400"
          lineHeight="1.2"
          pt="16px"
          color={opencodeTokens.colors.text.primary}
        >
          Welcome back,{' '}
          <Text
            as="span"
            display={{ base: 'inline-block', md: 'inline' }}
            fontWeight="600"
            color="var(--accent)"
          >
            {name}
          </Text>
        </Text>

        <Flex align="center" gap="16px" pt="16px">
          <Menu>
            <MenuButton
              transition="all 0.2s"
              _focus={{ boxShadow: 'none' }}
            >
              <Avatar 
                size="sm" 
                name={name} 
                src={avatarUrl} 
                borderRadius="4px"
                bg="var(--surface)"
                border="1px solid var(--border)"
              />
            </MenuButton>

            <MenuList 
              bg="var(--surface)"
              border="1px solid var(--border)"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
              borderRadius="4px"
              p="4px"
            >
              <MenuItem 
                onClick={() => router.push('/user/profile')}
                bg="transparent"
                borderRadius="2px"
                _hover={{ bg: 'var(--surface-subtle)' }}
                color="var(--fg)"
                fontSize="13px"
              >
                Profile Settings
              </MenuItem>
              <MenuItem 
                color="var(--accent)" 
                onClick={handleLogout}
                bg="transparent"
                borderRadius="2px"
                _hover={{ bg: 'var(--surface-subtle)' }}
                fontSize="13px"
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
