import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const stats = [
    { num: '5000+', text: 'Happy Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { num: '10+', text: 'Team Members', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { num: '7+', text: 'Years Experience', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { num: '20+', text: 'Banking Services', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { num: '500+', text: 'Retail Partners', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { num: '24x7', text: 'Customer Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
  ];

  const services = [
    { id: 1, title: 'Airtel Payments Bank', desc: 'AEPS, Account opening, Mini Branch, Fast Tag, Insurance, Atal Pension Yojna,... etc.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 2, title: 'RapiPay Fintech', desc: 'AEPS, Micro ATM Services, Insurance, Retailer ID,... etc.', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4' },
    { id: 3, title: 'Google Pay Business', desc: 'BDE (Business Development Executive), Freelancer,... etc.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 4, title: 'PhonePe Business', desc: 'Freelancer, Merchant Onboarding, Deploy Soundbox, QR Service,... etc.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { id: 5, title: 'Computer Services', desc: 'Windows installation, Antivirus, Software and Hardware upgrade,... etc.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 6, title: 'Jio Digital Life', desc: 'Retailer ID available, Jio SIM service available,... etc.', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
  ];

  const team = [
    { id: 1, name: 'Shashi Prakash Singh', role: 'Team Leader', exp: '5+ years Experience', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop' },
    { id: 2, name: 'Vivekanand', role: 'Team Leader', exp: '6+ years Experience', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
    { id: 3, name: 'Rajat Raj', role: 'Digital Marketing', exp: '5+ years Experience', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop' },
    { id: 4, name: 'Ramu Verma', role: 'Promoter', exp: '5+ years Experience', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
  ];

  return (
    <div className="w-full bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-4">Hello, Welcome to</h2>
            <h1 className="text-5xl sm:text-6xl font-heading font-extrabold text-blue-900 dark:text-white mb-6 leading-tight">
              Vishwajeet <br/> Banking Point
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-lg">
              We provide all types of banking services and work opportunities in marketing. We also hire trainees and freelancers.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:9506562637" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold shadow-lg transition-colors flex items-center">
                📞 Call Now
              </a>
              <a href="https://wa.me/919506562637" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-bold shadow-lg transition-colors flex items-center">
                💬 WhatsApp
              </a>
              <button onClick={() => navigate('/career')} className="bg-white dark:bg-dark-surface text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-8 py-3 rounded-md font-bold shadow-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                📄 Apply Now
              </button>
            </div>
          </div>

          <div className="relative z-10 lg:justify-self-end mt-12 lg:mt-0">
             {/* Abstract background behind card */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
             
             {/* Company Profile Card */}
             <div className="bg-blue-900 dark:bg-slate-800 text-white p-8 rounded-2xl shadow-xl max-w-sm card-hover">
                <p className="text-sm text-blue-300 font-semibold mb-2 uppercase tracking-wide">Company Profile</p>
                <h3 className="text-2xl font-heading font-bold mb-4">Vishwajeet Banking Point</h3>
                <div className="space-y-3 text-sm text-gray-200">
                  <p className="flex items-center gap-2">📞 9506562637</p>
                  <p className="flex items-center gap-2">✉️ vishwajeetbankingpoint@gmail.com</p>
                  <p className="border-b border-blue-700 pb-3">GST Number: 09EMHPR1060Q1ZD</p>
                  <ul className="pt-2 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Manager @ Airtel Payments Bank</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Business Development @ Google Pay</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Distributor @ RapiPay Fintech</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Distributor @ ReliPay</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Distributor @ PhonePe Business</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white dark:bg-dark-surface border-y border-gray-100 dark:border-dark-border py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center sm:justify-between items-center gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 w-40 sm:w-auto">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
              <div>
                <div className="font-extrabold text-xl text-gray-900 dark:text-white">{stat.num}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-dark-bg text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Services</p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-12">What do we offer ?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map(s => (
            <div key={s.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-8 rounded-xl card-hover flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{s.desc}</p>
              <button onClick={() => navigate(`/services/${s.id}`)} className="text-red-500 font-medium border border-red-500 px-6 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Know more</button>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/services')} className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold shadow hover:bg-blue-700 transition-colors">
          View All Services
        </button>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Our Team</p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-12">A family of 10+ members</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(t => (
            <div key={t.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-6 rounded-xl card-hover">
              <img src={t.img} alt={t.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-50 dark:border-dark-bg" />
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t.exp}</p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">{t.role}</p>
              <button onClick={() => navigate(`/team/${t.id}`)} className="text-blue-600 font-medium border border-blue-600 px-6 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm">Know more</button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
           <button onClick={() => navigate('/team')} className="text-gray-500 font-bold hover:text-blue-600 dark:hover:text-white flex items-center">View full team &rarr;</button>
        </div>
      </section>

      {/* Career Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-xl card-hover">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <div>
              <p className="text-blue-200 font-medium uppercase tracking-wide text-sm mb-1">We are Hiring</p>
              <h2 className="text-3xl font-heading font-bold mb-2">Join our team</h2>
              <p className="text-blue-100 max-w-lg">Apply for BDE (Business Development Executive), Freelancer, Promoter.</p>
            </div>
          </div>
          <button onClick={() => navigate('/career')} className="bg-white text-blue-600 px-8 py-3 rounded font-bold shadow flex items-center hover:bg-gray-100 transition-colors whitespace-nowrap">
            Apply Now &rarr;
          </button>
        </div>
      </section>
      
    </div>
  );
}

export default Home;