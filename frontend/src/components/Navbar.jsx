import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Team', path: '/team' },
    { name: 'Career', path: '/career' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 text-xs py-2 px-4 hidden md:block border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              📍 Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, UP – 232326
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>✉️ contact@vishwajeetbanking.com</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-soft' : 'bg-white dark:bg-dark-surface'} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-primary/30">
                <span className="text-white font-heading font-bold text-xl">V</span>
              </div>
              <h1 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white leading-tight">
                Vishwajeet <br/><span className="text-primary font-medium">Banking Point</span>
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`font-semibold text-sm transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {isDark ? '☀️' : '🌙'}
              </button>
              <a href="tel:9506562637" className="bg-primary text-white px-5 py-2.5 rounded-md font-semibold text-sm flex items-center shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors">
                📞 9506562637
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300">
                {isDark ? '☀️' : '🌙'}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 dark:text-gray-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border shadow-xl">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => { navigate(link.path); setIsOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-md font-semibold"
                >
                  {link.name}
                </button>
              ))}
              <a href="tel:9506562637" className="block w-full text-center mt-4 bg-primary text-white px-6 py-3 rounded-md font-bold shadow-md">
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;