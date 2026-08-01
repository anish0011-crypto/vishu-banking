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
    { name: 'Services', path: '/services' },
    { name: 'Career', path: '/career' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <style>{`
        .nav-pattern-bg {
          background-color: #1a1a1a;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .nav-link-custom {
          color: #38bdf8; /* sky-400 */
          font-weight: 300;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
        }
        .nav-link-custom:hover {
          color: #7dd3fc;
        }
      `}</style>
      
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
      <nav className={`sticky top-0 z-50 transition-all duration-300 nav-pattern-bg shadow-xl py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-sky-500/30">
                <span className="text-white font-heading font-bold text-xl">V</span>
              </div>
              <h1 className="text-xl font-heading font-extrabold text-white leading-tight">
                Vishwajeet <br/><span className="text-sky-400 font-medium">Banking Point</span>
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`text-lg nav-link-custom transition-colors ${location.pathname === link.path ? 'text-sky-300' : ''}`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate('/admin/login')} className="bg-sky-500 text-white px-5 py-2.5 rounded-md font-semibold text-sm flex items-center shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition-colors">
                Admin Login
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-sky-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Matching Photo Exactly */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full nav-pattern-bg shadow-2xl border-t border-gray-800 border-dashed">
            <div className="px-6 py-4 flex flex-col">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => { navigate(link.path); setIsOpen(false); }}
                  className={`text-left py-4 text-xl nav-link-custom ${index !== navLinks.length - 1 ? 'border-b border-dashed border-gray-700/50' : ''}`}
                >
                  {link.name}
                </button>
              ))}
              <button onClick={() => { navigate('/admin/login'); setIsOpen(false); }} className="block w-full text-center mt-6 bg-sky-500 text-white px-6 py-3 rounded-md font-bold shadow-md">
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