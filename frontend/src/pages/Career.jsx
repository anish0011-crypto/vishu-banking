import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

import api from '../api';

function Career() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', pincode: '', role: 'BDE', details: '', resume: null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let resumeUrl = '';
      if (formData.resume) {
        const fileData = new FormData();
        fileData.append('file', formData.resume);
        const res = await api.post('/upload/public', fileData);
        resumeUrl = res.data.url;
      }
      
      const applicationData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        address: formData.address,
        pincode: formData.pincode,
        aboutYourself: formData.details,
        resumeUrl: resumeUrl || 'Not provided'
      };
      
      await api.post('/applications/jobs', applicationData);
      
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', address: '', pincode: '', role: 'BDE', details: '', resume: null });
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-gray-50 dark:bg-dark-bg transition-colors duration-300 min-h-screen pb-20">
      <div className="bg-blue-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">We are Hiring</h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
          Join our growing family at Vishwajeet Banking Point. Build a rewarding career in fintech and digital banking.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
            
            <div className="space-y-6">
              <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Business Development Executive (BDE)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full-time • Field Work</p>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">Urgent</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Responsible for merchant onboarding for Google Pay & PhonePe, setting up QR codes and soundboxes.</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                  <li>• Must have good communication skills</li>
                  <li>• Local area knowledge preferred</li>
                  <li>• Sales experience is a plus</li>
                </ul>
              </motion.div>

              <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.1}} className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Freelancer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Flexible • Remote/Field</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Work on your own terms. Generate leads, onboard merchants, and earn competitive commissions.</p>
              </motion.div>

              <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2}} className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Promoter</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Part-time/Full-time</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Promote our banking services and expand our customer base in designated territories.</p>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 md:p-10 border border-gray-100 dark:border-gray-800">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Apply Online</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Fill out the form below and our HR team will reach out to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Contact number *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                    placeholder="john@example.com" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full address *</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Street, City, State" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Area pin code *</label>
                    <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      placeholder="000000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Applying for *</label>
                  <select name="role" value={formData.role} onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                  >
                    <option value="BDE">Bussiness Development Executive (BDE)</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Promoter">Promoter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Resume Upload (PDF/Word)</label>
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                    className="w-full p-2 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Details about yourself *</label>
                  <textarea name="details" required rows="4" value={formData.details} onChange={handleChange}
                    className="w-full p-4 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Tell us about your experience, qualifications, and why you want to join us..."
                  ></textarea>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full h-14 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Submit Application'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;