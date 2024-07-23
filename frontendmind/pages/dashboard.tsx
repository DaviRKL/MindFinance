'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FinanceForm from '../components/FinanceForm';
import DashboardChart from '@/components/DashboardChart';

interface Finance {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

const Dashboard: React.FC = () => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [selectedFinance, setSelectedFinance] = useState<Finance | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken);
    }
    
  }, []);
  
  useEffect(() => {
    const fetchFinances = async () => {
      const response = await axios.get('http://localhost:3000/finances', { headers: { Authorization: `Bearer ${token}` } });
      setFinances(response.data);
    };
    fetchFinances();
  }, []);

  const handleSuccess = () => {
    setSelectedFinance(undefined); // Limpa o formulário após sucesso
    fetchFinances();
  };

  const fetchFinances = async () => {
    const response = await axios.get('http://localhost:3000/finances', { headers: { Authorization: `Bearer ${token}` } } );
    setFinances(response.data);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Bem vindo de volta, Marcos Lopes!</h1>
      <p className="mb-4">Seu último acesso foi em 22 de janeiro</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-green-500 text-3xl font-bold">250.00</p>
          <p className="text-gray-700">Receitas</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-red-500 text-3xl font-bold">250.00</p>
          <p className="text-gray-700">Despesas</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md text-center">
          <p className="text-blue-500 text-3xl font-bold">250.00</p>
          <p className="text-gray-700">Balanço</p>
        </div>
      </div>

      
        <DashboardChart />
        {/* <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Em aberto</h2>
          <p className="text-gray-700">Casa: 250.00</p>
        </div> */}
      
    </div>
      <FinanceForm finance={selectedFinance} onSuccess={handleSuccess} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance) => (
            <tr key={finance.id}>
              <td className="border px-4 py-2">{finance.description}</td>
              <td className="border px-4 py-2">{finance.amount}</td>
              <td className="border px-4 py-2">{finance.type}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => setSelectedFinance(finance)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    await axios.delete(`http://localhost:3000/finances/${finance.id}`, { headers: { Authorization: `Bearer ${token}` } });
                    fetchFinances();
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

