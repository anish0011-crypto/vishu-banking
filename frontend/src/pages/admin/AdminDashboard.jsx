import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Users, Briefcase, MessageSquare, FileText, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, team: 0, testimonials: 0, applications: 0, messages: 0 });

  useEffect(() => {
    api.get('/content/stats').then(res => setStats(res.data)).catch(() => toast.error('Failed to load stats'));
  }, []);

  const statCards = [
    { title: 'Total Services', count: stats.services, icon: <Briefcase size={22} />, color: 'blue', link: '/admin/services' },
    { title: 'Team Members', count: stats.team, icon: <Users size={22} />, color: 'green', link: '/admin/team' },
    { title: 'Testimonials', count: stats.testimonials, icon: <Star size={22} />, color: 'purple', link: '/admin/testimonials' },
    { title: 'Career Apps', count: stats.applications, icon: <FileText size={22} />, color: 'orange', link: '/admin/applications' },
    { title: 'Contact Msgs', count: stats.messages, icon: <MessageSquare size={22} />, color: 'red', link: '/admin/messages' },
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };

  const quickLinks = [
    { name: 'Edit Hero Section', path: '/admin/content', desc: 'Update heading, description, company profile' },
    { name: 'Manage Services', path: '/admin/services', desc: 'Add, edit or delete service listings' },
    { name: 'Manage Team', path: '/admin/team', desc: 'Add team members and update photos' },
    { name: 'View Applications', path: '/admin/applications', desc: 'Review career applications' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening on your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {statCards.map((s, i) => (
          <Link key={i} to={s.link} className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border ${colorMap[s.color]}`}>
              {s.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{s.count}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-tight">{s.title}</p>
            <ArrowUpRight size={14} className="mt-2 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((q, i) => (
            <Link key={i} to={q.path} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between gap-4 group">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{q.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{q.desc}</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
        <h3 className="font-bold mb-1">Vishwajeet Banking Point</h3>
        <p className="text-blue-100 text-sm">All changes you make here reflect immediately on the public website. Use the sidebar to navigate between sections.</p>
      </div>
    </div>
  );
}
export default AdminDashboard;