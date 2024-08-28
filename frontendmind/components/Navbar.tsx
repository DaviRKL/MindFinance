import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Modal from './Modal';
import ConfirmationModal from './ConfirmationModal';

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
  onSaveChanges?: (updatedUser: { name: string; email: string; password?: string; photo?: File }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSaveChanges }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLogoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (user?.photo) {
      setPhotoUrl(`data:image/jpeg;base64,${user.photo}`);
    }
  }, [user?.photo]);

  useEffect(() => {
    if (isModalOpen && user) {
      setName(user.name);
      setEmail(user.email);
      setPhotoUrl(user.photo ? `data:image/jpeg;base64,${user.photo}` : undefined);
    }
  }, [isModalOpen, user]);

  const handleProfileClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveChangesInternal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user && onSaveChanges) {
      await onSaveChanges({ name, email, password, photo });
    }
    handleCloseModal();
  };

  const handleLogoutClick = () => setLogoutConfirmOpen(true);
  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/');
    setLogoutConfirmOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target.files?.[0]);
  };

  return (
    <nav className="bg-gradient-to-b from-blue-800 to-blue-300 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold flex items-center  justify-center flex-grow">
       <span> FinancesController</span>
      </div>
      {token && (
        <>
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
                <form onSubmit={handleSaveChangesInternal}>
                  <div className="relative max-w-3xl max-h-screen overflow-hidden">
                    <div className="relative max-w-full max-h-full overflow-auto">
                      <div className="flex flex-col items-center mb-4">
                        <img
                          src={photoUrl}
                          alt="Perfil"
                          className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <input
                          type="file"
                          className="mb-4"
                          onChange={handleFileChange}
                        />
                        <label className="block text-gray-700">Nome</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Senha</label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Digite sua nova senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Modal>
          <ConfirmationModal
            isOpen={isLogoutConfirmOpen}
            onClose={() => setLogoutConfirmOpen(false)}
            onConfirm={handleConfirmLogout}
            message="Você realmente deseja sair?"
          />
        </>
      )}
      
      {/* <div className="w-20"></div> */}
    </nav>
  );
};

export default Navbar;
