
import React from 'react';

const FloatingButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
      <button 
        onClick={() => window.open('tel:+919506562637', '_blank')}
        className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-all hover:scale-110"
        title="Call Us"
      >
        <span className="text-2xl">📞</span>
      </button>
      <button 
        onClick={() => window.open('https://wa.me/919506562637', '_blank')}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#20b858] transition-all hover:scale-110"
        title="WhatsApp Us"
      >
        <span className="text-2xl">💬</span>
      </button>
      <button 
        onClick={scrollToTop}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110"
        title="Back to Top"
      >
        <span className="text-2xl">↑</span>
      </button>
    </div>
  );
};

export default FloatingButtons;
