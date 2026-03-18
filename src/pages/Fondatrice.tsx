import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import fondatriceImg from '@/assets/fondatrice-georgiana.jpg';

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
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em] text-center"
          >
            La Fondatrice
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-brand-lg text-lg md:text-xl mb-16 text-center"
          >
            Georgiana Lovcicov
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
            {/* Photo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="w-full md:w-80 flex-shrink-0"
            >
              <div className="aspect-[2/3.5] overflow-hidden">
                <img
                  src={fondatriceImg}
                  alt="Georgiana Lovcicov, fondatrice de LOVCICOV"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Texte + phrase signature */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-manifeste text-muted-foreground space-y-8 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-8">
                <p>LOVCICOV a été fondé par Georgiana Lovcicov avec le désir de créer un univers où esthétique et sens se rencontrent.</p>
                <p>Inspirée par les symboles intemporels, les pierres naturelles et les objets porteurs d'histoire, elle imagine des créations qui allient caractère et raffinement.</p>
                <p>Chaque pièce est conçue comme un objet singulier, pensé pour traverser le temps et accompagner une identité affirmée.</p>
              </div>
              <p className="text-foreground uppercase tracking-[0.1em] text-sm md:text-base">
                Une vision du style où la présence devient une signature.
              </p>
            </motion.div>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
