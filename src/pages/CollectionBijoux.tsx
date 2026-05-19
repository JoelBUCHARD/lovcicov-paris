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
    <div className="min-h-screen bg-[#FDF5EF]">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24">
        {/* Hero — aéré, luxe */}
        <div className="text-center px-6 md:px-10 mb-20 md:mb-28">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[9px] uppercase tracking-[0.2em] text-[#C4714A] mb-8 font-medium"
          >
            STONELOV
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-10 text-[#1A1A1A]"
          >
            StoneLov
          </motion.h1>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="max-w-lg mx-auto space-y-6"
          >
            <p className="text-[#5F5E5A] text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
              La collection StoneLov rassemble des créations composées de pierres naturelles choisies pour leur caractère et leur beauté.
            </p>
            <p className="text-[#5F5E5A] text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
              Chaque bijou est pensé comme un objet personnel, où la matière devient signature.
            </p>
            <p className="text-[#5F5E5A] text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
              Des pièces singulières, destinées à accompagner celles et ceux qui recherchent des objets porteurs de sens et de présence.
            </p>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="px-6 md:px-10 mb-16 md:mb-24">
          <div className="max-w-lg mx-auto h-px bg-[#E8D8C8]" />
        </div>

        {/* Products */}
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {bijouxProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
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
            className="inline-flex items-center gap-3 bg-[#C4714A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#A55A35] transition-colors"
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
