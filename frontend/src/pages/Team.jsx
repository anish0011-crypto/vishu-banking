import { useNavigate } from 'react-router-dom';

function Team() {
  const navigate = useNavigate();
  const team = [
    { id: 1, name: 'Shashi Prakash Singh', role: 'Team Leader', exp: '5+ years' },
    { id: 2, name: 'Vivekanand', role: 'Team Leader', exp: '6+ years' },
    { id: 3, name: 'Rajat Raj', role: 'Digital Marketing', exp: '5+ years' },
    { id: 4, name: 'Ramu Verma', role: 'Promoter', exp: '5+ years' },
    { id: 5, name: 'Satyam Gupta', role: 'BDE', exp: '2+ years' },
    { id: 6, name: 'Ramji Gupta', role: 'Accountant', exp: '7+ years' },
    { id: 7, name: 'Ritik Kumar Gupta', role: 'Asst. Accountant', exp: '4+ years' },
    { id: 8, name: 'Rohit Gupta', role: 'BDE', exp: '2+ years' },
    { id: 9, name: 'Vinay Kumar Singh', role: 'Area Sales Manager', exp: '4+ years' },
    { id: 10, name: 'Akash Kasaudhan', role: 'Service BDE', exp: '2+ years' },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-fade-in text-center">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-12">Our Dedicated Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.map(t => (
          <div key={t.id} className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-6 rounded-xl card-hover">
            <div className="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-4 border-4 border-white dark:border-dark-bg"></div>
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t.exp} Experience</p>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">{t.role}</p>
            <button onClick={() => navigate(`/team/${t.id}`)} className="text-blue-600 font-medium border border-blue-600 px-6 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-sm">Know more</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Team;