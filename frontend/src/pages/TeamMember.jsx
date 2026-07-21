import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

function TeamMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/content/team/'+id).then(res=>setMember(res.data)).catch(()=>navigate('/team')).finally(()=>setLoading(false));
  },[id]);

  if(loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div></div>;
  if(!member) return null;

  return (
    <div className="py-20 px-4 max-w-3xl mx-auto">
      <button onClick={()=>navigate('/team')} className="text-blue-500 mb-8 flex items-center gap-2 hover:underline">&larr; Back to Team</button>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 text-center">
        {member.profilePhoto ? <img src={member.profilePhoto} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100 shadow-lg"/> : <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-600">{member.name[0]}</div>}
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">{member.name}</h1>
        <p className="text-blue-600 font-semibold mb-1">{member.designation}</p>
        <p className="text-gray-500 text-sm mb-4">{member.experience} Experience</p>
        {member.description && <p className="text-gray-600 dark:text-gray-400 mb-6">{member.description}</p>}
        <div className="flex justify-center gap-4 flex-wrap">
          {member.mobile && <a href={'tel:'+member.mobile} className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">📞 Call</a>}
          {member.email && <a href={'mailto:'+member.email} className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50">✉️ Email</a>}
          {member.linkedin && <a href={member.linkedin} target="_blank" className="border border-gray-300 text-gray-600 px-6 py-2 rounded-md font-medium hover:bg-gray-50">LinkedIn</a>}
        </div>
      </motion.div>
    </div>
  );
}
export default TeamMember;