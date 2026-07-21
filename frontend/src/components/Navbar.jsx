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
    <div className="sticky top-0 z-50 font-sans">
      {/* Topbar */}
      <div className="bg-brand-950 text-brand-100 text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              123 Financial District, Business Park, New Delhi, India 110001
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              contact@vishwajeetbanking.com
            </span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center font-semibold text-accent-900">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              +91 98765 43210
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 
                className="text-xl sm:text-2xl font-heading font-extrabold bg-gradient-to-r from-brand-800 to-brand-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform leading-tight" 
                onClick={() => scrollToSection('home')}
              >
                Vishwajeet Banking
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
              {['Home', 'About', 'Services', 'Team', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="text-gray-700 hover:text-brand-600 font-semibold transition-all duration-300 hover:-translate-y-0.5 px-3 py-2 rounded-lg hover:bg-brand-50"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => navigate('/admin/login')}
                className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-brand-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Admin Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-900 focus:outline-none bg-brand-50 p-2 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <div className="mb-4 pb-4 border-b border-gray-100 text-sm text-gray-600">
                <p className="flex items-start mb-2"><svg className="w-4 h-4 mr-2 mt-0.5 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg> 123 Financial District, Business Park, New Delhi, India 110001</p>
                <p className="flex items-center"><svg className="w-4 h-4 mr-2 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> +91 98765 43210</p>
              </div>
              {['Home', 'About', 'Services', 'Team', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-brand-50 hover:text-brand-600 font-semibold rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => { navigate('/admin/login'); setIsOpen(false); }}
                className="w-full mt-4 bg-brand-600 text-white px-6 py-3 rounded-lg font-bold shadow-md"
              >
                Admin Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
