import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mysticProducts } from '@/data/products';
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

const CollectionMystic = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main className="pt-20 md:pt-24 pb-24">
        {/* Hero Header strip — black with red accent border */}
        <div className="bg-[#1A1A1A] border-b-[3px] border-[#E66060] text-white px-6 md:px-10 py-8 md:py-10 mb-6 md:mb-8">
          <div className="text-center max-w-[640px] mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="uppercase mb-2"
            style={{ color: '#E66060', fontSize: 9, letterSpacing: '0.18em' }}
          >
            MYSTICLOV
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="uppercase mb-6"
            style={{ color: '#E66060', fontSize: 10, letterSpacing: '0.18em' }}
          >
            sweats · t-shirt · message fort
          </motion.p>
          <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-white"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 36, fontWeight: 200, fontStyle: 'italic', lineHeight: 1.2 }}
            >
              Love is my frequency.
            </motion.h1>
            <div className="my-6 h-px mx-auto" style={{ width: 60, backgroundColor: '#F5D0D0' }} />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#E8E4DD', maxWidth: 600, lineHeight: 1.8 }}
            >
              MYSTICLOV mélange spiritualité contemporaine, intuition et esthétique émotionnelle.
              Des créations inspirées par les fréquences, les symboles et l'invisible.
              Chaque pièce devient un mantra, une vibration, une énergie à porter.
            </motion.p>
            <div className="my-6 h-px mx-auto" style={{ width: 60, backgroundColor: '#F5D0D0' }} />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="uppercase"
              style={{ color: '#E66060', fontSize: 10, letterSpacing: '0.18em', lineHeight: 1.9 }}
            >
              Fréquence · Intuition · Énergie · Spiritualité · Rituel · Vibration · Mystère · Symboles · Protection · Guidance · Sacré · Oracle · Éveil
            </motion.p>
          </div>
        </div>


        {/* Products */}
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {mysticProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Secondary claim */}
        <p
          className="text-center mt-16"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontStyle: 'italic', color: '#888780' }}
        >
          Spirituality meets style.
        </p>

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-white uppercase px-8 py-3 transition-colors"
            style={{ backgroundColor: '#E66060', fontSize: 10, letterSpacing: '0.15em' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C94A4A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E66060')}
          >
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Footer strip */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-[#E66060] mt-20 py-10 px-6 md:px-10 text-center">
          <p className="uppercase" style={{ color: '#E66060', fontSize: 9, letterSpacing: '0.18em' }}>
            MYSTICLOV · Broderies dorées · Pièces uniques · Paris
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionMystic;
