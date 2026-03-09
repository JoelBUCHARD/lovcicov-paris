import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
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

const CollectionBijoux = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-24 px-6 md:px-10">
        {/* Hero */}
        <div className="max-w-3xl mb-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-6 tracking-[0.2em]"
          >
            Collection
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-6xl font-serif font-light mb-6"
          >
            Bijoux
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
          >
            Chaque pièce est composée de pierres naturelles sélectionnées pour leur caractère et leur couleur. 
            Assemblés à la main, ces bijoux sont inspirés de symboles intemporels. Chaque création est unique.
          </motion.p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {bijouxProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-brand text-[11px] border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionBijoux;
