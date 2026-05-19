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
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
          >
            LE MANIFESTE
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mb-20"
          >
            <h1 className="text-brand-lg text-lg md:text-xl">LOVCICOV</h1>
            <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-muted-foreground mt-[-2px]">PARIS</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>LOVCICOV est né d'une conviction : que ce qu'on choisit de porter dit quelque chose de qui on est — et de qui on veut devenir.</p>
            <p>Nous ne faisons pas de la mode. Nous faisons des pièces. Des pièces qui durent, qui racontent, qui vous ressemblent.</p>
            <p>Chaque bijou a une pierre avec une énergie. Chaque broderie a un symbole avec une intention. Chaque tissu vient d'un artisan avec une histoire. Ce n'est pas de la décoration — c'est de la signification.</p>
            <p>Nous revendiquons le Very Slow Fashion. Le droit de prendre le temps. De bien faire. De livrer quelque chose d'exceptionnel plutôt que quelque chose de rapide.</p>
            <p>Lovcicov s'adresse aux femmes qui avancent avec intention. Qui refusent le jetable. Qui cherchent des pièces qui leur appartiennent vraiment — pas des pièces de série.</p>
            <p className="text-foreground uppercase tracking-[0.1em] mt-14 text-sm md:text-base whitespace-nowrap">
              LOVCICOV INCARNE UNE MANIÈRE DE VIVRE, PAS UNE TENDANCE.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
