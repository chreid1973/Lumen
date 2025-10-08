
import React from 'react';
import type { Decision } from '../types';
import { DecisionStatus } from '../types';
import { TargetIcon } from './icons/TargetIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SparklesIcon } from './icons/SparklesIcon';

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


export const DecisionSummary: React.FC<DecisionSummaryProps> = ({ decision }) => {
    const isReviewed = decision.status === DecisionStatus.REVIEWED;
    
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