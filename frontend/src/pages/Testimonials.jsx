import { motion } from 'framer-motion';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Avinash Kumar Gupta',
      text: 'This company has an awesome team and dedicated staff. I am very impressed by their vision, hard work, outstanding performance, and wonderful teammates. Their reputation is well-earned.',
      rating: 5,
      date: 'March 12, 2026'
    },
    {
      id: 2,
      name: 'Arpita Gupta',
      text: 'It\'s a rare thing to discover a bank that genuinely cares about the people. Vishwajeet banking point serves all kinds of banking services. They always showed me kindness, respect and a friendly smile. I can\'t recommend them enough for all your banking needs. You won\'t be disappointed.',
      rating: 5,
      date: 'April 05, 2026'
    },
    {
      id: 3,
      name: 'Dr. Shushil',
      text: 'Vishwajeet banking point has a wonderful staff of kind and helpful people. Their locations are very clean, comfortable, friendly and beautiful. If only every other business were to conduct the same level of customer service. The world would be a much friendlier one.',
      rating: 5,
      date: 'June 22, 2026'
    },
    {
      id: 4,
      name: 'Ramesh Singh',
      text: 'The AEPS and Micro ATM services provided by them have completely changed how I manage cash for my small business. Extremely fast processing and their customer support is always ready to help.',
      rating: 5,
      date: 'July 10, 2026'
    },
    {
      id: 5,
      name: 'Pooja Verma',
      text: 'Got my Google Pay Business QR code set up within a day. The team was very professional and explained everything clearly. Very happy with the fast and secure service.',
      rating: 4,
      date: 'July 28, 2026'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-dark-bg transition-colors duration-300 min-h-screen pb-20">
      <div className="bg-blue-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">Customer Feedback</h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
          Don't just take our word for it. Here is some valuable feedback from our satisfied customers who trust us for their daily banking and digital needs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-blue-500 text-5xl leading-none font-serif opacity-30">"</div>
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-8 flex-grow leading-relaxed">
                {testimonial.text}
              </p>
              <div className="mt-auto flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shadow-inner">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;