import { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', logoImage: '', bannerImage: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get('/content/services');
      setServices(res.data);
    } catch(err) { toast.error('Error fetching services'); }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await api.post('/upload', fd);
      setFormData({ ...formData, [field]: res.data.url });
      toast.success('Image Uploaded');
    } catch(err) { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/content/services/${editingId}`, formData);
        toast.success('Service Updated');
      } else {
        await api.post('/content/services', formData);
        toast.success('Service Added');
      }
      setFormData({ title: '', description: '', logoImage: '', bannerImage: '' });
      setEditingId(null);
      fetchServices();
    } catch(err) { toast.error('Action failed'); }
  };

  const handleDelete = async (id) => {
    if(confirm('Are you sure?')) {
      try {
        await api.delete(`/content/services/${id}`);
        toast.success('Service Deleted');
        fetchServices();
      } catch(err) { toast.error('Delete failed'); }
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg sm:text-xl font-bold text-gray-900">Manage Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2" rows="3"></textarea>
          </div>
          <div>
            <label className="block text-sm mb-1">Logo Image (Upload)</label>
            <input type="file" onChange={e=>handleFile(e, 'logoImage')} className="w-full border rounded p-2 text-sm" />
            {formData.logoImage && <img src={formData.logoImage} className="h-10 mt-2" />}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded">
            {editingId ? 'Update Service' : 'Save Service'}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Logo</th>
              <th className="p-4">Title</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">{s.logoImage && <img src={s.logoImage} className="w-10 h-10 rounded-full object-cover" />}</td>
                <td className="p-4 font-medium">{s.title}</td>
                <td className="p-4">
                  <button onClick={() => {setEditingId(s._id); setFormData(s);}} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
export default AdminServices;