import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform" 
              onClick={() => scrollToSection('home')}
            >
              Vishwajeet Banking
            </h1>
          </div>
          
          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              Contact
            </button>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => navigate('/admin/login')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Admin Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              Contact
            </button>
            <button 
              onClick={() => { navigate('/admin/login'); setIsOpen(false); }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-md"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
