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
      <main className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand-lg text-lg md:text-xl mb-2"
          >
            LOVCICOV
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-20"
          >
            The Origin
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Certaines histoires commencent avec une idée.</p>
            <p>Celle-ci commence avec un sentiment.</p>
            <p>Le sentiment profond que la vie peut être plus grande que ce que l'on nous a appris à accepter.</p>
            <p>
              Depuis toujours, Georgiana Lovcicov ressent une chose difficile à expliquer :<br />
              le monde semble répondre différemment à certaines personnes.
            </p>
            <p>
              Certaines présences changent l'atmosphère d'une pièce.<br />
              Certains regards imposent le respect sans dire un mot.<br />
              Certaines personnes avancent comme si elles savaient déjà où elles allaient.
            </p>
            <p>Et une question devient impossible à ignorer :</p>
            <p className="text-foreground font-serif text-xl md:text-2xl font-medium">
              qu'est-ce qui crée cette différence ?
            </p>
          </motion.div>

          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Avec le temps, la réponse devient évidente.</p>
            <p>
              Ce n'est pas la chance.<br />
              Ce n'est pas l'argent.<br />
              Ce n'est même pas le talent.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              C'est la manière dont une personne se voit elle-même.
            </p>
            <p>
              Les standards qu'elle accepte.<br />
              Les limites qu'elle refuse.
            </p>
          </motion.div>

          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>LOVCICOV est né à cet endroit précis.</p>
            <p>À l'endroit où une personne décide qu'elle ne vivra pas une vie moyenne.</p>
            <p>
              Pas une vie dictée par les attentes des autres.<br />
              Pas une vie réduite par la peur d'être "trop".
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              Mais une vie construite avec intention.
            </p>
            <p>Dans ce moment de décision, quelque chose change.</p>
            <p>
              La posture devient différente.<br />
              Le regard devient plus calme.<br />
              La présence devient plus forte.
            </p>
            <p>Et le style n'est plus un simple vêtement.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              Il devient une extension de cette transformation.
            </p>
          </motion.div>

          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>C'est là que LOVCICOV prend forme.</p>
            <p>Pas comme une marque qui suit les tendances.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              Mais comme une signature pour ceux qui ont décidé de vivre selon leurs propres standards.
            </p>
            <p>Chaque pièce porte cette idée.</p>
            <p>
              La certitude silencieuse de quelqu'un qui sait qui il est.<br />
              L'élégance de ceux qui n'ont rien à prouver.<br />
              La présence de ceux qui avancent sans demander la permission.
            </p>
          </motion.div>

          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>LOVCICOV n'est pas fait pour tout le monde.</p>
            <p>Mais ceux pour qui il est fait le reconnaissent immédiatement.</p>
            <p>Parce qu'au fond, ils savent déjà une chose :</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              la vie que l'on construit dépend toujours des standards que l'on accepte.
            </p>
          </motion.div>

          {/* Final signature */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-24 md:mt-32 text-center"
          >
            <p className="text-brand-lg text-lg md:text-xl mb-6">LOVCICOV</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              Not a trend.<br />
              A decision.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Manifeste;
