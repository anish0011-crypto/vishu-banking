import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Team() {
  const navigate = useNavigate();
  const team = [
    { id: 1, name: 'Shashi Prakash Singh', role: 'Team Leader', exp: '5+ years of experience', emoji: '👨‍💼', desc: 'Expert in managing large teams and driving strategic banking operations across the region.' },
    { id: 2, name: 'Vivekanand', role: 'Team Leader', exp: '6+ years of experience', emoji: '👨‍💼', desc: 'Specializes in business development and ensuring seamless service delivery to our partners.' },
    { id: 3, name: 'Rajat Raj', role: 'Digital Marketing', exp: '5+ years of experience', emoji: '👨‍💻', desc: 'Leading our digital outreach, marketing campaigns, and brand presence online.' },
    { id: 4, name: 'Ramji Gupta', role: 'Accountant', exp: '7+ years of experience', emoji: '👨‍💼', desc: 'Manages all financial records, compliance, and accounting operations with precision.' },
    { id: 5, name: 'Vinay Kumar Singh', role: 'Area Sales Manager', exp: '4+ years of experience', emoji: '👨‍💼', desc: 'Drives regional sales, merchant onboarding, and expands our footprint in the market.' },
    { id: 6, name: 'Ritik Kumar Gupta', role: 'Assistant Accountant', exp: '4+ years of experience', emoji: '👨‍💼', desc: 'Assists in financial reporting, daily ledger maintenance, and auditing.' },
    { id: 7, name: 'Satyam Gupta', role: 'Bussiness Development Executive', exp: '2+ years of experience', emoji: '👨‍💼', desc: 'Focuses on client acquisition and promoting Google Pay & PhonePe business solutions.' },
    { id: 8, name: 'Rohit Gupta', role: 'Bussiness Development Executive', exp: '2+ years of experience', emoji: '👨‍💼', desc: 'Active in the field, setting up soundboxes, QRs, and onboarding new merchants.' },
    { id: 9, name: 'Akash Kasaudhan', role: 'Service BDE', exp: '2+ years of experience', emoji: '👨‍💼', desc: 'Provides dedicated service and support to our existing business clients.' },
    { id: 10, name: 'Ramu Verma', role: 'Promoter', exp: '5+ years of experience', emoji: '👨‍💼', desc: 'Promotes Vishwajeet Banking Point services and builds community relations.' }
  ];

  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-300 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Meet Our Team</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          A dedicated family of 10+ professionals working tirelessly to provide you with the best digital banking and fintech services.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="w-24 h-24 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-2">{member.role}</p>
                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400 font-medium mb-4">
                  {member.exp}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow">
                  {member.desc}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-colors">
                    <i className="fab fa-linkedin-in text-sm"></i>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-colors">
                    <i className="fas fa-envelope text-sm"></i>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;