
import React from 'react';
import type { DecisionTemplate } from '../types';
import { templates } from '../templates';
import { XIcon } from './icons/XIcon';

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: DecisionTemplate) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  const handleSelect = (template: DecisionTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-500/50 dark:bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Decision Template Library</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <XIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 space-y-6">
          {Object.entries(templates).map(([category, templateList]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templateList.map((template) => (
                  <button 
                    key={template.title}
                    onClick={() => handleSelect(template)}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left hover:bg-gray-200/70 dark:hover:bg-gray-700/70 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-200"
                  >
                    <h4 className="font-semibold text-gray-800 dark:text-slate-200">{template.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">{template.situation}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};