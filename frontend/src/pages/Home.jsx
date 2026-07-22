import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import toast from 'react-hot-toast';

function Home() {
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, servRes, teamRes, testRes] = await Promise.all([
          api.get('/content/hero'),
          api.get('/content/services'),
          api.get('/content/team'),
          api.get('/content/testimonials')
        ]);
        setHero(heroRes.data);
        setServices(servRes.data.slice(0, 6)); // First 6 services
        setTeam(teamRes.data.slice(0, 4)); // First 4 team members
        setTestimonials(testRes.data.slice(0, 3)); // First 3 testimonials
      } catch (error) {
        toast.error('Failed to load dynamic content');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { num: '5000+', text: 'Happy Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { num: '10+', text: 'Team Members', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { num: '7+', text: 'Years Experience', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { num: '20+', text: 'Banking Services', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="z-10">
            <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-4">Hello, Welcome to</h2>
            <h1 className="text-5xl sm:text-6xl font-heading font-extrabold text-blue-900 dark:text-white mb-6 leading-tight">
              {hero?.heading || 'Vishwajeet Banking Point'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-lg">
              {hero?.description || 'We provide all types of banking services and work opportunities in marketing. We also hire trainees and freelancers.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${hero?.aboutCardContent?.contactNumber || '9506562637'}`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold shadow-lg transition-colors flex items-center">
                📞 Call Now
              </a>
              <a href={`https://wa.me/91${hero?.aboutCardContent?.contactNumber || '9506562637'}`} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md font-bold shadow-lg transition-colors flex items-center">
                💬 WhatsApp
              </a>
              <button onClick={() => navigate('/career')} className="bg-white dark:bg-dark-surface text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-8 py-3 rounded-md font-bold shadow-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                📄 Apply Now
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 lg:justify-self-end mt-12 lg:mt-0">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
             
             <div className="bg-blue-900 dark:bg-slate-800 text-white p-8 rounded-2xl shadow-xl max-w-sm card-hover">
                <p className="text-sm text-blue-300 font-semibold mb-2 uppercase tracking-wide">Company Profile</p>
                <h3 className="text-2xl font-heading font-bold mb-4">{hero?.aboutCardContent?.title || 'Vishwajeet Banking Point'}</h3>
                <div className="space-y-3 text-sm text-gray-200">
                  <p className="flex items-center gap-2">📞 {hero?.aboutCardContent?.contactNumber || '9506562637'}</p>
                  <p className="flex items-center gap-2">✉️ {hero?.aboutCardContent?.email || 'vishwajeetbankingpoint@gmail.com'}</p>
                  <p className="border-b border-blue-700 pb-3">GST Number: {hero?.aboutCardContent?.gstNumber || '09EMHPR1060Q1ZD'}</p>
                  <ul className="pt-2 space-y-2">
                    {hero?.aboutCardContent?.points?.length > 0 ? hero.aboutCardContent.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-blue-400">✓</span> {p}</li>
                    )) : (
                      <>
                        <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Manager @ Airtel Payments Bank</li>
                        <li className="flex items-start gap-2"><span className="text-blue-400">✓</span> Business Development @ Google Pay</li>
                      </>
                    )}
                  </ul>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-dark-bg text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Services</p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-12">What do we offer ?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((s, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={s._id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-8 rounded-xl card-hover flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 overflow-hidden">
                {s.logoImage ? <img src={s.logoImage} alt={s.title} className="w-full h-full object-cover" /> : <div className="text-xl font-bold">{s.title?.[0]}</div>}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{s.description}</p>
              <button onClick={() => navigate(`/services/${s._id}`)} className="text-red-500 font-medium border border-red-500 px-6 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Know more</button>
            </motion.div>
          ))}
        </div>
        <button onClick={() => navigate('/services')} className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold shadow hover:bg-blue-700 transition-colors">
          View All Services
        </button>
      </section>

      {/* Customer Feedback */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">Customer's Feedback</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Some valuable feedback from our valued customers</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((r,i) => (
              <motion.div key={r._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-soft border border-gray-100 dark:border-dark-border text-left card-hover">
                <div className="flex text-yellow-400 mb-4 text-xl">{'★'.repeat(r.rating||5)}{'☆'.repeat(5-(r.rating||5))}</div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{r.review || r.text}"</p>
                <div className="flex items-center gap-3">
                  {r.customerPhoto || r.image ? <img src={r.customerPhoto || r.image} alt={r.name} className="w-10 h-10 rounded-full object-cover"/> : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">{r.name?.[0]}</div>}
                  <span className="font-bold text-gray-900 dark:text-white">{r.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <button onClick={() => navigate('/testimonials')} className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md font-bold shadow hover:bg-blue-50 transition-colors">
            View All Reviews
          </button>
        </section>
      )}
      
    </div>
  );
}

export default Home;