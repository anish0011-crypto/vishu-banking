function Testimonials() {
  const reviews = [
    { name: 'Avinash Kumar Gupta', text: 'This company has an awesome team and dedicated staff. I am very impressed by their vision, hard work, outstanding performance, and wonderful teammates. Their reputation is well-earned.' },
    { name: 'Arpita Gupta', text: 'It\'s a rare thing to discover a bank that genuinely cares about the people. Vishwajeet banking point serves all kinds of banking services. They always showed me kindness, respect and a friendly smile.' },
    { name: 'Dr. Shushil', text: 'Vishwajeet banking point has a wonderful staff of kind and helpful people. Their locations are very clean, comfortable, friendly and beautiful. If only every other business were to conduct the same level of customer service.' },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-fade-in text-center">
      <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">Customer's Feedback</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Some valuable feedback from some of our valuable customers</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-soft border border-gray-100 dark:border-dark-border text-left">
            <div className="flex text-yellow-400 mb-4">
               {'★★★★★'.split('').map((s, idx) => <span key={idx}>{s}</span>)}
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{r.text}"</p>
            <div className="font-bold text-gray-900 dark:text-white">- {r.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Testimonials;