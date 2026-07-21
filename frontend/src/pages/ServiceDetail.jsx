import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/services/'+id).then(res=>setService(res.data)).catch(()=>navigate('/services')).finally(()=>setLoading(false));
  }, [id]);

  if(loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div></div>;
  if(!service) return null;

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <button onClick={()=>navigate('/services')} className="text-blue-500 mb-8 flex items-center gap-2 hover:underline">&larr; Back to Services</button>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden">
        {service.bannerImage && <img src={service.bannerImage} alt={service.title} className="w-full h-64 object-cover"/>}
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            {service.logoImage && <img src={service.logoImage} alt={service.title} className="w-16 h-16 rounded-xl object-cover"/>}
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">{service.title}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{service.description}</p>
          {service.knowMoreContent && <div className="prose dark:prose-invert mb-8 whitespace-pre-line text-gray-700 dark:text-gray-300">{service.knowMoreContent}</div>}
          <div className="flex gap-4 flex-wrap">
            <a href="tel:9506562637" className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-blue-700 transition-colors">📞 Call Now</a>
            <a href="https://wa.me/919506562637" className="bg-green-500 text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-green-600 transition-colors">💬 WhatsApp</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default ServiceDetail;