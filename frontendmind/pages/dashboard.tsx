import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import FinanceForm from '../components/FinanceForm';
import DashboardChart from '@/components/DashboardChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpandableSection from '@/components/ExpandableSection';
import { toast } from 'react-toastify';

interface Finance {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
  type: "INCOME" | "EXPENSE";
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [selectedFinance, setSelectedFinance] = useState<Finance | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken);
    }

  }, []);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar perfil:', error);
        });
    }
  }, [token]);

  const fetchFinances = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:3000/finances', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFinances(response.data);
      } catch (error) {
        console.error('Erro ao buscar finanças:', error);
      }
    }
  };
  useEffect(() => {
    fetchFinances();
  }, [token]);



  const handleSuccess = () => {
    setSelectedFinance(undefined);
    fetchFinances();
  };

  const totalIncome = finances
    .filter(finance => finance.type === "INCOME")
    .reduce((acc, finance) => acc + finance.amount, 0);

  const totalExpenses = finances
    .filter(finance => finance.type === "EXPENSE")
    .reduce((acc, finance) => acc + finance.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleEdit = (finance: Finance) => {
    setSelectedFinance(finance);
    toast.info('Edite a transação no formulário acima!')
  };

  const handleClose = () => {
    setSelectedFinance(undefined);
  };

  const handleSaveChanges = async (updatedUser: { name?: string; email?: string; password?: string; photo?: File }) => {
    const formData = new FormData();
    if (updatedUser.name) formData.append('name', updatedUser.name);
    if (updatedUser.email) formData.append('email', updatedUser.email);
    if (updatedUser.password) formData.append('password', updatedUser.password);
    if (updatedUser.photo) formData.append('photo', updatedUser.photo);

    try {
      const response = await axios.put(
        `http://localhost:3000/users/editProfile/${user?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Perfil atualizado com sucesso');
      setUser(response.data);
    } catch (error) {
      toast.error('Erro ao atualizar o perfil');
      console.error('Erro ao atualizar o perfil:', error);
    }
  };


  const filtered_finances = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return finances.filter((finance) =>
      finance.category.toLowerCase().includes(lowerSearch)
    );
  }, [search, finances]);

  return (
    <>
      <Navbar user={user} onSaveChanges={handleSaveChanges} />
      <div className="container mx-auto">

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Bem vindo de volta, {user?.name}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-green-500 text-3xl font-bold">{totalIncome.toFixed(2)}</p>
              <p className="text-gray-700">Rendas</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md text-center">
              <p className="text-red-500 text-3xl font-bold">{totalExpenses.toFixed(2)}</p>
              <p className="text-gray-700">Despesas</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md text-center">
              <p className={`text-blue-500 text-3xl font-bold ${balance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {balance.toFixed(2)}
              </p>
              <p className="text-gray-700">Balanço</p>
            </div>
          </div>

          <div className='mb-4'>
            <h2>Filtre suas finanças por categoria!</h2>
            <input
              type='text'
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Exemplo: Alimentacao'
            />
          </div>

          <DashboardChart finances={filtered_finances} />

          <ExpandableSection
          selectedFinance={selectedFinance}
          onSuccess={handleSuccess}
          onEdit={handleEdit}
          onClose={handleClose}
        />
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Descrição</th>
                <th className="px-4 py-2">Categoria</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered_finances.map((finance) => (
                <tr key={finance.id}>
                  <td className="border px-4 py-2">{finance.description}</td>
                  <td className="border px-4 py-2">{finance.category}</td>
                  <td className="border px-4 py-2">${finance.amount}</td>
                  <td className="border px-4 py-2">
                    {finance.type === "EXPENSE" ? "Despesa" : "Renda"}
                  </td>
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
                        toast.success('Transação excluida com sucesso!')
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
        </div>
        

      </div>
      <Footer />
    </>

  );
};

export default Dashboard;


