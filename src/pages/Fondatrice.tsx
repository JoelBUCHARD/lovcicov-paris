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
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em] text-center"
          >
            LA FONDATRICE
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
                <p>LOVCICOV a été fondé par Georgiana Lovcicov — une femme qui a toujours cru que ce qu'on porte dit quelque chose de profond sur qui on est.</p>
                <p>Tout a commencé par l'atelier 1966 et le sur-mesure. Puis les pop-ups — Paris, Bordeaux, la Belgique. Des femmes qui ont traversé des frontières pour porter une pièce qui leur ressemblait vraiment.</p>
                <p>Et puis la vie a tout bousculé. Le mariage. La maternité. Une pause nécessaire pour se retrouver, comprendre ce qu'on veut vraiment créer — et pourquoi.</p>
                <p>Georgiana revient avec encore plus de conviction. Des pièces faites avec intention, contre le jetable, pour les femmes qui avancent. Des bijoux en pierres naturelles qui ont une énergie. Des broderies qui ont un sens. Rien de superflu.</p>
              </div>
              <p className="text-foreground uppercase tracking-[0.1em] text-sm md:text-base text-center">
                LOVCICOV EST UNE VISION DU MONDE. GEORGIANA EN EST LA VOIX.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
