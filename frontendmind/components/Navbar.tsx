import React from 'react';
import { FaUserCircle, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from './Modal'; 

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({user}) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Lógica para salvar alterações do perfil
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/')
  };

  return (
    <nav style={{ background: 'linear-gradient(to bottom,  #0033cc 0%, #66a3ff 100%)' }} className=" p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold flex items-center">
       <FaChartLine size={26}/><span> FinancesControll</span> 
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleProfileClick}
          className="text-white flex items-center space-x-2 hover:text-gray-200"
        >
          <FaUserCircle size={24} />
          <span>Perfil</span>
        </button>
        <button
          onClick={handleLogoutClick}
          className="text-white flex items-center space-x-2 hover:text-gray-200"
        >
          <FaSignOutAlt size={24} />
          <span>Sair</span>
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className="transition-opacity duration-300 ease-in-out opacity-100">
          <h2 className="text-2xl mb-4">Editar Perfil</h2>
          {user && (
            <form onSubmit={handleSaveChanges}>
              <div className="flex flex-col items-center mb-4">
                <img
                  src={user.photo ?? '/default-profile.png'}
                  alt="Perfil"
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={user.name}
                  onChange={(e) => { user.name = e.target.value; }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={user.email}
                  onChange={(e) => { user.email = e.target.value; }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite sua nova senha"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
