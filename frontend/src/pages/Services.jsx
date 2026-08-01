import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: 'Airtel Payments Bank',
      icon: '🏦',
      color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      desc: 'As an authorized Manager for Airtel Payments Bank (on behalf of RBI), we offer full-suite banking.',
      features: ['Account opening', 'AEPS (Aadhaar Enabled Payment System)', 'Mini Branch Setup', 'Fast Tag Recharge', 'Insurance Packages', 'Atal Pension Yojna']
    },
    {
      id: 2,
      title: 'RapiPay Fintech',
      icon: '💸',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      desc: 'Partnered as a Distributor with RapiPay Fintech Pvt. Ltd. to bring comprehensive retail banking.',
      features: ['AEPS Cash Withdrawals', 'Micro ATM Services', 'Money Transfer', 'Retailer ID Generation', 'Life & Health Insurance']
    },
    {
      id: 3,
      title: 'GooglePay Business',
      icon: '📱',
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      desc: 'Enhance your business reach with our Google Pay Business onboarding and support services.',
      features: ['Merchant Onboarding', 'BDE (Business Development Executive) Hiring', 'Freelancer Opportunities', 'QR Code Setup', 'Troubleshooting']
    },
    {
      id: 4,
      title: 'PhonePe Business',
      icon: '🔊',
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      desc: 'Official distributor providing complete merchant payment setups for businesses of all sizes.',
      features: ['Merchant Onboarding', 'Deploy Soundbox', 'QR Service Setup', 'Freelancer Hiring', 'Payment Gateway Integration']
    },
    {
      id: 5,
      title: 'Reli Pay Services',
      icon: '💳',
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      desc: 'Distributor for ReliPay Fintech providing robust banking and identity services.',
      features: ['AEPS & Micro ATM', 'Insurance Products', 'Retailer ID Creation', 'PAN Card Services', 'Utility Bill Payments']
    },
    {
      id: 6,
      title: 'Jio Digital Life',
      icon: '📶',
      color: 'bg-blue-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
      desc: 'Your one-stop destination for Reliance Jio digital and telecom services.',
      features: ['Jio SIM Service', 'Retailer ID Available', 'Mobile Recharges', 'Jio Fiber Queries', 'Device Sales & Support']
    },
    {
      id: 7,
      title: 'Computer Services',
      icon: '💻',
      color: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      desc: 'Expert technical support and computer maintenance services for individuals and businesses.',
      features: ['Windows Installation', 'Antivirus Setup', 'Software Upgrades', 'Hardware Upgrades', 'System Troubleshooting']
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-dark-bg transition-colors duration-300 min-h-screen">
      {/* Page Header */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/payments.png" alt="Digital Payments" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>
        </div>
        <div className="relative py-24 px-4 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">Our Services</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              We offer all types of banking services, technical support, and work opportunities in marketing. We also hire trainees and freelancers.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-soft border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-3">Key Features</h4>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;