import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Importa o componente Link do Next.js

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/users/login", {
                email, password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                document.cookie = `token=${response.data.token}; path=/; max-age=3600`;
                router.push("/dashboard");
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login. Verifique suas credenciais.');
        }
    };
    
  

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Email:</label>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type='submit' 
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                Login
            </button>
            <div className='text-center mt-4'>
                <p className='text-sm text-gray-600'>
                    Não tem uma conta?{' '}
                    <Link href='/register'>
                        <a className='font-medium text-blue-600 hover:text-blue-500'>
                            Registre-se
                        </a>
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
