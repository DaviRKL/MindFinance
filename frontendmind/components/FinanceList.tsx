import React from 'react'; // Importa React do React

interface Finance {
    id: number;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
}

interface FinanceListProps {
  finances: Finance[]; // Array de finanças a ser exibido
  onEdit: (finance: Finance) => void; // Função a ser chamada ao clicar em editar
  onDelete: (id: number) => void; // Função a ser chamada ao clicar em deletar
}

const FinanceList: React.FC<FinanceListProps> = ({ finances, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Historico de finanças</h2>
      {finances.map((finance) => (
        <div key={finance.id} className="flex justify-between items-center mb-2">
          <div>
            <p className="text-gray-700">{finance.description}</p>
            <p className="text-gray-500">${finance.amount}</p>
            <p className="text-gray-500">{finance.type}</p>
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

export default FinanceList; // Exporta o componente para uso em outras partes da aplicação
