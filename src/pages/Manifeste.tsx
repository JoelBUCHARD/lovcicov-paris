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
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mb-20"
          >
            <h1 className="text-brand-lg text-4xl md:text-6xl">MANIFESTE</h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>LOVCICOV est né d'une conviction simple : Le style commence bien avant les vêtements.</p>

            <p>Il se révèle dans la manière dont on se tient. Dans la façon dont on occupe l'espace. Dans la confiance avec laquelle on choisit d'être soi-même.</p>

            <p>Nos créations sont pensées pour accompagner cette présence. Des pièces qui expriment une attitude. Des symboles qui racontent une histoire. Des objets qui deviennent des signatures.</p>

            <p>LOVCICOV célèbre celles et ceux qui avancent avec intention, caractère et confiance.</p>

            <p>Non pour suivre les tendances. Mais pour exprimer une identité.</p>

            <p>Car le véritable style ne cherche pas à transformer une personne. Il révèle ce qui était déjà là.</p>

            <p className="text-foreground tracking-[0.15em] text-sm pt-4">
              LOVCICOV Vision. Allure. Signature.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
