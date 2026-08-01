import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

import api from '../api';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const messageData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        subject: 'General Inquiry',
        message: formData.query
      };
      
      await api.post('/applications/contact', messageData);
      
      toast.success('Message sent successfully! We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', query: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200 transition-colors duration-300 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-blue-900 to-sky-800 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Get in Touch</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          For more information, partnerships, or any queries, please reach out to us. We are here to help you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 -mt-6 sm:-mt-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
              Have questions about our banking services, partnerships, or career opportunities? Fill out the form or reach out directly using the information below. We aim to respond to all inquiries within 24 hours.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4 sm:gap-6 bg-gray-50 dark:bg-dark-surface p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex-col sm:flex-row">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl sm:text-2xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Phone</h4>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">9506562637</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Available Mon-Sat, 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 sm:gap-6 bg-gray-50 dark:bg-dark-surface p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex-col sm:flex-row">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xl sm:text-2xl flex-shrink-0">
                  ✉️
                </div>
                <div className="overflow-hidden w-full">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Email</h4>
                  <a href="mailto:vishwajeetbankingpoint@gmail.com" className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline break-all">
                    vishwajeetbankingpoint@gmail.com
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">For general inquiries and support</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 bg-gray-50 dark:bg-dark-surface p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-soft flex-col sm:flex-row">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xl sm:text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Address</h4>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium leading-relaxed">
                    Main Market, Nearby Sabji Mandi<br/>
                    Dildarnagar, Ghazipur<br/>
                    Uttar Pradesh – 232326
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Contact number *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email (optional)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your query... *</label>
                  <textarea name="query" required rows="5" value={formData.query} onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full h-14 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;