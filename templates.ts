import type { DecisionTemplate } from './types';

export const templates: Record<string, DecisionTemplate[]> = {
  "Career": [
    {
      title: "Deciding Between Two Job Offers",
      situation: "I have received two job offers and need to decide which one to accept. Company A is a large, established corporation, while Company B is a fast-growing startup.",
      choice: "",
      reasoning: "To make an informed decision, I will compare the offers across several key dimensions:\n\n**Company A (The Corporation):**\n- **Pros:** (e.g., higher base salary, better benefits, job security, brand recognition)\n- **Cons:** (e.g., bureaucracy, slower pace, less individual impact)\n\n**Company B (The Startup):**\n- **Pros:** (e.g., significant equity potential, rapid learning, high impact, agile culture)\n- **Cons:** (e.g., lower base salary, higher risk, uncertain work-life balance)\n\n**My personal priorities are:** (e.g., 1. Learning & Growth, 2. Financial Security, 3. Work-Life Balance)",
      expectedOutcome: "By choosing the company that aligns best with my priorities, I expect to feel more fulfilled and motivated in my role within the first six months. Specifically, if I choose Company A, I expect stability and a clear career ladder. If I choose Company B, I expect to accelerate my skill development and have a greater sense of ownership.",
    },
    {
      title: "Should I Ask for a Raise?",
      situation: "I believe my contributions and performance over the last year have exceeded expectations, and I feel I am underpaid compared to the market rate for my role.",
      choice: "I will schedule a meeting with my manager to discuss a salary increase.",
      reasoning: "1.  **Accomplishments:** (List 3-5 key achievements with quantifiable results. e.g., \"Increased team efficiency by 15% by implementing X\", \"Led the Y project which resulted in $Z revenue.\")\n2.  **Market Research:** (Note salary data from sites like Glassdoor, Levels.fyi for my role, experience, and location.)\n3.  **My Target Salary:** (State the specific percentage or number I will be asking for.)\n4.  **Potential Objections & My Responses:** (e.g., Budget constraints - \"I understand, could we explore a phased increase or a bonus structure?\")",
      expectedOutcome: "I expect the conversation to be professional and constructive. Ideally, my manager will agree to the raise, or we will establish a clear plan and timeline for a compensation review. Even if the answer is no, I expect to receive valuable feedback on my performance.",
    },
    {
      title: "Changing Career Paths",
      situation: "I'm feeling unfulfilled and burnt out in my current career field (e.g., Marketing). I am considering a significant pivot to a different industry (e.g., Software Engineering).",
      choice: "",
      reasoning: "My current career path is lacking (e.g., intellectual stimulation, growth opportunities, alignment with my values). The new field is appealing because (e.g., high demand, problem-solving nature, higher earning potential).\n\n**My plan to explore this change:**\n1.  **Research:** Talk to 3 people in the new field.\n2.  **Skill-building:** Enroll in an introductory online course for [New Skill].\n3.  **Financial Planning:** Calculate the costs and potential income gap during the transition.",
      expectedOutcome: "After this initial exploration phase (e.g., 3 months), I expect to have a clear 'go/no-go' decision. If I proceed, I will have a concrete plan for the transition. If not, I will have gained clarity and can refocus on improving my current situation.",
    },
  ],
  "Personal Finance": [
    {
      title: "Making a Major Purchase (e.g., a Car)",
      situation: "My current car is becoming unreliable. I am considering buying a new car, which is a significant expense. I need to decide if this is the right financial move and what my budget should be.",
      choice: "",
      reasoning: "1.  **Need vs. Want:** Is a new car essential right now, or can my current one be repaired? What are the costs of each option?\n2.  **Affordability:** Based on my budget (income - expenses), I can afford a monthly payment of $____. My total budget for the car, including taxes and fees, is $____.\n3.  **Financing:** I will explore financing options from (e.g., my credit union, the dealership, online lenders) to find the best interest rate.\n4.  **Alternatives:** Have I considered a certified pre-owned vehicle or a less expensive model?",
      expectedOutcome: "I expect to make a financially responsible decision that provides me with reliable transportation without causing financial stress. I will have a clear budget and stick to it during the negotiation process.",
    },
    {
      title: "Choosing an Investment Strategy",
      situation: "I have some savings ($____) that I want to invest for a long-term goal (e.g., retirement in 20+ years). I'm unsure which investment strategy to adopt.",
      choice: "I will invest in a diversified, low-cost portfolio with a moderate risk level.",
      reasoning: "1.  **Risk Tolerance:** On a scale of 1-10, my comfort with market fluctuations is a ___. I am willing to accept some risk for potentially higher returns over the long term.\n2.  **Investment Horizon:** My goal is ___ years away, which means I have time to recover from market downturns.\n3.  **Chosen Assets:** My portfolio will consist of a mix of assets, such as:\n    -   __% Total Stock Market Index Fund (e.g., VTI)\n    -   __% International Stock Market Index Fund (e.g., VXUS)\n    -   __% Bond Index Fund (e.g., BND)",
      expectedOutcome: "By consistently investing with a clear strategy, I expect my capital to grow over the long term, outpacing inflation and helping me reach my financial goal. I will not panic-sell during market dips and will review my portfolio annually.",
    },
  ],
  "Health & Wellness": [
    {
        title: "Starting a New Fitness Routine",
        situation: "I want to improve my physical health and energy levels, but I've struggled to stick with exercise routines in the past. I need to create a sustainable plan.",
        choice: "I will commit to exercising 3 times a week for 30 minutes each session.",
        reasoning: "1. **Motivation:** My primary reason for this is (e.g., to have more energy for my family, to reduce stress, to improve my long-term health).\n2. **Activities I Enjoy:** I will focus on activities I find enjoyable, such as (e.g., brisk walking, cycling, dancing, weightlifting).\n3. **Schedule:** I will block out time in my calendar on (e.g., Monday, Wednesday, Friday mornings) to ensure it happens.\n4. **Overcoming Barriers:** If I feel unmotivated, my plan is to (e.g., just do 10 minutes, listen to a podcast while I walk, have my workout clothes ready the night before).",
        expectedOutcome: "Within one month, I expect to feel more energetic and notice an improvement in my mood. The routine should start to feel like a habit rather than a chore. I will track my progress to stay motivated.",
    },
    {
        title: "Improving Sleep Habits",
        situation: "I consistently feel tired during the day and suspect my sleep quality is poor. I want to establish habits that lead to more restful sleep.",
        choice: "I will implement a consistent sleep hygiene routine every night.",
        reasoning: "1. **Current Problems:** (e.g., I scroll on my phone in bed, I drink caffeine too late, my sleep schedule is inconsistent).\n2. **New Routine:** My new wind-down routine will include:\n   - No screens 1 hour before bed.\n   - A consistent bedtime of 11:00 PM.\n   - Reading a book or listening to calm music for 20 minutes.\n   - Ensuring my bedroom is dark, quiet, and cool.\n3. **Tracking:** I will use a simple journal to note my bedtime, wake-up time, and how I feel each morning.",
        expectedOutcome: "After two weeks of consistency, I expect to fall asleep more easily and wake up feeling more refreshed. I anticipate a reduction in daytime grogginess and an improvement in my ability to focus.",
    }
  ],
  "Relationships": [
    {
      title: "Resolving a Conflict with a Friend",
      situation: "I had a disagreement with my friend, [Friend's Name], about [Topic], and we haven't spoken since. I value this friendship and want to resolve the issue.",
      choice: "I will reach out to my friend to schedule a time to talk in person.",
      reasoning: "1.  **My Perspective:** I felt [emotion] when [action occurred] because [reason].\n2.  **Their Likely Perspective:** They might have felt [emotion] because they might have interpreted my actions as [interpretation].\n3.  **Desired Outcome for the Conversation:** My goal is not to 'win' the argument, but to understand their perspective, share my own calmly, and find a way to move forward.\n4.  **Opening Line:** I will start the conversation with something non-accusatory, like: \"I've been thinking about our conversation and I miss our friendship. Would you be open to talking about it?\"",
      expectedOutcome: "I expect the conversation to be difficult but ultimately productive. We should both feel heard and respected, and hopefully, we can repair our friendship. At a minimum, I expect to gain clarity and closure.",
    },
  ],
};
