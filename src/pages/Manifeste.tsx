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

const Manifeste = () => {
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
            Le Standard
          </motion.h1>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>Il existe un moment dans la vie où l'on comprend que le monde que l'on nous a présenté n'est pas le seul possible.</p>
            <p>Un moment où quelque chose en nous refuse les limites ordinaires.</p>
            <p>Pour Georgiana Lovcicov, ce moment est devenu une philosophie.</p>
            <p>La conviction que la vie que l'on construit dépend des standards que l'on accepte.</p>
            <p>LOVCICOV est née de cette idée.</p>
            <p>Pas simplement comme une marque de vêtements,<br />mais comme une signature.</p>
            <p className="text-foreground font-serif text-2xl md:text-3xl italic mt-12">
              Un rappel que la présence se ressent bien avant les mots.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
