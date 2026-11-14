'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  fetchPlatformFeatures,
  updatePlatformFeaturesInDb,
} from 'api/admin/admin';
import type { LeaderboardEventConfig } from 'config/leaderboard.config';

export interface FeaturesConfig {
  showWinners: boolean;
  showMilestones: boolean;
  showRPlace: boolean;
  showRepositories: boolean;
  showLeaderboard: boolean;
  showGeekstore: boolean;
  flagshipEvent: string | null;
  leaderboardConfigs?: Record<string, LeaderboardEventConfig>;
}

export interface FeaturesContextType {
  features: FeaturesConfig;
  isLoading: boolean;
  error: Error | null;
  toggleFeature: (key: keyof FeaturesConfig, value: boolean) => Promise<boolean>;
  setFlagshipEvent: (eventName: string | null) => Promise<boolean>;
  updateFeatures: (patch: Partial<FeaturesConfig>) => Promise<boolean>;
  saveLeaderboardConfig: (eventName: string, config: LeaderboardEventConfig) => Promise<boolean>;
  refreshFeatures: () => Promise<void>;
}

const LEADERBOARD_CONFIGS_STORAGE_KEY = 'oc-leaderboard-configs';

// Initial defaults before authoritative backend response is retrieved.
const DEFAULT_FEATURES: FeaturesConfig = {
  showWinners: false,
  showMilestones: false,
  showRepositories: false,
  showRPlace: false,
  showLeaderboard: false,
  showGeekstore: false,
  flagshipEvent: null,
  leaderboardConfigs: {},
};

const FeaturesContext = createContext<FeaturesContextType>({
  features: DEFAULT_FEATURES,
  isLoading: true,
  error: null,
  toggleFeature: async () => false,
  setFlagshipEvent: async () => false,
  updateFeatures: async () => false,
  saveLeaderboardConfig: async () => false,
  refreshFeatures: async () => {},
});

export function FeaturesProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState<FeaturesConfig>(DEFAULT_FEATURES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshFeatures = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load cached leaderboard configs if present
      let cachedConfigs: Record<string, LeaderboardEventConfig> = {};
      try {
        if (typeof window !== 'undefined') {
          const raw = localStorage.getItem(LEADERBOARD_CONFIGS_STORAGE_KEY);
          if (raw) cachedConfigs = JSON.parse(raw);
        }
      } catch {}

      // Fetch authoritative configuration directly from backend GET /api/v1/features
      const backendData = await fetchPlatformFeatures();
      if (backendData) {
        setFeatures({
          showWinners: Boolean(backendData.showWinners),
          showMilestones: Boolean(backendData.showMilestones),
          showLeaderboard: Boolean(backendData.showLeaderboard),
          showRepositories: Boolean(backendData.showRepositories),
          showRPlace: Boolean(backendData.showRPlace),
          showGeekstore: Boolean(backendData.showGeekstore),
          flagshipEvent: backendData.flagshipEvent ?? null,
          leaderboardConfigs: cachedConfigs,
        });
      }
    } catch (err: any) {
      console.error('[FeaturesContext] Failed to retrieve authoritative features configuration:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFeatures();
  }, [refreshFeatures]);

  const toggleFeature = useCallback(
    async (key: keyof FeaturesConfig, value: boolean): Promise<boolean> => {
      const patch: Partial<FeaturesConfig> = { [key]: value };
      try {
        const updatedConfig = await updatePlatformFeaturesInDb(patch);
        if (updatedConfig) {
          setFeatures((prev) => ({
            ...prev,
            showWinners: Boolean(updatedConfig.showWinners),
            showMilestones: Boolean(updatedConfig.showMilestones),
            showLeaderboard: Boolean(updatedConfig.showLeaderboard),
            showRepositories: Boolean(updatedConfig.showRepositories),
            showRPlace: Boolean(updatedConfig.showRPlace),
            showGeekstore: Boolean(updatedConfig.showGeekstore),
            flagshipEvent: updatedConfig.flagshipEvent ?? null,
          }));
          return true;
        }
        return false;
      } catch (err) {
        console.error(`[FeaturesContext] Failed to update feature ${String(key)}:`, err);
        throw err;
      }
    },
    [],
  );

  const setFlagshipEvent = useCallback(
    async (eventName: string | null): Promise<boolean> => {
      const patch: Partial<FeaturesConfig> = { flagshipEvent: eventName };
      try {
        const updatedConfig = await updatePlatformFeaturesInDb(patch);
        if (updatedConfig) {
          setFeatures((prev) => ({
            ...prev,
            showWinners: Boolean(updatedConfig.showWinners),
            showMilestones: Boolean(updatedConfig.showMilestones),
            showLeaderboard: Boolean(updatedConfig.showLeaderboard),
            showRepositories: Boolean(updatedConfig.showRepositories),
            showRPlace: Boolean(updatedConfig.showRPlace),
            showGeekstore: Boolean(updatedConfig.showGeekstore),
            flagshipEvent: updatedConfig.flagshipEvent ?? null,
          }));
          return true;
        }
        return false;
      } catch (err) {
        console.error('[FeaturesContext] Failed to update flagship event:', err);
        throw err;
      }
    },
    [],
  );

  const updateFeatures = useCallback(
    async (patch: Partial<FeaturesConfig>): Promise<boolean> => {
      try {
        const updatedConfig = await updatePlatformFeaturesInDb(patch);
        if (updatedConfig) {
          setFeatures((prev) => ({
            ...prev,
            showWinners: Boolean(updatedConfig.showWinners),
            showMilestones: Boolean(updatedConfig.showMilestones),
            showLeaderboard: Boolean(updatedConfig.showLeaderboard),
            showRepositories: Boolean(updatedConfig.showRepositories),
            showRPlace: Boolean(updatedConfig.showRPlace),
            showGeekstore: Boolean(updatedConfig.showGeekstore),
            flagshipEvent: updatedConfig.flagshipEvent ?? null,
          }));
          return true;
        }
        return false;
      } catch (err) {
        console.error('[FeaturesContext] Failed to batch update features:', err);
        throw err;
      }
    },
    [],
  );

  const saveLeaderboardConfig = useCallback(
    async (eventName: string, config: LeaderboardEventConfig): Promise<boolean> => {
      let nextConfigs: Record<string, LeaderboardEventConfig> = {};
      setFeatures((prev) => {
        nextConfigs = {
          ...(prev.leaderboardConfigs || {}),
          [eventName]: config,
        };
        return { ...prev, leaderboardConfigs: nextConfigs };
      });

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LEADERBOARD_CONFIGS_STORAGE_KEY, JSON.stringify(nextConfigs));
        }
      } catch {}

      return true;
    },
    [],
  );

  return (
    <FeaturesContext.Provider
      value={{
        features,
        isLoading,
        error,
        toggleFeature,
        setFlagshipEvent,
        updateFeatures,
        saveLeaderboardConfig,
        refreshFeatures,
      }}
    >
      {children}
    </FeaturesContext.Provider>
  );
}

export function useFeatures() {
  return useContext(FeaturesContext);
}
