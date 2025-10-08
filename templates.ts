import type { DecisionTemplate } from './types';

export const templates: Record<string, DecisionTemplate[]> = {
  "Career": [
    {
      title: "Deciding Between Two Job Offers",
      situation: "I have received two job offers, one from Company A and one from Company B. I need to choose which one to accept.",
      choice: "Accept the offer from Company A.",
    },
    {
      title: "Should I Ask for a Raise?",
      situation: "I believe I am underpaid for my role and contributions. I am considering asking my manager for a salary increase.",
      choice: "Schedule a meeting with my manager to discuss my compensation.",
    },
    {
      title: "Changing Career Paths",
      situation: "I am feeling unfulfilled in my current career field and am considering a significant change to a new industry.",
      choice: "Enroll in an online course to explore the new field before making a commitment.",
    },
  ],
  "Personal Finance": [
    {
      title: "Making a Major Purchase",
      situation: "I am considering buying a new car. It's a significant expense and I need to decide if it's the right financial move right now.",
      choice: "Go ahead with the purchase of the new car.",
    },
    {
      title: "Choosing an Investment Strategy",
      situation: "I have some savings that I want to invest for the long term, but I'm unsure whether to choose a conservative, moderate, or aggressive strategy.",
      choice: "Invest in a diversified portfolio with a moderate risk level.",
    },
  ],
  "Relationships": [
    {
      title: "Resolving a Conflict with a Friend",
      situation: "I had a disagreement with a close friend and we haven't spoken since. I want to resolve the issue.",
      choice: "Reach out to my friend to talk things through.",
    },
    {
      title: "Deciding on a Living Situation",
      situation: "My partner and I are discussing moving in together. We need to decide if it's the right time and what our living arrangement would look like.",
      choice: "Start looking for apartments together.",
    },
  ],
};