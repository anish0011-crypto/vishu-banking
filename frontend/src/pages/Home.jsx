import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingButtons from '../components/FloatingButtons';

function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [jobForm, setJobForm] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    fullAddress: '',
    pinCode: '',
    details: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    query: ''
  });
  const [jobMessage, setJobMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/content');
        setContent(res.data);
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/applications/jobs', jobForm);
      setJobMessage('Application submitted successfully!');
      setJobForm({ fullName: '', email: '', contactNumber: '', fullAddress: '', pinCode: '', details: '' });
      setTimeout(() => setJobMessage(''), 3000);
    } catch (err) {
      setJobMessage('Error submitting application.');
      console.error(err);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/applications/contact', contactForm);
      setContactMessage('Message sent successfully!');
      setContactForm({ name: '', email: '', contactNumber: '', query: '' });
      setTimeout(() => setContactMessage(''), 3000);
    } catch (err) {
      setContactMessage('Error sending message.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-blue-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  const { hero, about, stats, services, partners, team, testimonials, gallery, faqs, blogs, downloads } = content || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp">
            <p className="text-blue-600 font-semibold text-lg mb-2">{hero?.greeting}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {hero?.title}
            </h1>
            {hero?.subtitle && (
              <p className="text-xl text-gray-600 mb-2">{hero.subtitle}</p>
            )}
            {hero?.tagline && (
              <p className="text-lg text-gray-500 mb-8">{hero.tagline}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Our Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                Contact Us
              </button>
            </div>
            {hero?.image && (
              <div className="mt-12">
                <img 
                  src={hero.image} 
                  alt="Hero" 
                  className="mx-auto max-w-md rounded-2xl shadow-2xl" 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.happyCustomers || 5000}+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.teamMembers || 10}+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.yearsExperience || 7}+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.bankingServices || 20}+</div>
              <div className="text-blue-100">Banking Services</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.retailPartners || 500}+</div>
              <div className="text-blue-100">Retail Partners</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats?.customerSupport || '24×7'}</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{about?.title || 'About Us'}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {about?.profileImage && (
                <img 
                  src={about.profileImage} 
                  alt="About" 
                  className="rounded-2xl shadow-xl w-full max-w-md mx-auto" 
                />
              )}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">{about?.name}</h3>
              <p className="text-gray-600 leading-relaxed">{about?.description}</p>
              {about?.mission && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Mission</h4>
                  <p className="text-gray-700">{about.mission}</p>
                </div>
              )}
              {about?.vision && (
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-indigo-900 mb-2">Vision</h4>
                  <p className="text-gray-700">{about.vision}</p>
                </div>
              )}
              {about?.whyChooseUs?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h4>
                  <ul className="space-y-2">
                    {about.whyChooseUs.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {about?.gstNumber && (
                <p className="text-gray-600"><strong>GST Number:</strong> {about.gstNumber}</p>
              )}
              {about?.contact && (
                <p className="text-gray-600"><strong>Contact:</strong> {about.contact}</p>
              )}
              {about?.email && (
                <p className="text-gray-600"><strong>Email:</strong> {about.email}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Do We Offer?</h2>
            <p className="text-gray-600 text-lg">Our company offers all type of banking services and work opportunities in marketing.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fadeInUp" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.imageUrl && (
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-40 object-cover rounded-xl mb-6" 
                  />
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.benefits?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Know More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners?.map((partner, idx) => (
              <div key={idx} className="border rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="h-32 flex items-center justify-center mb-4">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-4xl font-bold text-gray-400">{partner.name.charAt(0)}</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                {partner.description && <p className="text-gray-600 text-sm mb-4">{partner.description}</p>}
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Know More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 text-lg">A family of {team?.length || 10}+ members</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team?.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.experience}</p>
                <div className="flex justify-center gap-3">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} className="text-gray-500 hover:text-blue-600">
                      LinkedIn
                    </a>
                  )}
                  {member.socialLinks?.facebook && (
                    <a href={member.socialLinks.facebook} className="text-gray-500 hover:text-blue-600">
                      Facebook
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} className="text-gray-500 hover:text-blue-600">
                      Instagram
                    </a>
                  )}
                </div>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="mt-4 text-blue-600 font-semibold hover:text-blue-800"
                >
                  Know More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Section */}
      <section id="hiring" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-gray-600 text-lg">Apply for BDE (Business Development Executive), Freelancer, Promoter, and more!</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            {jobMessage && (
              <div className={`mb-4 p-4 rounded-lg ${jobMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {jobMessage}
              </div>
            )}
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={jobForm.fullName} 
                  onChange={(e) => setJobForm({...jobForm, fullName: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={jobForm.email} 
                  onChange={(e) => setJobForm({...jobForm, email: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Contact Number" 
                  required 
                  value={jobForm.contactNumber} 
                  onChange={(e) => setJobForm({...jobForm, contactNumber: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <input 
                  type="text" 
                  placeholder="Pin Code" 
                  required 
                  value={jobForm.pinCode} 
                  onChange={(e) => setJobForm({...jobForm, pinCode: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <textarea 
                placeholder="Full Address" 
                required 
                value={jobForm.fullAddress} 
                onChange={(e) => setJobForm({...jobForm, fullAddress: e.target.value})} 
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                rows={2} 
              />
              <textarea 
                placeholder="Tell us about yourself..." 
                value={jobForm.details} 
                onChange={(e) => setJobForm({...jobForm, details: e.target.value})} 
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                rows={4} 
              />
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Apply Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer's Feedback</h2>
            <p className="text-gray-600 text-lg">Some valuable feedback from our valuable customers</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="text-yellow-500 text-2xl">★★★★★</div>
              <div className="text-gray-600 font-semibold">4.9/5 Rating</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl shadow-lg">
                <div className="text-yellow-500 text-xl mb-4">
                  {'★'.repeat(testimonial.rating || 5)}{'☆'.repeat(5 - (testimonial.rating || 5))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery?.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                  {item.description && <p className="text-gray-600 text-sm mt-2">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqs?.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
                {faq.category && (
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                    {faq.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs?.slice(0, 3).map((blog, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                {blog.imageUrl && (
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-3">
                      {blog.category}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                  {blog.excerpt && <p className="text-gray-600 mb-4">{blog.excerpt}</p>}
                  {blog.author && (
                    <p className="text-gray-500 text-sm mb-4">By {blog.author}</p>
                  )}
                  <button className="text-blue-600 font-semibold hover:text-blue-800">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg">For more information, please contact us</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                {about?.contact && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact No.</h4>
                      <p className="text-gray-600">{about.contact}</p>
                    </div>
                  </div>
                )}
                {about?.email && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">{about.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl">
              {contactMessage && (
                <div className={`mb-4 p-4 rounded-lg ${contactMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {contactMessage}
                </div>
              )}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  required 
                  value={contactForm.name} 
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="email" 
                    placeholder="Email (optional)" 
                    value={contactForm.email} 
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})} 
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <input 
                    type="text" 
                    placeholder="Contact number" 
                    value={contactForm.contactNumber} 
                    onChange={(e) => setContactForm({...contactForm, contactNumber: e.target.value})} 
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <textarea 
                  placeholder="Your query..." 
                  required 
                  value={contactForm.query} 
                  onChange={(e) => setContactForm({...contactForm, query: e.target.value})} 
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  rows={4} 
                />
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FloatingButtons />
    </div>
  );
}

export default Home;
