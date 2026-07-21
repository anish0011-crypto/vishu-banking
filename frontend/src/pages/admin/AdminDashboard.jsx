import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Users, Briefcase, MessageSquare, FileText } from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, team: 0, testimonials: 0, applications: 0, messages: 0 });

  useEffect(() => {
    api.get('/content/stats').then(res => setStats(res.data)).catch(err => toast.error('Failed to load stats'));
  }, []);

  const statCards = [
    { title: 'Total Services', count: stats.services, icon: <Briefcase size={24} className="text-blue-600"/> },
    { title: 'Team Members', count: stats.team, icon: <Users size={24} className="text-green-600"/> },
    { title: 'Testimonials', count: stats.testimonials, icon: <MessageSquare size={24} className="text-purple-600"/> },
    { title: 'Career Apps', count: stats.applications, icon: <FileText size={24} className="text-orange-600"/> },
    { title: 'Contact Msgs', count: stats.messages, icon: <MessageSquare size={24} className="text-red-600"/> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{s.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{s.count}</h3>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              {s.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminDashboard;