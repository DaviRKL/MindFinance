import React, { useMemo, useState } from 'react'; 

interface Finance {
    id: number;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    category: string;
}

interface FinanceListProps {
  finances: Finance[];
  onEdit: (finance: Finance) => void; 
  onDelete: (id: number) => void; 
} 

const FinanceList: React.FC<FinanceListProps> = ({ finances, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const filtered_finances = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return  finances.filter((finance) =>
     finance.category.toLowerCase().includes(lowerSearch)
     );
  }, [search]);
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Historico de finanças</h2>
      
      {filtered_finances.map((finance) => (
        
        <div key={finance.id} className="flex justify-between items-center mb-2">
          <div>
              <input
              type='text'
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}/>
          </div>
          <div>
            <p className="text-gray-700">{finance.description}</p>
            <p className="text-gray-500">${finance.amount}</p>
            <p className="text-gray-500">{finance.category}</p>
          </div>
          <div>
            <button onClick={() => onEdit(finance)} className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded-md">
              Edit
            </button>
            <button onClick={() => onDelete(finance.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceList; 