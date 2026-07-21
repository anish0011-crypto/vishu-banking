import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ websiteName:'', contactNumber:'', whatsapp:'', email:'', address:'', footerText:'', primaryColor:'#0ea5e9', fontFamily:'Inter' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/content/settings').then(res=>{ if(res.data) setSettings(s=>({...s,...res.data})); }).catch(()=>{});
  },[]);

  const handleSave = async () => {
    setSaving(true);
    try { await api.put('/content/settings', settings); toast.success('Settings saved!'); }
    catch { toast.error('Save failed'); }
    setSaving(false);
  };

  const fields = [
    { key:'websiteName', label:'Website Name' },
    { key:'contactNumber', label:'Contact Number' },
    { key:'whatsapp', label:'WhatsApp Number' },
    { key:'email', label:'Email Address' },
    { key:'address', label:'Address', textarea:true },
    { key:'footerText', label:'Footer Text' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">🌐 Website Settings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className={f.textarea ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              {f.textarea 
                ? <textarea value={settings[f.key]||''} onChange={e=>setSettings({...settings,[f.key]:e.target.value})} rows="2" className="w-full border rounded p-2"></textarea>
                : <input type="text" value={settings[f.key]||''} onChange={e=>setSettings({...settings,[f.key]:e.target.value})} className="w-full border rounded p-2"/>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">🎨 Theme Settings</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primary Color</label>
            <div className="flex items-center gap-2"><input type="color" value={settings.primaryColor||'#0ea5e9'} onChange={e=>setSettings({...settings,primaryColor:e.target.value})} className="h-10 w-16 rounded cursor-pointer"/><span className="text-sm text-gray-500">{settings.primaryColor}</span></div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Font Family</label>
            <select value={settings.fontFamily||'Inter'} onChange={e=>setSettings({...settings,fontFamily:e.target.value})} className="w-full border rounded p-2">
              <option>Inter</option><option>Outfit</option><option>Poppins</option><option>Roboto</option>
            </select>
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
        {saving ? 'Saving...' : '💾 Save Settings'}
      </button>
    </div>
  );
}