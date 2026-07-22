import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import toast from 'react-hot-toast';

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/services').then(res=>setServices(res.data)).catch(()=>toast.error('Failed to load services')).finally(()=>setLoading(false));
  }, []);

  if(loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Services</p>
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-12">All Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div key={s._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-8 rounded-xl card-hover flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 mb-6 overflow-hidden">
              {s.logoImage ? <img src={s.logoImage} alt={s.title || s.name} className="w-full h-full object-cover"/> : <span className="text-2xl font-bold">{(s.title || s.name || '?')[0]}</span>}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{s.title || s.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{s.description}</p>
            <button onClick={()=>navigate('/services/'+s._id)} className="w-full text-blue-600 font-medium border border-blue-600 px-6 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Know More</button>
          </motion.div>
        ))}
        {services.length===0 && <div className="col-span-3 py-20 text-gray-400">No services available.</div>}
      </div>
    </div>
  );
}
export default Services;