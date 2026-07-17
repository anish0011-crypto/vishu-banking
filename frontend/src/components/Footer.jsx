
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vishwajeet Banking
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted banking partner since 2023. We provide a wide range of banking and financial services.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-blue-400 transition-colors">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">AEPS</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Money Transfer</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Account Opening</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Insurance</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Fastag</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Disclaimer</a></li>
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
