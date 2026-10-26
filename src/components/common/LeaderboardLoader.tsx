'use client';

import React from 'react';
import { Box, Flex, Text, keyframes } from '@chakra-ui/react';

const breathe = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(0.96); }
  50% { opacity: 1; transform: scale(1.04); }
`;

export default function LeaderboardLoader() {
  return (
    <Box
      role="status"
      aria-live="polite"
      position="fixed"
      inset={0}
      zIndex={2000}
      bg="rgba(15, 15, 14, 0.65)"
      backdropFilter="blur(8px)"
      color="var(--foreground)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        p="32px 48px"
        bg="var(--surface)"
        border="1px solid var(--border)"
        borderRadius="3px"
        boxShadow="0 20px 40px rgba(0, 0, 0, 0.25)"
        textAlign="center"
        gap={4}
      >
        <Box
          position="relative"
          w="48px"
          h="48px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          animation={`${breathe} 2.2s ease-in-out infinite`}
        >
          {/* Outer hairline ring */}
          <Box
            position="absolute"
            inset="0px"
            borderRadius="full"
            border="1px solid var(--accent)"
            opacity={0.4}
          />
          {/* Inner pulsating core */}
          <Box
            w="8px"
            h="8px"
            borderRadius="full"
            bg="var(--accent)"
          />
        </Box>

        <Text
          fontFamily="var(--f-jp)"
          fontSize="11px"
          letterSpacing="0.25em"
          color="var(--accent)"
          textTransform="uppercase"
        >
          集計中
        </Text>

        <Text
          fontFamily="var(--f-display), serif"
          fontSize="17px"
          fontWeight="500"
          letterSpacing="0.16em"
          color="var(--foreground)"
          textTransform="uppercase"
        >
          UPDATING SCORES
        </Text>

        <Box w="24px" h="1px" bg="var(--border)" />

        <Text
          fontFamily="var(--f-mono)"
          fontSize="10px"
          letterSpacing="0.14em"
          color="var(--muted-foreground)"
          textTransform="uppercase"
        >
          OpenCode 2026 · GeekHaven
        </Text>
      </Flex>
    </Box>
  );
}