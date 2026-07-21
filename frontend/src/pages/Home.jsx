import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const servicesList = [
    { title: "Aadhaar Services", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", desc: "Fast and reliable Aadhaar updates and prints." },
    { title: "PAN Card", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", desc: "Instant PAN application and correction services." },
    { title: "Banking Services", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z", desc: "Comprehensive banking for all your needs." },
    { title: "Money Transfer", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", desc: "Secure and instant domestic money transfers." },
    { title: "AEPS", icon: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4", desc: "Aadhaar Enabled Payment System for easy withdrawals." },
    { title: "Insurance Services", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", desc: "Protect your future with our insurance plans." },
  ];

  const highlights = [
    { title: "Trusted Service", stat: "100%", desc: "Verified operations" },
    { title: "Fast Processing", stat: "< 24h", desc: "Quick turnaround" },
    { title: "Secure Tx", stat: "AES", desc: "Bank-grade security" },
    { title: "Customer Sat.", stat: "4.9/5", desc: "Based on 10k+ reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-sans">
      
      {/* Elegant Corporate Hero Section */}
      <section id="home" className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 px-4 sm:px-6 lg:px-8 bg-corporate-900 clip-diagonal animate-fade-in-up">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary-light mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></span>
              Your Premier Digital Banking Partner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6 leading-tight">
              Transforming Digital <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">Financial Services.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Vishwajeet Banking Point provides highly secure, ultra-fast, and deeply reliable banking, Aadhaar, PAN, and digital government services directly to the community of Ghazipur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <a href="#services" className="bg-primary text-white hover:bg-primary-light px-8 py-4 rounded-md font-semibold text-lg shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1">
                Explore Services
              </a>
              <a href="#contact" className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-md font-semibold text-lg transition-all">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end relative">
             <div className="w-[500px] h-[400px] bg-gradient-to-tr from-primary to-secondary rounded-2xl opacity-20 absolute blur-3xl -z-10"></div>
             <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-float border border-gray-100 relative">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <div>
                    <h4 className="font-heading font-bold text-corporate-900 text-lg">Secure Transfer</h4>
                    <p className="text-xs text-gray-500">AES-256 Encryption Active</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <div className="w-full h-12 bg-corporate-900 rounded-md flex items-center justify-center text-white font-medium shadow-md">Processing Status: Active</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Corporate Features/Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 text-center hover:shadow-float transition-all hover:-translate-y-1">
              <div className="text-3xl font-heading font-extrabold text-primary mb-2">{item.stat}</div>
              <div className="font-bold text-corporate-900 mb-1">{item.title}</div>
              <div className="text-gray-500 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[500px] bg-corporate-100 rounded-2xl overflow-hidden shadow-soft relative">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" alt="Corporate Office" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-corporate-900/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-4xl font-heading font-bold mb-2">5+</div>
                <div className="text-lg">Years of Trust</div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-2xl -z-10 opacity-20 blur-2xl"></div>
          </div>
          
          <div>
            <div className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">About Our Company</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-corporate-900 mb-6">
              Vishwajeet Banking Point: Your Trusted Digital Center
            </h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              As a leading digital banking and service point in Ghazipur, <strong>Vishwajeet Banking Point</strong> is dedicated to delivering professional, swift, and highly secure financial services to our community. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We specialize in bridging the gap between essential government services and local citizens. From Aadhaar and PAN services to seamless Money Transfers and AEPS, our experienced team ensures maximum transparency, efficiency, and customer satisfaction in every transaction.
            </p>
            <ul className="space-y-4 mb-8">
              {["Bank-Grade Security for all Transactions", "Experienced and Supportive Staff", "One-stop destination for all Digital Forms"].map((point, i) => (
                <li key={i} className="flex items-center text-corporate-700 font-medium">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {point}
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center text-primary font-bold hover:text-primary-light transition-colors">
              Contact Our Experts <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid (Trident Inspired) */}
      <section id="services" className="py-24 bg-corporate-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Our Solutions</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-corporate-900 mb-6">Premium Digital Services</h2>
            <p className="text-gray-600 text-lg">We offer a comprehensive suite of banking and digital services tailored to provide convenience, speed, and absolute security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
              <div key={idx} className="service-card group cursor-default">
                <div className="w-14 h-14 bg-corporate-100 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-corporate-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <div className="text-primary font-medium flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
             <div className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Client Testimonials</div>
             <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-corporate-900 mb-6">What Our Clients Say</h2>
             <p className="text-gray-600 text-lg mb-8">Don't just take our word for it. Read what our satisfied customers have to say about our fast and secure services.</p>
             <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center font-bold text-gray-500 text-xs">{i}</div>)}
               </div>
               <div className="text-sm font-bold text-corporate-900">Over 5,000+ Happy Clients</div>
             </div>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
             <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100">
                <div className="flex text-accent mb-4">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-gray-600 mb-6 italic">"Vishwajeet Banking Point is extremely reliable. I got my PAN card updated seamlessly and the staff was very professional."</p>
                <div className="font-bold text-corporate-900">- Ramesh Kumar</div>
             </div>
             <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100">
                <div className="flex text-accent mb-4">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-gray-600 mb-6 italic">"Best digital service center in Ghazipur. The money transfer service is instant and highly secure. Highly recommended."</p>
                <div className="font-bold text-corporate-900">- Suresh Singh</div>
             </div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 shadow-float rounded-2xl overflow-hidden border border-gray-100">
            
            {/* Contact Details side */}
            <div className="bg-corporate-900 text-white p-10 sm:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full opacity-10 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4 relative z-10">Get in Touch</h2>
              <p className="text-gray-400 mb-12 text-lg relative z-10">
                Reach out to us for any banking queries, document updates, or digital services.
              </p>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Business Address</h4>
                    <p className="text-gray-400">Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <p className="text-gray-400 font-mono">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-primary-light">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p className="text-gray-400 font-mono">contact@vishwajeetbanking.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Side */}
            <div className="bg-gray-100 min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.4184646797177!2d83.74315257444736!3d25.52352227749842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e21a2b918f6d7%3A0x643190ab7a6beeb2!2sDildar%20Nagar%2C%20Uttar%20Pradesh%20232326!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Home;