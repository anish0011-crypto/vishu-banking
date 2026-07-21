import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar - Corporate Style */}
      <div className="bg-corporate-900 text-gray-300 text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, UP – 232326
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              contact@vishwajeetbanking.com
            </span>
            <span className="flex items-center font-bold text-white">
              <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              +91 98765 43210
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-primary/30">
                <span className="text-white font-heading font-bold text-xl leading-none">V</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-corporate-900 leading-tight">
                Vishwajeet <br className="hidden sm:block md:hidden"/><span className="text-primary font-medium">Banking Point</span>
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About Us', 'Services', 'Testimonials', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.split(' ')[0].toLowerCase())} 
                  className="text-gray-600 hover:text-primary font-semibold text-sm transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => navigate('/admin/login')}
                className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary-light hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Admin Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-corporate-900 focus:outline-none p-2"
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
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 py-6 space-y-2">
              {['Home', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary font-semibold rounded-md transition-all"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => { navigate('/admin/login'); setIsOpen(false); }}
                className="w-full mt-4 bg-primary text-white px-6 py-3 rounded-md font-bold shadow-md"
              >
                Admin Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;