import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      <div className="bg-primary text-white py-2 px-4 text-xs font-medium tracking-wide hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, UP – 232326
            </span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              contact@vishwajeetbanking.com
            </span>
            <span className="flex items-center gap-2 font-mono">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 98765 43210
            </span>
          </div>
        </div>
      </div>
      
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 
              className="text-2xl font-extrabold tracking-tight cursor-pointer flex items-center gap-2" 
              onClick={() => scrollToSection('home')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-mono leading-none">V</span>
              </div>
              Vishwajeet<span className="text-primary">.</span>
            </h1>
            
            <div className="hidden md:flex items-center gap-1 bg-surface-light/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="text-sm font-medium text-gray-300 hover:text-white px-5 py-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex">
              <button 
                onClick={() => navigate('/admin/login')}
                className="bg-white text-background px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Admin Panel
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-white/10 shadow-2xl">
            <div className="px-4 py-6 flex flex-col gap-2">
              <div className="mb-4 pb-4 border-b border-white/10 text-xs text-gray-400">
                <p className="mb-2">📍 Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, UP – 232326</p>
                <p>📞 +91 98765 43210</p>
              </div>
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left px-4 py-3 text-white font-medium rounded-xl hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => { navigate('/admin/login'); setIsOpen(false); }}
                className="mt-4 bg-primary text-white px-4 py-3 rounded-xl font-bold"
              >
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;