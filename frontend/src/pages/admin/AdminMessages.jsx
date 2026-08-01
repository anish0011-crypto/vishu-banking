import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [msgs, setMsgs] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetch = async () => {
    try { const res = await api.get('/content/contact'); setMsgs(res.data); }
    catch { toast.error('Failed to load messages'); }
  };
  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    try { await api.put('/content/contact/'+id, { status }); toast.success('Marked as '+status); fetch(); }
    catch { toast.error('Update failed'); }
  };

  const del = async (id) => {
    if(!confirm('Delete?')) return;
    try { await api.delete('/content/contact/'+id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  const generateAIReply = async (msg) => {
    setLoadingId(msg._id);
    try {
      const res = await api.post('/admin/generate-reply', {
        id: msg._id,
        name: msg.name,
        email: msg.email,
        message: msg.message,
        subject: msg.subject
      });
      toast.success(res.data.message || 'Auto-Reply sent via Email!');
      fetch(); // Refresh to show 'Replied' status
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send automated reply');
    } finally {
      setLoadingId(null);
    }
  };

  const statusColor = { Unread:'bg-blue-100 text-blue-800', Read:'bg-gray-100 text-gray-800', Replied:'bg-green-100 text-green-800' };

  return (
    <div className="space-y-4">
      <h1 className="text-lg sm:text-xl font-bold text-gray-900">Contact Messages ({msgs.length})</h1>
      {msgs.map(m => (
        <div key={m._id} className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900">{m.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[m.status]}`}>{m.status}</span>
              </div>
              <p className="text-xs text-black mb-2">{m.email} · {m.mobile}</p>
              {m.subject && <p className="text-sm font-medium text-gray-700 mb-1">Re: {m.subject}</p>}
              <p className="text-black text-sm">{m.message}</p>
              <p className="text-xs text-gray-600 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex sm:flex-col gap-2 items-start flex-wrap">
              <button onClick={()=>generateAIReply(m)} disabled={loadingId === m._id} className="text-purple-600 text-xs border border-purple-200 bg-purple-50 px-3 py-1.5 rounded hover:bg-purple-100 font-bold flex items-center gap-1 disabled:opacity-50">
                {loadingId === m._id ? 'Sending...' : '✨ Auto-Reply (Email)'}
              </button>
              <button onClick={()=>updateStatus(m._id,'Read')} className="text-gray-600 text-xs border px-3 py-1.5 rounded hover:bg-gray-50">Mark Read</button>
              <button onClick={()=>updateStatus(m._id,'Replied')} className="text-green-600 text-xs border border-green-200 px-3 py-1.5 rounded hover:bg-green-50">Replied</button>
              <button onClick={()=>del(m._id)} className="text-red-600 text-xs border border-red-200 px-3 py-1.5 rounded hover:bg-red-50">Delete</button>
            </div>
          </div>
        </div>
      ))}
      {msgs.length===0 && <div className="bg-white p-12 rounded-xl text-center text-gray-400">No messages yet.</div>}
    </div>
  );
}