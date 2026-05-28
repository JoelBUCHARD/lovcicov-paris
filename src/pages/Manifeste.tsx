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
            LOVCICOV — MANIFESTE
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
            <p>LOVCICOV incarne une vision du luxe où la présence l'emporte sur l'apparence.</p>
            <p>Une esthétique instinctive, silencieuse et profondément émotionnelle.</p>
            <p>Des pièces pensées pour révéler une allure avant même une silhouette.</p>
            <p>Inspirée par la pierre, la lumière et la noblesse des matières brutes, la maison développe une vision du vêtement où l'allure devient une forme d'élégance instinctive.</p>
            <p>Chaque création devient un talisman contemporain.</p>
            <p className="text-foreground italic">
              Une sensation.<br />
              Une posture.<br />
              Une signature.
            </p>
            <p className="text-foreground tracking-[0.15em] text-sm">
              PowerLov.<br />
              MysticLov.<br />
              StoneLov.
            </p>

            <p>Trois univers guidés par une même recherche : celle d'une élégance plus consciente, plus rare, plus incarnée.</p>
            <p className="text-foreground italic">
              Le noir absolu.<br />
              Le blanc sacré.<br />
              Le rouge profond.
            </p>
            <p className="text-foreground italic">
              Des lignes pures.<br />
              Des mots comme des mantras.<br />
              Une sophistication sans démonstration.
            </p>
            <p className="text-foreground uppercase tracking-[0.2em] text-sm md:text-base mt-12">
              LOVE IS MY FREQUENCY.
            </p>
            <p className="text-foreground uppercase tracking-[0.2em] text-sm md:text-base">
              PROTECTED. GUIDED. UNSTOPPABLE.
            </p>
            <p className="pt-8">LOVCICOV s'adresse à celles et ceux qui comprennent que le véritable luxe réside dans le calme, la maîtrise de soi et la liberté d'être pleinement aligné·e avec ce que l'on est.</p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
