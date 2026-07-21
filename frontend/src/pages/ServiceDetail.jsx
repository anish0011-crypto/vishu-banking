import { useParams, useNavigate } from 'react-router-dom';

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="py-20 px-4 max-w-3xl mx-auto animate-fade-in text-center">
      <button onClick={() => navigate('/services')} className="text-blue-500 mb-8 flex items-center justify-center mx-auto">&larr; Back to Services</button>
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-6">Service Details</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">This is the dedicated page for service ID: {id}. You can integrate the backend here to fetch specific service details dynamically.</p>
      <div className="bg-white dark:bg-dark-surface p-12 rounded-2xl shadow-xl">
         <h2 className="text-2xl font-bold mb-4">Apply for this Service</h2>
         <button className="bg-blue-600 text-white px-8 py-3 rounded font-bold shadow hover:bg-blue-700">Contact Us Now</button>
      </div>
    </div>
  );
}
export default ServiceDetail;