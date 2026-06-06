export type RiskLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH';

export interface EstimatedDiameter {
  kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
  meters: { estimated_diameter_min: number; estimated_diameter_max: number };
  miles: { estimated_diameter_min: number; estimated_diameter_max: number };
  feet: { estimated_diameter_min: number; estimated_diameter_max: number };
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}

export interface NearEarthObject {
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}

export interface NeoFeedResponse {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
}

export interface AsteroidRiskResult {
  neoId: string;
  name: string;
  score: number;
  level: RiskLevel;
  closeApproachDate: string;
  diameterMeters: number;
  velocityKmS: number;
  missDistanceLunar: number;
  missDistanceKm: number;
  isPotentiallyHazardous: boolean;
  neo: NearEarthObject;
}

export type SpaceWeatherEventType = 'CME' | 'FLR' | 'GST' | 'RBE' | 'OTHER';

export interface SpaceWeatherEvent {
  id: string;
  type: SpaceWeatherEventType;
  title: string;
  startTime: string;
  description: string;
  severityScore: number;
  source: 'DONKI' | 'FALLBACK';
}

export interface MissionBriefingInput {
  helioGuardIndex: number;
  helioGuardLevel: RiskLevel;
  asteroidRiskScore: number;
  spaceWeatherRiskScore: number;
  topAsteroid: AsteroidRiskResult | null;
  spaceWeatherEvents: SpaceWeatherEvent[];
  spaceWeatherUnavailable: boolean;
}

export interface HelioGuardIndexResult {
  score: number;
  level: RiskLevel;
  asteroidRiskScore: number;
  spaceWeatherRiskScore: number;
  explanation: string;
}
