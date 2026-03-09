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

const Fondatrice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          {/* MANIFESTO */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
          >
            Le Manifeste
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-brand-lg text-lg md:text-xl mb-14"
          >
            LOVCICOV
          </motion.h2>
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
            <p className="text-foreground uppercase tracking-[0.1em] mt-6">
              LOVCICOV incarne une manière d'être, plus qu'une tendance.
            </p>
          </motion.div>

          {/* SEPARATOR */}
          <div className="border-t border-border my-20 md:my-28" />

          {/* LA FONDATRICE */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
          >
            La Fondatrice
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-brand-lg text-lg md:text-xl mb-14"
          >
            Georgiana Lovcicov
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>LOVCICOV a été fondé par Georgiana Lovcicov avec le désir de créer un univers où esthétique et sens se rencontrent.</p>
            <p>Inspirée par les symboles intemporels, les pierres naturelles et les objets porteurs d'histoire, elle imagine des créations qui allient caractère et raffinement.</p>
            <p>Chaque pièce est conçue comme un objet singulier, pensé pour traverser le temps et accompagner une identité affirmée.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic mt-6">
              À travers LOVCICOV, Georgiana Lovcicov propose une vision du style où la présence devient une signature.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
