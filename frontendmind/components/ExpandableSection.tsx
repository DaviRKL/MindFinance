import React, { useState } from 'react';
import FinanceForm from './FinanceForm';
import { useEffect } from 'react';

interface Finance {
    id: number;
    description: string;
    amount: number;
    createdAt: string;
    type: "INCOME" | "EXPENSE";
    category: string;
  }
  
interface ExpandableSectionProps {
    selectedFinance: Finance | undefined;
    onSuccess: () => void;
    onEdit: (finance: Finance) => void;
    onClose: () => void;
  }
  

  const ExpandableSection: React.FC<ExpandableSectionProps> = ({ selectedFinance, onSuccess, onEdit, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedFinance) {
          setIsOpen(true);
        }
      }, [selectedFinance]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 mt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        <span className="font-semibold">{isOpen ? 'Cancelar' : 'Adicionar uma transação'}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4">
          <FinanceForm
            finance={selectedFinance}
            onSuccess={() => {
              onSuccess();
              setIsOpen(false);
              onClose();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
