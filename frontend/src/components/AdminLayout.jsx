import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, MessageSquare, Briefcase, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold">Loading Admin...</div>;
  if (!admin) return <Navigate to="/admin/login" />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navs = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Hero / About', path: '/admin/content', icon: <FileText size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navs.map(nav => (
            <Link 
              key={nav.path} 
              to={nav.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === nav.path ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {nav.icon}
              {nav.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {navs.find(n => n.path === location.pathname)?.name || 'Admin'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome, <strong>{admin.username || 'Admin'}</strong></span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;