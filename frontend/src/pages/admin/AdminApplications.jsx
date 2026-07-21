import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetch = async () => {
    try { const res = await api.get('/content/applications'); setApps(res.data); }
    catch { toast.error('Failed to load applications'); }
  };
  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    try { await api.put('/content/applications/'+id, { status }); toast.success('Status updated'); fetch(); }
    catch { toast.error('Update failed'); }
  };

  const del = async (id) => {
    if(!confirm('Delete?')) return;
    try { await api.delete('/content/applications/'+id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  const filtered = filter==='all' ? apps : apps.filter(a=>a.status===filter);

  const statusColor = { Pending:'bg-yellow-100 text-yellow-800', Shortlisted:'bg-green-100 text-green-800', Rejected:'bg-red-100 text-red-800' };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        {['all','Pending','Shortlisted','Rejected'].map(f => (
          <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter===f ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="p-3">Name</th><th className="p-3">Mobile</th><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3">Resume</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{a.name}</td>
                <td className="p-3">{a.mobile}</td>
                <td className="p-3 text-gray-500">{a.email}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[a.status]}`}>{a.status}</span></td>
                <td className="p-3">{a.resumeUrl ? <a href={'http://localhost:5000'+a.resumeUrl} target="_blank" className="text-blue-600 underline text-xs">Download</a> : '—'}</td>
                <td className="p-3 flex gap-1 flex-wrap">
                  <button onClick={()=>updateStatus(a._id,'Shortlisted')} className="text-green-600 text-xs border border-green-200 px-2 py-1 rounded">✓</button>
                  <button onClick={()=>updateStatus(a._id,'Rejected')} className="text-red-600 text-xs border border-red-200 px-2 py-1 rounded">✗</button>
                  <button onClick={()=>del(a._id)} className="text-gray-500 text-xs border border-gray-200 px-2 py-1 rounded">Del</button>
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan="6" className="p-6 text-center text-gray-400">No applications found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}