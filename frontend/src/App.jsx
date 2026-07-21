import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Team from './pages/Team';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';

function Layout({ children, toggleTheme, isDark }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  if (isAdminPage) return children;
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Layout toggleTheme={toggleTheme} isDark={isDark}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              {/* Other admin routes can be added here */}
              <Route path="*" element={<div className="p-8 text-gray-500">Page under construction</div>} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;