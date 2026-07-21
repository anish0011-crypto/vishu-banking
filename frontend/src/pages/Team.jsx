import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import toast from 'react-hot-toast';

function Team() {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/team').then(res=>setTeam(res.data)).catch(()=>toast.error('Failed to load team')).finally(()=>setLoading(false));
  },[]);

  if(loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Our Team</p>
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-12">A family of 10+ members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.map((t, i) => (
          <motion.div key={t._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-6 rounded-xl card-hover">
            {t.profilePhoto ? <img src={t.profilePhoto} alt={t.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-dark-bg shadow-md"/> : <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-blue-100 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400">{t.name[0]}</div>}
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.experience} Experience</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{t.designation}</p>
            <button onClick={()=>navigate('/team/'+t._id)} className="text-blue-600 font-medium border border-blue-600 px-6 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-sm w-full">Know More</button>
          </motion.div>
        ))}
        {team.length===0 && <div className="col-span-4 py-20 text-gray-400">No team members added yet.</div>}
      </div>
    </div>
  );
}
export default Team;