import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto pt-12 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-light mb-16 md:mb-24">
              Philosophie
            </h1>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                Le vêtement influence la posture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                La posture influence la perception.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                La perception influence l'action.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Chaque vêtement est un environnement. Le poids d'un tissu change la façon dont vous tenez vos épaules. La coupe d'une silhouette change la façon dont vous vous asseyez. La structure d'une pièce change la façon dont vous entrez dans une pièce.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Nous concevons pour trois états — Ancré, Présent, Confiant — car ce sont les fondations de votre manière d'être. Pas comme des idées. Comme des réalités physiques façonnées par ce qui touche votre corps.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LOVCICOV est du design comportemental exprimé à travers le vêtement. Chaque pièce est pensée pour transformer votre façon de vous porter — et à travers cela, la façon dont le monde vous répond.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Philosophy;
