const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-mono text-xl leading-none">V</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Vishwajeet Banking Point
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Your premier destination for trusted digital banking, financial solutions, and government services in Ghazipur. Fast, secure, and always reliable.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-sm">Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm font-mono">contact@vishwajeetbanking.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm font-mono">+91 98765 43210</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-8">
            <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-lg font-bold mb-6 text-white">Top Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Aadhaar & PAN Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">AEPS & Money Transfer</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Bill Payments & Insurance</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Online Form Filling</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vishwajeet Banking Point. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;