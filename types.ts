export enum DecisionStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
}

export interface SuggestedResource {
  title: string;
  url: string;
  description?: string;
}

export interface Decision {
  id: string;
  title: string;
  situation: string;
  choice: string;
  reasoning: string;
  expectedOutcome: string;
  actualOutcome: string;
  reflections: string;
  status: DecisionStatus;
  createdAt: string;
  // AI Assistant generated content
  aiAnalysis?: string;
  aiOptions?: BrainstormOption[];
  aiFollowUpQuestions?: string[];
  aiResourcesAnalysis?: string;
  aiSuggestedResources?: SuggestedResource[];
}

export interface BrainstormOption {
  option: string;
  pros: string[];
  cons: string[];
}

export interface DecisionTemplate {
  title: string;
  situation: string;
  choice?: string;
  reasoning?: string;
  expectedOutcome?: string;
}