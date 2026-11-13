export interface LeaderboardEventConfig {
  /** Placeholder hint text rendered inside the search input */
  searchPlaceholder: string;
  /** Whether the College Filter dropdown should be displayed */
  showCollegeFilter: boolean;
  /** Whether the 1st Years Only switch should be displayed */
  showFirstYearFilter: boolean;
  /** Whether the Event switcher dropdown should be displayed */
  showEventSelector?: boolean;
}

/**
 * Event-specific configuration mapping.
 * Keys are normalized lowercase keywords or exact event names.
 */
export const EVENT_LEADERBOARD_CONFIGS: Record<string, Partial<LeaderboardEventConfig>> = {
  // OpenCode events (flagship multi-college open-source sprint)
  opencode: {
    searchPlaceholder: 'Search name or GitHub ID...',
    showCollegeFilter: true,
    showFirstYearFilter: true,
    showEventSelector: true,
  },
  // CTF / Security challenges (team-based or hacker aliases, no 1st-year/college distinction)
  'rift ctf': {
    searchPlaceholder: 'Search player or team name...',
    showCollegeFilter: false,
    showFirstYearFilter: false,
    showEventSelector: true,
  },
  ctf: {
    searchPlaceholder: 'Search player or team name...',
    showCollegeFilter: false,
    showFirstYearFilter: false,
    showEventSelector: true,
  },
  // Competitive Programming / Algorithms
  cp: {
    searchPlaceholder: 'Search handle or username...',
    showCollegeFilter: false,
    showFirstYearFilter: false,
    showEventSelector: true,
  },
  // Hackathons (project/team search)
  hackathon: {
    searchPlaceholder: 'Search team or project name...',
    showCollegeFilter: true,
    showFirstYearFilter: false,
    showEventSelector: true,
  },
};

/**
 * Resolves the configuration for a given event name.
 * Falls back to sensible defaults for unknown or newly created events.
 */
export function getLeaderboardEventConfig(eventName?: string): LeaderboardEventConfig {
  const normalized = (eventName || '').trim().toLowerCase();

  for (const [key, config] of Object.entries(EVENT_LEADERBOARD_CONFIGS)) {
    if (normalized.includes(key)) {
      return {
        searchPlaceholder: config.searchPlaceholder || 'Search participant...',
        showCollegeFilter: config.showCollegeFilter ?? true,
        showFirstYearFilter: config.showFirstYearFilter ?? false,
        showEventSelector: config.showEventSelector ?? true,
      };
    }
  }

  // Default fallback for any other events:
  const eventLabel = eventName?.trim();
  return {
    searchPlaceholder: eventLabel ? `Search ${eventLabel} participants...` : 'Search participants...',
    showCollegeFilter: false,
    showFirstYearFilter: false,
    showEventSelector: true,
  };
}

