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
      <main className="pt-32 md:pt-36 pb-24">
        {/* Hero — StoneLov identity */}
        <div className="text-center px-6 md:px-10 mb-12 md:mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[9px] uppercase tracking-[0.18em] text-[#C4714A] mt-8 font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            STONELOV
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="italic text-[#1A1A1A] mt-6"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(28px,4vw,36px)', fontWeight: 200 }}
          >
            Rooted in the earth.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-[#5F5E5A] mx-auto mt-6"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, lineHeight: 1.8, maxWidth: 600 }}
          >
            STONELOV puise son inspiration dans la pierre, la terre et les matières brutes. Une vision organique et intemporelle du luxe, où l'ancrage devient élégance et où la matière protège autant qu'elle révèle.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mx-auto mt-8 uppercase"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 10,
              color: '#C4714A',
              letterSpacing: '0.18em',
              lineHeight: 2,
              maxWidth: 760,
            }}
          >
            Pierre · Terre · Minéral · Matière · Ancrage · Nature · Brut · Silence · Protection · Mémoire · Force ancienne · Élégance organique · Talisman
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="italic mt-8"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#888780' }}
          >
            Wear your truth. — Luxury with soul.
          </motion.p>
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
