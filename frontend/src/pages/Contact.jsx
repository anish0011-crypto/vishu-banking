import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import toast from 'react-hot-toast';

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', mobile:'', subject:'', message:'' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/content/contact', form);
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name:'', email:'', mobile:'', subject:'', message:'' });
    } catch(err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon:'📍', title:'Address', detail:'Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326' },
    { icon:'📞', title:'Phone', detail:'9506562637', href:'tel:9506562637' },
    { icon:'✉️', title:'Email', detail:'vishwajeetbankingpoint@gmail.com', href:'mailto:vishwajeetbankingpoint@gmail.com' },
    { icon:'💬', title:'WhatsApp', detail:'9506562637', href:'https://wa.me/919506562637' },
    { icon:'🕒', title:'Business Hours', detail:'Mon - Sat: 9:00 AM – 6:00 PM' },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Contact Us</p>
        <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
        <p className="text-gray-600 dark:text-gray-400">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Contact Form */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1">Name <span className="text-red-500">*</span></label><input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"/></div>
              <div><label className="block text-sm font-semibold mb-1">Email <span className="text-red-500">*</span></label><input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"/></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1">Mobile</label><input type="tel" name="mobile" value={form.mobile} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"/></div>
              <div><label className="block text-sm font-semibold mb-1">Subject</label><input type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"/></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1">Message <span className="text-red-500">*</span></label><textarea required name="message" value={form.message} onChange={handleChange} rows="5" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-blue-500 outline-none"></textarea></div>
            <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? (<><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending...</>) : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="space-y-4">
          {contactInfo.map((c, i) => (
            <div key={i} className="bg-white dark:bg-dark-surface p-5 rounded-xl border border-gray-100 dark:border-dark-border flex items-start gap-4 shadow-soft card-hover">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{c.title}</h4>
                {c.href ? <a href={c.href} className="text-blue-600 hover:underline text-sm">{c.detail}</a> : <p className="text-gray-600 dark:text-gray-400 text-sm">{c.detail}</p>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Google Map */}
      <div className="rounded-2xl overflow-hidden shadow-xl h-80">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.4184646797177!2d83.74315257444736!3d25.52352227749842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e21a2b918f6d7%3A0x643190ab7a6beeb2!2sDildar%20Nagar%2C%20Uttar%20Pradesh%20232326!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
export default Contact;