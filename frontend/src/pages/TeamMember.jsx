import { useParams, useNavigate } from 'react-router-dom';

function TeamMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="py-20 px-4 max-w-3xl mx-auto animate-fade-in text-center">
      <button onClick={() => navigate('/team')} className="text-blue-500 mb-8 flex items-center justify-center mx-auto">&larr; Back to Team</button>
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-6">Team Member Profile</h1>
      <p className="text-gray-600 dark:text-gray-400">Profile page for Member ID: {id}.</p>
    </div>
  );
}
export default TeamMember;