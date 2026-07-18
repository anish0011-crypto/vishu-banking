import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [content, setContent] = useState(null);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [contentSubTab, setContentSubTab] = useState('hero');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [contentRes, appsRes, messagesRes] = await Promise.all([
        axios.get(`${API_URL}/api/content`),
        axios.get(`${API_URL}/api/applications/jobs`, { headers: { 'x-auth-token': token } }),
        axios.get(`${API_URL}/api/applications/contact`, { headers: { 'x-auth-token': token } })
      ]);
      setContent(contentRes.data);
      setApplications(appsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_URL}/api/content`, content, { headers: { 'x-auth-token': token } });
      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving content');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setContent(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setContent(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setContent(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addArrayItemWithArray = (section, field, defaultVal) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] || []), defaultVal]
      }
    }));
  };

  const updateArrayItemWithArray = (section, field, index, value) => {
    setContent(prev => {
      const newArray = [...prev[section][field]];
      newArray[index] = value;
      return { ...prev, [section]: { ...prev[section], [field]: newArray } };
    });
  };

  const removeArrayItemWithArray = (section, field, index) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  // Upload a team member image and return the URL
  const uploadTeamImage = async (file, idx) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(`${API_URL}/api/upload/image`, formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      updateArrayItem('team', idx, 'image', res.data.url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please try again.');
    }
  };

  // Upload a service image and return the URL
  const uploadServiceImage = async (file, idx) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(`${API_URL}/api/upload/image`, formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      updateArrayItem('services', idx, 'imageUrl', res.data.url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please try again.');
    }
  };

  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-blue-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  const contentSubTabs = ['hero', 'about', 'stats', 'services', 'partners', 'team', 'testimonials', 'gallery', 'faqs', 'blogs', 'downloads'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">⚙️ Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold">
          Logout
        </button>
      </div>

      {/* Main Tabs — scrollable on mobile */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex min-w-max sm:min-w-0">
          {[['content','Content'], ['applications','Applications'], ['messages','Messages']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setActiveTab(val)}
              className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors ${
                activeTab === val ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-6">
        {activeTab === 'content' && (
          <div className="max-w-6xl mx-auto">
            {message && (
              <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            {/* Sub-tab pills — horizontally scrollable on mobile */}
            <div className="overflow-x-auto pb-2 mb-4 sm:mb-6">
              <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
                {contentSubTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setContentSubTab(tab)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                      contentSubTab === tab
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {contentSubTab === 'hero' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Greeting</label>
                    <input 
                      type="text" 
                      value={content?.hero?.greeting || ''} 
                      onChange={(e) => updateContent('hero', 'greeting', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input 
                      type="text" 
                      value={content?.hero?.title || ''} 
                      onChange={(e) => updateContent('hero', 'title', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={content?.hero?.subtitle || ''} 
                      onChange={(e) => updateContent('hero', 'subtitle', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={content?.hero?.tagline || ''} 
                      onChange={(e) => updateContent('hero', 'tagline', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={content?.hero?.image || ''} 
                      onChange={(e) => updateContent('hero', 'image', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {contentSubTab === 'about' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">About Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input 
                      type="text" 
                      value={content?.about?.title || ''} 
                      onChange={(e) => updateContent('about', 'title', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input 
                      type="text" 
                      value={content?.about?.name || ''} 
                      onChange={(e) => updateContent('about', 'name', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Contact</label>
                    <input 
                      type="text" 
                      value={content?.about?.contact || ''} 
                      onChange={(e) => updateContent('about', 'contact', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input 
                      type="email" 
                      value={content?.about?.email || ''} 
                      onChange={(e) => updateContent('about', 'email', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">GST Number</label>
                    <input 
                      type="text" 
                      value={content?.about?.gstNumber || ''} 
                      onChange={(e) => updateContent('about', 'gstNumber', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea 
                      rows="4" 
                      value={content?.about?.description || ''} 
                      onChange={(e) => updateContent('about', 'description', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Mission</label>
                    <textarea 
                      rows="2" 
                      value={content?.about?.mission || ''} 
                      onChange={(e) => updateContent('about', 'mission', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Vision</label>
                    <textarea 
                      rows="2" 
                      value={content?.about?.vision || ''} 
                      onChange={(e) => updateContent('about', 'vision', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Profile Image URL</label>
                    <input 
                      type="text" 
                      value={content?.about?.profileImage || ''} 
                      onChange={(e) => updateContent('about', 'profileImage', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold mb-2">Why Choose Us (Points)</label>
                    {content?.about?.whyChooseUs?.map((item, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          value={item} 
                          onChange={(e) => updateArrayItemWithArray('about', 'whyChooseUs', idx, e.target.value)} 
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button onClick={() => removeArrayItemWithArray('about', 'whyChooseUs', idx)} className="bg-red-500 text-white px-3 rounded-lg">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addArrayItemWithArray('about', 'whyChooseUs', '')} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                      Add Point
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Roles / Experience</label>
                    {content?.about?.roles?.map((role, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          value={role} 
                          onChange={(e) => updateArrayItemWithArray('about', 'roles', idx, e.target.value)} 
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button onClick={() => removeArrayItemWithArray('about', 'roles', idx)} className="bg-red-500 text-white px-3 rounded-lg">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addArrayItemWithArray('about', 'roles', '')} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                      Add Role
                    </button>
                  </div>
                </div>
              </div>
            )}

            {contentSubTab === 'stats' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Stats Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Happy Customers (Number)</label>
                    <input 
                      type="number" 
                      value={content?.stats?.happyCustomers || ''} 
                      onChange={(e) => updateContent('stats', 'happyCustomers', parseInt(e.target.value))} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Team Members (Number)</label>
                    <input 
                      type="number" 
                      value={content?.stats?.teamMembers || ''} 
                      onChange={(e) => updateContent('stats', 'teamMembers', parseInt(e.target.value))} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Years Experience (Number)</label>
                    <input 
                      type="number" 
                      value={content?.stats?.yearsExperience || ''} 
                      onChange={(e) => updateContent('stats', 'yearsExperience', parseInt(e.target.value))} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Banking Services (Number)</label>
                    <input 
                      type="number" 
                      value={content?.stats?.bankingServices || ''} 
                      onChange={(e) => updateContent('stats', 'bankingServices', parseInt(e.target.value))} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Retail Partners (Number)</label>
                    <input 
                      type="number" 
                      value={content?.stats?.retailPartners || ''} 
                      onChange={(e) => updateContent('stats', 'retailPartners', parseInt(e.target.value))} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Customer Support (Text)</label>
                    <input 
                      type="text" 
                      value={content?.stats?.customerSupport || ''} 
                      onChange={(e) => updateContent('stats', 'customerSupport', e.target.value)} 
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {contentSubTab === 'services' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Services</h2>
                <div className="space-y-6">
                  {content?.services?.map((service, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Service {idx+1}</h3>
                        <button onClick={() => removeArrayItem('services', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text" 
                            placeholder="Service Name" 
                            value={service.name} 
                            onChange={(e) => updateArrayItem('services', idx, 'name', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select 
                            value={service.category} 
                            onChange={(e) => updateArrayItem('services', idx, 'category', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {['aeps', 'micro-atm', 'money-transfer', 'pan-card', 'aadhaar', 'insurance', 'fastag', 'recharge', 'bill-payment', 'loan', 'credit-card', 'business', 'computer', 'account'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea 
                            placeholder="Description" 
                            value={service.description} 
                            onChange={(e) => updateArrayItem('services', idx, 'description', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Image</label>
                          <div className="flex flex-wrap items-center gap-4">
                            {service.imageUrl ? (
                              <img
                                src={service.imageUrl}
                                alt="preview"
                                className="w-20 h-20 rounded-lg object-cover border-2 border-blue-300 shadow"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                                No Image
                              </div>
                            )}
                            <div className="flex-1">
                              <label
                                htmlFor={`service-img-${idx}`}
                                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Choose Image
                              </label>
                              <input
                                id={`service-img-${idx}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) uploadServiceImage(file, idx);
                                }}
                              />
                              {service.imageUrl && (
                                <p className="mt-1 text-xs text-gray-500 truncate max-w-xs" title={service.imageUrl}>
                                  {service.imageUrl.startsWith('http://localhost') ? '✅ Uploaded' : service.imageUrl.split('/').pop()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium">Featured</label>
                          <input 
                            type="checkbox" 
                            checked={service.isFeatured} 
                            onChange={(e) => updateArrayItem('services', idx, 'isFeatured', e.target.checked)} 
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Benefits</label>
                          {service.benefits?.map((b, bidx) => (
                            <div key={bidx} className="flex gap-2 mb-1">
                              <input 
                                type="text" 
                                placeholder="Benefit" 
                                value={b} 
                                onChange={(e) => {
                                  const newService = {...service, benefits: [...(service.benefits || [])]};
                                  newService.benefits[bidx] = e.target.value;
                                  updateArrayItem('services', idx, 'benefits', newService.benefits);
                                }} 
                                className="flex-1 px-3 py-1 border rounded-lg"
                              />
                              <button 
                                onClick={() => {
                                  const newService = {...service, benefits: (service.benefits || []).filter((_,i)=>i!==bidx)};
                                  updateArrayItem('services', idx, 'benefits', newService.benefits);
                                }} 
                                className="bg-red-400 text-white px-2 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newService = {...service, benefits: [...(service.benefits || []), '']};
                              updateArrayItem('services', idx, 'benefits', newService.benefits);
                            }} 
                            className="text-sm text-green-600"
                          >
                            + Add Benefit
                          </button>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Documents Required</label>
                          {service.documentsRequired?.map((d, didx) => (
                            <div key={didx} className="flex gap-2 mb-1">
                              <input 
                                type="text" 
                                placeholder="Document" 
                                value={d} 
                                onChange={(e) => {
                                  const newService = {...service, documentsRequired: [...(service.documentsRequired || [])]};
                                  newService.documentsRequired[didx] = e.target.value;
                                  updateArrayItem('services', idx, 'documentsRequired', newService.documentsRequired);
                                }} 
                                className="flex-1 px-3 py-1 border rounded-lg"
                              />
                              <button 
                                onClick={() => {
                                  const newService = {...service, documentsRequired: (service.documentsRequired || []).filter((_,i)=>i!==didx)};
                                  updateArrayItem('services', idx, 'documentsRequired', newService.documentsRequired);
                                }} 
                                className="bg-red-400 text-white px-2 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newService = {...service, documentsRequired: [...(service.documentsRequired || []), '']};
                              updateArrayItem('services', idx, 'documentsRequired', newService.documentsRequired);
                            }} 
                            className="text-sm text-green-600"
                          >
                            + Add Document
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('services', { name: '', description: '', category: 'aeps', benefits: [], documentsRequired: [], isFeatured: false })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Service
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'partners' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Partners</h2>
                <div className="space-y-6">
                  {content?.partners?.map((partner, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Partner {idx+1}</h3>
                        <button onClick={() => removeArrayItem('partners', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text" 
                            placeholder="Partner Name" 
                            value={partner.name} 
                            onChange={(e) => updateArrayItem('partners', idx, 'name', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Logo URL</label>
                          <input 
                            type="text" 
                            placeholder="Logo URL" 
                            value={partner.logo} 
                            onChange={(e) => updateArrayItem('partners', idx, 'logo', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea 
                            placeholder="Description" 
                            value={partner.description || ''} 
                            onChange={(e) => updateArrayItem('partners', idx, 'description', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Benefits</label>
                          {partner.benefits?.map((b, bidx) => (
                            <div key={bidx} className="flex gap-2 mb-1">
                              <input 
                                type="text" 
                                placeholder="Benefit" 
                                value={b} 
                                onChange={(e) => {
                                  const newPartner = {...partner, benefits: [...(partner.benefits || [])]};
                                  newPartner.benefits[bidx] = e.target.value;
                                  updateArrayItem('partners', idx, 'benefits', newPartner.benefits);
                                }} 
                                className="flex-1 px-3 py-1 border rounded-lg"
                              />
                              <button 
                                onClick={() => {
                                  const newPartner = {...partner, benefits: (partner.benefits || []).filter((_,i)=>i!==bidx)};
                                  updateArrayItem('partners', idx, 'benefits', newPartner.benefits);
                                }} 
                                className="bg-red-400 text-white px-2 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newPartner = {...partner, benefits: [...(partner.benefits || []), '']};
                              updateArrayItem('partners', idx, 'benefits', newPartner.benefits);
                            }} 
                            className="text-sm text-green-600"
                          >
                            + Add Benefit
                          </button>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Eligibility</label>
                          {partner.eligibility?.map((e, eidx) => (
                            <div key={eidx} className="flex gap-2 mb-1">
                              <input 
                                type="text" 
                                placeholder="Eligibility" 
                                value={e} 
                                onChange={(e) => {
                                  const newPartner = {...partner, eligibility: [...(partner.eligibility || [])]};
                                  newPartner.eligibility[eidx] = e.target.value;
                                  updateArrayItem('partners', idx, 'eligibility', newPartner.eligibility);
                                }} 
                                className="flex-1 px-3 py-1 border rounded-lg"
                              />
                              <button 
                                onClick={() => {
                                  const newPartner = {...partner, eligibility: (partner.eligibility || []).filter((_,i)=>i!==eidx)};
                                  updateArrayItem('partners', idx, 'eligibility', newPartner.eligibility);
                                }} 
                                className="bg-red-400 text-white px-2 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newPartner = {...partner, eligibility: [...(partner.eligibility || []), '']};
                              updateArrayItem('partners', idx, 'eligibility', newPartner.eligibility);
                            }} 
                            className="text-sm text-green-600"
                          >
                            + Add Eligibility
                          </button>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Registration Process</label>
                          {partner.registrationProcess?.map((p, pidx) => (
                            <div key={pidx} className="flex gap-2 mb-1">
                              <input 
                                type="text" 
                                placeholder="Step" 
                                value={p} 
                                onChange={(e) => {
                                  const newPartner = {...partner, registrationProcess: [...(partner.registrationProcess || [])]};
                                  newPartner.registrationProcess[pidx] = e.target.value;
                                  updateArrayItem('partners', idx, 'registrationProcess', newPartner.registrationProcess);
                                }} 
                                className="flex-1 px-3 py-1 border rounded-lg"
                              />
                              <button 
                                onClick={() => {
                                  const newPartner = {...partner, registrationProcess: (partner.registrationProcess || []).filter((_,i)=>i!==pidx)};
                                  updateArrayItem('partners', idx, 'registrationProcess', newPartner.registrationProcess);
                                }} 
                                className="bg-red-400 text-white px-2 rounded"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newPartner = {...partner, registrationProcess: [...(partner.registrationProcess || []), '']};
                              updateArrayItem('partners', idx, 'registrationProcess', newPartner.registrationProcess);
                            }} 
                            className="text-sm text-green-600"
                          >
                            + Add Step
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('partners', { name: '', logo: '', benefits: [], eligibility: [], registrationProcess: [] })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Partner
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'team' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Team Members</h2>
                <div className="space-y-6">
                  {content?.team?.map((member, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Member {idx+1}</h3>
                        <button onClick={() => removeArrayItem('team', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text" 
                            placeholder="Name" 
                            value={member.name} 
                            onChange={(e) => updateArrayItem('team', idx, 'name', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Experience</label>
                          <input 
                            type="text" 
                            placeholder="Experience" 
                            value={member.experience} 
                            onChange={(e) => updateArrayItem('team', idx, 'experience', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Role</label>
                          <input 
                            type="text" 
                            placeholder="Role" 
                            value={member.role} 
                            onChange={(e) => updateArrayItem('team', idx, 'role', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Photo</label>
                          <div className="flex flex-wrap items-center gap-4">
                            {/* Preview */}
                            {member.image ? (
                              <img
                                src={member.image}
                                alt="preview"
                                className="w-20 h-20 rounded-full object-cover border-2 border-blue-300 shadow"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                                No Photo
                              </div>
                            )}
                            {/* File picker */}
                            <div className="flex-1">
                              <label
                                htmlFor={`team-img-${idx}`}
                                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Choose Photo
                              </label>
                              <input
                                id={`team-img-${idx}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) uploadTeamImage(file, idx);
                                }}
                              />
                              {member.image && (
                                <p className="mt-1 text-xs text-gray-500 truncate max-w-xs" title={member.image}>
                                  {member.image.startsWith('http://localhost') ? '✅ Uploaded' : member.image.split('/').pop()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">LinkedIn</label>
                          <input 
                            type="text" 
                            placeholder="LinkedIn URL" 
                            value={member.socialLinks?.linkedin || ''} 
                            onChange={(e) => {
                              const newMember = {...member, socialLinks: {...member.socialLinks, linkedin: e.target.value}};
                              updateArrayItem('team', idx, 'socialLinks', newMember.socialLinks);
                            }} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Facebook</label>
                          <input 
                            type="text" 
                            placeholder="Facebook URL" 
                            value={member.socialLinks?.facebook || ''} 
                            onChange={(e) => {
                              const newMember = {...member, socialLinks: {...member.socialLinks, facebook: e.target.value}};
                              updateArrayItem('team', idx, 'socialLinks', newMember.socialLinks);
                            }} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Instagram</label>
                          <input 
                            type="text" 
                            placeholder="Instagram URL" 
                            value={member.socialLinks?.instagram || ''} 
                            onChange={(e) => {
                              const newMember = {...member, socialLinks: {...member.socialLinks, instagram: e.target.value}};
                              updateArrayItem('team', idx, 'socialLinks', newMember.socialLinks);
                            }} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Twitter</label>
                          <input 
                            type="text" 
                            placeholder="Twitter URL" 
                            value={member.socialLinks?.twitter || ''} 
                            onChange={(e) => {
                              const newMember = {...member, socialLinks: {...member.socialLinks, twitter: e.target.value}};
                              updateArrayItem('team', idx, 'socialLinks', newMember.socialLinks);
                            }} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('team', { name: '', experience: '', role: '', socialLinks: {} })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Member
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'testimonials' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Testimonials</h2>
                <div className="space-y-6">
                  {content?.testimonials?.map((testimonial, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Testimonial {idx+1}</h3>
                        <button onClick={() => removeArrayItem('testimonials', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text" 
                            placeholder="Name" 
                            value={testimonial.name} 
                            onChange={(e) => updateArrayItem('testimonials', idx, 'name', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="5" 
                            value={testimonial.rating} 
                            onChange={(e) => updateArrayItem('testimonials', idx, 'rating', parseInt(e.target.value))} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Text</label>
                          <textarea 
                            placeholder="Text" 
                            value={testimonial.text} 
                            onChange={(e) => updateArrayItem('testimonials', idx, 'text', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image URL</label>
                          <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={testimonial.image || ''} 
                            onChange={(e) => updateArrayItem('testimonials', idx, 'image', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('testimonials', { name: '', text: '', rating: 5 })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Testimonial
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'gallery' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Gallery</h2>
                <div className="space-y-6">
                  {content?.gallery?.map((item, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Item {idx+1}</h3>
                        <button onClick={() => removeArrayItem('gallery', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <input 
                            type="text" 
                            placeholder="Title" 
                            value={item.title} 
                            onChange={(e) => updateArrayItem('gallery', idx, 'title', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select 
                            value={item.category} 
                            onChange={(e) => updateArrayItem('gallery', idx, 'category', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {['office', 'customers', 'events', 'training', 'certificates', 'meetings', 'videos'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image URL</label>
                          <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={item.imageUrl} 
                            onChange={(e) => updateArrayItem('gallery', idx, 'imageUrl', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Video URL (optional)</label>
                          <input 
                            type="text" 
                            placeholder="Video URL" 
                            value={item.videoUrl || ''} 
                            onChange={(e) => updateArrayItem('gallery', idx, 'videoUrl', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea 
                            placeholder="Description" 
                            value={item.description || ''} 
                            onChange={(e) => updateArrayItem('gallery', idx, 'description', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('gallery', { title: '', category: 'office', imageUrl: '' })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Gallery Item
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'faqs' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">FAQs</h2>
                <div className="space-y-6">
                  {content?.faqs?.map((faq, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">FAQ {idx+1}</h3>
                        <button onClick={() => removeArrayItem('faqs', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select 
                            value={faq.category} 
                            onChange={(e) => updateArrayItem('faqs', idx, 'category', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {['account', 'aeps', 'insurance', 'money-transfer', 'retailer-id', 'pan-card', 'freelancer', 'training', 'commission', 'security', 'general', 'fastag', 'aadhaar', 'recharge', 'bill-payment', 'loan', 'credit-card', 'business', 'computer'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Question</label>
                          <input 
                            type="text" 
                            placeholder="Question" 
                            value={faq.question} 
                            onChange={(e) => updateArrayItem('faqs', idx, 'question', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Answer</label>
                          <textarea 
                            placeholder="Answer" 
                            value={faq.answer} 
                            onChange={(e) => updateArrayItem('faqs', idx, 'answer', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="3"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('faqs', { question: '', answer: '', category: 'general' })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add FAQ
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'blogs' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Blogs</h2>
                <div className="space-y-6">
                  {content?.blogs?.map((blog, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Blog {idx+1}</h3>
                        <button onClick={() => removeArrayItem('blogs', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input 
                              type="text" 
                              placeholder="Title" 
                              value={blog.title} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'title', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input 
                              type="text" 
                              placeholder="Slug" 
                              value={blog.slug} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'slug', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input 
                              type="text" 
                              placeholder="Category" 
                              value={blog.category || ''} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'category', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input 
                              type="text" 
                              placeholder="Author" 
                              value={blog.author || ''} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'author', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input 
                              type="text" 
                              placeholder="Image URL" 
                              value={blog.imageUrl || ''} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'imageUrl', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Excerpt</label>
                            <textarea 
                              placeholder="Excerpt" 
                              value={blog.excerpt || ''} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'excerpt', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                              rows="2"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea 
                              placeholder="Content" 
                              value={blog.content} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'content', e.target.value)} 
                              className="w-full px-3 py-2 border rounded-lg"
                              rows="6"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                            <input 
                              type="text" 
                              placeholder="Tags" 
                              value={blog.tags?.join(', ') || ''} 
                              onChange={(e) => updateArrayItem('blogs', idx, 'tags', e.target.value.split(',').map(t=>t.trim()).filter(t=>t))} 
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('blogs', { title: '', slug: '', excerpt: '', content: '', tags: [] })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Blog
                  </button>
                </div>
              </div>
            )}

            {contentSubTab === 'downloads' && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Downloads</h2>
                <div className="space-y-6">
                  {content?.downloads?.map((download, idx) => (
                    <div key={idx} className="border p-3 sm:p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Download {idx+1}</h3>
                        <button onClick={() => removeArrayItem('downloads', idx)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <input 
                            type="text" 
                            placeholder="Title" 
                            value={download.title} 
                            onChange={(e) => updateArrayItem('downloads', idx, 'title', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select 
                            value={download.category} 
                            onChange={(e) => updateArrayItem('downloads', idx, 'category', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {['forms', 'brochure', 'commission', 'training', 'terms'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">File Type</label>
                          <select 
                            value={download.fileType} 
                            onChange={(e) => updateArrayItem('downloads', idx, 'fileType', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {['pdf', 'doc', 'xlsx', 'image', 'other'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea 
                            placeholder="Description" 
                            value={download.description || ''} 
                            onChange={(e) => updateArrayItem('downloads', idx, 'description', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                            rows="2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">File URL</label>
                          <input 
                            type="text" 
                            placeholder="File URL" 
                            value={download.fileUrl} 
                            onChange={(e) => updateArrayItem('downloads', idx, 'fileUrl', e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addArrayItem('downloads', { title: '', fileUrl: '', category: 'forms', fileType: 'pdf' })} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Add Download
                  </button>
                </div>
              </div>
            )}

            {/* Sticky Save Button */}
            <div className="mt-6 sm:mt-8 sticky bottom-4 z-30">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-60 text-sm sm:text-base"
              >
                {saving ? '⏳ Saving...' : '💾 Save All Changes'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Job Applications</h2>
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app._id} className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold">{app.fullName}</h3>
                    <span className="text-gray-500 text-sm">{new Date(app.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Contact:</strong> {app.contactNumber}</p>
                    <p className="md:col-span-2"><strong>Address:</strong> {app.fullAddress}</p>
                    <p><strong>Pin Code:</strong> {app.pinCode}</p>
                    <p className="md:col-span-2 mt-2"><strong>Details:</strong> {app.details}</p>
                  </div>
                </div>
              ))}
              {applications.length === 0 && <p className="text-gray-500">No applications yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg._id} className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold">{msg.name}</h3>
                    <span className="text-gray-500 text-sm">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    {msg.email && <p><strong>Email:</strong> {msg.email}</p>}
                    {msg.contactNumber && <p><strong>Contact:</strong> {msg.contactNumber}</p>}
                    <p className="md:col-span-2 mt-2"><strong>Query:</strong> {msg.query}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
