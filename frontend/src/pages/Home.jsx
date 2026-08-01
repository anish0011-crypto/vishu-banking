import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-36 md:pb-40 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-dark-bg dark:to-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide mb-6">
                VISHWAJEET BANKING POINT
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Digital Banking</span> Services
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl">
                Experience seamless, secure, and instant financial services right in your neighborhood. As an authorized Manager for Airtel Payments Bank (on behalf of RBI), we bring premium banking facilities to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/services')} className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-transform transform hover:-translate-y-1">
                  Explore Services
                </button>
                <button onClick={() => navigate('/contact')} className="px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Contact Us
                </button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> RBI Authorized</div>
                <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> 24/7 Support</div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                <img src="/images/hero.png" alt="Digital Banking" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Secure. Fast. Reliable.</h3>
                  <p className="text-blue-100">Experience the future of localized digital banking today.</p>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xl">🛡️</div>
                <div>
                  <div className="text-xs text-gray-500">Protection</div>
                  <div className="font-bold text-gray-900 dark:text-white">100% Safe</div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl">⚡</div>
                <div>
                  <div className="text-xs text-gray-500">Speed</div>
                  <div className="font-bold text-gray-900 dark:text-white">Instant Transfer</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl font-extrabold mb-2">10+</div>
              <div className="text-blue-200 font-medium">Expert Professionals</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-5xl font-extrabold mb-2">5+</div>
              <div className="text-blue-200 font-medium">Official Partners</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-5xl font-extrabold mb-2">24/7</div>
              <div className="text-blue-200 font-medium">Dedicated Support</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-5xl font-extrabold mb-2">100%</div>
              <div className="text-blue-200 font-medium">Secure Transactions</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">Comprehensive Financial Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400">We offer a wide spectrum of banking and digital services tailored to meet the daily financial needs of individuals and businesses.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Airtel Payments Bank', desc: 'Full-fledged banking services including account opening, AEPS, fast tags, and Atal Pension Yojna.', icon: '🏦' },
              { title: 'RapiPay & ReliPay', desc: 'Aadhaar Enabled Payment Systems, Micro ATMs, and retail merchant IDs for seamless digital payments.', icon: '💳' },
              { title: 'Business Development', desc: 'Merchant onboarding for Google Pay & PhonePe, QR code deployment, and soundbox installations.', icon: '📈' }
            ].map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
                <button onClick={() => navigate('/services')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2">Learn more &rarr;</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to upgrade your digital banking experience?</h2>
          <p className="text-blue-200 text-lg md:text-xl mb-10">Join thousands of satisfied customers who trust Vishwajeet Banking Point for their daily financial transactions.</p>
          <button onClick={() => navigate('/contact')} className="px-10 py-4 bg-white text-blue-900 font-extrabold rounded-xl shadow-2xl hover:bg-gray-50 transition-colors transform hover:scale-105 duration-200">
            Get in Touch Today
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;