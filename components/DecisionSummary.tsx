import React from 'react';
import type { Decision } from '../types';
import { DecisionStatus } from '../types';
import { TargetIcon } from './icons/TargetIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BrainIcon } from './icons/BrainIcon';
import { LinkIcon } from './icons/LinkIcon';

interface DecisionSummaryProps {
  decision: Decision;
}

const SummaryCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    className?: string;
}> = ({ icon, title, children, className = '' }) => (
    <div className={`p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-lg ${className}`}>
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">{title}</h3>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none prose-sm text-gray-600 dark:text-slate-400">
            {children || <p className="italic text-gray-400 dark:text-slate-500">Not yet specified.</p>}
        </div>
    </div>
);

// Helper function to find and linkify URLs in a string, then replace newlines with <br>
const formatAIResponse = (text: string): string => {
  if (!text) return '';
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  let linkedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 hover:underline">${url}</a>`;
  });
  return linkedText.replace(/\n/g, '<br />');
};

export const DecisionSummary: React.FC<DecisionSummaryProps> = ({ decision }) => {
    const isReviewed = decision.status === DecisionStatus.REVIEWED;
    const hasAIContent = decision.aiAnalysis || (decision.aiOptions && decision.aiOptions.length > 0) || (decision.aiFollowUpQuestions && decision.aiFollowUpQuestions.length > 0) || (decision.aiSuggestedResources && decision.aiSuggestedResources.length > 0) || decision.aiResourcesAnalysis;
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">The Dilemma</h2>
                 <p className="text-gray-600 dark:text-slate-400">
                    Faced with the situation of <strong className="text-blue-500 dark:text-blue-400">{decision.situation || 'an undefined situation'}</strong>, the chosen course of action was to <strong className="text-blue-500 dark:text-blue-400">{decision.choice || 'make a choice'}</strong>.
                 </p>
            </div>

            {isReviewed ? (
                <div className="grid md:grid-cols-2 gap-6">
                    <SummaryCard 
                        icon={<TargetIcon className="w-6 h-6 text-blue-500 dark:text-blue-400"/>}
                        title="Expected Outcome"
                        className="border-blue-500/30"
                    >
                        <p>{decision.expectedOutcome}</p>
                    </SummaryCard>
                     <SummaryCard 
                        icon={<CheckCircleIcon className="w-6 h-6 text-green-500 dark:text-green-400"/>}
                        title="Actual Outcome"
                        className="border-green-500/30"
                    >
                         <p>{decision.actualOutcome}</p>
                    </SummaryCard>
                </div>
            ) : (
                 <SummaryCard 
                    icon={<TargetIcon className="w-6 h-6 text-blue-500 dark:text-blue-400"/>}
                    title="Expected Outcome"
                    className="border-blue-500/30"
                 >
                     <p>{decision.expectedOutcome}</p>
                </SummaryCard>
            )}

            {hasAIContent && (
                 <SummaryCard
                    icon={<BrainIcon className="w-6 h-6 text-purple-500 dark:text-purple-400"/>}
                    title="AI-Powered Insights"
                    className="border-purple-500/30"
                >
                    <div className="space-y-4">
                        {decision.aiAnalysis && (
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">Reasoning Analysis</h4>
                                <div dangerouslySetInnerHTML={{ __html: formatAIResponse(decision.aiAnalysis) }} />
                            </div>
                        )}

                        {decision.aiOptions && decision.aiOptions.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-slate-200 my-2">Brainstormed Options</h4>
                                <ul className="space-y-3">
                                    {decision.aiOptions.map((opt, index) => (
                                      <li key={index}>
                                        <strong className="text-gray-900 dark:text-slate-100">{opt.option}</strong>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-xs">
                                            <div>
                                                <h5 className="text-green-600 dark:text-green-400 font-semibold">Pros:</h5>
                                                <ul className="list-disc list-inside">
                                                    {opt.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="text-red-600 dark:text-red-400 font-semibold">Cons:</h5>
                                                <ul className="list-disc list-inside">
                                                    {opt.cons.map((con, i) => <li key={i}>{con}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {decision.aiFollowUpQuestions && decision.aiFollowUpQuestions.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-slate-200 my-2">Follow-up Questions</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {decision.aiFollowUpQuestions.map((q, index) => <li key={index}>{q}</li>)}
                                </ul>
                            </div>
                        )}

                        {(decision.aiResourcesAnalysis || (decision.aiSuggestedResources && decision.aiSuggestedResources.length > 0)) && (
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-slate-200 my-2 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" />
                                    Suggested Resources
                                </h4>
                                {decision.aiResourcesAnalysis && (
                                     <div className="mb-3" dangerouslySetInnerHTML={{ __html: formatAIResponse(decision.aiResourcesAnalysis) }} />
                                )}
                                {decision.aiSuggestedResources && decision.aiSuggestedResources.length > 0 && (
                                    <>
                                        <h5 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Verified Sources:</h5>
                                        <ul className="space-y-2">
                                            {decision.aiSuggestedResources.map((resource, index) => (
                                                <li key={index}>
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                                        {resource.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </SummaryCard>
            )}

            {isReviewed && (
                 <SummaryCard 
                    icon={<SparklesIcon className="w-6 h-6 text-amber-500 dark:text-amber-400"/>}
                    title="Reflections & Learnings"
                    className="border-amber-500/30"
                >
                    <p>{decision.reflections}</p>
                </SummaryCard>
            )}
        </div>
    );
}

// Add a simple fade-in animation to the global stylesheet (via JS, for simplicity here)
if (!document.getElementById('animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}