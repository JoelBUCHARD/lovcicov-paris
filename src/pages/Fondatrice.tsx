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

            {/* Texte */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-manifeste text-muted-foreground space-y-8 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-8">
                <p className="text-foreground text-base md:text-lg leading-relaxed">
                  Certaines personnes créent des vêtements.<br />
                  D’autres créent des mondes.
                </p>

                <p>
                  Georgiana Lovcicov fait partie de celles qui transforment une émotion, une mémoire ou une intuition en matière vivante.
                </p>

                <p>
                  Fille et petite-fille de couturières, elle grandit au milieu des tissus, des gestes précis, des silhouettes en construction et des conversations silencieuses entre les mains et la matière. Très tôt, elle comprend que le vêtement n’est jamais seulement esthétique : il raconte une époque, une énergie, une transformation intérieure.
                </p>

                <p>
                  Diplômée en Histoire de l’Art, elle développe un regard profondément nourri par la peinture, les symboles, l’architecture, les matières anciennes et les récits invisibles que les objets portent à travers le temps.
                </p>

                <p>
                  Son parcours la mène ensuite dans l’univers du Luxe et de la Haute Couture, où elle travaille pendant plusieurs années aux côtés de maisons exigeantes, développant une vision sensible mais extrêmement précise de l’allure, du détail et du désir.
                </p>

                <p>
                  Sales Manager pour une quinzaine de marques, elle traverse les showrooms, les Fashion Weeks, les rendez-vous confidentiels, les coulisses de la mode parisienne et internationale. Elle observe les femmes, les hommes, les corps, les attitudes. Elle comprend ce que les vêtements provoquent. Ce qu’ils révèlent. Ce qu’ils cachent aussi.
                </p>

                <p className="text-foreground italic">
                  Puis vient le besoin de créer autrement.<br />
                  Plus librement.<br />
                  Plus intimement.
                </p>

                <p>
                  Depuis plus de sept ans, Georgiana développe son propre univers à travers LOVCICOV — une marque pensée comme une extension de ses transformations personnelles, émotionnelles et artistiques.
                </p>

                <p>
                  Le projet évolue avec elle, presque organiquement.
                </p>

                <p className="text-foreground italic">
                  Du sur-mesure aux capsules mode.<br />
                  Des pièces uniques aux collections plus instinctives.<br />
                  De la mode à la décoration.<br />
                  Des silhouettes aux objets.
                </p>

                <p className="text-foreground italic">
                  Chaque collection devient un chapitre.<br />
                  Une mue.<br />
                  Une trace d’un moment de vie.
                </p>

                <p>
                  Entrepreneure, maman, mariée, créatrice, elle construit LOVCICOV comme on construit un langage intérieur : avec intuition, passion et liberté.
                </p>

                <p>
                  Ses créations ont voyagé à travers des pop-up stores et événements privés à Paris, Bruxelles, Knokke, Anvers, Saint-Tropez ou encore sur la Côte d’Azur, dans des lieux choisis pour leur âme plus que pour leur visibilité.
                </p>

                <p>
                  LOVCICOV attire celles et ceux qui cherchent plus qu’un vêtement : une fréquence. Une allure. Une sensation de vérité.
                </p>

                <p>
                  À travers ses collections, Georgiana mélange aujourd’hui la mode, l’émotion, l’énergie, les symboles et l’art de la présence. Son univers oscille entre le noir profond, le blanc sacré, les pierres protectrices, les mots-mantras et une forme de luxe spirituel très contemporain.
                </p>

                <p>
                  Mystérieuse sans jamais être inaccessible, elle crée comme elle vit : instinctivement.
                </p>

                <p className="text-foreground italic">
                  Pour elle, le vrai luxe n’est pas de paraître.<br />
                  C’est de se sentir profondément aligné·e avec ce que l’on est devenu.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fondatrice;
