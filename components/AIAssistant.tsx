
import React, { useState, useCallback } from 'react';
import type { Decision, BrainstormOption } from '../types';
import { analyzeReasoning, brainstormOptions, askFollowUpQuestions } from '../services/geminiService';
import { BrainIcon } from './icons/BrainIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';

interface AIAssistantProps {
  decision: Decision;
}

const LoadingSpinner: React.FC<{text?: string}> = ({ text = "Thinking..." }) => (
    <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-gray-500 dark:border-slate-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 dark:text-slate-400">{text}</span>
    </div>
);

const AIResponse: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-4 p-4 bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">{title}</h4>
        <div className="prose prose-slate dark:prose-invert max-w-none prose-sm">{children}</div>
    </div>
);

export const AIAssistant: React.FC<AIAssistantProps> = ({ decision }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [options, setOptions] = useState<BrainstormOption[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<'analysis' | 'options' | 'follow-up' | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAnalyze = useCallback(async () => {
    if (!decision.reasoning) {
        setError('Please provide your reasoning first.');
        return;
    }
    setLoading('analysis');
    setError('');
    setAnalysis('');
    setFollowUpQuestions([]);
    try {
      const result = await analyzeReasoning(decision.reasoning, decision.situation);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(null);
    }
  }, [decision.reasoning, decision.situation]);

  const handleBrainstorm = useCallback(async () => {
    if (!decision.situation) {
        setError('Please describe the situation first.');
        return;
    }
    setLoading('options');
    setError('');
    setOptions([]);
    try {
      const result = await brainstormOptions(decision.situation);
      setOptions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(null);
    }
  }, [decision.situation]);
  
  const handleAskFollowUp = useCallback(async () => {
    if (!analysis) return;
    setLoading('follow-up');
    setError('');
    setFollowUpQuestions([]);
     try {
      const result = await askFollowUpQuestions(decision.situation, decision.reasoning, analysis);
      setFollowUpQuestions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(null);
    }
  }, [decision.situation, decision.reasoning, analysis]);

  if (isCollapsed) {
      return (
          <button onClick={() => setIsCollapsed(false)} className="w-full flex justify-between items-center p-3 bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition text-gray-700 dark:text-slate-300 font-semibold">
              <span>Show AI Assistant</span>
              <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
      )
  }

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm">
       <button onClick={() => setIsCollapsed(true)} className="w-full flex justify-between items-center text-gray-500 dark:text-slate-400 font-semibold mb-3">
            <span>Hide AI Assistant</span>
            <ChevronDownIcon className="w-5 h-5 transform rotate-180 transition-transform" />
        </button>
        <p className="text-gray-600 dark:text-slate-400 mb-4 text-sm">Use AI to stress-test your thinking and discover new possibilities.</p>
        
      <div className="flex gap-4">
        <button
          onClick={handleAnalyze}
          disabled={!!loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-gray-500 dark:disabled:text-slate-400 transition shadow-lg hover:shadow-blue-500/30"
        >
          <BrainIcon className="w-5 h-5"/>
          {loading === 'analysis' ? <LoadingSpinner /> : 'Analyze Reasoning'}
        </button>
        <button
          onClick={handleBrainstorm}
          disabled={!!loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-slate-200 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-400 transition"
        >
          <LightbulbIcon className="w-5 h-5"/>
          {loading === 'options' ? <LoadingSpinner /> : 'Brainstorm Options'}
        </button>
      </div>

      {error && <div className="mt-4 p-3 bg-red-900/50 text-red-300 rounded-md text-sm border border-red-500/30">{error}</div>}
      
      {analysis && (
        <AIResponse title="Reasoning Analysis">
            <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
        </AIResponse>
      )}

      {analysis && !loading && (
          <div className="mt-3 flex justify-end">
              <button
                onClick={handleAskFollowUp}
                disabled={loading === 'follow-up'}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 font-semibold rounded-md hover:bg-blue-100/50 dark:hover:bg-blue-900/50 disabled:text-gray-400 dark:disabled:text-slate-500 disabled:hover:bg-transparent transition"
              >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  Ask Follow-up Questions
              </button>
          </div>
      )}

      {loading === 'follow-up' && <div className="mt-4"><LoadingSpinner text="Generating questions..."/></div>}
      {followUpQuestions.length > 0 && (
          <AIResponse title="Follow-up Questions">
              <ul className="list-disc list-inside space-y-2">
                  {followUpQuestions.map((q, index) => <li key={index}>{q}</li>)}
              </ul>
          </AIResponse>
      )}

      {options.length > 0 && (
        <AIResponse title="Brainstormed Options">
          <ul className="space-y-4">
            {options.map((opt, index) => (
              <li key={index}>
                <strong className="text-gray-900 dark:text-slate-100">{opt.option}</strong>
                <div className="flex gap-4 mt-1">
                    <div className="flex-1">
                        <h5 className="text-green-600 dark:text-green-400 font-semibold">Pros:</h5>
                        <ul className="list-disc list-inside">
                            {opt.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h5 className="text-red-600 dark:text-red-400 font-semibold">Cons:</h5>
                        <ul className="list-disc list-inside">
                            {opt.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </AIResponse>
      )}
    </div>
  );
};