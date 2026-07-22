import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', designation:'', experience:'', description:'', email:'', mobile:'', facebook:'', instagram:'', linkedin:'' });

  const fetch = async () => {
    try { const res = await api.get('/content/team'); setMembers(res.data); }
    catch { toast.error('Failed to load team'); }
  };
  useEffect(() => { fetch(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0]; if(!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await api.post('/upload', fd);
      setForm(f => ({...f, profilePhoto: res.data.url}));
      toast.success('Photo uploaded');
    } catch { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put('/content/team/'+editing, form); toast.success('Updated'); }
      else { await api.post('/content/team', form); toast.success('Added'); }
      setForm({ name:'', designation:'', experience:'', description:'', email:'', mobile:'', facebook:'', instagram:'', linkedin:'' });
      setEditing(null); fetch();
    } catch { toast.error('Action failed'); }
  };

  const del = async (id) => {
    if(!confirm('Delete?')) return;
    try { await api.delete('/content/team/'+id); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Member' : 'Add Member'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {['name','designation','experience','email','mobile','facebook','instagram','linkedin'].map(field => (
            <div key={field}>
              <label className="block text-xs text-gray-500 capitalize mb-1">{field}</label>
              <input type="text" value={form[field]||''} onChange={e=>setForm({...form,[field]:e.target.value})} className="w-full border rounded p-2 text-sm" required={field==='name'||field==='designation'} />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} rows="3" className="w-full border rounded p-2 text-sm"></textarea>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
            {form.profilePhoto && <img src={form.profilePhoto} className="h-12 mt-2 rounded-full" />}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">{editing ? 'Update' : 'Add Member'}</button>
          {editing && <button type="button" onClick={()=>{setEditing(null);setForm({name:'',designation:'',experience:'',description:'',email:'',mobile:'',facebook:'',instagram:'',linkedin:''});}} className="w-full bg-gray-200 text-gray-700 py-2 rounded">Cancel</button>}
        </form>
      </div>
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="p-3">Photo</th><th className="p-3">Name</th><th className="p-3">Role</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {members.map(m => (
              <tr key={m._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.profilePhoto || m.image ? <img src={m.profilePhoto || m.image} className="w-10 h-10 rounded-full object-cover"/> : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">{m.name?.[0]}</div>}</td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 text-gray-500">{m.designation || m.role}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={()=>{setEditing(m._id);setForm(m);}} className="text-blue-600 text-xs border border-blue-200 px-2 py-1 rounded">Edit</button>
                  <button onClick={()=>del(m._id)} className="text-red-600 text-xs border border-red-200 px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
            {members.length===0 && <tr><td colSpan="4" className="p-6 text-center text-gray-400">No members yet. Add one!</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}