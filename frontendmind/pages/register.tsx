import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Navbar user={null}/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h1>
          <RegisterForm />
        </div>
      </div>
      <Footer/>
    </>
    
  );
};

export default RegisterPage;
