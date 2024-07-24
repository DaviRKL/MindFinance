import React from 'react';
import { FaUserCircle, FaSignOutAlt, FaChartLine } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const handleProfileClick = () => {
    console.log('Perfil clicado');
  };

  const handleLogoutClick = () => {
    console.log('Logout clicado');
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
    </nav>
  );
};

export default Navbar;
