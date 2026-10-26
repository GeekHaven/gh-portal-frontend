'use client';

import {
  Avatar,
  Box,
  Flex,
  Skeleton,
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from '@chakra-ui/react';
import { opencodeTokens } from '../../../theme/opencode-tokens';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFeatures } from 'contexts/FeaturesContext';
import { isAdminUser } from 'utils/jwt';
import CountUp from '../../../components/reactbits/CountUp';
import { FaCodeBranch, FaUsers } from 'react-icons/fa';
import { FetchedLeaderboard } from 'api/leaderboard/leaderboard';
import { FetchedEvents } from 'api/events/events';

export type Winner = {
  position: number;
  name: string;
  githubid: string;
  points: number;
  prmerged: number;
  avatarUrl?: string;
  color?: string;
};

// Muted natural metal tones
const RANK_METALS = [
  '#C88A2B', // Natural Gold
  '#7A8288', // Natural Silver
  '#9E6446', // Natural Bronze
  '#5C646A', // Iron
  '#4E5459', // Dark Slate
];

function isIIITA(collegeName?: string): boolean {
  if (!collegeName) return false;
  const s = collegeName.trim().toLowerCase();
  return (
    s === 'iiit allahabad' ||
    s === 'iiita' ||
    s === 'iiit-a' ||
    s === 'iiit a' ||
    (s.includes('iiit') && s.includes('allahabad'))
  );
}

function TopThreeCards({ winners, isLoading }: { winners: Winner[]; isLoading?: boolean }) {
  const text = 'var(--fg)';
  const muted = 'var(--muted)';

  if (isLoading) {
    return (
      <Flex justify="center" gap={{ base: '16px', md: '24px' }} wrap="wrap" mt="24px">
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            borderRadius="4px"
            px="24px"
            py="20px"
            w={{ base: '100%', sm: 'auto' }}
            minW={{ base: '100%', sm: '260px' }}
            maxW={{ base: '100%', sm: '320px' }}
            bg="var(--surface)"
            border="1px solid var(--border)"
          >
            <Flex align="center" gap="14px" mb="14px">
              <Skeleton boxSize="44px" borderRadius="4px" />
              <Box flex="1">
                <Skeleton h="16px" w="70%" mb="6px" />
                <Skeleton h="12px" w="40%" />
              </Box>
            </Flex>
            <Flex justify="space-between" mt="10px">
              <Skeleton h="32px" w="70px" />
              <Skeleton h="32px" w="70px" />
            </Flex>
          </Box>
        ))}
      </Flex>
    );
  }

  if (winners.length === 0) {
    return null;
  }

  return (
    <Flex justify="center" gap={{ base: '16px', md: '24px' }} wrap="wrap" mt="24px">
      {winners.slice(0, 3).map((w, i) => (
        <Box
          key={w.githubid}
          borderRadius="4px"
          px="24px"
          py="20px"
          w={{ base: '100%', sm: 'auto' }}
          minW={{ base: '100%', sm: '260px' }}
          maxW={{ base: '100%', sm: '320px' }}
          flex={{ base: '1 1 100%', sm: '1 1 260px' }}
          bg="var(--surface)"
          border="1px solid var(--border)"
          position="relative"
          transition="border-color 0.2s ease"
          _hover={{
            borderColor: 'var(--fg)',
          }}
        >
          {/* Typographic Rank Label */}
          <Flex
            position="absolute"
            top="14px"
            right="14px"
            fontFamily="var(--f-mono)"
            fontSize="11px"
            fontWeight="700"
            color={RANK_METALS[i] || 'var(--muted)'}
            px="6px"
            py="2px"
            border="1px solid"
            borderColor="var(--border)"
            borderRadius="2px"
            bg="var(--bg)"
          >
            0{w.position}
          </Flex>

          {/* User Info */}
          <Flex align="center" gap="12px" mb="16px">
            <Avatar
              src={w.avatarUrl || `https://github.com/${w.githubid}.png`}
              name={w.name}
              size="md"
              borderRadius="4px"
              border="1px solid var(--border)"
            />
            <Box minW={0} pr="40px">
              <Text fontWeight="600" color={text} fontSize="14px" noOfLines={1} title={w.name}>
                {w.name}
              </Text>
              <Text fontSize="12px" color={muted} fontFamily="var(--f-mono)" noOfLines={1}>
                @{w.githubid}
              </Text>
            </Box>
          </Flex>

          {/* Metrics */}
          <Flex justify="space-between" pt="12px" borderTop="1px solid var(--border-light)">
            <Box>
              <Text fontSize="10px" color={muted} fontWeight="600" letterSpacing="0.1em">
                POINTS
              </Text>
              <Text fontSize="18px" fontWeight="700" color={text} fontFamily="var(--f-mono)">
                <CountUp to={w.points} separator="," duration={1.2} />
              </Text>
            </Box>

            <Box textAlign="right">
              <Text fontSize="10px" color={muted} fontWeight="600" letterSpacing="0.1em">
                PRs MERGED
              </Text>
              <Text fontSize="18px" fontWeight="700" color={text} fontFamily="var(--f-mono)">
                <CountUp to={w.prmerged} separator="," duration={1} />
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}

function OverallSideStats({ stats }: { stats: { totalPRs: string; totalRegistrations: string } }) {
  const text = 'var(--fg)';
  const muted = 'var(--muted)';

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      justify="center"
      gap="16px"
      my="24px"
      maxW="640px"
      mx="auto"
    >
      <Box
        flex="1"
        p="16px 20px"
        borderRadius="4px"
        bg="var(--surface)"
        border="1px solid var(--border)"
        display="flex"
        alignItems="center"
        gap="14px"
      >
        <Box color="var(--accent)" fontSize="20px">
          <FaCodeBranch />
        </Box>
        <Box>
          <Text fontSize="18px" fontWeight="700" color={text} fontFamily="var(--f-mono)">
            {stats.totalPRs}
          </Text>
          <Text fontSize="11px" color={muted} textTransform="uppercase" letterSpacing="0.08em">
            Pull Requests Merged
          </Text>
        </Box>
      </Box>

      <Box
        flex="1"
        p="16px 20px"
        borderRadius="4px"
        bg="var(--surface)"
        border="1px solid var(--border)"
        display="flex"
        alignItems="center"
        gap="14px"
      >
        <Box color="var(--accent)" fontSize="20px">
          <FaUsers />
        </Box>
        <Box>
          <Text fontSize="18px" fontWeight="700" color={text} fontFamily="var(--f-mono)">
            {stats.totalRegistrations}
          </Text>
          <Text fontSize="11px" color={muted} textTransform="uppercase" letterSpacing="0.08em">
            Verified Participants
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

function Podium({
  winners,
  isLoading,
}: {
  winners: Winner[];
  isLoading?: boolean;
}) {
  const text = 'var(--fg)';
  const muted = 'var(--muted)';

  if (isLoading) {
    return (
      <Flex justify="center" align="flex-end" gap={{ base: '8px', sm: '14px', md: '18px' }} h="240px" mt="24px">
        {[120, 180, 140].map((h, i) => (
          <Skeleton key={i} w={{ base: '70px', sm: '100px', md: '120px' }} h={`${h}px`} borderRadius="4px 4px 0 0" />
        ))}
      </Flex>
    );
  }

  if (winners.length === 0) {
    return (
      <Box textAlign="center" py="40px" borderRadius="4px" border="1px solid var(--border)" bg="var(--surface)">
        <Text fontSize="14px" fontWeight="600" color="var(--fg)">
          No winners recorded yet for this category.
        </Text>
        <Text fontSize="12px" color="var(--muted)" mt="4px">
          Leaderboard entries will appear here once contributions are scored.
        </Text>
      </Box>
    );
  }

  const order =
    winners.length >= 5
      ? [winners[3], winners[1], winners[0], winners[2], winners[4]].filter(Boolean)
      : winners.length >= 3
      ? [winners[1], winners[0], winners[2]].filter(Boolean)
      : [...winners];

  const heights =
    winners.length >= 5
      ? ['100px', '150px', '200px', '140px', '110px']
      : winners.length >= 3
      ? ['140px', '190px', '120px']
      : ['190px', '140px'];

  return (
    <Box maxW="100%" overflowX="auto" py="16px">
      <Flex justify="center" align="flex-end" gap={{ base: '8px', sm: '12px', md: '16px' }} minW="fit-content" mx="auto">
        {order.map((w, i) => {
          const rankColor = RANK_METALS[w.position - 1] || 'var(--border)';
          return (
            <Box key={w.githubid} textAlign="center" w={{ base: '68px', sm: '92px', md: '110px' }}>
              <Avatar
                src={w.avatarUrl || `https://github.com/${w.githubid}.png`}
                name={w.name}
                size={w.position === 1 ? 'md' : 'sm'}
                borderRadius="4px"
                border={`1px solid ${rankColor}`}
                mb="6px"
              />

              <Text fontWeight="600" color={text} fontSize={{ base: '11px', md: '12px' }} noOfLines={1} title={w.name}>
                {w.name}
              </Text>
              <Text fontSize="10px" color={muted} fontFamily="var(--f-mono)" mb="6px" noOfLines={1}>
                @{w.githubid}
              </Text>

              <Box
                h={heights[i] || '140px'}
                w="100%"
                bg="var(--surface)"
                border="1px solid var(--border)"
                borderBottom="none"
                borderRadius="4px 4px 0 0"
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p="8px 4px"
              >
                <Text fontSize="11px" fontWeight="700" color={rankColor} fontFamily="var(--f-mono)">
                  0{w.position}
                </Text>

                <Box>
                  <Text fontSize="11px" fontWeight="700" color={text} fontFamily="var(--f-mono)">
                    {w.points.toLocaleString()}
                  </Text>
                  <Text fontSize="9px" color={muted}>
                    pts
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

function WinnersHeader() {
  return (
    <header className="text-center mb-6">
      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--oc-accent)] mb-2">
        <span>[ 01 / RECOGNITION ]</span>
        <span>HALL OF FAME</span>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--oc-text-primary)] tracking-tight">
        Legacy of Legends
      </h1>
      <p className="text-xs sm:text-sm text-[var(--oc-text-secondary)] mt-2 max-w-md mx-auto">
        Top performers and verified contributors across OpenCode 2026.
      </p>
    </header>
  );
}

export default function WinnersPodiumComparisonPage() {
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { features } = useFeatures();

  useEffect(() => {
    if (!features.showWinners && !isAdminUser()) {
      router.replace('/user/events');
    }
  }, [features.showWinners, router]);

  // 1. Fetch available events to determine active event name
  const { data: eventData } = useQuery({
    queryKey: ['EventInfo'],
    queryFn: FetchedEvents,
    staleTime: 10 * 60 * 1000,
  });

  const resolvedEventName = useMemo(() => {
    return (
      eventData?.data?.[0]?.name ||
      process.env.NEXT_PUBLIC_EVENT_NAME ||
      "OPENCODE'25"
    );
  }, [eventData]);

  // 2. Fetch live leaderboard data from database/backend
  const {
    data: leaderboardData = [],
    isLoading: isLeaderboardLoading,
  } = useQuery({
    queryKey: ['LeaderboardData', resolvedEventName],
    queryFn: () => FetchedLeaderboard(resolvedEventName),
    staleTime: 3 * 60 * 1000,
  });

  // 3. Derive Overall Winners from database
  const overallWinners: Winner[] = useMemo(() => {
    if (!leaderboardData || leaderboardData.length === 0) return [];
    return leaderboardData.slice(0, 5).map((entry, idx) => ({
      position: Number(entry.position) || idx + 1,
      name: entry.name || entry.githubid || 'Participant',
      githubid: entry.githubid || '',
      points: Number(entry.points) || 0,
      prmerged: Number(entry.prmerged) || 0,
      avatarUrl: entry.avatarUrl,
      color: RANK_METALS[idx] || '#7A8288',
    }));
  }, [leaderboardData]);

  // 4. Derive College (IIIT A) Winners from database
  const collegeWinners: Winner[] = useMemo(() => {
    if (!leaderboardData || leaderboardData.length === 0) return [];
    const filtered = leaderboardData.filter((entry) => isIIITA(entry.collegeName));
    return filtered.slice(0, 5).map((entry, idx) => ({
      position: idx + 1,
      name: entry.name || entry.githubid || 'Participant',
      githubid: entry.githubid || '',
      points: Number(entry.points) || 0,
      prmerged: Number(entry.prmerged) || 0,
      avatarUrl: entry.avatarUrl,
      color: RANK_METALS[idx] || '#7A8288',
    }));
  }, [leaderboardData]);

  // 5. Derive Live Community & Contribution Stats
  const stats = useMemo(() => {
    if (!leaderboardData || leaderboardData.length === 0) {
      return { totalPRs: '0', totalRegistrations: '0' };
    }
    const totalPRs = leaderboardData.reduce(
      (acc, curr) => acc + (Number(curr.prmerged) || 0),
      0
    );
    const count = leaderboardData.length;
    return {
      totalPRs: totalPRs.toLocaleString(),
      totalRegistrations: count >= 1000 ? `${(count / 1000).toFixed(1)}k+` : count.toLocaleString(),
    };
  }, [leaderboardData]);

  const activeWinners = tab === 0 ? overallWinners : collegeWinners;

  return (
    <Box minH="100vh" position="relative" pb="60px">
      <Box position="relative" zIndex={1} maxW="1100px" mx="auto" px={{ base: '16px', md: '24px' }}>
        <Stack spacing="28px">
          <WinnersHeader />

          <TopThreeCards
            winners={activeWinners}
            isLoading={isLeaderboardLoading}
          />

          <Tabs index={tab} onChange={setTab} variant="unstyled">
            <TabList justifyContent="center" gap="8px">
              <Tab
                borderRadius="4px"
                px="18px"
                py="6px"
                fontWeight="500"
                fontSize="12px"
                fontFamily="var(--f-mono)"
                textTransform="uppercase"
                letterSpacing="0.08em"
                color="var(--muted)"
                border="1px solid var(--border)"
                bg="var(--surface)"
                transition="all 0.15s ease"
                _selected={{
                  bg: 'var(--accent)',
                  color: 'white',
                  borderColor: 'var(--accent)',
                }}
                _hover={{
                  borderColor: 'var(--fg)',
                }}
              >
                Overall Podium
              </Tab>
              <Tab
                borderRadius="4px"
                px="18px"
                py="6px"
                fontWeight="500"
                fontSize="12px"
                fontFamily="var(--f-mono)"
                textTransform="uppercase"
                letterSpacing="0.08em"
                color="var(--muted)"
                border="1px solid var(--border)"
                bg="var(--surface)"
                transition="all 0.15s ease"
                _selected={{
                  bg: 'var(--accent)',
                  color: 'white',
                  borderColor: 'var(--accent)',
                }}
                _hover={{
                  borderColor: 'var(--fg)',
                }}
              >
                IIIT A Podium
              </Tab>
            </TabList>

            <TabPanels mt="8px">
              <TabPanel p="0">
                <Box position="relative">
                  <OverallSideStats stats={stats} />
                  <Podium
                    winners={overallWinners}
                    isLoading={isLeaderboardLoading}
                  />
                </Box>
              </TabPanel>

              <TabPanel p="0">
                <Box position="relative">
                  <OverallSideStats stats={stats} />
                  <Podium
                    winners={collegeWinners}
                    isLoading={isLeaderboardLoading}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>
    </Box>
  );
}
