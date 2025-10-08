import { GoogleGenAI, Type } from "@google/genai";
import type { BrainstormOption, SuggestedResource } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we'll throw an error to make it clear.
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeReasoning(reasoning: string, situation: string): Promise<string> {
  const prompt = `
    Analyze the following decision-making process.
    
    **The Situation:**
    ${situation}

    **The User's Reasoning:**
    ${reasoning}

    ---

    As a critical thinking coach, please perform the following analysis:
    1.  **Identify Potential Cognitive Biases:** Point out any common biases (like confirmation bias, availability heuristic, sunk cost fallacy, etc.) that might be influencing this reasoning.
    2.  **Uncover Unstated Assumptions:** What hidden assumptions is the user making that could be false?
    3.  **Find Potential Blind Spots:** What important factors or alternative outcomes might the user be overlooking?
    4.  **Ask Clarifying Questions:** Pose 2-3 powerful questions that would help the user think more deeply about their choice.

    Provide your analysis in a constructive, helpful tone. Use markdown for formatting (bolding, bullet points).
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing reasoning:", error);
    throw new Error("Failed to get analysis from AI. Please check the API key and try again.");
  }
}

export async function brainstormOptions(situation: string): Promise<BrainstormOption[]> {
    const prompt = `
        Given the following situation, brainstorm 3-4 diverse and creative options to resolve it. 
        For each option, list 2-3 potential pros and 2-3 potential cons.

        **Situation:**
        ${situation}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            option: {
                                type: Type.STRING,
                                description: "A distinct course of action or choice.",
                            },
                            pros: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "The potential positive outcomes or advantages of this option."
                            },
                            cons: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "The potential negative outcomes or disadvantages of this option."
                            }
                        },
                        required: ["option", "pros", "cons"],
                    },
                },
            },
        });
        
        const jsonText = response.text;
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as BrainstormOption[];

    } catch (error) {
        console.error("Error brainstorming options:", error);
        throw new Error("Failed to get brainstormed options from AI. The model may have returned an unexpected format.");
    }
}


export async function askFollowUpQuestions(situation: string, reasoning: string, analysis: string): Promise<string[]> {
    const prompt = `
        A user is making a decision. Here is the context:

        **Original Situation:**
        ${situation}

        **User's Reasoning:**
        ${reasoning}

        **My Initial AI Analysis of their Reasoning:**
        ${analysis}

        ---
        Based on all of this context, please generate exactly 3 deeper, more specific follow-up questions to help the user reflect further. The questions should be probing, open-ended, and encourage critical thinking about the blind spots or biases identified in the analysis. Output only the questions.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                        description: "A single, probing follow-up question.",
                    },
                },
            },
        });

        const jsonText = response.text;
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as string[];

    } catch (error) {
        console.error("Error asking follow-up questions:", error);
        throw new Error("Failed to get follow-up questions from AI. The model may have returned an unexpected format.");
    }
}

export async function suggestResources(situation: string, choice: string): Promise<{ analysis: string; resources: SuggestedResource[] }> {
    const prompt = `
        A user is trying to make a decision. Here is the context:

        **The Situation:**
        ${situation}

        **Their Current Choice/Leaning:**
        ${choice || "Not yet decided."}

        ---
        Based on this context, please find and summarize helpful and high-quality online resources (e.g., articles, tools, reputable websites) that could help the user gather more information or evaluate their options. Your summary should be helpful and informative. The verified source links will be displayed separately.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });
        
        const analysis = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

        const resources: SuggestedResource[] = groundingChunks
            .map((chunk: any) => {
                if (chunk.web) {
                    return {
                        title: chunk.web.title || 'Untitled Resource',
                        url: chunk.web.uri,
                    };
                }
                return null;
            })
            .filter((resource): resource is SuggestedResource => resource !== null);

        return { analysis, resources };

    } catch (error) {
        console.error("Error suggesting resources:", error);
        throw new Error("Failed to get suggested resources from AI. Please check your connection and API key.");
    }
}