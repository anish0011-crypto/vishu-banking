import { useState } from 'react';

function Career() {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', address: '', pincode: '', message: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application Submitted Successfully!');
  };

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-fade-in text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4 text-center">Join Our Team</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Apply for BDE, Freelancer, or Promoter positions.</p>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg border border-gray-100 dark:border-dark-border space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number <span className="text-red-500">*</span></label>
            <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">PIN Code <span className="text-red-500">*</span></label>
            <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Full Address <span className="text-red-500">*</span></label>
          <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Resume Upload (PDF/DOC) <span className="text-red-500">*</span></label>
          <input required type="file" accept=".pdf,.doc,.docx" className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-dark-bg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message / Details about yourself</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-md shadow-lg hover:bg-blue-700 transition-colors">
          Submit Application
        </button>
      </form>
    </div>
  );
}
export default Career;