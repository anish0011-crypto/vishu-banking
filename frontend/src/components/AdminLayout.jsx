import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, MessageSquare, Briefcase,
  FileText, Settings as SettingsIcon, LogOut, Menu, X,
  ChevronRight, Bell
} from 'lucide-react';

const AdminLayout = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-blue-400 font-bold">Loading Admin...</p>
      </div>
    </div>
  );
  if (!admin) return <Navigate to="/admin/login" />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navs = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Hero / About', path: '/admin/content', icon: <FileText size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Bell size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon size={20} /> },
  ];

  const isActive = (nav) => nav.exact
    ? location.pathname === nav.path
    : location.pathname === nav.path;

  const currentPage = navs.find(n => n.path === location.pathname)?.name || 'Admin';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">V</span>
            </div>
            <h2 className="text-lg font-extrabold text-white leading-tight">Vishwajeet</h2>
          </div>
          <p className="text-xs text-slate-400 pl-10">Admin Panel</p>
        </div>
        {/* Close button - mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-1 rounded"
        >
          <X size={20} />
        </button>
      </div>

      {/* Admin info */}
      <div className="px-4 py-3 mx-3 mt-3 bg-slate-700/40 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {(admin.username || 'A')[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{admin.username || 'Admin'}</p>
            <p className="text-slate-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
        {navs.map(nav => (
          <Link
            key={nav.path}
            to={nav.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              isActive(nav)
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <span className={`flex-shrink-0 ${isActive(nav) ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
              {nav.icon}
            </span>
            <span className="font-medium text-sm">{nav.name}</span>
            {isActive(nav) && <ChevronRight size={14} className="ml-auto" />}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200 font-medium text-sm"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR (Desktop: always visible | Mobile: slide-in drawer) ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64 bg-slate-900 flex flex-col
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-3 flex items-center gap-3 flex-shrink-0">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-1 min-w-0">
            <span className="hidden sm:inline text-gray-400">Admin</span>
            <ChevronRight size={14} className="hidden sm:inline text-gray-300" />
            <h2 className="font-semibold text-gray-800 truncate">{currentPage}</h2>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden md:block text-sm text-gray-500">
              Welcome, <strong className="text-gray-800">{admin.username || 'Admin'}</strong>
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {(admin.username || 'A')[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;