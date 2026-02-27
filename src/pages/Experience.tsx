import { motion } from 'framer-motion';
import experienceImage from '@/assets/experience-bg.jpg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const experiences = [
  {
    title: 'Ancrage',
    duration: '2 min',
    description: 'Un reset de conscience corporelle. Sentez votre poids, votre posture, votre souffle.',
  },
  {
    title: 'Présence',
    duration: '3 min',
    description: 'Reconnectez-vous à l\'espace autour de vous. Observez la texture, la température, la tension.',
  },
  {
    title: 'Confiance',
    duration: '2 min',
    description: 'Un recalibrage postural. Alignez votre colonne, ouvrez votre poitrine, installez-vous.',
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="px-6 md:px-12 mb-24 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Expérience</h1>
              <p className="text-muted-foreground text-sm">Des moments pour se recentrer.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={experienceImage}
                  alt="Expérience"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Audio Experiences */}
        <section className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-border py-10 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-light mb-2">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    {exp.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{exp.duration}</span>
                  <button className="border border-foreground px-6 py-2 text-brand text-xs hover:bg-foreground hover:text-background transition-all">
                    Écouter
                  </button>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Experience;
