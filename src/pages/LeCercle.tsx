import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import SEO from '@/components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

const LeCercle = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Le Cercle — Espace privé | LOVCICOV Paris"
        description="Le Cercle LOVCICOV : drops confidentiels, rendez-vous privés et nouvelles collections adressés à celles et ceux qui portent la maison."
        path="/le-cercle"
      />
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
          >
            ESPACE PRIVÉ
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-brand-lg text-xl md:text-2xl tracking-[0.2em] mb-20"
          >
            LE CERCLE
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-8"
          >
            <p>Le Cercle est l'espace privé de LOVCICOV.</p>
            <p>
              Un lieu pensé pour celles et ceux qui ressentent la mode comme une énergie,
              une émotion, une manière d'habiter le monde.
            </p>
            <p className="text-foreground italic">
              Plus qu'une newsletter,<br />
              Le Cercle donne accès à l'univers intime de la maison :
            </p>
            <p>
              drops confidentiels, éditions limitées, messages exclusifs, inspirations,
              rituels contemporains, playlists, jeux, mantras et expériences pensées
              autour de l'énergie des collections.
            </p>
            <p className="text-foreground tracking-[0.15em] text-sm">
              PowerLov.<br />
              MysticLov.<br />
              StoneLov.
            </p>

            <p>Chaque univers y vit différemment.</p>
            <p>
              Comme une conversation continue entre style, présence et transformation.
            </p>
            <p>
              Entrer dans Le Cercle, c'est rejoindre une communauté sensible au détail,
              à l'allure, à la fréquence des choses.
            </p>
            <p>
              Une communauté qui comprend que le vrai luxe aujourd'hui est aussi émotionnel.
            </p>

            <div className="pt-6">
              <p className="text-foreground mb-10">Le Cercle partage</p>
              <ul className="max-w-md mx-auto divide-y divide-foreground/10 border-y border-foreground/10">
                {[
                  'Accès anticipés',
                  'Pièces exclusives',
                  'Contenus éditoriaux',
                  'Expériences interactives',
                  'Inspirations mode & énergie',
                  'Messages privés de la fondatrice',
                  'Invitations confidentielles',
                  'Surprises et drops limités',
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between gap-6 py-4 text-foreground"
                  >
                    <span className="text-brand text-[10px] tracking-[0.2em] text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-left text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>


            <p className="text-foreground italic pt-4">
              Un espace entre mode, intuition et désir.
            </p>

            <p className="text-foreground uppercase tracking-[0.2em] text-sm md:text-base mt-12">
              LOVE IS MY FREQUENCY.
            </p>
            <p className="text-foreground uppercase tracking-[0.2em] text-sm md:text-base">
              PROTECTED. GUIDED. UNSTOPPABLE.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-16"
          >
            <Link
              to="/auth"
              className="inline-block px-10 py-4 bg-foreground text-background text-brand text-[10px] tracking-[0.25em] uppercase transition-colors hover:bg-foreground/80"
            >
              Rejoindre Le Cercle
            </Link>
          </motion.div>
        </div>
      </main>
      <JourneyContinuation />
      <Footer />
    </div>
  );
};

export default LeCercle;
