import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', review:'', rating:5 });

  const fetch = async () => {
    try { const res = await api.get('/content/testimonials'); setItems(res.data); }
    catch { toast.error('Failed to load'); }
  };
  useEffect(() => { fetch(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await api.post('/upload', fd);
      setForm(f => ({...f, customerPhoto: res.data.url}));
      toast.success('Photo uploaded');
    } catch { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editing) { await api.put('/content/testimonials/'+editing, form); toast.success('Updated'); }
      else { await api.post('/content/testimonials', form); toast.success('Added'); }
      setForm({ name:'', review:'', rating:5 }); setEditing(null); fetch();
    } catch { toast.error('Action failed'); }
  };

  const del = async (id) => {
    if(!confirm('Delete?')) return;
    try { await api.delete('/content/testimonials/'+id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Review' : 'Add Review'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="text-xs text-black block mb-1 font-semibold">Customer Name</label><input required type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded p-2 text-sm text-black"/></div>
          <div><label className="text-xs text-black block mb-1 font-semibold">Review</label><textarea required rows="4" value={form.review} onChange={e=>setForm({...form,review:e.target.value})} className="w-full border rounded p-2 text-sm text-black"></textarea></div>
          <div><label className="text-xs text-black block mb-1 font-semibold">Rating (1-5)</label><input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})} className="w-full border rounded p-2 text-sm text-black"/></div>
          <div><label className="text-xs text-black block mb-1 font-semibold">Customer Photo</label><input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm text-black"/>{form.customerPhoto && <img src={form.customerPhoto} className="h-10 mt-2 rounded-full"/>}</div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">{editing ? 'Update' : 'Add Review'}</button>
          {editing && <button type="button" onClick={()=>{setEditing(null);setForm({name:'',review:'',rating:5});}} className="w-full bg-gray-200 text-gray-700 py-2 rounded">Cancel</button>}
        </form>
      </div>
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
        <div className="divide-y">
          {items.map(t => (
            <div key={t._id} className="p-4 flex items-start gap-4">
              {t.customerPhoto || t.image ? <img src={t.customerPhoto || t.image} className="w-12 h-12 rounded-full object-cover flex-shrink-0"/> : <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 flex-shrink-0">{t.name?.[0]}</div>}
              <div className="flex-1">
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-yellow-400 text-sm">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                <p className="text-black text-sm mt-1 line-clamp-2">{t.review || t.text}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>{setEditing(t._id);setForm(t);}} className="text-blue-600 text-xs border border-blue-200 px-2 py-1 rounded">Edit</button>
                <button onClick={()=>del(t._id)} className="text-red-600 text-xs border border-red-200 px-2 py-1 rounded">Del</button>
              </div>
            </div>
          ))}
          {items.length===0 && <p className="p-6 text-center text-gray-400">No testimonials yet.</p>}
        </div>
      </div>
    </div>
  );
}