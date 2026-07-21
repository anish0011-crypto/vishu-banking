import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminContent() {
  const [hero, setHero] = useState({ heading:'', description:'', aboutCardContent:{ title:'', contactNumber:'', email:'', gstNumber:'', points:[] } });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/content/hero').then(res => { if(res.data && res.data.heading) setHero(res.data); }).catch(()=>{});
  },[]);

  const handleSave = async () => {
    setSaving(true);
    try { await api.put('/content/hero', hero); toast.success('Hero section saved!'); }
    catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const handleFile = async (e, field) => {
    const file = e.target.files[0]; if(!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await api.post('/upload', fd);
      setHero(h => ({...h, [field]: res.data.url}));
      toast.success('Image uploaded');
    } catch { toast.error('Upload failed'); }
  };

  const updateCard = (key, val) => setHero(h => ({...h, aboutCardContent:{...h.aboutCardContent, [key]: val}}));
  const updatePoint = (i, val) => { const p=[...(hero.aboutCardContent.points||[])]; p[i]=val; updateCard('points',p); };
  const addPoint = () => { const p=[...(hero.aboutCardContent.points||[]),'New Point']; updateCard('points',p); };
  const removePoint = (i) => { const p=(hero.aboutCardContent.points||[]).filter((_,idx)=>idx!==i); updateCard('points',p); };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">🎯 Hero Section</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Heading</label>
            <input value={hero.heading} onChange={e=>setHero({...hero,heading:e.target.value})} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={hero.description} onChange={e=>setHero({...hero,description:e.target.value})} rows="2" className="w-full border rounded p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Image (Upload)</label>
            <input type="file" accept="image/*" onChange={e=>handleFile(e,'heroImage')} className="w-full text-sm" />
            {hero.heroImage && <img src={hero.heroImage} className="h-20 mt-2 rounded object-cover" />}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Background Image (Upload)</label>
            <input type="file" accept="image/*" onChange={e=>handleFile(e,'backgroundImage')} className="w-full text-sm" />
            {hero.backgroundImage && <img src={hero.backgroundImage} className="h-20 mt-2 rounded object-cover" />}
          </div>
        </div>
      </div>

      {/* About Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">📋 Company Profile Card</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium mb-1 block">Card Title</label><input value={hero.aboutCardContent?.title||''} onChange={e=>updateCard('title',e.target.value)} className="w-full border rounded p-2"/></div>
          <div><label className="text-sm font-medium mb-1 block">Contact Number</label><input value={hero.aboutCardContent?.contactNumber||''} onChange={e=>updateCard('contactNumber',e.target.value)} className="w-full border rounded p-2"/></div>
          <div><label className="text-sm font-medium mb-1 block">Email</label><input value={hero.aboutCardContent?.email||''} onChange={e=>updateCard('email',e.target.value)} className="w-full border rounded p-2"/></div>
          <div><label className="text-sm font-medium mb-1 block">GST Number</label><input value={hero.aboutCardContent?.gstNumber||''} onChange={e=>updateCard('gstNumber',e.target.value)} className="w-full border rounded p-2"/></div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">Profile Points</label>
          <div className="space-y-2">
            {(hero.aboutCardContent?.points||[]).map((p,i) => (
              <div key={i} className="flex gap-2">
                <input value={p} onChange={e=>updatePoint(i,e.target.value)} className="flex-1 border rounded p-2 text-sm"/>
                <button onClick={()=>removePoint(i)} className="text-red-500 px-3 py-2 border border-red-200 rounded text-sm">✕</button>
              </div>
            ))}
            <button onClick={addPoint} className="text-blue-600 text-sm border border-blue-200 px-4 py-2 rounded hover:bg-blue-50">+ Add Point</button>
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
        {saving ? 'Saving...' : '💾 Save All Changes'}
      </button>
    </div>
  );
}