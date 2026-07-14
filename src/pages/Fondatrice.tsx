import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import SEO from '@/components/SEO';
import fondatricePortrait from '@/assets/fondatrice-portrait.png.asset.json';

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
      <SEO
        title="La fondatrice — LOVCICOV Paris"
        description="Rencontrez la fondatrice de LOVCICOV Paris. Une vision, une maison, un standard : la mode comme posture."
        path="/fondatrice"
      />
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

          {/* Photo placeholder */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="w-full max-w-md mx-auto mb-20"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={fondatricePortrait.url}
                alt="Georgiana Lovcicov, fondatrice de Lovcicov Paris"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Édito */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-manifeste text-muted-foreground space-y-10 max-w-xl mx-auto text-center"
          >
            <p className="text-foreground italic text-base md:text-lg leading-relaxed">
              Certaines créent des vêtements.<br />
              Georgiana crée des univers.
            </p>

            <p>
              Fille et petite-fille de couturières, elle grandit entre les tissus,
              les gestes précis et le silence des ateliers.
            </p>

            <p>
              Diplômée en Histoire de l'Art, elle nourrit son regard de symboles,
              de matières anciennes et de récits invisibles.
            </p>

            <p>
              Puis vient le Luxe. La Haute Couture. Les Fashion Weeks.<br />
              Une décennie à observer les femmes, les allures, les désirs.
            </p>

            <p className="text-foreground italic">
              Et le besoin, un jour, de créer autrement.<br />
              Plus librement.<br />
              Plus intimement.
            </p>

            <p>
              LOVCICOV naît de cette intuition.<br />
              Une maison pensée comme un langage intérieur.
            </p>

            <p>
              Du sur-mesure aux capsules, des silhouettes aux objets,
              chaque collection devient un chapitre. Une mue.
            </p>

            <p>
              Entrepreneure, maman, créatrice — elle construit LOVCICOV
              avec instinct, passion et liberté.
            </p>

            <p className="text-foreground italic pt-4">
              Pour elle, le vrai luxe n'est pas de paraître.<br />
              C'est de se sentir profondément aligné·e.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
