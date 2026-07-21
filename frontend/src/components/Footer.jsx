
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-1 pr-4">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-brand-300 to-brand-100 bg-clip-text text-transparent">
              Vishwajeet Banking
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
              Your trusted banking partner since 2023. We provide a wide range of banking and financial services.
            </p>
            <div className="space-y-3">
              <p className="flex items-start text-gray-300 text-sm">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                123 Financial District, Business Park, New Delhi, India 110001
              </p>
              <p className="flex items-center text-gray-300 text-sm">
                <svg className="w-5 h-5 mr-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                contact@vishwajeetbanking.com
              </p>
              <p className="flex items-center text-gray-300 text-sm">
                <svg className="w-5 h-5 mr-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                +91 98765 43210
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Services</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">AEPS</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Money Transfer</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Account Opening</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Insurance</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Fastag</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-300 transition-colors text-xs sm:text-sm">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Vishwajeet Banking Point Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
