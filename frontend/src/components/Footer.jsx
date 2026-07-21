import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading text-xl font-bold">V</span>
              </div>
              <h3 className="text-xl font-heading font-bold">Vishwajeet Banking Point</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the community with seamless digital banking, secure transactions, and robust government services in Ghazipur.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/about')} className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</button></li>
              <li><button onClick={() => navigate('/services')} className="text-gray-400 hover:text-primary transition-colors text-sm">Services</button></li>
              <li><button onClick={() => navigate('/team')} className="text-gray-400 hover:text-primary transition-colors text-sm">Our Team</button></li>
              <li><button onClick={() => navigate('/career')} className="text-gray-400 hover:text-primary transition-colors text-sm">Career</button></li>
              <li><button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Airtel Payments Bank</li>
              <li>RapiPay Fintech</li>
              <li>Google Pay Business</li>
              <li>PhonePe Business</li>
              <li>Computer Services</li>
              <li>Jio Digital Life</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Location</h4>
            <p className="text-gray-400 text-sm mb-4">
              Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326
            </p>
            <p className="text-gray-400 text-sm mb-2">📞 9506562637</p>
            <p className="text-gray-400 text-sm">✉️ vishwajeetbankingpoint@gmail.com</p>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vishwajeet Banking Point Private Limited.
          </p>
          <div className="flex justify-center space-x-6">
            <button onClick={() => navigate('/admin/login')} className="text-gray-500 hover:text-white text-sm">Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;