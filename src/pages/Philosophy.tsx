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
              Philosophy
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
                Clothing influences posture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                Posture influences perception.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed">
                Perception influences action.
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
                Every garment is an environment. The weight of a fabric changes how you hold your shoulders. The cut of a silhouette changes how you sit. The structure of a piece changes how you enter a room.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We design for three states — Grounded, Present, Confident — because these are the foundations of how you show up. Not as ideas. As physical realities shaped by what touches your body.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LOVCICOV is behavioral design expressed through clothing. Each piece is engineered to shift how you carry yourself — and through that, how the world responds.
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
