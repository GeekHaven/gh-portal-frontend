'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Badge,
  Switch,
  useToast,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import { Sliders, Search, Building2, Calendar, Trophy, Check, ArrowLeft } from 'lucide-react';
import { useFeatures } from 'contexts/FeaturesContext';
import { getLeaderboardEventConfig, type LeaderboardEventConfig } from 'config/leaderboard.config';

interface Props {
  events?: Array<{ name: string; [key: string]: any }>;
}

export default function AdminLeaderboardConfigSection({ events = [] }: Props) {
  const toast = useToast();
  const { features, saveLeaderboardConfig } = useFeatures();

  // Deduplicated list of all available events (API events + flagship + already configured + fallbacks)
  const availableEventNames = useMemo(() => {
    const set = new Set<string>();
    const list: string[] = [];

    const add = (name?: string) => {
      if (!name) return;
      const trimmed = name.trim();
      const lower = trimmed.toLowerCase();
      if (!trimmed || set.has(lower)) return;
      set.add(lower);
      list.push(trimmed);
    };

    // 1. Current flagship event from context
    if (features.flagshipEvent) add(features.flagshipEvent);

    // 2. Events returned from backend API (if available)
    if (Array.isArray(events)) {
      for (const ev of events) {
        if (typeof ev === 'string') add(ev);
        else if (ev?.name) add(ev.name);
      }
    }

    // 3. Events already configured in leaderboardConfigs
    if (features.leaderboardConfigs) {
      for (const key of Object.keys(features.leaderboardConfigs)) {
        add(key);
      }
    }

    // 4. Default portal events to ensure dropdown is never empty
    add('Rift CTF');
    add('Opencode');

    return list;
  }, [events, features.flagshipEvent, features.leaderboardConfigs]);

  // Selected event to configure
  const [targetEvent, setTargetEvent] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customEventName, setCustomEventName] = useState<string>('');

  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('');
  const [showCollegeFilter, setShowCollegeFilter] = useState<boolean>(true);
  const [showFirstYearFilter, setShowFirstYearFilter] = useState<boolean>(true);
  const [showEventSelector, setShowEventSelector] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Initialize selected event to first available event (e.g. Rift CTF) so it's never empty
  useEffect(() => {
    if (!targetEvent && availableEventNames.length > 0 && !isCustomMode) {
      setTargetEvent(availableEventNames[0]);
    }
  }, [availableEventNames, targetEvent, isCustomMode]);

  // When targetEvent changes, load its configured or default settings
  useEffect(() => {
    if (!targetEvent) return;

    const saved = features.leaderboardConfigs?.[targetEvent];
    if (saved) {
      setSearchPlaceholder(saved.searchPlaceholder || '');
      setShowCollegeFilter(Boolean(saved.showCollegeFilter));
      setShowFirstYearFilter(Boolean(saved.showFirstYearFilter));
      setShowEventSelector(saved.showEventSelector !== false);
    } else {
      const defaults = getLeaderboardEventConfig(targetEvent);
      setSearchPlaceholder(defaults.searchPlaceholder);
      setShowCollegeFilter(defaults.showCollegeFilter);
      setShowFirstYearFilter(defaults.showFirstYearFilter);
      setShowEventSelector(defaults.showEventSelector !== false);
    }
  }, [targetEvent, features.leaderboardConfigs]);

  const handleSelectEvent = (val: string) => {
    if (val === '__custom__') {
      setIsCustomMode(true);
      setCustomEventName('');
      setTargetEvent('');
    } else {
      setIsCustomMode(false);
      setTargetEvent(val);
    }
  };

  const handleSave = async () => {
    const finalEvent = (isCustomMode ? customEventName : targetEvent).trim();
    if (!finalEvent) {
      toast({
        title: 'Event name required',
        description: 'Please select or type an event name to configure.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSaving(true);
    try {
      const newConfig: LeaderboardEventConfig = {
        searchPlaceholder: searchPlaceholder.trim() || `Search ${finalEvent} participants...`,
        showCollegeFilter,
        showFirstYearFilter,
        showEventSelector,
      };

      await saveLeaderboardConfig(finalEvent, newConfig);

      // If in custom mode, exit and lock onto the newly created event
      if (isCustomMode) {
        setIsCustomMode(false);
        setTargetEvent(finalEvent);
      }

      toast({
        title: 'Leaderboard Settings Saved',
        description: `Leaderboard filters & search for "${finalEvent}" updated successfully.`,
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (e: any) {
      toast({
        title: 'Failed to Save Settings',
        description: e?.message || 'Could not update configuration.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const applyPreset = (type: 'all' | 'search_only' | 'default') => {
    const activeLabel = isCustomMode ? customEventName.trim() : targetEvent;
    if (type === 'all') {
      setSearchPlaceholder('Search name or GitHub ID...');
      setShowCollegeFilter(true);
      setShowFirstYearFilter(true);
      setShowEventSelector(true);
    } else if (type === 'search_only') {
      setSearchPlaceholder(`Search ${activeLabel || 'participants'}...`);
      setShowCollegeFilter(false);
      setShowFirstYearFilter(false);
      setShowEventSelector(true);
    } else if (type === 'default') {
      setSearchPlaceholder('Search name or GitHub ID...');
      setShowCollegeFilter(true);
      setShowFirstYearFilter(true);
      setShowEventSelector(true);
    }

    toast({
      title: 'Template Applied',
      description: 'Review the settings and click "Save Configuration" to apply.',
      status: 'info',
      duration: 2500,
      isClosable: true,
    });
  };

  const currentDisplayEvent = isCustomMode ? customEventName.trim() : targetEvent;

  return (
    <Box
      bg="var(--surface)"
      p={{ base: '18px', md: '28px' }}
      borderRadius="20px"
      border="1px solid var(--border)"
      boxShadow="var(--shadow)"
      mb="24px"
    >
      {/* Header */}
      <Flex justify="space-between" align={{ base: 'flex-start', sm: 'center' }} mb="16px" flexWrap="wrap" gap="10px">
        <Flex align="center" gap="10px">
          <Box p="8px" borderRadius="10px" bg="var(--accent-soft)" color="var(--accent)">
            <Sliders size={20} />
          </Box>
          <div>
            <Text fontSize="lg" fontWeight="800" color="var(--fg)">
              Leaderboard Filters &amp; Search Configuration
            </Text>
            <Text fontSize="xs" color="var(--muted)">
              Configure which sub-components and filters appear on each event&apos;s leaderboard.
            </Text>
          </div>
        </Flex>

        <Badge
          bg="var(--accent-soft)"
          color="var(--accent)"
          border="1px solid var(--border-accent)"
          px="10px"
          py="4px"
          borderRadius="full"
          fontSize="11px"
          fontWeight="700"
        >
          Dynamic Customization
        </Badge>
      </Flex>

      {/* Target Event Selection */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="16px" mb="20px">
        <FormControl>
          <Flex justify="space-between" align="center" mb="6px">
            <FormLabel m={0} fontSize="xs" fontWeight="700" color="var(--muted)" textTransform="uppercase">
              Select Event to Configure
            </FormLabel>
            {isCustomMode && (
              <Button
                variant="ghost"
                size="xs"
                color="var(--accent)"
                fontSize="11px"
                h="auto"
                p="2px 6px"
                leftIcon={<ArrowLeft size={12} />}
                onClick={() => {
                  setIsCustomMode(false);
                  if (availableEventNames.length > 0) {
                    setTargetEvent(availableEventNames[0]);
                  }
                }}
              >
                Choose from list
              </Button>
            )}
          </Flex>

          {!isCustomMode ? (
            <Select
              value={targetEvent}
              onChange={(e) => handleSelectEvent(e.target.value)}
              bg="var(--surface-2)"
              borderColor="var(--border)"
              borderRadius="12px"
              fontSize="sm"
              fontWeight="600"
              color="var(--fg)"
              _hover={{ borderColor: 'var(--accent)' }}
            >
              {availableEventNames.map((name) => (
                <option key={name} value={name} style={{ background: '#0B1C2A', color: '#fff' }}>
                  {name}
                </option>
              ))}
              <option value="__custom__" style={{ background: '#0B1C2A', color: '#6EE7B7', fontWeight: 'bold' }}>
                + Enter custom event name...
              </option>
            </Select>
          ) : (
            <Input
              value={customEventName}
              onChange={(e) => {
                setCustomEventName(e.target.value);
                setTargetEvent(e.target.value.trim());
              }}
              placeholder="Type event name (e.g. Rift CTF, Hackathon)..."
              bg="var(--surface-2)"
              borderColor="var(--accent)"
              borderRadius="12px"
              fontSize="sm"
              fontWeight="600"
              color="var(--fg)"
              autoFocus
            />
          )}
        </FormControl>

        {/* Quick Presets */}
        <FormControl>
          <FormLabel fontSize="xs" fontWeight="700" color="var(--muted)" textTransform="uppercase">
            Quick Template Presets
          </FormLabel>
          <HStack spacing="8px" flexWrap="wrap">
            <Button
              size="xs"
              variant="outline"
              borderColor="var(--border)"
              color="var(--fg)"
              _hover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={() => applyPreset('all')}
            >
              All Filters On
            </Button>
            <Button
              size="xs"
              variant="outline"
              borderColor="var(--border)"
              color="var(--fg)"
              _hover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={() => applyPreset('search_only')}
            >
              Search Only (No Filters)
            </Button>
            <Button
              size="xs"
              variant="outline"
              borderColor="var(--border)"
              color="var(--fg)"
              _hover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={() => applyPreset('default')}
            >
              Reset to Default
            </Button>
          </HStack>
        </FormControl>
      </SimpleGrid>

      {/* Configuration Controls */}
      <Box p="16px" borderRadius="14px" bg="var(--surface-2)" border="1px solid var(--border)" mb="20px">
        {/* Search Placeholder */}
        <FormControl mb="18px">
          <Flex align="center" gap="6px" mb="6px">
            <Search size={14} className="text-[var(--accent)]" />
            <FormLabel m={0} fontSize="xs" fontWeight="700" color="var(--fg)">
              Search Bar Placeholder Text
            </FormLabel>
          </Flex>
          <Input
            value={searchPlaceholder}
            onChange={(e) => setSearchPlaceholder(e.target.value)}
            placeholder="e.g. Search player or team name..."
            bg="var(--surface)"
            borderColor="var(--border)"
            borderRadius="10px"
            fontSize="xs"
            color="var(--fg)"
            _hover={{ borderColor: 'var(--accent)' }}
            _focus={{ borderColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent-soft)' }}
          />
          <Text fontSize="11px" color="var(--subtle)" mt="4px">
            The hint text shown inside the search box on {currentDisplayEvent || 'this event'}&apos;s leaderboard.
          </Text>
        </FormControl>

        {/* Feature Toggles (True/False) */}
        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing="16px" pt="8px" borderTop="1px solid var(--line)">
          {/* College Filter Toggle */}
          <Box p="12px" borderRadius="10px" bg="var(--surface)" border="1px solid var(--border)">
            <Flex justify="space-between" align="center" mb="4px">
              <Flex align="center" gap="6px">
                <Building2 size={14} className="text-[var(--accent)]" />
                <Text fontSize="xs" fontWeight="700" color="var(--fg)">
                  College Filter
                </Text>
              </Flex>
              <Switch
                isChecked={showCollegeFilter}
                onChange={(e) => setShowCollegeFilter(e.target.checked)}
                colorScheme="teal"
                size="sm"
              />
            </Flex>
            <Text fontSize="10px" color="var(--subtle)">
              {showCollegeFilter ? 'Enabled (Shows "All Colleges" dropdown)' : 'Disabled (Hidden on leaderboard)'}
            </Text>
          </Box>

          {/* 1st Year Filter Toggle */}
          <Box p="12px" borderRadius="10px" bg="var(--surface)" border="1px solid var(--border)">
            <Flex justify="space-between" align="center" mb="4px">
              <Flex align="center" gap="6px">
                <Calendar size={14} className="text-[var(--accent)]" />
                <Text fontSize="xs" fontWeight="700" color="var(--fg)">
                  1st Year Filter
                </Text>
              </Flex>
              <Switch
                isChecked={showFirstYearFilter}
                onChange={(e) => setShowFirstYearFilter(e.target.checked)}
                colorScheme="teal"
                size="sm"
              />
            </Flex>
            <Text fontSize="10px" color="var(--subtle)">
              {showFirstYearFilter ? 'Enabled (Shows "1st Years Only" toggle)' : 'Disabled (Hidden on leaderboard)'}
            </Text>
          </Box>

          {/* Event Selector Toggle */}
          <Box p="12px" borderRadius="10px" bg="var(--surface)" border="1px solid var(--border)">
            <Flex justify="space-between" align="center" mb="4px">
              <Flex align="center" gap="6px">
                <Trophy size={14} className="text-[var(--accent)]" />
                <Text fontSize="xs" fontWeight="700" color="var(--fg)">
                  Event Selector
                </Text>
              </Flex>
              <Switch
                isChecked={showEventSelector}
                onChange={(e) => setShowEventSelector(e.target.checked)}
                colorScheme="teal"
                size="sm"
              />
            </Flex>
            <Text fontSize="10px" color="var(--subtle)">
              {showEventSelector ? 'Enabled (Shows event switch dropdown)' : 'Disabled (Locked to current event)'}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Save Button */}
      <Flex justify="flex-end" gap="10px">
        <Button
          bg="var(--accent)"
          color="var(--accent-ink)"
          _hover={{ bg: 'var(--accent-hover)' }}
          fontSize="xs"
          fontWeight="700"
          borderRadius="10px"
          px="20px"
          py="10px"
          leftIcon={<Check size={14} />}
          isLoading={isSaving}
          isDisabled={!currentDisplayEvent}
          onClick={handleSave}
        >
          Save Configuration for &quot;{currentDisplayEvent || '...'}&quot;
        </Button>
      </Flex>
    </Box>
  );
}
