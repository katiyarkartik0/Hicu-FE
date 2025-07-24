export interface Leads {
  id?: number;
  brandId: number;
  requirements: string[];
  maxGenerationAttemptsPerProspect: number;
  minGapBetweenPerGenerationAttempt: number; // also in ms
}
