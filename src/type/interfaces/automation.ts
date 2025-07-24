export type LeadsAsked = {
  requirements: string[];
  maxGenerationAttemptsPerProspect: number;
  minGapBetweenPerGenerationAttempt: number;
};

export type LeadsCollected = {
  details: Record<string, any>;
  totalAttempts: number;
  lastAttempt: number;
};

export interface Automation {
  id: number;
  mediaId: string;
  accountId: number;
  leads: LeadsAsked;
  commentAutomationId: number;
  dmAutomationId: number;
}

export type IgCommentAutomation = {
  id: number;
  mediaId: string;
  accountId: number;
  commentAutomationId: number;
};

export type IgDmAutomation = {
  id: number;
  accountId: number;
  dmAutomationId: number;
};
