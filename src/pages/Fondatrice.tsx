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
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4"
          >
            The Founder
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-muted-foreground text-lg md:text-xl font-serif italic mb-20"
          >
            Georgiana Lovcicov
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Certaines marques naissent d'une stratégie.</p>
            <p>LOVCICOV est née d'une transformation.</p>
            <p>
              Avant d'être une marque, c'était une vision.<br />
              Une intuition presque impossible à expliquer.
            </p>
            <p>Georgiana Lovcicov a toujours ressenti les choses différemment.</p>
            <p>
              Les lieux.<br />
              Les énergies.<br />
              Les gens.
            </p>
            <p>Comme si chaque personne entrait dans une pièce avec une fréquence invisible que le monde pouvait lire.</p>
            <p>Très tôt, elle comprend une chose que peu de gens réalisent :</p>
            <p>le monde ne répond pas seulement à ce que l'on fait.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl font-medium">
              Il répond à <em>ce que l'on dégage.</em>
            </p>
          </motion.div>

          {/* Separator */}
          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Pendant des années, elle observe.</p>
            <p>Elle analyse les comportements, les environnements, les codes invisibles qui séparent ceux qui suivent des chemins tracés… de ceux qui créent leur propre réalité.</p>
            <p>Elle découvre un principe qui va tout changer :</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              la réalité extérieure commence toujours par une identité intérieure.
            </p>
            <p>
              La manière dont on pense.<br />
              La manière dont on se perçoit.<br />
              La manière dont on se présente au monde.
            </p>
          </motion.div>

          {/* Separator */}
          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Entre deux forces qui semblent opposées, elle construit sa vision.</p>
            <p>
              D'un côté, une liberté instinctive —<br />
              celle qui pousse à ressentir, à explorer, à vivre avec intensité.
            </p>
            <p>
              De l'autre, une exigence presque architecturale —<br />
              celle qui transforme une idée en structure, une intuition en réalité.
            </p>
            <p>
              Entre l'émotion et la maîtrise,<br />
              entre l'instinct et la vision,<br />
              Georgiana développe une philosophie personnelle.
            </p>
            <p>Une manière de voir le monde où rien n'est laissé au hasard.</p>
            <p>Car pour elle, la vie n'est pas simplement quelque chose que l'on traverse.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              C'est quelque chose que l'on compose.
            </p>
            <p>Comme une œuvre.</p>
            <p>
              Chaque décision devient une ligne.<br />
              Chaque expérience, une matière.<br />
              Chaque ambition, une nouvelle dimension.
            </p>
            <p className="text-foreground font-serif text-xl md:text-2xl font-medium mt-10">
              Et c'est de cette vision qu'est née LOVCICOV.
            </p>
          </motion.div>

          {/* Separator */}
          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>LOVCICOV est née de cette idée.</p>
            <p>
              Créer une marque qui ne se contente pas d'habiller le corps,<br />
              mais qui reflète un état d'esprit.
            </p>
            <p>Une esthétique pour ceux qui vivent avec intention.</p>
            <p>Pour ceux qui comprennent que le vrai luxe n'est pas seulement ce que l'on possède.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              C'est ce que l'on incarne.
            </p>
            <p>Chaque pièce LOVCICOV porte cette philosophie.</p>
            <p>
              Des vêtements pensés comme des extensions d'une mentalité :<br />
              assumée, ambitieuse, libre.
            </p>
            <p>Un style qui ne cherche pas à suivre les tendances.</p>
            <p>Un style qui reflète une présence.</p>
          </motion.div>

          {/* Separator */}
          <div className="border-t border-border my-16 md:my-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-manifeste text-muted-foreground space-y-6"
          >
            <p>Aujourd'hui, LOVCICOV s'adresse à une nouvelle génération.</p>
            <p>Une génération qui ne demande plus la permission de vivre plus grand.</p>
            <p>Une génération qui comprend que l'énergie, la vision et les standards personnels façonnent la réalité.</p>
            <p>Pour Georgiana Lovcicov, la mode n'est pas seulement une industrie.</p>
            <p className="text-foreground font-serif text-xl md:text-2xl italic">
              C'est un langage.
            </p>
            <p>Un langage qui permet d'exprimer qui l'on est, avant même de prononcer un mot.</p>
          </motion.div>

          {/* Final */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 md:mt-28 text-center"
          >
            <p className="text-foreground font-serif text-2xl md:text-3xl font-light leading-relaxed">
              LOVCICOV n'est pas simplement une marque.
            </p>
            <p className="text-foreground font-serif text-2xl md:text-3xl font-light leading-relaxed mt-4">
              C'est la signature d'une vision.
            </p>
            <p className="text-muted-foreground font-serif text-lg italic mt-10">
              Et ce n'est que le début.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
