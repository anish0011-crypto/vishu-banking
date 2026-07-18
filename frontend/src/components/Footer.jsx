
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vishwajeet Banking
            </h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Your trusted banking partner since 2023. We provide a wide range of banking and financial services.
            </p>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Services</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">AEPS</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Money Transfer</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Account Opening</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Insurance</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Fastag</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">Disclaimer</a></li>
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
