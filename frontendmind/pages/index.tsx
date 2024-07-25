import type { NextPage } from 'next';
import LoginForm from '../components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Navbar user={null}/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <LoginForm />
        </div>
      </div>
      <Footer/>
    </>

  );
};

export default Home;
