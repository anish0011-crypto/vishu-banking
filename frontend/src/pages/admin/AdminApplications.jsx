import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchApps = async () => {
    try { const res = await api.get('/content/applications'); setApps(res.data); }
    catch { toast.error('Failed to load applications'); }
  };
  useEffect(() => { fetchApps(); }, []);

  const updateStatus = async (id, status) => {
    try { await api.put('/content/applications/'+id, { status }); toast.success('Status updated'); fetchApps(); }
    catch { toast.error('Update failed'); }
  };

  const del = async (id) => {
    if(!confirm('Delete?')) return;
    try { await api.delete('/content/applications/'+id); toast.success('Deleted'); fetchApps(); }
    catch { toast.error('Delete failed'); }
  };

  const filtered = filter==='all' ? apps : apps.filter(a=>a.status===filter);
  const statusColor = { Pending:'bg-yellow-100 text-yellow-800', Shortlisted:'bg-green-100 text-green-800', Rejected:'bg-red-100 text-red-800' };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Career Applications ({apps.length})</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {['all','Pending','Shortlisted','Rejected'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter===f ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(a => (
          <div key={a._id} className="bg-white rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{a.name}</p>
                <p className="text-xs text-gray-500">{a.mobile} · {a.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusColor[a.status] || 'bg-gray-100 text-gray-700'}`}>{a.status || 'Pending'}</span>
            </div>
            {a.address && <p className="text-xs text-gray-500 mb-3">📍 {a.address}</p>}
            <div className="flex items-center gap-2 flex-wrap">
              {a.resumeUrl && <a href={a.resumeUrl} target="_blank" className="text-blue-600 underline text-xs border border-blue-200 px-2 py-1 rounded">📄 Resume</a>}
              <button onClick={()=>updateStatus(a._id,'Shortlisted')} className="text-green-600 text-xs border border-green-200 px-2 py-1 rounded">✓ Shortlist</button>
              <button onClick={()=>updateStatus(a._id,'Rejected')} className="text-red-600 text-xs border border-red-200 px-2 py-1 rounded">✗ Reject</button>
              <button onClick={()=>del(a._id)} className="text-gray-500 text-xs border border-gray-200 px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length===0 && <div className="bg-white rounded-xl border p-8 text-center text-gray-400">No applications found.</div>}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b"><tr><th className="p-3">Name</th><th className="p-3">Mobile</th><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3">Resume</th><th className="p-3">Actions</th></tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3">{a.mobile}</td>
                  <td className="p-3 text-gray-500">{a.email}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[a.status] || 'bg-gray-100 text-gray-700'}`}>{a.status || 'Pending'}</span></td>
                  <td className="p-3">{a.resumeUrl ? <a href={a.resumeUrl} target="_blank" className="text-blue-600 underline text-xs">Download</a> : '—'}</td>
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
    </div>
  );
}