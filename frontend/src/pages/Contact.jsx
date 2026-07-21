function Contact() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-fade-in text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4 text-center">Contact Us</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Get in touch with Vishwajeet Banking Point.</p>
      
      <div className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border">
        
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 text-blue-600 rounded-full flex items-center justify-center text-xl">📍</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 text-blue-600 rounded-full flex items-center justify-center text-xl">📞</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-mono">9506562637</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 text-blue-600 rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-mono">vishwajeetbankingpoint@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 text-blue-600 rounded-full flex items-center justify-center text-xl">🕒</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Business Hours</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-96 lg:h-auto rounded-xl overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.4184646797177!2d83.74315257444736!3d25.52352227749842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e21a2b918f6d7%3A0x643190ab7a6beeb2!2sDildar%20Nagar%2C%20Uttar%20Pradesh%20232326!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover dark:filter dark:invert dark:hue-rotate-180"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
export default Contact;