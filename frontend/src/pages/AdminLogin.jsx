import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      login(res.data.token, { username: res.data.username });
      toast.success('Login Successful');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              required
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-3 outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-3 outline-none focus:border-blue-500" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold transition-colors shadow-lg">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;