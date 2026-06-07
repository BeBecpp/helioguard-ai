import { useCallback, useEffect, useState } from 'react';
import { fetchAsteroidRiskData } from '../services/nasaNeoService';
import { fetchSpaceWeatherEvents } from '../services/nasaDonkiService';
import { calculateHelioGuardIndex, generateMissionBriefing } from '../utils/briefingEngine';
import { getRiskLevel } from '../utils/asteroidRisk';
import {
  calculateSpaceWeatherRisk,
  getFallbackSpaceWeatherRisk,
} from '../utils/spaceWeatherRisk';
import type {
  AsteroidRiskResult,
  HelioGuardIndexResult,
  SpaceWeatherEvent,
} from '../types/nasa';

type LoadPhase = 'idle' | 'fetching' | 'calculating' | 'briefing' | 'ready' | 'error';

export function useHelioGuardData() {
  const [phase, setPhase] = useState<LoadPhase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidRiskResult[]>([]);
  const [indexData, setIndexData] = useState<HelioGuardIndexResult | null>(null);
  const [briefing, setBriefing] = useState('');
  const [spaceEvents, setSpaceEvents] = useState<SpaceWeatherEvent[]>([]);
  const [donkiUnavailable, setDonkiUnavailable] = useState(false);
  const [donkiError, setDonkiError] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>();

  const loadData = useCallback(async () => {
    setPhase('fetching');
    setError(null);

    try {
      const asteroidResult = await fetchAsteroidRiskData(15);
      const weatherResult = await fetchSpaceWeatherEvents();

      setPhase('calculating');
      setAsteroids(asteroidResult.results);
      setDateRange(asteroidResult.dateRange);
      setSpaceEvents(weatherResult.events);
      setDonkiUnavailable(weatherResult.unavailable);
      setDonkiError(weatherResult.error);

      const spaceWeatherScore = weatherResult.unavailable
        ? getFallbackSpaceWeatherRisk()
        : calculateSpaceWeatherRisk(weatherResult.events);

      const { score, explanation } = calculateHelioGuardIndex(
        asteroidResult.aggregateScore,
        spaceWeatherScore,
      );

      const index: HelioGuardIndexResult = {
        score,
        level: getRiskLevel(score),
        asteroidRiskScore: asteroidResult.aggregateScore,
        spaceWeatherRiskScore: spaceWeatherScore,
        explanation,
      };
      setIndexData(index);

      setPhase('briefing');
      setBriefing(
        generateMissionBriefing({
          helioGuardIndex: score,
          helioGuardLevel: index.level,
          asteroidRiskScore: asteroidResult.aggregateScore,
          spaceWeatherRiskScore: spaceWeatherScore,
          topAsteroid: asteroidResult.results[0] ?? null,
          spaceWeatherEvents: weatherResult.events,
          spaceWeatherUnavailable: weatherResult.unavailable,
        }),
      );

      setPhase('ready');
    } catch (err) {
      setPhase('error');
      setError(err instanceof Error ? err.message : 'Failed to load NASA data');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isLoading = phase !== 'ready' && phase !== 'error';

  return {
    phase,
    error,
    asteroids,
    indexData,
    briefing,
    spaceEvents,
    donkiUnavailable,
    donkiError,
    dateRange,
    isLoading,
    loadData,
  };
}
