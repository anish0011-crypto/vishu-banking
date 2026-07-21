import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const features = [
    { icon:'🛡️', title:'Trusted Service', desc:'RBI-authorized operations through official partner networks.' },
    { icon:'🔒', title:'Secure Transactions', desc:'End-to-end secured financial and digital transactions.' },
    { icon:'⚡', title:'Fast Processing', desc:'Same-day processing for most banking and financial services.' },
    { icon:'👥', title:'Experienced Team', desc:'A dedicated team of 10+ professionals across Ghazipur.' },
    { icon:'🎧', title:'Customer Support', desc:'Responsive support Mon-Sat, 9 AM to 6 PM.' },
    { icon:'📱', title:'Digital Banking', desc:'Full suite of digital banking solutions at one location.' },
  ];

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.6}}>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">Vishwajeet Banking Point</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              A leading financial and digital services provider operating out of Ghazipur, Uttar Pradesh. We bridge the gap between essential banking services and the local community through trusted partnerships and technology.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              As an authorized Manager at Airtel Payments Bank and active distributor of India's top fintech platforms, we ensure every transaction is secure, fast, and fully compliant.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={()=>navigate('/contact')} className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-blue-700 transition-colors">Contact Us</button>
              <button onClick={()=>navigate('/services')} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">Our Services</button>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.6,delay:0.2}} className="bg-gradient-to-br from-blue-600 to-blue-900 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Official Partnerships</h3>
            <ul className="space-y-3">
              {['Manager @ Airtel Payments Bank (behalf of RBI)','BDE @ Google Pay Business','Distributor @ RapiPay Fintech Pvt. Ltd.','Distributor @ ReliPay Fintech Pvt. Ltd.','Distributor @ PhonePe Business Pvt. Ltd.'].map((item,i)=>
                <li key={i} className="flex items-start gap-3 text-blue-100"><span className="text-blue-300 mt-0.5">✓</span>{item}</li>
              )}
            </ul>
            <div className="mt-6 pt-6 border-t border-blue-700">
              <p className="text-blue-300 text-sm">GST Number: 09EMHPR1060Q1ZD</p>
              <p className="text-blue-300 text-sm">Contact: 9506562637</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-dark-bg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-100 dark:border-dark-border card-hover">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default About;