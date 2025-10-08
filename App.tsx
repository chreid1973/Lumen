
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { DecisionEditor } from './components/DecisionEditor';
import type { Decision } from './types';
import { DecisionStatus } from './types';
import { LumenLogo } from './components/icons/LumenLogo';

const App: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>(() => {
    try {
      const savedDecisions = localStorage.getItem('lumen-decisions');
      return savedDecisions ? JSON.parse(savedDecisions) : [];
    } catch (error) {
      console.error("Failed to parse decisions from localStorage", error);
      return [];
    }
  });
  
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('lumen-decisions', JSON.stringify(decisions));
    } catch (error) {
      console.error("Failed to save decisions to localStorage", error);
    }
  }, [decisions]);

  const handleNewDecision = () => {
    const newDecision: Decision = {
      id: `decision-${Date.now()}`,
      title: 'Untitled Decision',
      situation: '',
      choice: '',
      reasoning: '',
      expectedOutcome: '',
      actualOutcome: '',
      reflections: '',
      status: DecisionStatus.PENDING,
      createdAt: new Date().toISOString(),
    };
    setDecisions(prev => [newDecision, ...prev]);
    setSelectedDecisionId(newDecision.id);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const handleUpdateDecision = (updatedDecision: Decision) => {
    setDecisions(prev => prev.map(d => d.id === updatedDecision.id ? updatedDecision : d));
  };
  
  const handleDeleteDecision = useCallback(() => {
    // Use functional updates to get the latest state without creating dependencies.
    // This is a robust pattern that prevents bugs from stale closures.
    setSelectedDecisionId(currentSelectedId => {
      if (!currentSelectedId) {
        // This case should not be reached if the delete button is only shown
        // when a decision is selected, but it's a safe guard.
        return null;
      }
      
      if (window.confirm("Are you sure you want to permanently delete this decision?")) {
        setDecisions(prevDecisions => 
          prevDecisions.filter(d => d.id !== currentSelectedId)
        );
        // After deletion, we want to have no decision selected.
        return null;
      }
      
      // If user cancels the confirmation, the selected ID remains unchanged.
      return currentSelectedId;
    });
  }, []); // No dependencies are needed, so this function is stable and created only once.
  
  const handleSelectDecision = (id: string) => {
    setSelectedDecisionId(id);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }

  const selectedDecision = decisions.find(d => d.id === selectedDecisionId) || null;

  return (
    <div className="flex h-screen font-sans antialiased text-gray-800 dark:text-slate-300 bg-white dark:bg-black overflow-hidden">
       {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
        ></div>
      )}
      <Sidebar
        decisions={decisions}
        selectedDecisionId={selectedDecisionId}
        onSelectDecision={handleSelectDecision}
        onNewDecision={handleNewDecision}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/90">
        {selectedDecision ? (
          <DecisionEditor 
            key={selectedDecision.id} 
            decision={selectedDecision} 
            onUpdate={handleUpdateDecision}
            onDelete={handleDeleteDecision}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white dark:bg-black">
            <LumenLogo className="w-full max-w-md h-auto mb-4" />
            <p className="mt-3 text-lg text-gray-600 dark:text-slate-400 max-w-md">
             Illuminate your decisions.
            </p>
            <button
              onClick={handleNewDecision}
              className="mt-8 px-8 py-3 text-gray-800 dark:text-white font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500/50 dark:focus:ring-gray-700/50 transition-all duration-300"
            >
              Log Your First Decision
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;