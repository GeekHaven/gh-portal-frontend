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
 * Standard default fallback configuration when an event has not yet
 * been customized by an admin in the Admin Management panel.
 *
 * NOTE: There are ZERO hardcoded event-specific rules here.
 * All event customizations (placeholder, college toggle, 1st-year toggle)
 * are controlled dynamically by admins in /admin/managements.
 */
export const DEFAULT_LEADERBOARD_CONFIG: LeaderboardEventConfig = {
  searchPlaceholder: 'Search name or GitHub ID...',
  showCollegeFilter: true,
  showFirstYearFilter: true,
  showEventSelector: true,
};

/**
 * Resolves default configuration for an event when no admin configuration exists.
 */
export function getLeaderboardEventConfig(eventName?: string): LeaderboardEventConfig {
  const eventLabel = eventName?.trim();
  return {
    searchPlaceholder: eventLabel ? `Search ${eventLabel} participants...` : 'Search name or GitHub ID...',
    showCollegeFilter: true,
    showFirstYearFilter: true,
    showEventSelector: true,
  };
}
