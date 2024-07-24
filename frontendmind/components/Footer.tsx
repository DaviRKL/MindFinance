import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white py-4 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://www.linkedin.com/in/davi-ryan-konuma-lima-62b00221b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/DaviRKL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaGithub size={24} />
              </a>
            </li>
            <li>
              <a
                href="mailto:davirkl07@gmail.com"
                className="text-white hover:text-gray-300"
              >
                <FaEnvelope size={24} />
              </a>
            </li>
          </ul>
        </div>
        <p className="text-center">&copy; 2024 Davi Ryan Konuma Lima</p>
      </div>
    </footer>
  );
};

export default Footer;
