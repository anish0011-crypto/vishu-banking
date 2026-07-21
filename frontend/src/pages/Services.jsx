import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  // We can duplicate the services array from Home.jsx or fetch it. For now, duplication.
  const services = [
    { id: 1, title: 'Airtel Payments Bank', desc: 'AEPS, Account opening, Mini Branch, Fast Tag, Insurance, Atal Pension Yojna,... etc.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 2, title: 'RapiPay Fintech', desc: 'AEPS, Micro ATM Services, Insurance, Retailer ID,... etc.', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571' },
    { id: 3, title: 'Google Pay Business', desc: 'BDE (Business Development Executive), Freelancer,... etc.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 4, title: 'PhonePe Business', desc: 'Freelancer, Merchant Onboarding, Deploy Soundbox, QR Service,... etc.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { id: 5, title: 'Computer Services', desc: 'Windows installation, Antivirus, Software and Hardware upgrade,... etc.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 6, title: 'Jio Digital Life', desc: 'Retailer ID available, Jio SIM service available,... etc.', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0' },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-fade-in text-center">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-12">All Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => (
          <div key={s.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-8 rounded-xl card-hover flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{s.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{s.desc}</p>
            <button onClick={() => navigate(`/services/${s.id}`)} className="text-blue-600 font-medium border border-blue-600 px-6 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors w-full">Know more</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Services;