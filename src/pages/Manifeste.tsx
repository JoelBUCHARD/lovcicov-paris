import { motion } from 'framer-motion';
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

const Manifeste = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
          >
            Le Manifeste
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-brand-lg text-lg md:text-xl mb-20"
          >
            LOVCICOV
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>LOVCICOV est né d'une vision : celle d'un style qui dépasse les tendances et s'inscrit dans une attitude.</p>
            <p>La marque célèbre les personnalités qui avancent avec assurance, guidées par leurs propres standards.</p>
            <p>Chaque création est pensée comme une signature : une rencontre entre caractère, matière et intention.</p>
            <p>Des pièces conçues pour accompagner celles et ceux qui choisissent d'affirmer leur présence avec simplicité et élégance.</p>
            <p className="text-foreground uppercase tracking-[0.1em] mt-14 text-sm md:text-base whitespace-nowrap">
              LOVCICOV incarne une manière d'être, plus qu'une tendance.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
