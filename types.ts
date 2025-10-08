export enum DecisionStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
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