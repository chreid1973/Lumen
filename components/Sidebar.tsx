
import React from 'react';
import type { Decision } from '../types';
import { DecisionStatus } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  decisions: Decision[];
  selectedDecisionId: string | null;
  onSelectDecision: (id: string) => void;
  onNewDecision: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    decisions, 
    selectedDecisionId, 
    onSelectDecision, 
    onNewDecision, 
    isOpen, 
    onClose,
}) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-80 bg-white/80 dark:bg-black/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex flex-col h-full
      transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0 md:bg-white/30 dark:md:bg-black/30 md:backdrop-blur-none
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Lumen Journal</h1>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
            onClick={onNewDecision}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="New Decision"
            >
                <PlusIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors md:hidden" aria-label="Close menu">
                <XIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {decisions.length > 0 ? (
          <ul>
            {decisions.map(decision => (
              <li key={decision.id} className={`border-b border-gray-200 dark:border-gray-800 transition-colors group ${selectedDecisionId === decision.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                <button
                  onClick={() => onSelectDecision(decision.id)}
                  className="w-full text-left p-4 relative hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  {selectedDecisionId === decision.id && <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>}
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-slate-200 truncate pr-2">{decision.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${decision.status === DecisionStatus.PENDING ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'}`}>
                        {decision.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-500">
                    {new Date(decision.createdAt).toLocaleDateString()}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-slate-500 mt-4">
            <p>No decisions logged yet.</p>
            <p>Click the '+' button to start.</p>
          </div>
        )}
      </div>
    </aside>
  );
};