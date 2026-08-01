import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, align = 'left', backgroundImage }) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative py-16 md:py-20"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`absolute inset-0 ${backgroundImage ? 'bg-black/60' : 'bg-accent'}`} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${alignClass} max-w-4xl ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading font-extrabold text-white text-4xl sm:text-5xl"
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-4 text-white/80 text-base sm:text-lg"
              >
                {subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

