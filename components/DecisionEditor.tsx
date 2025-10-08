import React, { useState, useEffect, useCallback } from 'react';
import type { Decision, DecisionTemplate, BrainstormOption } from '../types';
import { DecisionStatus } from '../types';
import { AIAssistant } from './AIAssistant';
import { DecisionSummary } from './DecisionSummary';
import { TemplateLibrary } from './TemplateLibrary';
import { MenuIcon } from './icons/MenuIcon';
import { DocumentPlusIcon } from './icons/DocumentPlusIcon';
import { TrashIcon } from './icons/TrashIcon';


interface DecisionEditorProps {
  decision: Decision;
  onUpdate: (decision: Decision) => void;
  onMenuClick: () => void;
  onDelete: () => void;
}

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">{title}</h2>
        {children}
    </div>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea
        {...props}
        rows={5}
        className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-slate-300 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500/70 focus:border-blue-500 transition duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 shadow-sm"
    />
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-slate-300 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500/70 focus:border-blue-500 transition duration-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 shadow-sm"
    />
);


export const DecisionEditor: React.FC<DecisionEditorProps> = ({ decision, onUpdate, onMenuClick, onDelete }) => {
  const [localDecision, setLocalDecision] = useState<Decision>(decision);
  const [view, setView] = useState<'editor' | 'summary'>('editor');
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalDecision(prev => ({ ...prev, [name]: value }));
  };
  
  const debouncedUpdate = useCallback(
    debounce((updatedDecision: Decision) => onUpdate(updatedDecision), 1000),
    [onUpdate]
  );
  
  useEffect(() => {
    if (JSON.stringify(localDecision) !== JSON.stringify(decision)) {
        debouncedUpdate(localDecision);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localDecision, debouncedUpdate]);
  
  // Reset local state if the parent decision changes
  useEffect(() => {
    setLocalDecision(decision);
    setView('editor'); // Reset to editor view when decision changes
  }, [decision]);

  const handleSelectTemplate = (template: DecisionTemplate) => {
    setLocalDecision(prev => ({
        ...prev,
        title: template.title,
        situation: template.situation,
        choice: template.choice || '',
        reasoning: template.reasoning || '',
        expectedOutcome: template.expectedOutcome || '',
    }));
  }

  const handleStatusChange = (newStatus: DecisionStatus) => {
    const updated = { ...localDecision, status: newStatus };
    setLocalDecision(updated);
    onUpdate(updated);
  };
  
  const handleUpdateAIAssistantData = (updates: Partial<Pick<Decision, 'aiAnalysis' | 'aiOptions' | 'aiFollowUpQuestions'>>) => {
    setLocalDecision(prev => ({ ...prev, ...updates }));
  };

  const ViewToggle: React.FC = () => (
      <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex w-min border border-gray-300 dark:border-gray-700">
          <button 
              onClick={() => setView('editor')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'editor' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-slate-100 shadow-sm' : 'bg-transparent text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200'}`}
          >
              Editor
          </button>
          <button 
              onClick={() => setView('summary')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'summary' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-slate-100 shadow-sm' : 'bg-transparent text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200'}`}
          >
              Summary
          </button>
      </div>
  );

  return (
    <>
      <TemplateLibrary 
        isOpen={isTemplateLibraryOpen}
        onClose={() => setIsTemplateLibraryOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6 gap-4">
            <div className="flex items-center gap-2 flex-grow min-w-0">
                <button onClick={onMenuClick} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden" aria-label="Open menu">
                    <MenuIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />
                </button>
                <input
                    type="text"
                    name="title"
                    value={localDecision.title}
                    onChange={handleInputChange}
                    className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 bg-transparent focus:outline-none focus:bg-gray-100/50 dark:focus:bg-gray-800/50 rounded-md px-2 w-full"
                    placeholder="Decision Title"
                />
            </div>
             <button
                onClick={onDelete}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-red-900/50 text-red-300 rounded-md hover:bg-red-900/80 border border-red-800/50 hover:border-red-700 transition-colors"
                aria-label="Delete Decision"
            >
                <TrashIcon className="w-5 h-5" />
                <span className="hidden md:inline">Delete</span>
            </button>
        </div>
        
        <div className="mb-6 flex items-center gap-4">
          <ViewToggle />
          <button 
            onClick={() => setIsTemplateLibraryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-gray-100/50 dark:bg-gray-700/50 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-colors"
          >
            <DocumentPlusIcon className="w-5 h-5 text-blue-400" />
            Use a Template
          </button>
        </div>

        {view === 'editor' ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
                <span className="font-semibold text-gray-600 dark:text-slate-400">Status:</span>
                {localDecision.status === DecisionStatus.PENDING && (
                     <button onClick={() => handleStatusChange(DecisionStatus.REVIEWED)} className="px-4 py-2 text-sm font-semibold text-white bg-green-600/80 rounded-md hover:bg-green-600 transition">
                        Mark as Reviewed
                    </button>
                )}
                {localDecision.status === DecisionStatus.REVIEWED && (
                     <button onClick={() => handleStatusChange(DecisionStatus.PENDING)} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-slate-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                        Mark as Pending
                    </button>
                )}
            </div>
            <Section title="1. The Situation">
              <p className="text-gray-600 dark:text-slate-400 mb-2">Describe the context. What problem are you trying to solve or what choice are you facing?</p>
              <TextArea name="situation" value={localDecision.situation} onChange={handleInputChange} placeholder="e.g., I've received two job offers and need to decide which one to accept." />
            </Section>
            
            <Section title="2. My Choice & Reasoning">
              <p className="text-gray-600 dark:text-slate-400 mb-2">What is your current leading option and why do you believe it's the best one?</p>
              <Input name="choice" value={localDecision.choice} onChange={handleInputChange} placeholder="e.g., Accept the offer from Company A." />
              <TextArea name="reasoning" value={localDecision.reasoning} onChange={handleInputChange} placeholder="e.g., Company A offers a higher salary and seems to have better work-life balance, based on my interviews." className="mt-2" />
            </Section>

            <Section title="3. AI Assistant">
              <AIAssistant decision={localDecision} onUpdateAI={handleUpdateAIAssistantData} />
            </section>

            <Section title="4. Expected Outcome">
              <p className="text-gray-600 dark:text-slate-400 mb-2">What do you predict will happen as a result of your choice? Be specific.</p>
              <TextArea name="expectedOutcome" value={localDecision.expectedOutcome} onChange={handleInputChange} placeholder="e.g., Within 6 months, I expect to be proficient in the new role and feel challenged but not overwhelmed. I also expect my financial situation to improve." />
            </Section>

            {localDecision.status === DecisionStatus.REVIEWED && (
              <>
                  <div className="my-10 border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
                  <Section title="5. Actual Outcome">
                      <p className="text-gray-600 dark:text-slate-400 mb-2">After some time has passed, what actually happened? Compare it to your expectation.</p>
                      <TextArea name="actualOutcome" value={localDecision.actualOutcome} onChange={handleInputChange} placeholder="e.g., The work-life balance was not as good as I hoped, and the salary increase was offset by a longer commute. However, I learned a new valuable skill." />
                  </Section>
                  <Section title="6. Reflections & Learnings">
                      <p className="text-gray-600 dark:text-slate-400 mb-2">What did you learn from this decision? What would you do differently next time? What biases might have been at play?</p>
                      <TextArea name="reflections" value={localDecision.reflections} onChange={handleInputChange} placeholder="e.g., I learned that I should have asked more specific questions about on-call duties. I may have been influenced by confirmation bias, only focusing on the positive aspects I heard." />
                  </Section>
              </>
            )}
          </div>
        ) : (
          <DecisionSummary decision={localDecision} />
        )}
      </div>
    </>
  );
};

// Simple debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
}