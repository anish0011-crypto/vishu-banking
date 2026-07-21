import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-fade-in text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-8">About Vishwajeet Banking Point</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg leading-relaxed mb-6">
            Vishwajeet Banking Point is a leading financial and digital services provider operating out of Ghazipur, Uttar Pradesh. Our mission is to bridge the gap between essential banking services and the local community through technology and trusted partnerships.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            We hold official distributorships and management roles with India's top fintech and payments platforms, ensuring that every transaction is secure, fast, and fully verified.
          </p>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white mt-10">Our Core Features</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><span className="text-blue-500">✓</span> Trusted Banking Service</li>
            <li className="flex items-center gap-3"><span className="text-blue-500">✓</span> Secure & Encrypted Transactions</li>
            <li className="flex items-center gap-3"><span className="text-blue-500">✓</span> Fast Processing & Immediate Support</li>
            <li className="flex items-center gap-3"><span className="text-blue-500">✓</span> Experienced Financial Team</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-dark-surface p-8 rounded-xl">
           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Official Partnerships</h3>
           <ul className="space-y-4 font-medium">
             <li className="p-4 bg-white dark:bg-dark-bg rounded shadow-sm">Airtel Payments Bank (Manager)</li>
             <li className="p-4 bg-white dark:bg-dark-bg rounded shadow-sm">Google Pay Business (BDE)</li>
             <li className="p-4 bg-white dark:bg-dark-bg rounded shadow-sm">RapiPay Fintech (Distributor)</li>
             <li className="p-4 bg-white dark:bg-dark-bg rounded shadow-sm">ReliPay (Distributor)</li>
             <li className="p-4 bg-white dark:bg-dark-bg rounded shadow-sm">PhonePe Business (Distributor)</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
export default About;