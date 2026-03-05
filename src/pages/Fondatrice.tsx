import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

const Fondatrice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-16"
          >
            La Fondatrice
          </motion.h1>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>LOVCICOV a été fondée par Georgiana Lovcicov avec une vision simple mais puissante.</p>
            <p>Créer des vêtements qui reflètent un état d'esprit.</p>
            <p>Pas des pièces qui suivent les tendances, mais des créations qui incarnent présence, clarté et ambition.</p>
            <p>Pour Georgiana, le style n'a jamais été une question de conformité.</p>
            <p>Il a toujours été une manière d'exprimer la personne que l'on a décidé de devenir.</p>
            <p className="text-foreground font-serif text-2xl md:text-3xl italic mt-12">
              LOVCICOV est né de cette philosophie.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
