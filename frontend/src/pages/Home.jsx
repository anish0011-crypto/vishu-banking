import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const servicesList = [
    { title: "Aadhaar Services", icon: "📄" },
    { title: "PAN Card", icon: "🪪" },
    { title: "Banking Services", icon: "🏦" },
    { title: "Money Transfer", icon: "💸" },
    { title: "AEPS", icon: "🏧" },
    { title: "Mini Statement", icon: "🧾" },
    { title: "Cash Withdrawal", icon: "💵" },
    { title: "Bill Payments", icon: "⚡" },
    { title: "Insurance Services", icon: "🛡️" },
    { title: "GST & Gov Services", icon: "🏛️" },
    { title: "Online Form Filling", icon: "📝" },
    { title: "Other Digital Services", icon: "🌐" },
  ];

  const highlights = [
    { title: "Trusted Service", stat: "100%", desc: "Verified operations" },
    { title: "Fast Processing", stat: "< 24h", desc: "Quick turnaround" },
    { title: "Secure Tx", stat: "AES", desc: "Bank-grade security" },
    { title: "Customer Sat.", stat: "4.9/5", desc: "Based on 10k+ reviews" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          Your Premier Digital Banking Partner in Ghazipur
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8">
          Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Banking</span> <br className="hidden sm:block"/> Solutions.
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-12 font-medium leading-relaxed">
          Experience seamless money transfers, Aadhaar services, form filling, and essential government services right at your fingertips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#services" className="bg-white text-background hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2">
            Explore Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
          <a href="#contact" className="bg-surface border border-white/10 hover:border-white/20 hover:bg-white/5 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center">
            Contact Us
          </a>
        </div>
      </section>

      {/* About Section (Massive Overhaul) */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">About Vishwajeet Banking Point</h2>
          <div className="w-20 h-1.5 bg-primary rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="bento-card p-8 sm:p-12 h-full flex flex-col justify-center bg-gradient-to-br from-surface to-[#1a1a1a]">
            <h3 className="text-2xl font-bold mb-6 text-white">Your Trusted Service Center</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Vishwajeet Banking Point is a premier digital banking and government service center dedicated to bridging the digital divide. We provide secure, fast, and highly reliable financial solutions to our local community in Dildarnagar, Ghazipur.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              From AEPS and money transfers to essential documentation like PAN and Aadhaar services, we operate with maximum transparency and dedication. Our highly experienced support ensures that every customer leaves satisfied and empowered.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-full">
            {highlights.map((item, idx) => (
              <div key={idx} className="bento-card p-6 flex flex-col justify-center text-center">
                <div className="text-3xl font-mono font-bold text-primary mb-2">{item.stat}</div>
                <div className="text-white font-bold mb-1">{item.title}</div>
                <div className="text-gray-500 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Comprehensive Digital Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {servicesList.map((service, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1">
                <span className="text-3xl sm:text-4xl mb-3">{service.icon}</span>
                <span className="text-sm font-semibold text-gray-200 leading-tight">{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bento-card p-0 overflow-hidden flex flex-col lg:flex-row relative">
          
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-surface relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">Visit Us</h2>
            <p className="text-gray-400 mb-10 text-lg">
              We are strategically located in the heart of the city to serve you better. Drop by for any inquiries or services.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Business Address</h4>
                  <p className="text-gray-400">Main Market, Nearby Sabji Mandi, Dildarnagar, Ghazipur, Uttar Pradesh – 232326</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p className="text-gray-400 font-mono">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-gray-400 font-mono">contact@vishwajeetbanking.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 h-[400px] lg:h-auto min-h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.4184646797177!2d83.74315257444736!3d25.52352227749842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e21a2b918f6d7%3A0x643190ab7a6beeb2!2sDildar%20Nagar%2C%20Uttar%20Pradesh%20232326!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Home;