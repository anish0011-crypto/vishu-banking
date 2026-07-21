import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import toast from 'react-hot-toast';

function Career() {
  const [formData, setFormData] = useState({ name:'', email:'', mobile:'', address:'', pincode:'', aboutYourself:'' });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!resume) { toast.error('Please upload your resume'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('file', resume);
      const uploadRes = await api.post('/upload', fd);
      const resumeUrl = uploadRes.data.url;

      await api.post('/content/career', { ...formData, resumeUrl });
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({ name:'', email:'', mobile:'', address:'', pincode:'', aboutYourself:'' });
      setResume(null);
      e.target.reset();
    } catch(err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">We are Hiring</p>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">Join Our Team</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Apply for BDE (Business Development Executive), Freelancer, or Promoter positions and grow with us.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Mobile Number <span className="text-red-500">*</span></label>
              <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">PIN Code <span className="text-red-500">*</span></label>
              <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Full Address <span className="text-red-500">*</span></label>
            <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Resume Upload (PDF/DOC) <span className="text-red-500">*</span></label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setResume(e.target.files[0])} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-dark-bg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-blue-300" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">About Yourself</label>
            <textarea name="aboutYourself" value={formData.aboutYourself} onChange={handleChange} rows="4" placeholder="Tell us about your experience, skills..." className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? (<><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Submitting...</>) : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
export default Career;