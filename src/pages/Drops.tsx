import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

const Drops = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2026-07-01T00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2 text-white/60">
        {label}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero header */}
        <section className="pt-32 md:pt-36 pb-16 px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
            >
              Édition Limitée
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-brand-lg text-xl md:text-2xl tracking-[0.15em] mb-6"
            >
              LES DROPS LOVCICOV
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-brand text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Des pièces en édition limitée, disponibles pour une durée limitée.
            </motion.p>
          </div>
        </section>

        {/* Countdown section */}
        <section className="bg-black text-white py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-12"
            >
              Prochain Drop
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-brand-lg text-lg md:text-xl tracking-[0.15em] mb-16"
            >
              JUILLET 2026
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="flex items-center justify-center gap-6 md:gap-12"
            >
              <TimeUnit value={timeLeft.days} label="Jours" />
              <span className="text-2xl md:text-4xl text-white/30 -mt-6">:</span>
              <TimeUnit value={timeLeft.hours} label="Heures" />
              <span className="text-2xl md:text-4xl text-white/30 -mt-6">:</span>
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <span className="text-2xl md:text-4xl text-white/30 -mt-6">:</span>
              <TimeUnit value={timeLeft.seconds} label="Secondes" />
            </motion.div>
          </div>
        </section>

        {/* Email signup */}
        <section className="py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-md mx-auto text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-brand text-sm text-muted-foreground mb-10"
            >
              Soyez notifié en avant-première
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand text-muted-foreground"
              >
                <p>Vous êtes inscrit(e). Merci.</p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="w-full px-5 py-3.5 bg-white border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-center"
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3.5 bg-foreground text-background text-brand text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-foreground/90"
                >
                  Je m&apos;inscris
                </button>
              </motion.form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Drops;
