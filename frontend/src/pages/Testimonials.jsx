import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/content/testimonials').then(res=>setReviews(res.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  const fallback = [
    { _id:1, name:'Avinash Kumar Gupta', review:'This company has an awesome team and dedicated staff. I am very impressed by their vision, hard work, outstanding performance.', rating:5 },
    { _id:2, name:'Arpita Gupta', review:"It's a rare thing to discover a bank that genuinely cares about the people. They always showed me kindness, respect and a friendly smile.", rating:5 },
    { _id:3, name:'Dr. Shushil', review:'Vishwajeet banking point has a wonderful staff of kind and helpful people. Their locations are very clean, comfortable, friendly and beautiful.', rating:5 },
  ];

  const data = reviews.length > 0 ? reviews : fallback;
  if(loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Reviews</p>
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">Customer's Feedback</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Some valuable feedback from our valued customers</p>
      <div className="grid md:grid-cols-3 gap-8">
        {data.map((r,i) => (
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
    </div>
  );
}
export default Testimonials;