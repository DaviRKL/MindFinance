'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Finance {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

interface FinanceFormProps {
  finance?: Finance;
  onSuccess: () => void;
}

const FinanceForm: React.FC<FinanceFormProps> = ({ finance, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    if (finance) {
      setDescription(finance.description);
      setAmount(finance.amount);
      setType(finance.type);
    }
  }, [finance]);

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken);
    }
    
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }


    try {
      if (finance) {
        await axios.put(
          `http://localhost:3000/finances/${finance.id}`,
          { description, amount, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:3000/finances',
          { description, amount, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Falha ao enviar os dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Descrição</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Valor</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
          className="w-full p-2 border rounded"
          required
        >
          <option value="INCOME">Renda</option>
          <option value="EXPENSE">Despesa</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {finance ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default FinanceForm;
